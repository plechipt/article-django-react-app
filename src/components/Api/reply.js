import { gql } from "@apollo/client";

// Mutation
export const REPLY_ADD_MUTATION = gql`
  mutation($id: ID!, $content: String!) {
    replyComment(id: $id, content: $content) {
      message
    }
  }
`;

export const REPLY_DELETE_MUTATION = gql`
  mutation($id: ID!) {
    deleteReply(id: $id) {
      message
    }
  }
`;
