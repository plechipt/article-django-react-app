import { gql } from "@apollo/client";

//Query
export const USER_LIST_QUERY = gql`
    query {
        allUsers {
            username
            email
        }
    }
`

export const USER_PROFILE_LIST_QUERY = gql`
    query {
        allProfiles {
            user {
                username
                email
            }
            id
            image
        }
    }
`

//Mutation
export const USER_REGISTER_MUTATION = gql`
    mutation registerUser ($email: String!, $username: String!, $password1: String!, $password2: String!) {
        register (email: $email, username: $username, password1: $password1, password2: $password2) {
            success
            errors
            token
        }
    }
`

export const USER_LOGIN_MUTATION = gql`
    mutation loginUser ($username: String!, $password: String!) {
        tokenAuth (username: $username, password: $password) {
            success
            errors
            token
        }   
    }
`

export const USER_REFRESH_TOKEN_MUTATION = gql`
    mutation verifyToken ($token: String!) {
        verifyToken(token: $token) {
            success
            errors
            payload 
        }
    }
`

export const USER_PROFILE_INFO_MUTATION = gql`
    mutation profileInfo ($user: String!) {
        profileInfo(input: {user: $user}) {
            profile {
                image
                totalFollowers
                followers {
                    username
                }
                user {
                    username
                    email
                }
            }
            message
        }
    }
`

export const USER_CHECK_PROFILE_MUTATION = gql`
    mutation checkUserProfile ($user: String!) {
        checkUserProfile(input: {user: $user}) {
            profile {
                id
            }
        }
    }
`

export const USER_UPDATE_MUTATION = gql`
    mutation profileUpdate ($user: String!, $newUser: String!, $newEmail: String!, $image: String!){
        profileUpdate(input: {user: $user, newUser: $newUser, newEmail: $newEmail, image: $image}) {
            message
        }
    }
`

export const USER_PROFILE_FOLLOW_MUTATION = gql`
    mutation profileFollow ($follower: String!, $following: String!) {
        profileFollow(input: {follower: $follower, following: $following}) {
            message
        }
    } 
`

export const USER_PROFILE_UNFOLLOW_MUTATION = gql`
    mutation profileUnfollow ($follower: String!, $following: String!) {
        profileUnfollow(input: {follower: $follower, following: $following}) {
            message
        }
    }
`