import { gql } from '@apollo/client';

// query to get user's information when viewing their profile / savedBooks page
export const GET_ME = gql`
{
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        title
        authors
        description
        link
        image
        bookId
      }
    }
  }
`;
