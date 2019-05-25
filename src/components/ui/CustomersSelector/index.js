import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../../utils/apolloClient';
import { allCompanyCustomers as customersQuery } from 'queries';

class CustomersSelector extends Component {

  state = {
    loading: false,
    customersData: [],
  };

  componentDidMount() {
    this.loadCustomersData();
  }

  loadCustomersData = async () => {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: customersQuery,
        variables: {filter: {company: {id: this.props.companyId}}}, 
      });
  
      if(response && response.data.allCustomers) {
        this.setState({ customersData: response.data.allCustomers });
      }

      this.setState({loading: false});

    } catch(error) {
      console.log('error load customers data', error);
      this.setState({loading: false});
    }
  };

  handleSelectChange = (event) => {
    const { value: selectedCustomerId } = event.target;
    this.props.onSelectCustomer(selectedCustomerId);
  };

  render() {
    const {selectedCustomer} = this.props;
    const {customersData, loading} = this.state;

    if(loading) {
      return (
        <div className="form-group">
          <label>Vybrať užívateľa majetku</label>
          <input className="form-control" disabled value={"Načítavam..."} />
        </div>
      );
    }

    if(customersData.length === 0) {
      return (
        <div className="form-group">
          <label>Vybrať užívateľa majetku</label>
          <input className="form-control" disabled value={"Nenašiel sa žiadny užívateľ majetku"} />
        </div>
      );
    }

    return (
      <div className="form-group">
        <label>Vybrať užívateľa majetku</label>
        <select className="form-control" value={selectedCustomer} onChange={this.handleSelectChange}>
          <option value={''} disabled>Zvoľte užívateľa majetku zo zoznamu</option>
          {customersData.map(customer => {
            return (
              <option key={customer.id} value={customer.id}>{customer.fullName}</option>
            );
          })}
        </select>
      </div>
    );
  }
}

CustomersSelector.propTypes = {
  companyId: PropTypes.string.isRequired,
  selectedCustomer: PropTypes.string.isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
};
 
export { CustomersSelector };