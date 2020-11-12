import graphene
import datetime
from graphene_django.types import DjangoObjectType
from django_graphql_ratelimit import ratelimit

from .models import Comment, Reply 
from users.models import CustomUser


class ReplyType(DjangoObjectType):
   class Meta:
      model = Reply


#Create reply
class ReplyAddInput(graphene.InputObjectType):
   id = graphene.ID()
   user = graphene.String()
   content = graphene.String()


class ReplyComment(graphene.Mutation):
   class Arguments:
      input = ReplyAddInput(required=True)

   message = graphene.String()

   
   @staticmethod
   @ratelimit(key="ip", rate="2/m", block=True)
   def mutate(root, info, input=None):
      message = ''
      comment = Comment.objects.get(id=input.id)
      user = CustomUser.objects.get(username=input.user)   
      posted = datetime.datetime.now().strftime('%d %B %Y')
      today = datetime.datetime.now().strftime('%d %B %Y')

      #filter replies that belongs to user and are posted today
      replies_posted_today = Reply.objects.filter(user__username=input.user, posted=today)

      if replies_posted_today.count() >= 20:
         message = 'You have reached your maximum replies per day!'

      else:
         message = 'Success'
         reply = Reply(comment=comment, user=user, content=input.content, posted=posted)
         reply.save()

      return ReplyComment(message=message)


#Delete reply
class ReplyDeleteInput(graphene.InputObjectType):
   id = graphene.ID()


class DeleteReply(graphene.Mutation):
   class Arguments:
      input = ReplyDeleteInput(required=True)

   reply = graphene.Field(ReplyType)

   @staticmethod
   def mutate(root, info, input=None):
      reply = Reply.objects.get(id=input.id)
      reply.delete()

      return DeleteReply(reply=reply)