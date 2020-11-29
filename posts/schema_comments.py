import time
import graphene
import datetime
from django.utils import timezone
from graphql_jwt.decorators import login_required

from graphene_django.types import DjangoObjectType
from django_graphql_ratelimit import ratelimit

from .models import Comment, Post 
from users.models import CustomUser


class CommentType(DjangoObjectType):
   class Meta:
      model = Comment


# Comment post
class CommentPostInput(graphene.InputObjectType):
   id = graphene.ID()
   user = graphene.String()
   content = graphene.String()


class PostComment(graphene.Mutation):
   class Arguments:
      input = CommentPostInput(required=True)

   message = graphene.String()

   @staticmethod
   @login_required
   @ratelimit(key="ip", rate="3/m", block=True)
   def mutate(root, info, input=None):
      message = ''
      post = Post.objects.get(id=input.id)
      user = CustomUser.objects.get(username=input.user) 
      today = datetime.datetime.now().strftime('%d %B %Y')

      # Filter comments that belongs to user and are posted today
      comments_posted_today = Comment.objects.filter(user__username=input.user, posted=today)
      
      # If user has posted 20 or more comments
      if comments_posted_today.count() >= 20:
         message = 'You have reached your maximum comments per day!'

      else:
         # Create date when was the post posted
         posted = datetime.datetime.now().strftime('%d %B %Y')

         message = 'Success'
         comment = Comment(post=post, user=user, content=input.content, posted=posted)
         comment.save()

      return PostComment(message=message)
   

# Delete Comment
class CommentDeleteInput(graphene.InputObjectType):
   id = graphene.ID()


class DeleteComment(graphene.Mutation):
   class Arguments:
      input = CommentDeleteInput(required=True)

   comment = graphene.Field(CommentType)

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      comment = Comment.objects.get(id=input.id)
      comment.delete()

      return DeleteComment(comment=comment)



class CommentMutation():
   comment_post = PostComment.Field()
   comment_delete = DeleteComment.Field()