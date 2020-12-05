import graphene
import graphql_jwt
from graphene_django.types import DjangoObjectType
from graphql_auth import mutations

from users.models import CustomUser


class CustomUserType(DjangoObjectType):
   class Meta:
      model = CustomUser


class AuthMutation(graphene.ObjectType):
   register = mutations.Register.Field()
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
   token_auth = mutations.ObtainJSONWebToken.Field()
   verify_token = mutations.VerifyToken.Field()
   refresh_token = mutations.RefreshToken.Field()
   revoke_token = mutations.RevokeToken.Field() 
   
   # Delete JWT tokens
   delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
   delete_refresh_token_cookie = graphql_jwt.DeleteRefreshTokenCookie.Field() 