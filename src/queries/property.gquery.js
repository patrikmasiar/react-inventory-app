import gql from 'graphql-tag';

export const createProperty = gql`
  mutation CreateProperty($title: String, $count: Int, $customerId: ID, $inventoryId: ID) {
    createProperty(title: $title, count: $count, customerId: $customerId, inventoryId: $inventoryId) {
      id
    }
  }
`;