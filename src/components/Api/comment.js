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
<<<<<<< HEAD
        commentPost (input: { id: $id, user: $user, content: $content}) {
           message 
=======
        commentPost (input: {id: $id, user: $user, content: $content}) {
            message
>>>>>>> d5ee8d03c564c196f30aa616b1eab59660ded1ff
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