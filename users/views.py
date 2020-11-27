from rest_framework.response import Response
from rest_framework import exceptions
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

from users.models import CustomUser
from users.rest_framework.serializers import UserSerializer
from django.views.decorators.csrf import ensure_csrf_cookie
from users.rest_framework.utils import generate_access_token, generate_refresh_token


@api_view(['GET'])
def profile(request):
    user = request.user
    serialized_user = UserSerializer(user).data
    return Response({'user': serialized_user })


@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    response = Response()

    if (username is None) or (password is None):
        raise exceptions.AuthenticationFailed('Username and password not provided')

    user = CustomUser.objects.filter(username=username).first()

    if (user is None):
        raise exceptions.AuthenticationFailed('Invalid username')

    if (not user.check_password(password)):
        raise exceptions.AuthenticationFailed('Invalid password')

    serialized_user = UserSerializer(user).data

    access_token = generate_access_token(user)
    refresh_token = generate_refresh_token(user)

    response.set_cookie(key='refreshtoken', value=refresh_token, httponly=True)
    response.data = {
        'access_token': access_token,
        'user': serialized_user,
    }

    return response
