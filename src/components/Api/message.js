import { gql } from "@apollo/client";

// Query
export const MESSAGE_LIST_QUERY = gql`
    query ($user: String!, $chatUser: String!) {
        chatRoomMessages (user: $user, chatUser: $chatUser) {
            chatroomSet {
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
    }
`
// Mutation
export const MESSAGE_CREATE_MUTATION = gql`
    mutation ($user: String!, $chatUser: String!, $content: String!) {
        messageCreate (user: $user, chatUser: $chatUser, content: $content) {
            message
        }
    }
`
export const MESSAGE_CREATE_CHATROOM_MUTATION = gql`
    mutation ($user: String!, $chatUser: String!) {
        createChatRoom (user: $user, chatUser: $chatUser) {
            chatRoom {
                id
            }
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