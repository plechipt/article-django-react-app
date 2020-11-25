import graphene
import datetime

from graphql_auth import mutations
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required
from django_graphql_ratelimit import ratelimit

from .models import CustomUser, Profile, Message, ChatRoom


class CustomUserType(DjangoObjectType):
   class Meta:
      model = CustomUser


class MessageType(DjangoObjectType):
   class Meta:
      model = Message


class ChatRoomType(DjangoObjectType):
   class Meta:
      model = ChatRoom 


#Send user a message
class CreateMessageInput(graphene.InputObjectType):
   user = graphene.String()
   chat_user = graphene.String()
   content = graphene.String()


class CreateMessage(graphene.Mutation):
   class Arguments:
      input = CreateMessageInput(required=True)
      
   message = graphene.String()

   @staticmethod
   @login_required
   @ratelimit(key="ip", rate="10/m", block=True)
   def mutate(root, info, input=None):
      #create date when message was messaged
      messaged = datetime.datetime.now().strftime('%d %B %Y, %H:%M')

      if input.content == '':
         message = "Message must not be empty!"
         return CreateMessage(message=message)
         
      #get the info
      user = CustomUser.objects.get(username=input.user)
      chat_user = CustomUser.objects.get(username=input.chat_user)
      chat_rooms = ChatRoom.objects.all()

      #get the chat_room
      chat_room_with_user = chat_rooms.filter(users__username=user)
      chat_room = chat_room_with_user.get(users__username=chat_user)
      
      #create message
      users_message = Message.objects.create(user=user, content=input.content, messaged=messaged)
      #add the message to chat_room messages
      chat_room.messages.add(users_message)
      message = 'Success'

      return CreateMessage(message=message)


#Query all messages that have user with another user
class QueryUserMessagesInput(graphene.InputObjectType):
   user = graphene.String()
   chat_user = graphene.String()


class QueryUserMessages(graphene.Mutation):
   class Arguments:
      input = QueryUserMessagesInput(required=True)
   
   messages = graphene.List(MessageType)
   message = graphene.String()

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      message = ''

      user = CustomUser.objects.get(username=input.user)
      chat_rooms = ChatRoom.objects.all()
      
      #if chat_user doesnt exist
      if CustomUser.objects.filter(username=input.chat_user).count() == 0:
         message = "This user doesn't exist"
         return QueryUserMessages(message=message)

      #else success 
      else:
         chat_user = CustomUser.objects.get(username=input.chat_user)

         #if chat room exists -> get it
         if chat_rooms.filter(users__username=user).filter(users__username=chat_user).count() != 0:
            #filter where is user
            chat_room_with_user = chat_rooms.filter(users__username=user)
            #filter where is user and chat_user
            chat_room = chat_room_with_user.get(users__username=chat_user)

         #else to create chat_room and add the users to chat_room
         else:
            chat_room = ChatRoom.objects.create()
            chat_room.users.add(user, chat_user)


      messages = chat_room.messages.all()

      message = 'Success'
      return QueryUserMessages(messages=messages, message=message)
