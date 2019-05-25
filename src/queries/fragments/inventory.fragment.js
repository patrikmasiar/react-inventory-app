
import gql from 'graphql-tag';

export const inventoryFragment = gql`
  fragment inventoryData on Inventory {
    id
    description
    startDate
    endDate
    office {
    id
    name
    }
    officeRoom {
    id
    name
    tag
    }
    customer {
    id
    fullName
    }
    users {
    id
    fullName
    }
    isAvailable
    isClosed
  }
`;