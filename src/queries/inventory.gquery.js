import gql from 'graphql-tag';
import { inventoryFragment } from './fragments/inventory.fragment';

export const inventoryDetail = gql`
  query Inventory($id: ID) {
    Inventory(id: $id) {
      id
      description
      startDate
      endDate
      isAvailable
      isClosed
      office {
        id
        name
        address {
          id
          city
          street
          postCode
        }
      }
      officeRoom {
        id
        name
        tag
      }
      property {
        id
        title
        count
      }
      customer {
        id
        fullName
      }
      users {
        id
        fullName
        email
      }
    }
  }
`;

export const allCompanyInventories = gql`
  query AllInventories($filter: InventoryFilter, $first: Int) {
    allInventories(filter: $filter, first: $first) {
      ...inventoryData
    }
  }
  ${inventoryFragment}
`;

export const createInventory = gql`
  mutation CreateInventory($description: String!, $startDate: DateTime!, $endDate: DateTime!, $isAvailable: Boolean, $isClosed: Boolean, $companyId: ID, $customerId: ID, $officeId: ID, $officeRoomId: ID, $usersIds: [ID!], $property: InventorypropertyProperty) {
    createInventory(description: $description, startDate: $startDate, endDate: $endDate, isAvailable: $isAvailable, isClosed: $isClosed, companyId: $companyId, customerId: $customerId, officeId: $officeId, officeRoomId: $officeRoomId, usersIds: $usersIds, property: $property) {
      id
    }
  }
`;

export const updateInventoryGeneralData = gql`
mutation UpdateInventory($id: ID!, $description: String!, $startDate: DateTime!, $endDate: DateTime!, $customerId: ID, $officeId: ID, $officeRoomId: ID, $usersIds: [ID!], $property: InventorypropertyProperty) {
    updateInventory(id: $id, description: $description, startDate: $startDate, endDate: $endDate, customerId: $customerId, officeId: $officeId, officeRoomId: $officeRoomId, usersIds: $usersIds, property: $property) {
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
  }
`;

export const updateInventoryAvailable = gql`
  mutation UpdateInventory($id: ID!, $isAvailable: Boolean) {
    updateInventory(id: $id, isAvailable: $isAvailable) {
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
  }
`;

export const updateInventoryClosed = gql`
  mutation UpdateInventory($id: ID!, $isClosed: Boolean) {
    updateInventory(id: $id, isClosed: $isClosed) {
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
  }
`;

export const deleteInventory = gql`
  mutation DeleteInventory($id: ID!) {
    deleteInventory(id: $id) {
      id
    }
  }
`;

export const userInventories = gql`
  query AllInventories($filter: InventoryFilter, $first: Int) {
    allInventories(filter: $filter, first: $first) {
      ...inventoryData
    }
  }
  ${inventoryFragment}
`;