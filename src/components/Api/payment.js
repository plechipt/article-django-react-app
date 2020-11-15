import { gql } from "@apollo/client";

export const CHECKOUT_SESSION_MUTATION = gql`
    mutation {
        checkoutSession {
            session
        }
    }
`