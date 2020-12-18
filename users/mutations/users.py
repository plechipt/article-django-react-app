import graphene
import graphql_jwt
from django.contrib.auth import logout
from django.dispatch import receiver
from django_graphql_ratelimit import ratelimit
from graphene_django.types import DjangoObjectType
from graphql import GraphQLError
from graphql_auth import mutations
from graphql_jwt.refresh_token.signals import refresh_token_rotated

from users.models import CustomUser


class CustomUserType(DjangoObjectType):
   class Meta:
      model = CustomUser


# Revoke refresh token after it has been used
@receiver(refresh_token_rotated)
def revoke_refresh_token(sender, request, refresh_token, **kwargs):
   refresh_token.revoke(request)


class ObtainJSONWebToken(mutations.ObtainJSONWebToken):
   @classmethod
   def resolve(cls, root, info, **kwargs):
      return cls(user=info.context.user)


class Logout(graphene.Mutation):
   message = graphene.String()

   def mutate(self, info, input=None):
      request = info.context
      user = info.context.user

      if user.is_authenticated:
         message = 'Success'
         logout(request)
      
      else:
         message = 'User is not authenticated!'

      return Logout(message)


class AuthMutation(graphene.ObjectType):
   register = mutations.Register.Field()
   logout = Logout.Field()
   verify_account = mutations.VerifyAccount.Field()
   resend_activation_email = mutations.ResendActivationEmail.Field()
   send_password_reset_email = mutations.SendPasswordResetEmail.Field()
   password_reset = mutations.PasswordReset.Field()
   password_change = mutations.PasswordChange.Field()
   archive_account = mutations.ArchiveAccount.Field()
   delete_account = mutations.DeleteAccount.Field()
   update_account = mutations.UpdateAccount.Field()
   send_secondary_email_activation =  mutations.SendSecondaryEmailActivation.Field()
   verify_secondary_email = mutations.VerifySecondaryEmail.Field()
   swap_emails = mutations.SwapEmails.Field()

   # Django-graphql-jwt inheritances
   token_auth = ObtainJSONWebToken.Field()
   verify_token = mutations.VerifyToken.Field()
   refresh_token = mutations.RefreshToken.Field()
   revoke_token = mutations.RevokeToken.Field() 
   
   # Delete JWT tokens
   delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
   delete_refresh_token_cookie = graphql_jwt.DeleteRefreshTokenCookie.Field() 
