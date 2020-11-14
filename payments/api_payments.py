import os
import stripe
import graphene

from graphql_auth import mutations
from graphene_django.types import DjangoObjectType
from graphene_django.settings import *


def return_urls():
    local_base_url = 'http://localhost:3000'
    heroku_base_url = 'https://article-django-react-app.herokuapp.com'

    #if debug is on True -> return local urls, otherwise return urls on heroku
    if settings.DEBUG == True:
        return [f'{local_base_url}/support-success', f'{local_base_url}/support']
    
    else:
        return [f'{heroku_base_url}/support-success', f'{heroku_base_url}/support']


class CheckoutSession(graphene.Mutation):

    message = graphene.String()

    @staticmethod
    def mutate(root, info, input=None):
        message = ''
        stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

        #get urls
        urls = return_urls()

        session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price': 'price_1Hn5ncFJBInLPu362CpNESpw',
            'quantity': 1,
            'price_data': {
                'currency': 'usd',
            },
        }],
        mode='payment',
        success_url=urls[0],
        cancel_url=urls[1],
  )

        return CheckoutSession(message=message)