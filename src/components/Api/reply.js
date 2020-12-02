import { gql } from "@apollo/client";

export const REPLY_ADD_MUTATION = gql`
    mutation ($id: ID!, $user: String!, $content: String!) {
        replyComment(id: $id, user: $user, content: $content) {
           message 
        }
    }
`

export const REPLY_DELETE_MUTATION = gql`
    mutation ($id: ID!) {
        replyDelete(id: $id) {
            reply {
                content
            }
        }
    }
`