import { gql } from "@apollo/client";

export const REPLY_ADD_MUTATION = gql`
    mutation replyComment ($id: ID!, $user: String!, $content: String!) {
        replyComment(input: {id: $id, user: $user, content: $content}) {
            reply {
                content
            }
        }
    }
`

export const REPLY_DELETE_MUTATION = gql`
    mutation replyDelete ($id: ID!) {
        replyDelete(input: {id: $id}) {
            reply {
                content
            }
        }
    }
`