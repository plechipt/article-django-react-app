
import graphene
import datetime
from django.utils import timezone
from graphene_django.types import DjangoObjectType

from .models import Comment, Post 
from users.models import CustomUser


class CommentType(DjangoObjectType):
   class Meta:
      model = Comment


class PostComment(graphene.Mutation):
   class Arguments:
      input = CommentPostInput(required=True)

   message = graphene.String()

   @staticmethod
   def mutate(root, info, input=None):
      message = ''
      post = Post.objects.get(id=input.id)
      user = CustomUser.objects.get(username=input.user) 
      all_comments = Comment.objects.all()

      #create date when was the post posted
      posted = datetime.datetime.now().strftime('%d %B %Y')

      #check how many comments are posted recently
      comments_posted_recently = 0
      for comment in all_comments:
         if comment.how_many_seconds_ago() < 5:
            comments_posted_recently += 1

      #if user has posted 4 or more posts -> send error message
      if comments_posted_recently >= 3:
         message = 'You need to wait to wait to post more comments!'

      else:
         message = 'Success'
         comment = Comment(post=post, user=user, content=input.content, posted=posted)
         comment.save()

      return PostComment(message=message)
   

#Delete Comment
class CommentDeleteInput(graphene.InputObjectType):
   id = graphene.ID()


class DeleteComment(graphene.Mutation):
   class Arguments:
      input = CommentDeleteInput(required=True)

   comment = graphene.Field(CommentType)

   @staticmethod
   def mutate(root, info, input=None):
      comment = Comment.objects.get(id=input.id)
      comment.delete()

      return DeleteComment(comment=comment)