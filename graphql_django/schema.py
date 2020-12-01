import graphene
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations
from users.models import CustomUser
from graphql_jwt.decorators import login_required

from users.schema import UserMutation 
from posts.schema import PostMutation 
from payments.schema import PaymentMutation

from .graphql_types import *


class Mutation(UserMutation, PostMutation, PaymentMutation):
   pass


class Query(UserQuery, MeQuery, graphene.ObjectType):
   all_posts = graphene.List(CustomPostType)
   all_users = graphene.List(CustomUserType)
   all_profiles = graphene.List(CustomProfileType)
   all_comments = graphene.List(CustomCommentType)
   all_replys = graphene.List(CustomReplyType) 

   find_post = graphene.Field(
      CustomPostType, 
      id=graphene.ID(required=True)
   )

   filter_post = graphene.List(
      CustomPostType, 
      title=graphene.String(required=True)
   )

   chat_room_messages = graphene.List(
      CustomMessageType,
      user=graphene.String(required=True),
      chat_user=graphene.String(required=True)
   )

   @login_required
   def resolve_find_post(self, root, id):
      post_doesnt_exist = Post.objects.filter(id=id).count() == 0

      if post_doesnt_exist == True:
         raise Exception("Post doesn't exist")

      return Post.objects.get(id=id)

   @login_required
   def resolve_filter_post(self, root, title):
      # Filter post that starts with input in search bar
      return Post.objects.filter(title__startswith=title)

   @login_required
   def resolve_chat_room_messages(self, root, user, chat_user):
      chat_rooms = ChatRoom.objects.all()

      user_doesnt_exist = CustomUser.objects.filter(username=user).count() == 0
      chat_user_doesnt_exist = CustomUser.objects.filter(username=chat_user).count() == 0

      if user_doesnt_exist or chat_user_doesnt_exist:
         return Exception("This user doesn't exist")

      # Get users
      user = CustomUser.objects.get(username=user)
      chat_user = CustomUser.objects.get(username=chat_user)

      # Get messages
      user_chatrooms = chat_rooms.filter(users__username=user)
      user_and_chatuser_chatroom = user_chatrooms.filter(users__username=chat_user)
      chat_room = user_and_chatuser_chatroom.first()

      return chat_room.messages.all()

   def resolve_all_posts(self, root, info, **kwargs):
      return Post.objects.all()

   def resolve_all_users(self, root, info, **kwargs):
      return CustomUser.objects.all()

   def resolve_all_profiles(self, root, info, **kwargs):
      return Profile.objects.all()

   def resolve_all_comments(self, root, info, **kwargs):
      return Comment.objects.all()

   def resolve_all_replys(self, root, info, **kwargs):
      return Reply.objects.all()


schema = graphene.Schema(
   query=Query,
   mutation=Mutation,
)