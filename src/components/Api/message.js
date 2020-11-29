import { gql } from "@apollo/client";

// Query


// Mutation
export const MESSAGE_LIST_MUTATION = gql`
    mutation queryUserMessages ($user: String!, $chatUser: String!) {
        queryUserMessages(input: {user: $user, chatUser: $chatUser}) {
            message
            messages {
                id
                content
                messaged
                user {
                    username
                }
            }
        }
    }
`

export const MESSAGE_CREATE_MUTATION = gql`
    mutation messageCreate ($user: String!, $chatUser: String!, $content: String!) {
        messageCreate (input: {user: $user, chatUser: $chatUser, content: $content}) {
            message
        }
    }
`

/*/Subscription
export const MESSAGE_SUBSCRIPTION = gql`
    subscription onMessageAdded ($id: ID!) {
        onMessageAdded(input: {id: $id}) {
            message {
            }
        }
    }
`
*/