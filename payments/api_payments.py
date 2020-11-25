import os
import stripe
import graphene
from graphql_jwt.decorators import login_required

from graphql_auth import mutations
from graphene_django.types import DjangoObjectType
from graphene_django.settings import *


#get both stripe keys from environment variables
STRIPE_TEST_SECRET_KEY = os.environ.get('STRIPE_TEST_SECRET_KEY') 
STRIPE_LIVE_SECRET_KEY = os.environ.get('STRIPE_LIVE_SECRET_KEY') 

def return_urls():
    local_base_url = 'http://127.0.0.1:8000'
    heroku_base_url = 'https://article-django-react-app.herokuapp.com'

    #if DEBUG is on True -> return local urls, otherwise return urls on heroku
    if settings.DEBUG == True:
        return [f'{local_base_url}/support-success', f'{local_base_url}/support']
    
    else:
        return [f'{heroku_base_url}/support-success', f'{heroku_base_url}/support']


class CreateCheckoutSession(graphene.Mutation):
    session = graphene.JSONString()

    @staticmethod
    @login_required
    def mutate(root, info, input=None):
        stripe.api_key = STRIPE_LIVE_SECRET_KEY

        #get urls
        urls = return_urls()

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': 'price_1Hn5ncFJBInLPu362CpNESpw',
                'quantity': 1,
            }],
            mode='payment',
            success_url=urls[0],
            cancel_url=urls[1],
        )

        return CreateCheckoutSession(session=session)