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
`;

//Need to fix this shit with fragments
export const POST_FIND_QUERY = gql`
  query($id: ID!) {
    findPost(id: $id) {
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
`;

export const POST_FILTER_QUERY = gql`
  query($title: String!) {
    filterPost(title: $title) {
      user {
        username
      }
      id
      title
      posted
    }
  }
`;

// Mutation
export const POST_DELETE_MUTATION = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
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

export const POST_CREATE_MUTATION = gql`
  mutation($title: String!, $content: String!, $user: String!) {
    createPost(title: $title, content: $content, user: $user) {
      message
    }
  }
`;

export const POST_LIKE_MUTATION = gql`
  mutation($id: ID!, $user: String!) {
    likePost(id: $id, user: $user) {
      message
    }
  }
`;

export const POST_UNLIKE_MUTATION = gql`
  mutation($id: ID!, $user: String!) {
    unlikePost(id: $id, user: $user) {
      message
    }
  }
`;
