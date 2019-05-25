import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../../../../ui';
import { customerInfo, updateCustomer, allCompanyCustomers as customersQuery } from 'queries';
import client from '../../../../../utils/apolloClient';

class UpdateCustomerModalForm extends Component {
  
  state = {
    loading: false,
    fullNameValue: '',
    submitLoading: false,
  };

  componentDidMount() {
    this.loadCustomer();
  }

  loadCustomer = async () => {
    try {
      this.setState({ loading: true });
      const response = await client.query({
        query: customerInfo,
        variables: { id: this.props.customerId }, 
      });

      if(response && response.data.Customer) {
        this.setState({ fullNameValue: response.data.Customer.fullName });
      }

      this.setState({ loading: false });

    } catch(error) {
      console.log('Error load customer info data', error);
      this.setState({ loading: false });
    }
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
        mutation: updateCustomer,
        variables: {
          id: this.props.customerId,
          fullName: fullNameValue,
        },
        refetchQueries: [{
          query: customersQuery,
          variables: {filter: {company: { id: this.props.companyId }}}, 
        }]
      });

      if(response && response.data.updateCustomer.id) {
        this.props.onUpdateCustomer(response.data.updateCustomer.id, response.data.updateCustomer);
        this.props.onCancelClick();
      }
      
    } catch(error) {
      console.log('Error update company customer', error);
      this.setState({ submitLoading: false });
    }
  };
  
  render() {
    const { onCancelClick } = this.props;
    const { submitLoading, fullNameValue, loading } = this.state;
    const btnTitle = submitLoading ? 'Načítavam...' : 'Potvrdiť';

    if(loading) {
      return (
        <div style={{ position: 'relative', height: 100 }}>
          <Loader />
        </div>
      );
    }

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

UpdateCustomerModalForm.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onUpdateCustomer: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
  customerId: PropTypes.string.isRequired,
};

export default UpdateCustomerModalForm;