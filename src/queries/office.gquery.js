import gql from 'graphql-tag';

export const allCompanyOffices = gql`
  query AllOffices($filter: OfficeFilter, $first: Int) {
    allOffices(filter: $filter, first: $first) {
      id
      name
      address {
        id
        city
        street
      }
    }
  }
`;

export const officeInfo = gql`
  query Office($id: ID) {
    Office(id: $id) {
      id
      name
      address {
        id
        city
        street
        postCode
      }
    }
  }
`;

export const deleteOffice = gql`
  mutation DeleteOffice($id: ID!) {
    deleteOffice(id: $id) {
      id
    }
  }
`;

export const updateOffice = gql`
  mutation UpdateOffice($id: ID!, $name: String, $address: OfficeaddressAddress) {
    updateOffice(id: $id, name: $name, address: $address) {
      id
      name
      address {
        id
        city
        street
      }
    }
  }
`;