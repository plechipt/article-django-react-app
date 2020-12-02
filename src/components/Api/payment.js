import { gql } from "@apollo/client";

// Mutation
export const CREATE_CHECKOUT_SESSION_MUTATION = gql`
    mutation {
        createCheckoutSession {
            session
        }
    }
`