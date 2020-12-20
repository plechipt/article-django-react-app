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
export const PROFILE_CREATE_MUTATION = gql`
  mutation($user: String!) {
    createUserProfile(user: $user) {
      profile {
        id
      }
    }
  }
`;

export const PROFILE_UPDATE_MUTATION = gql`
  mutation($newUser: String!, $newEmail: String!, $image: String!) {
    updateProfile(newUser: $newUser, newEmail: $newEmail, image: $image) {
      message
    }
  }
`;

export const PROFILE_FOLLOW_MUTATION = gql`
  mutation($following: String!) {
    followProfile(following: $following) {
      message
    }
  }
`;

export const PROFILE_UNFOLLOW_MUTATION = gql`
  mutation($following: String!) {
    unfollowProfile(following: $following) {
      message
    }
  }
`;
