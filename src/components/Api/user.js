import { gql } from "@apollo/client";

// Query
export const USER_ME_QUERY = gql`
  query {
    me {
      username
      isStaff
    }
  }
`;

export const USER_LIST_QUERY = gql`
  query {
    allUsers {
      username
      email
    }
  }
`;

// Mutation
export const USER_REGISTER_MUTATION = gql`
  mutation(
    $username: String!
    $email: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      input: {
        username: $username
        email: $email
        password1: $password1
        password2: $password2
      }
    ) {
      user {
        username
      }
      errors {
        messages
      }
    }
  }
`;

export const USER_LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      payload
    }
  }
`;

export const USER_DELETE_TOKENS_MUTATION = gql`
  mutation {
    deleteTokenCookie {
      deleted
    }

    deleteRefreshTokenCookie {
      deleted
    }
  }
`;

export const USER_REFRESH_TOKEN_SILENTLY_MUTATION = gql`
  mutation {
    refreshToken {
      payload
      success
      errors
    }
  }
`;

export const USER_VERIFY_TOKEN_MUTATION = gql`
  mutation($token: String!) {
    verifyToken(token: $token) {
      success
      errors
    }
  }
`;
