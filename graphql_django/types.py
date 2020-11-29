from posts.models import Post, Comment, Reply
from users.models import CustomUser, Profile
from graphene_django.types import DjangoObjectType


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