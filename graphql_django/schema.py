import graphene
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations
from users.models import CustomUser

from users.schema import UserMutation 
from posts.schema import PostMutation 
from payments.schema import PaymentMutation

from .types import *


class Mutation(UserMutation, PostMutation, PaymentMutation):
   pass


class Query(UserQuery, MeQuery, graphene.ObjectType):
   all_posts = graphene.List(CustomPostType)
   all_users = graphene.List(CustomUserType)
   all_profiles = graphene.List(CustomProfileType)
   all_comments = graphene.List(CustomCommentType)
   all_replys = graphene.List(CustomReplyType) 

   def resolve_all_posts(self, info, **kwargs):
      return Post.objects.all()

   def resolve_all_users(self, info, **kwargs):
      return CustomUser.objects.all()

   def resolve_all_profiles(self, info, **kwargs):
      return Profile.objects.all()

   def resolve_all_comments(self, info, **kwargs):
      return Comment.objects.all()

   def resolve_all_replys(self, info, **kwargs):
      return Reply.objects.all()


schema = graphene.Schema(
   query=Query,
   mutation=Mutation,
)