import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Container, Header, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { CHECKOUT_SESSION_MUTATION } from '../../Api/payment'

import './Support.css'

const STRIPE_PUBLIC_KEY = 'pk_test_51HmaY7FJBInLPu36NfIu5fFdctsFQ3QOjUanAwK9HcXDCimTLT6AjfDC7CbKEwTjP1T4iMO4PF50hHHyz5vzqXHE00YimLS7KJ'
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

const Support = () => {
    const history = useHistory()
    const [ createCheckoutSession, { data } ] = useMutation(CHECKOUT_SESSION_MUTATION);

    const handleOnClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await createCheckoutSession()

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
     
    return (
        <div className="support-container">
            <Container className="container">
                <Header className="support-header">Support Us</Header>
                <p className="text-muted support-text">By buying coffee for only 5$</p>
                <Button onClick={handleOnClick} className="support-button" role="link" size="big" primary>Support</Button>
            </Container>
        </div>
    )
}

export default Support
