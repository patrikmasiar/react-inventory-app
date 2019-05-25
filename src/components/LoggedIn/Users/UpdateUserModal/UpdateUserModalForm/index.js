import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../../../../ui';
import client from '../../../../../utils/apolloClient';
import { userDetail as userQuery, updateUser, allCompanyUsers as companyUsersQuery } from 'queries';

class UpdateUserModalForm extends Component {
    
  state = {
    fullNameValue: '',
    userRoleValue: 1,
    submitLoading: false,
    loading: false,
  };

  componentDidMount() {
    this.loadUserData();
  }

  componentWillUnmount() {
    this.setState({ fullNameValue: '', submitLoading: false, loading: false });
  }

  loadUserData = async () => {
    try {
      this.setState({ loading: true });
      const response = await client.query({
        query: userQuery,
        variables: { id: this.props.userId }, 
      });

      if(response && response.data.User) {
        const userRole = response.data.User.role.id === "cjolmzc70k5bl01677yj9qfyu" ? 1 : 2; 
        this.setState({ fullNameValue: response.data.User.fullName, userRoleValue: userRole });
      }

      this.setState({ loading: false });

    } catch(error) {
      console.log('Error load user info data', error);
      this.setState({ loading: false });
    }
  };

  handleFullNameChange = (event) => {
    const { value: fullNameValue } = event.target;
    this.setState({ fullNameValue });
  };

  handleSelectChange = (event) => {
    const { value: userRoleValue } = event.target;
    this.setState({ userRoleValue });
  };

  handleSubmitForm = async (event) => {
    event.preventDefault();
    const { fullNameValue, submitLoading, userRoleValue } = this.state;

    try {
      if(submitLoading) {
        return false;
      }

      if(fullNameValue.length < 3) {
        alert('Zadajte svoje celé meno');
        return false;
      }

      this.setState({ submitLoading: true });
      const roleId = parseInt(userRoleValue) === 1 ? "cjolmzc70k5bl01677yj9qfyu" : "cjolmz8ymk41j018378yuqc9w";

      const response = await client.mutate({
        mutation: updateUser,
        variables: {
          id: this.props.userId,
          fullName: fullNameValue,
          roleId,
        },
        refetchQueries: [{
          query: companyUsersQuery,
          variables: {filter: {company: { id: this.props.companyId }}}, 
        }]
      });

      if(response && response.data.updateUser.id) {
        this.props.onUpdateUser(response.data.updateUser.id, response.data.updateUser);
        this.props.onCancelClick();
      }

    } catch(error) {
      console.log('Error add new company user', error);
      this.setState({ submitLoading: false });
    }

  };
    
  render() {
    const { fullNameValue, submitLoading, userRoleValue, loading } = this.state;
    const { onCancelClick } = this.props;
    const btnTitle = submitLoading ? 'Načítavam...' : 'Potvrdiť';

    if(loading) {
      return (
        <div style={{ position: 'relative', height: 150 }}>
          <Loader />
        </div>
      );
    }
    
    return (
      <form onSubmit={this.handleSubmitForm}>
        <fieldset disabled={submitLoading}>
            <div className="form-group">
              <select className="form-control" value={userRoleValue} onChange={this.handleSelectChange}>
                <option value={1}>Používateľ systému</option>
                <option value={2}>Správca systému</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" value={fullNameValue} onChange={this.handleFullNameChange} className="form-control" placeholder="Celé meno" required />
            </div>
        </fieldset>
        <div className="modal-form-footer-wrapper">
          <button disabled={submitLoading} onClick={onCancelClick} className="btn btn-sm btn-default" type="button">
            Zatvoriť
          </button>
          <button style={{ marginLeft: 'auto' }} disabled={submitLoading} className="btn btn-sm btn-primary" type="submit">
            {btnTitle}
          </button>
        </div>
      </form>
    );
  }
}

UpdateUserModalForm.propTypes = {
  userId: PropTypes.string.isRequired,
  companyId: PropTypes.string.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func,
};

export default UpdateUserModalForm;