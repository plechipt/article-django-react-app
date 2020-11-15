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
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'Django Coffee',
                    },
                    'unit_amount': 2000,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=urls[0],
            cancel_url=urls[1],
        )

        message = 'Success'
        return CheckoutSession(message=message)