from graphene_django.types import DjangoObjectType
from posts.models import Comment, Post, Reply
from users.models import ChatRoom, CustomUser, Message, Profile


class CustomUserType(DjangoObjectType):
   class Meta:
      model = CustomUser

class CustomProfileType(DjangoObjectType):
   class Meta:
      model = Profile

class CustomPostType(DjangoObjectType):
   class Meta:
      model = Post

class CustomCommentType(DjangoObjectType):
   class Meta:
      model = Comment

class CustomReplyType(DjangoObjectType):
   class Meta:
      model = Reply

class CustomMessageType(DjangoObjectType):
   class Meta:
      model = Message
