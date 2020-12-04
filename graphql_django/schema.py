import graphene
from graphql_auth import mutations
from graphql_auth.schema import MeQuery, UserQuery
from graphql_jwt.decorators import login_required
from payments.schema import PaymentMutation
from posts.schema import PostMutation, PostQuery
from users.models import CustomUser
from users.schema import UserMutation
from users.schema import UserQuery as MyUserQuery


class Mutation(UserMutation, PostMutation, PaymentMutation):
   pass


class Query(UserQuery, MeQuery, PostQuery, MyUserQuery, graphene.ObjectType):
   pass


schema = graphene.Schema(
   query=Query,
   mutation=Mutation,
)
