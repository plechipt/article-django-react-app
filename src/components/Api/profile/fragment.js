import { gql } from "@apollo/client";

export const PROFILE_BASIC_ATTRIBUTES_FRAGMENT = gql`
  fragment ProfileAttributes on ProfileType {
    user {
      username
      email
    }
    id
    image
  }
`;
