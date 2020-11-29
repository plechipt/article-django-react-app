import { gql } from "@apollo/client";

// Query
export const POST_LIST_QUERY = gql`
    query {
        allPosts {
            user {
                username
            }
            title
            id
            posted
        }
    }
`

// Mutation
export const POST_FIND_MUTATION = gql`
    mutation ($id: ID!) {
        findPost (input: {id: $id}) {
            message
            post {
                user {
                    username
                    
                }
                title
                content
                totalLikes
                likes {
                    username
                }
                posted
                commentSet {
                    id
                    content
                    posted
                    user {
                        username
                        profile {
                            image
                        }
                    }
                    replySet {
                        id
                        content
                        posted
                        user {
                            username
                            profile {
                                image
                            }
                        }
                    }
                }
            }
        }
    }
`

export const POST_DELETE_MUTATION = gql`
    mutation postDelete ($id: ID!) {
        deletePost(input: {id: $id}) {
            post {
                title
            }
        }
    }
`

export const POST_EDIT_MUTATION = gql`
    mutation postEdit ($id: ID!, $title: String!, $content: String!) {
        editPost(input: {id: $id, title: $title, content: $content}) {
            post {
                content
            }
        }
    }
`

export const POST_CREATE_MUTATION = gql`
    mutation createPost ($title: String!, $content: String!, $user: String!) {
        addPost(input: {title: $title, content: $content, user: $user}) {
            message
            post {
                title
                content
                posted
            }
        }
    }
`

export const POST_LIKE_MUTATION = gql`
    mutation postLike ($id: ID!, $user: String!) {
        likePost (input: { id: $id, user: $user }) {
            post {
                title
                totalLikes
            }
        }
    }
`

export const POST_UNLIKE_MUTATION = gql`
    mutation unlikePost ($id: ID!, $user: String!) {
        unlikePost(input: {id: $id, user: $user}) {
            message
        }
    }
`

export const POST_FILTER_MUTATION = gql`
    mutation postFilter ($title: String!) {
        postFilter(input: {title: $title}) {
            filteredPosts {
                user {
                    username
                } 
                title
                id
                posted
            }
        }
    }
`

