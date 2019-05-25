import gql from 'graphql-tag';

export const createAddress = gql`
  mutation CreateAddress($city: String, $street: String, $postCode: String, $state: String) {
    createAddress(city: $city, street: $street, postCode: $postCode, state: $state) {
      id
    }
  }
`;

export const createOffice = gql`
  mutation CreateOffice($name: String!, $addressId: ID, $companyId: ID) {
    createOffice(name: $name, addressId: $addressId, companyId: $companyId) {
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