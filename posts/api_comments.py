
import graphene
import datetime
from graphene_django.types import DjangoObjectType

from .models import Comment, Post 
from users.models import CustomUser


class CommentType(DjangoObjectType):
   class Meta:
      model = Comment


#Create comment on post
class CommentPostInput(graphene.InputObjectType):
   id = graphene.ID()
   user = graphene.String()
   content = graphene.String()


class PostComment(graphene.Mutation):
   class Arguments:
      input = CommentPostInput(required=True)

   message = graphene.String()

   @staticmethod
   def mutate(root, info, input=None):
      message = ''
      post = Post.objects.get(id=input.id)
      user = CustomUser.objects.get(username=input.user)   

      #create date when was the post posted
      posted = datetime.datetime.now().strftime('%d %B %Y')
      date_now = datetime.datetime.now()

      comment = Comment(post=post, user=user, content=input.content, posted=posted, date=date_now)
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