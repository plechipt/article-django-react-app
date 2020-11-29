import graphene
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations

from users.api_users import AuthMutation 
from payments.api_payments import CreateCheckoutSession

from users.api_messages import (
   CustomUserType, CustomUser, 
   CreateMessage, QueryUserMessages
)

from users.api_profiles import (
   Profile, ProfileType, ProfileInfo,
   CheckUserProfile, UpdateUser,
   FollowProfile, UnfollowProfile
)

from posts.api_posts import (
   FindPost, AddPost, DeletePost, EditPost,
   LikePost, UnlikePost, FilterPost,
   Post, PostType, 
)

from posts.api_comments import (
   PostComment, DeleteComment,
   Comment, CommentType
) 

from posts.api_replys import (
   ReplyComment, DeleteReply,
   Reply, ReplyType
)


class Mutation(AuthMutation, graphene.ObjectType):
   # Post
   find_post = FindPost.Field()
   add_post = AddPost.Field()
   delete_post = DeletePost.Field()
   edit_post = EditPost.Field()
   like_post = LikePost.Field()
   unlike_post = UnlikePost.Field()
   post_filter = FilterPost.Field()
   comment_post = PostComment.Field()
   comment_delete = DeleteComment.Field()
   reply_comment = ReplyComment.Field()
   reply_delete = DeleteReply.Field()

   # Profile
   profile_info = ProfileInfo.Field()
   check_user_profile = CheckUserProfile.Field()
   profile_update = UpdateUser.Field()
   profile_follow = FollowProfile.Field()
   profile_unfollow = UnfollowProfile.Field()

   # Message
   message_create = CreateMessage.Field()
   query_user_messages = QueryUserMessages.Field()

   # Payment 
   create_checkout_session = CreateCheckoutSession.Field()


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