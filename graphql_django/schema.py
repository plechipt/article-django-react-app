import graphene
from graphene_django.types import DjangoObjectType
from payments.schema import PaymentMutation
from posts.schema import PostMutation, PostQuery
from users.models import CustomUser
from users.schema import UserMutation
from users.schema import UserQuery as MyUserQuery
from users.schema import UserSubscription


class Mutation(UserMutation, PostMutation, PaymentMutation):
   pass


class Query(MyUserQuery, PostQuery, graphene.ObjectType):
   pass


class Subscription(UserSubscription):
   pass


schema = graphene.Schema(
   query=Query,
   mutation=Mutation,
   subscription=Subscription
)
