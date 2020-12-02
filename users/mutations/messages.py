import graphene
import datetime

from graphql_auth import mutations
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from django_graphql_ratelimit import ratelimit

from users.models import CustomUser, Profile, Message, ChatRoom


class MessageType(DjangoObjectType):
   class Meta:
      model = Message

class ChatRoomType(DjangoObjectType):
   class Meta:
      model = ChatRoom


# Send user a message
class CreateMessage(graphene.Mutation):
   class Arguments:
      user = graphene.String(required=True)
      chat_user = graphene.String(required=True)
      content = graphene.String(required=True)
      
   message = graphene.String()

   @staticmethod
   @ratelimit(key="ip", rate="10/m", block=True)
   def mutate(root, info, user, chat_user, content):
      # Create date when message was messaged
      messaged = datetime.datetime.now().strftime('%d %B %Y, %H:%M')

      message_is_empty = content == ''
   
      if message_is_empty:
         message = "Message must not be empty!"
         return CreateMessage(message=message)
         
      # Get the info
      user = CustomUser.objects.get(username=user)
      chat_user = CustomUser.objects.get(username=chat_user)
      chat_rooms = ChatRoom.objects.all()

      # Get the chat_room
      chat_room_with_user = chat_rooms.filter(users__username=user)
      chat_room = chat_room_with_user.get(users__username=chat_user)
      
      # Create message
      users_message = Message.objects.create(user=user, content=content, messaged=messaged)

      # Add the message to chat_room messages
      chat_room.messages.add(users_message)
      message = 'Success'

      return CreateMessage(message=message)


#Create chatroom for user and chat_user
class CreateChatRoom(graphene.Mutation):
   class Arguments:
      user = graphene.String(required=True)
      chat_user = graphene.String(required=True)
   
   chat_room = graphene.Field(ChatRoomType)
   
   def mutate(root, info, user, chat_user):
      user_doesnt_exist = CustomUser.objects.filter(username=user).count() == 0
      chat_user_doesnt_exist = CustomUser.objects.filter(username=chat_user).count() == 0
      chat_rooms = ChatRoom.objects.all()

      if user_doesnt_exist or chat_user_doesnt_exist:
         raise Exception("User or chat user doesn't exist!")

      # Get users
      user = CustomUser.objects.get(username=user)
      chat_user = CustomUser.objects.get(username=chat_user)

      chat_room_doesnt_exist = chat_rooms.filter(users__username=user).filter(users__username=chat_user).count() == 0

      if chat_room_doesnt_exist == True:
         # Create chatroom and add users to it
         chat_room = ChatRoom.objects.create()
         chat_room.users.add(user, chat_user)

      else:
         # Get the chatroom
         chat_room_with_user = chat_rooms.filter(users__username=user)
         chat_room = chat_room_with_user.get(users__username=chat_user)

      return chat_room