import gql from 'graphql-tag';

export const userDetail = gql`
  query User($id: ID) {
    User(id: $id) {
      id
      fullName
      email
      role {
        id
        role
      }
      password
    }
  }
`;

export const signinUser = gql`
  mutation SigninUser($email: AUTH_PROVIDER_EMAIL!) {
    signinUser(email: $email) {
      token
      user {
        id
        fullName
        role {
          id
          role
        }
        company {
          id
          name
          address {
              id
          }
          blocked
        }
        blocked
      }
    }
  }
`;

export const createUser = gql`
  mutation CreateUser($company: UsercompanyCompany, $fullName: String!, $roleId: ID, $authProvider: AuthProviderSignupData!, $blocked: Boolean) {
    createUser(company: $company, fullName: $fullName, roleId: $roleId, authProvider: $authProvider, blocked: $blocked) {
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

export const allCompanyUsers = gql`
  query AllUsers($filter: UserFilter, $first: Int) {
    allUsers(filter: $filter, first: $first) {
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

export const deleteUser = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const updateUser = gql`
  mutation UpdateUser($id: ID!, $fullName: String, $roleId: ID, $blocked: Boolean) {
    updateUser(id: $id, fullName: $fullName, roleId: $roleId, blocked: $blocked) {
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

export const updateBlockUserStatus = gql`
  mutation UpdateUser($id: ID!, $blocked: Boolean) {
    updateUser(id: $id, blocked: $blocked) {
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