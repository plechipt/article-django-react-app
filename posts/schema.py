from .mutations.posts import *
from .mutations.comments import *
from .mutations.replys import *

class PostMutation:
    # Posts
    find_post = FindPost.Field()
    add_post = AddPost.Field()
    delete_post = DeletePost.Field()
    edit_post = EditPost.Field()
    like_post = LikePost.Field()
    unlike_post = UnlikePost.Field()
    post_filter = FilterPost.Field()

    # Comments
    comment_post = PostComment.Field()
    comment_delete = DeleteComment.Field()

    # Replys
    reply_comment = ReplyComment.Field()
    reply_delete = DeleteReply.Field()
