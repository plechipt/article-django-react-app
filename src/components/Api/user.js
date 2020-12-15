import { gql } from "@apollo/client";

// Query
export const USER_ME_QUERY = gql`
  query {
    me {
      username
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
    $email: String!
    $username: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      email: $email
      username: $username
      password1: $password1
      password2: $password2
    ) {
      success
      errors
    }
  }
`;

export const USER_LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      payload
      success
      errors
    }
  }
`;

export const USER_DELETE_JWT_TOKENS_MUTATION = gql`
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
