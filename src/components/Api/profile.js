import { gql } from "@apollo/client";

// Query
export const PROFILE_LIST_QUERY = gql`
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
`;

export const PROFILE_GET_INFO_QUERY = gql`
  query($user: String!) {
    getProfileInfo(user: $user) {
      user {
        username
        email
      }
      followers {
        username
      }
      image
      totalFollowers
    }
  }
`;

// Mutation
export const PROFILE_CHECK_USER_MUTATION = gql`
  mutation($user: String!) {
    checkUserProfile(user: $user) {
      message
    }
  }
`;

export const PROFILE_UPDATE_MUTATION = gql`
  mutation(
    $user: String!
    $newUser: String!
    $newEmail: String!
    $image: String!
  ) {
    updateProfile(
      user: $user
      newUser: $newUser
      newEmail: $newEmail
      image: $image
    ) {
      message
    }
  }
`;

export const PROFILE_FOLLOW_MUTATION = gql`
  mutation($follower: String!, $following: String!) {
    followProfile(follower: $follower, following: $following) {
      message
    }
  }
`;

export const PROFILE_UNFOLLOW_MUTATION = gql`
  mutation($follower: String!, $following: String!) {
    unfollowProfile(follower: $follower, following: $following) {
      message
    }
  }
`;
