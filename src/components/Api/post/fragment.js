import { gql } from "@apollo/client";

export const POST_BASIC_ATTRIBUTES_FRAGMENT = gql`
  fragment PostAttributes on PostType {
    user {
      username
    }
    id
    title
    content
    posted
  }
`;
