import { gql } from "@apollo/client";

//Query 
export const COMMENT_LIST_QUERY = gql`
    query {
        allComments {
            id
            content
            posted
            user {
                username
            }
        }
    }
`

//Mutation
export const COMMENT_ADD_MUTATION = gql`
    mutation postComment ($id: ID!, $user: String!, $content: String!) {
        commentPost (input: { id: $id, user: $user, content: $content}) {
            comment {
                content
            }
        }
    }
`

export const COMMENT_DELETE_MUTATION = gql`
    mutation commentDelete ($id: ID!) {
        commentDelete(input: {id: $id}) {
            comment {
                content
            }
        }
    }
`