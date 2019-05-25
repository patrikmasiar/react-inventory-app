import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCustomer, allCompanyCustomers as customersQuery } from 'queries';
import client from '../../../../../utils/apolloClient';

class AddNewCustomerModalForm extends Component {
  
  state = {
    fullNameValue: '',
    submitLoading: false,
  };

  handleFullNameChange = (event) => {
    const { value: fullNameValue } = event.target;
    this.setState({ fullNameValue });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { submitLoading, fullNameValue } = this.state;

    try {
      if (submitLoading) {
        return false;
      }

      this.setState({ submitLoading: true });

      const response = await client.mutate({
        mutation: createCustomer,
        variables: {
          fullName: fullNameValue,
          companyId: this.props.companyId,
        },
        refetchQueries: [{
          query: customersQuery,
          variables: {filter: {company: { id: this.props.companyId }}}, 
        }]
      });

      if(response && response.data.createCustomer.id) {
        this.props.onAddCustomer(response.data.createCustomer);
        this.props.onCancelClick();
      }
      
    } catch(error) {
      console.log('Error add new company customer', error);
      this.setState({ submitLoading: false });
    }
  };
  
  render() {
    const { onCancelClick } = this.props;
    const { submitLoading, fullNameValue } = this.state;
    const btnTitle = submitLoading ? 'Načítavam...' : 'Potvrdiť';

    return (
      <form onSubmit={this.handleFormSubmit}>
        <fieldset disabled={submitLoading}>
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

AddNewCustomerModalForm.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onAddCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  companyId: state.company.companyId,
});

export default connect(mapStateToProps)(AddNewCustomerModalForm);