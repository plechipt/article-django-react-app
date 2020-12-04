import graphene

from .mutations.comments import *
from .mutations.posts import *
from .mutations.replys import *


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


class PostQuery:
    all_posts = graphene.List(PostType)
    all_comments = graphene.List(CommentType)
    all_replys = graphene.List(ReplyType) 

    find_post = graphene.Field(
        PostType, 
        id=graphene.ID(required=True)
    )

    filter_post = graphene.List(
        PostType, 
        title=graphene.String(required=True)
    )

    def resolve_find_post(self, root, id):
        post_doesnt_exist = Post.objects.filter(id=id).count() == 0

        if post_doesnt_exist == True:
            raise Exception("Post doesn't exist")

        return Post.objects.get(id=id)

    def resolve_filter_post(self, root, title):
        # Filter post that starts with input in search bar
        return Post.objects.filter(title__startswith=title)

    def resolve_all_posts(self, root, **kwargs):
        return Post.objects.all()
    
    def resolve_all_comments(self, root, **kwargs):
        return Comment.objects.all()

    def resolve_all_replys(self, root, **kwargs):
        return Reply.objects.all()



