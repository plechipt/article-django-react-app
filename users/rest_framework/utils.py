import jwt
import datetime
from django.conf import settings
from graphql_django.files.rest_framework import REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET


def generate_access_token(user):

    access_token_payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=15),
        'iat': datetime.datetime.utcnow(),
    }

    access_token = jwt.encode(access_token_payload,
        ACCESS_TOKEN_SECRET, algorithm='HS256').decode('utf-8')
                              
    return access_token


def generate_refresh_token(user):
    refresh_token_payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
        'iat': datetime.datetime.utcnow()
    }

    refresh_token = jwt.encode(
        refresh_token_payload, REFRESH_TOKEN_SECRET, algorithm='HS256').decode('utf-8')

    return refresh_token