import graphene
from graphql_auth import mutations
from graphql_auth.schema import MeQuery, UserQuery
from graphql_jwt.decorators import login_required
from payments.schema import PaymentMutation
from posts.schema import PostMutation, PostQuery
from users.models import CustomUser
from users.schema import MyUserQuery, UserMutation


class Mutation(UserMutation, PostMutation, PaymentMutation):
   pass


class Query(UserQuery, MeQuery, MyUserQuery, PostQuery, graphene.ObjectType):
   pass


schema = graphene.Schema(
   query=Query,
   mutation=Mutation,
)
