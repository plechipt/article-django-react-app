import graphene
import datetime

from graphql_auth import mutations
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from django_graphql_ratelimit import ratelimit

from users.models import CustomUser, Profile, Message, ChatRoom


class CustomUserType(DjangoObjectType):
   class Meta:
      model = CustomUser


class MessageType(DjangoObjectType):
   class Meta:
      model = Message

# Send user a message
class CreateMessage(graphene.Mutation):
   class Arguments:
      user = graphene.String(required=True)
      chat_user = graphene.String(required=True)
      content = graphene.String(required=True)
      
   message = graphene.String()

   @staticmethod
   @login_required
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


# Query all messages that have user with another user
class QueryUserMessages(graphene.Mutation):
   class Arguments:
      user = graphene.String(required=True)
      chat_user = graphene.String(required=True)
   
   messages = graphene.List(MessageType)
   message = graphene.String()

   @staticmethod
   @login_required
   def mutate(root, info, user, chat_user):
      message = ''

      user = CustomUser.objects.get(username=user)
      chat_rooms = ChatRoom.objects.all()
      
      user_doesnt_exist = CustomUser.objects.filter(username=chat_user).count() == 0

      if user_doesnt_exist:
         message = "This user doesn't exist"
         return QueryUserMessages(message=message)

      # Else success 
      else:
         chat_user = CustomUser.objects.get(username=chat_user)

         users_chatrooms = chat_rooms.filter(users__username=user)
         user_and_chatuser_chatroom = users_chatrooms.filter(users__username=chat_user)

         # If chatroom doesnt exist -> create new one
         if user_and_chatuser_chatroom.count() == 0:
            user_and_chatuser_chatroom = ChatRoom.objects.create()
            user_and_chatuser_chatroom.users.add(user, chat_user)

      chat_room = user_and_chatuser_chatroom.first()
      messages = chat_room.messages.all()

      message = 'Success'
      return QueryUserMessages(messages=messages, message=message)