import gql from 'graphql-tag';

export const allOfficeRooms = gql`
  query AllOfficeRooms($filter: OfficeRoomFilter) {
    allOfficeRooms(filter: $filter) {
      id
      name
      tag
    }
  }
`;

export const createOfficeRoom = gql`
  mutation CreateOfficeRoom($name: String!, $tag: String!, $officeId: ID, $companyId: ID) {
    createOfficeRoom(name: $name, tag: $tag, officeId: $officeId, companyId: $companyId) {
      id
      name
      tag
    }
  }
`;

export const deleteOfficeRoom = gql`
  mutation DeleteOfficeRoom($id: ID!) {
    deleteOfficeRoom(id: $id) {
      id
    }
  }
`;

export const officeRoomInfo = gql`
  query OfficeRoom($id: ID) {
    OfficeRoom(id: $id) {
      id
      name
      tag
    }
  }
`;

export const updateOfficeRoom = gql`
  mutation UpdateOfficeRoom($id: ID!, $name: String, $tag: String) {
    updateOfficeRoom(id: $id, name: $name, tag: $tag) {
      id
      name
      tag
    }
  }
`;