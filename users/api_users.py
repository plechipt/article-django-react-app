import graphene
import graphql_jwt
from graphql_auth import mutations
from graphene.types.generic import GenericScalar


class JSONWebTokenMixin:
   payload = GenericScalar(required=False)
   refresh_expires_in = graphene.Int(required=False)

   @classmethod
   def Field(cls, *args, **kwargs):
      if not jwt_settings.JWT_HIDE_TOKEN_FIELDS:
         cls._meta.fields["token"] = graphene.Field(graphene.String, required=False)
         if jwt_settings.JWT_LONG_RUNNING_REFRESH_TOKEN:
            cls._meta.fields["refresh_token"] = graphene.Field(
               graphene.String, required=False,
            )

      return super().Field(*args, **kwargs)

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

   # django-graphql-jwt inheritances
   token_auth = mutations.ObtainJSONWebToken.Field()
   verify_token = mutations.VerifyToken.Field()
   refresh_token = mutations.RefreshToken.Field()
   revoke_token = mutations.RevokeToken.Field() 
   
   #delete JWT token
   delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
   delete_refresh_token_cookie = graphql_jwt.DeleteRefreshTokenCookie.Field()

   






 