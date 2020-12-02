from .mutations.posts import *
from .mutations.comments import *
from .mutations.replys import *

import graphene


class PostMutation:
    # Posts
    create_post = CreatePost.Field()
    delete_post = DeletePost.Field()
    edit_post = EditPost.Field()
    like_post = LikePost.Field()
    unlike_post = UnlikePost.Field()

    # Comments
    comment_post = CommentPost.Field()
    delete_comment = DeleteComment.Field()

    # Replys
    reply_comment = ReplyComment.Field()
    delete_reply = DeleteReply.Field()