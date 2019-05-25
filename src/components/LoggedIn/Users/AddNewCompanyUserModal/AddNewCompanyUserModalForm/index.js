import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateEmail } from '../../../../../libs';
import { connect } from 'react-redux';
import { allCompanyUsers as companyUsersQuery } from 'queries';
import client from '../../../../../utils/apolloClient';
import { createUser } from '../user.gquery';

class AddNewCompanyUserModalForm extends Component {
    
  state = {
    fullNameValue: '',
    emailValue: '',
    passwordValue: '',
    passwordAgainValue: '',
    userRoleValue: 1,
    submitLoading: false,
  };

  handleFullNameChange = (event) => {
    const { value: fullNameValue } = event.target;
    this.setState({ fullNameValue });
  };

  handleEmailChange = (event) => {
    const { value: emailValue } = event.target;
    this.setState({ emailValue });
  };

  handlePasswordChange = (event) => {
    const { value: passwordValue } = event.target;
    this.setState({ passwordValue });
  };

  handlePasswordAgainChange = (event) => {
    const { value: passwordAgainValue } = event.target;
    this.setState({ passwordAgainValue });
  };

  handleSelectChange = (event) => {
    const { value: userRoleValue } = event.target;
    this.setState({ userRoleValue });
  };

  handleSubmitForm = async (event) => {
    event.preventDefault();
    const { fullNameValue, emailValue, passwordAgainValue, passwordValue, submitLoading, userRoleValue } = this.state;

    try {
      if(submitLoading) {
        return false;
      }

      if(fullNameValue.length < 3) {
        alert('Zadajte svoje celé meno');
        return false;
      }

      if(emailValue.length < 2) {
          alert('Zadajte e-mail');
          return false;
      }

      if(!validateEmail(emailValue)) {
        alert('Zadaný email nie je validný!')
        return false;
      }

      if(passwordValue.length < 7) {
        alert('Heslo musí mať aspoň 7 znakov');
        return false;
      }

      if(passwordValue !== passwordAgainValue) {
        alert('Zadané heslá sa nezhodujú!');
        return false;
      }

      this.setState({ submitLoading: true });
      const roleId = parseInt(userRoleValue) === 1 ? "cjolmzc70k5bl01677yj9qfyu" : "cjolmz8ymk41j018378yuqc9w";

      const response = await client.mutate({
        mutation: createUser,
        variables: {
          companyId: this.props.companyId,
          fullName: fullNameValue,
          roleId,
          authProvider: {
            email: {
              email: emailValue,
              password: passwordValue
            }
          },
          blocked: false,
        },
        refetchQueries: [{
          query: companyUsersQuery,
          variables: {filter: {company: { id: this.props.companyId }}}, 
        }]
      });

      if(response && response.data.createUser.id) {
        if (typeof this.props.onAddNewUser !== 'undefined') {
          this.props.onAddNewUser(response.data.createUser);
        }
        this.props.onCancelClick();
      }

    } catch(error) {
      console.log('Error add new company user', error);
      this.setState({ submitLoading: false });
    }

  };
    
  render() {
    const { fullNameValue, emailValue, passwordValue, passwordAgainValue, submitLoading, userRoleValue } = this.state;
    const { onCancelClick } = this.props;
    const btnTitle = submitLoading ? 'Načítavam...' : 'Potvrdiť';
    
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
            <div className="form-group">
              <input type="email" value={emailValue} onChange={this.handleEmailChange} className="form-control" placeholder="Prihlasovací e-mail" required />
            </div>
            <div className="form-group">
              <input type="password" value={passwordValue} onChange={this.handlePasswordChange} className="form-control" placeholder="Heslo" required />
            </div>
            <div className="form-group">
              <input type="password" value={passwordAgainValue} onChange={this.handlePasswordAgainChange} className="form-control" placeholder="Zopakovať heslo" required />
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

AddNewCompanyUserModalForm.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onAddNewUser: PropTypes.func,
};

const mapStateToProps = state => ({
  companyId: state.company.companyId,
});

export default connect(mapStateToProps)(AddNewCompanyUserModalForm);