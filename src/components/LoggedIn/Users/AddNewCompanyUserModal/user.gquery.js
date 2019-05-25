import gql from 'graphql-tag';

export const createUser = gql`
  mutation CreateUser($companyId: ID, $fullName: String!, $roleId: ID, $authProvider: AuthProviderSignupData!, $blocked: Boolean) {
    createUser(companyId: $companyId, fullName: $fullName, roleId: $roleId, authProvider: $authProvider, blocked: $blocked) {
      id
      fullName
      email
      blocked
      role {
        id
        role
      }
      company {
        id
        name
      }
    }
  }
`;