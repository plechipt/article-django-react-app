import { gql } from "@apollo/client";
import { POST_BASIC_ATTRIBUTES_FRAGMENT } from "./fragment";

// Query
export const POST_LIST_QUERY = gql`
  query {
    allPosts {
      ...PostAttributes
    }
  }
  ${POST_BASIC_ATTRIBUTES_FRAGMENT}
`;

//Need to fix this shit with fragments
export const POST_FIND_QUERY = gql`
  query($id: ID!) {
    findPost(id: $id) {
      ...PostAttributes
      totalLikes
      likes {
        username
      }
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
  ${POST_BASIC_ATTRIBUTES_FRAGMENT}
`;

export const POST_FILTER_QUERY = gql`
  query($title: String!) {
    filterPost(title: $title) {
      ...PostAttributes
    }
  }
  ${POST_BASIC_ATTRIBUTES_FRAGMENT}
`;

// Mutation
export const POST_CREATE_MUTATION = gql`
  mutation($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      message
    }
  }
`;

export const POST_EDIT_MUTATION = gql`
  mutation($id: ID!, $title: String!, $content: String!) {
    editPost(id: $id, title: $title, content: $content) {
      message
    }
  }
`;

export const POST_DELETE_MUTATION = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      message
    }
  }
`;

export const POST_LIKE_MUTATION = gql`
  mutation($id: ID!) {
    likePost(id: $id) {
      message
    }
  }
`;

export const POST_UNLIKE_MUTATION = gql`
  mutation($id: ID!) {
    unlikePost(id: $id) {
      message
    }
  }
`;
