import { gql } from "@apollo/client";

// Query
export const MESSAGE_LIST_QUERY = gql`
  query($chatUser: String!) {
    chatRoomMessages(chatUser: $chatUser) {
      user {
        username
      }
      id
      content
      messaged
    }
  }
`;

// Mutation
export const MESSAGE_CREATE_MUTATION = gql`
  mutation($chatUser: String!, $content: String!) {
    createMessage(chatUser: $chatUser, content: $content) {
      message
    }
  }
`;
export const MESSAGE_CREATE_CHATROOM_MUTATION = gql`
  mutation($chatUser: String!) {
    createChatRoom(chatUser: $chatUser) {
      message
    }
  }
`;

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
