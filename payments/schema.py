from .mutations.payments import CreateCheckoutSession

class PaymentMutation:
    create_checkout_session = CreateCheckoutSession.Field()