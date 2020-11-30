from .mutations.posts import *
from .mutations.comments import *
from .mutations.replys import *

import graphene


class PostMutation:
    # Posts
    add_post = AddPost.Field()
    delete_post = DeletePost.Field()
    edit_post = EditPost.Field()
    like_post = LikePost.Field()
    unlike_post = UnlikePost.Field()

    # Comments
    comment_post = PostComment.Field()
    comment_delete = DeleteComment.Field()

    # Replys
    reply_comment = ReplyComment.Field()
    reply_delete = DeleteReply.Field()