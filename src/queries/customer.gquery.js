import gql from 'graphql-tag';

export const allCompanyCustomers = gql`
  query AllCustomers($filter: CustomerFilter) {
    allCustomers(filter: $filter) {
      id
      fullName
    }
  }
`;

export const createCustomer = gql`
  mutation CreateCustomer($fullName: String!, $companyId: ID) {
    createCustomer(fullName: $fullName, companyId: $companyId) {
      id
      fullName
    }
  }
`;

export const deleteCustomer = gql`
  mutation DeleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      id
    }
  }
`;

export const customerInfo = gql`
  query Customer($id: ID!) {
    Customer(id: $id) {
      id
      fullName
    }
  }
`;

export const updateCustomer = gql`
  mutation UpdateCustomer($id: ID!, $fullName: String) {
    updateCustomer(id: $id, fullName: $fullName) {
      id
      fullName
    }
  }
`;

