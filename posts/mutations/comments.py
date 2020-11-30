import time
import graphene
import datetime
from django.utils import timezone
from graphql_jwt.decorators import login_required

from graphene_django.types import DjangoObjectType
from django_graphql_ratelimit import ratelimit

from users.models import CustomUser
from posts.models import Comment, Post


class CommentType(DjangoObjectType):
   class Meta:
      model = Comment


# Comment post
class PostComment(graphene.Mutation):
   class Arguments:
      id = graphene.ID(required=True)
      user = graphene.String(required=True)
      content = graphene.String(required=True)

   message = graphene.String()

   @staticmethod
   @login_required
   @ratelimit(key="ip", rate="3/m", block=True)
   def mutate(root, info, id, user, content):
      message = ''
      post = Post.objects.get(id=id)
      user = CustomUser.objects.get(username=user) 
      today = datetime.datetime.now().strftime('%d %B %Y')

      # Filter comments that belongs to user and are posted today
      comments_posted_today = Comment.objects.filter(user__username=user, posted=today)
      
      # If user has posted 20 or more comments
      if comments_posted_today.count() >= 20:
         message = 'You have reached your maximum comments per day!'

      else:
         # Create date when was the post posted
         posted = datetime.datetime.now().strftime('%d %B %Y')

         message = 'Success'
         comment = Comment(post=post, user=user, content=content, posted=posted)
         comment.save()

      return PostComment(message=message)
   

# Delete Comment
class DeleteComment(graphene.Mutation):
   class Arguments:
      id = graphene.ID(required=True)

   comment = graphene.Field(CommentType)

   @staticmethod
   @login_required
   def mutate(root, info, id):
      comment = Comment.objects.get(id=id)
      comment.delete()

      return DeleteComment(comment=comment)
