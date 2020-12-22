import graphene
import graphql_jwt
from django import forms
from django.contrib.auth import authenticate, login, logout
from django.dispatch import receiver
from django_graphql_ratelimit import ratelimit
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django.types import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required
from graphql_jwt.refresh_token.signals import refresh_token_rotated

from users.models import CustomUser


class CustomUserType(DjangoObjectType):
   class Meta:
      model = CustomUser

class RegisterForm(forms.ModelForm):
   password2 = forms.CharField(widget=forms.PasswordInput)

   class Meta:
      model = CustomUser
      fields = ('username', 'email', 'password',)


# Revoke refresh token after it has been used
@receiver(refresh_token_rotated)
def revoke_refresh_token(sender, request, refresh_token, **kwargs):
   refresh_token.revoke(request)


class Register(DjangoModelFormMutation):
   user = graphene.Field(CustomUserType)

   class Meta:
      form_class = RegisterForm
      input_field_name = 'data'
      return_field_name = 'user'

   def resolve_user(self, info, **kwargs):
      print(kwargs)
      return self.user


class Login(graphene.Mutation):
   class Arguments:
      username = graphene.String(required=True)
      password = graphene.String(required=True)

   message = graphene.String()

   def mutate(self, info, username, password):
      request = info.context
      user = authenticate(username=username, password=password)
      current_user = info.context.user

      if user is None:
         message = "You provided wrong credentials!"

      elif current_user.is_authenticated:
         message = 'User is already authenticated!'

      else:
         message = 'Success!'
         login(request, user)

      return Login(message)


class Logout(graphene.Mutation):
   message = graphene.String()

   def mutate(self, info, input=None):
      request = info.context
      user = request.user

      if user.is_authenticated:
         message = 'Success!'
         logout(request)
      
      else:
         message = 'User is not authenticated!'

      return Logout(message)


class AuthMutation(graphene.ObjectType):
   register = Register.Field()
   login = Login.Field()
   logout = Logout.Field()

   # django-graphql-jwt
   token_auth = graphql_jwt.ObtainJSONWebToken.Field()
   verify_token = graphql_jwt.Verify.Field()
   refresh_token = graphql_jwt.Refresh.Field()
   delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
   delete_refresh_token_cookie = graphql_jwt.DeleteRefreshTokenCookie.Field() 

