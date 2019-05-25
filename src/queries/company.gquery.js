import gql from 'graphql-tag';
import { companyFragment } from './fragments/company.fragment';

export const createCompany = gql`
  mutation CreateCompany($name: String!, $blocked: Boolean) {
    createCompany(name: $name, blocked: $blocked) {
      id
    }
  }
`;

export const company = gql`
  query Company($id: ID!) {
    Company(id: $id) {
      id
      name
      ico
      dic
      icdph
      address {
        id
        city
        postCode
        street
      }
    }
  }
`;

export const companyDataForImport = gql`
  query Company($id: ID!) {
    Company(id: $id) {
      id
      users {
        id
        email
      }
      offices {
        id
        name
      }
      officeRooms {
        id
        tag
      }
      customers {
        id
        fullName
      }
    }
  }
`;

export const updateCompany = gql`
  mutation UpdateCompany($id: ID!, $ico: String, $dic: String, $icdph: String, $name: String, $addressId: ID, $address: CompanyaddressAddress) {
    updateCompany(id: $id, name: $name, addressId: $addressId, ico: $ico, dic: $dic, icdph: $icdph, address: $address) {
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
  }
`;

export const createAddress = gql`
  mutation CreateAddress($companiesIds: [ID!], $city: String, $street: String, $postCode: String, $state: String) {
    createAddress(companiesIds: $companiesIds, city: $city, street: $street, postCode: $postCode, state: $state) {
      id
    }
  }
`;

export const updateAddress = gql`
  mutation UpdateAddress($id: ID!, $city: String, $postCode: String, $street: String) {
    updateAddress(id: $id, city: $city, postCode: $postCode, street: $street) {
      id
    }
  }
`;

export const allCompanies = gql`
  query AllCompanies {
    allCompanies {
      ...companyInfo
    }
  }
  ${companyFragment}
`;

export const updateCompanyBlockStatus = gql`
  mutation UpdateCompany($id: ID!, $blocked: Boolean) {
    updateCompany(id: $id, blocked: $blocked) {
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
  }
`;
