
import gql from 'graphql-tag';

export const companyFragment = gql`
  fragment companyInfo on Company {
    id
    name
    ico
    dic
    icdph
    blocked
    address {
      id
      city
      street
      postCode
    }
    offices {
      id
      name
      address {
      id
        city
        street
        postCode
      }
    }
    users {
      id
      fullName
    }
  }
`;