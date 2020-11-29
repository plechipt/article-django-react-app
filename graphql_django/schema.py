import graphene
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations
from users.models import CustomUser

from users.schema_users import AuthMutation 
from payments.schema import PaymentMutation
from users.schema_messages import MessageMutation, CustomUserType
from users.schema_profiles import ProfileMutation, Profile, ProfileType
from posts.schema_posts import PostMutation, Post, PostType
from posts.schema_comments import CommentMutation, Comment, CommentType
from posts.schema_replys import ReplyMutation, Reply, ReplyType



class Mutation(
   AuthMutation, ProfileMutation, PaymentMutation, 
   MessageMutation, PostMutation, CommentMutation,
   ReplyMutation, graphene.ObjectType
):
   pass


class Query(UserQuery, MeQuery, graphene.ObjectType):
   all_posts = graphene.List(PostType)
   all_users = graphene.List(CustomUserType)
   all_profiles = graphene.List(ProfileType)
   all_comments = graphene.List(CommentType)
   all_replys = graphene.List(ReplyType) 

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