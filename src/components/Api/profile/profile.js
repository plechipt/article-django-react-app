import { gql } from "@apollo/client";
import { PROFILE_BASIC_ATTRIBUTES_FRAGMENT } from "./fragment";

// Query
export const PROFILE_LIST_QUERY = gql`
  query {
    allProfiles {
      ...ProfileAttributes
    }
  }
  ${PROFILE_BASIC_ATTRIBUTES_FRAGMENT}
`;

export const PROFILE_GET_INFO_QUERY = gql`
  query($user: String!) {
    getProfileInfo(user: $user) {
      ...ProfileAttributes
      followers {
        username
      }
      totalFollowers
    }
  }
  ${PROFILE_BASIC_ATTRIBUTES_FRAGMENT}
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
