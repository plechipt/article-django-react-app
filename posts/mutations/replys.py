import graphene
import datetime

from django_graphql_ratelimit import ratelimit
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required

from posts.models import Comment, Reply 
from users.models import CustomUser


class ReplyType(DjangoObjectType):
   class Meta:
      model = Reply


# Create reply
class ReplyComment(graphene.Mutation):
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
      comment = Comment.objects.get(id=id)
      user = CustomUser.objects.get(username=user)   
      posted = datetime.datetime.now().strftime('%d %B %Y')
      today = datetime.datetime.now().strftime('%d %B %Y')

      # Filter replies that belongs to user and are posted today
      replies_posted_today = Reply.objects.filter(user__username=user, posted=today)

      if replies_posted_today.count() >= 20:
         message = 'You have reached your maximum replies per day!'

      else:
         message = 'Success'
         reply = Reply(comment=comment, user=user, content=content, posted=posted)
         reply.save()

      return ReplyComment(message=message)


# Delete reply
class DeleteReply(graphene.Mutation):
   class Arguments:
      id = graphene.ID(required=True)

   reply = graphene.Field(ReplyType)

   @staticmethod
   @login_required
   def mutate(root, info, id):
      reply = Reply.objects.get(id=id)
      reply.delete()

      return DeleteReply(reply=reply)