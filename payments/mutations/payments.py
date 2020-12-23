import os

import graphene
import stripe
from graphene_django.settings import *
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required

# Get both stripe keys from environment variables
STRIPE_TEST_SECRET_KEY = os.environ.get('STRIPE_TEST_SECRET_KEY') 
STRIPE_LIVE_SECRET_KEY = os.environ.get('STRIPE_LIVE_SECRET_KEY') 
TEST_PRODUCT_PRICE = 'price_1I1VSYFJBInLPu36ADPik2IN'
LIVE_PRODUCT_PRICE = 'price_1Hn5ncFJBInLPu362CpNESpw'

def return_urls():
    local_base_url = 'http://127.0.0.1:8000'
    heroku_base_url = 'https://article-django-react-app.herokuapp.com'

    # If DEBUG is on True -> return local urls, otherwise return urls on heroku
    if settings.DEBUG == True:
        return [f'{local_base_url}/support-success', f'{local_base_url}/support']
    
    else:
        return [f'{heroku_base_url}/support-success', f'{heroku_base_url}/support']


class CreateCheckoutSession(graphene.Mutation):
    session = graphene.JSONString()

    @staticmethod
    def mutate(root, info, input=None):
        stripe.api_key = STRIPE_LIVE_SECRET_KEY

        # Get urls
        urls = return_urls()

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': LIVE_PRODUCT_PRICE,
                'quantity': 1,
            }],
            mode='payment',
            success_url=urls[0],
            cancel_url=urls[1],
        )

        return CreateCheckoutSession(session=session)

