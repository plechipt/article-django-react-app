import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Container, Header, Button } from 'semantic-ui-react'

import './Support.css'

const STRIPE_PUBLIC_KEY = 'pk_test_51HmaY7FJBInLPu36NfIu5fFdctsFQ3QOjUanAwK9HcXDCimTLT6AjfDC7CbKEwTjP1T4iMO4PF50hHHyz5vzqXHE00YimLS7KJ'
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const Support = () => {
    return (
        <div className="support-container">
            <Container className="">
                <Header className="support-header">Support Us</Header>
                <p className="text-muted support-text">For buying coffee for only 5$</p>
                <Button className="support-button" size="large" primary>Support</Button>
            </Container>
        </div>
    )
}

export default Support
