import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TitleHeader, Loader } from '../../../components/ui';
import ActionHeaderPanel from '../../../components/LoggedIn/Customers/ActionHeaderPanel';
import AddNewCustomerModal from '../../../components/LoggedIn/Customers/AddNewCustomerModal';
import UpdateCustomerModal from '../../../components/LoggedIn/Customers/UpdateCustomerModal';
import CustomersList from '../../../components/LoggedIn/Customers/CustomersList';
import client from '../../../utils/apolloClient';
import { allCompanyCustomers as customersQuery, deleteCustomer } from 'queries';
import AlertMessage from '../../../libs/AlertMessage';

const removeDiacritics = require('diacritics').remove;

class Customers extends Component {

  state = {
    customersData: [],
    searchQuery: '',
    loading: false,
    isModalShown: false,
    isUpdateModalShown: false,
    selectedCustomer: '',
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
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      this.setState({loading: false});
    }
  };

  getCustomers() {
    const {searchQuery, customersData} = this.state;

    if(searchQuery.length === 0) {
      return customersData;
    }

    const query = removeDiacritics(searchQuery.toLowerCase());

    const filteredCustomers = customersData.filter(customer => {
      const customerName = removeDiacritics(customer.fullName.toLowerCase());
      return customerName.includes(query);
    });

    return filteredCustomers;
  }

  handleSearchInputChange = (event) => {
    const { value: searchQuery } = event.target;
    this.setState({ searchQuery });
  };

  handleShowModal = () => {
    this.setState({ isModalShown: true });
  };

  handleModalClose = () => {
    this.setState({ isModalShown: false });
  };

  handleUpdateModalShow = (customerId) => {
    this.setState({ isUpdateModalShown: true, selectedCustomer: customerId });
  };

  handleUpdateModalClose = () => {
    this.setState({ isUpdateModalShown: false, selectedCustomer: '' });
  };

  handleRemoveCustomer = async (customerId) => {
    try {

      if (window.confirm("Naozaj si želáte vymazať užívateľa majetku?")) { 
        const response = await client.mutate({
          mutation: deleteCustomer,
          variables: { id: customerId },
          refetchQueries: [{
            query: customersQuery,
            variables: {filter: {company: { id: this.props.companyId }}}, 
          }]
        });

        if(response && response.data.deleteCustomer.id) {
          this.setState(prevState => {
            const customersData = [...prevState.customersData];
            const customerIndex = customersData.findIndex(customer => customer.id === response.data.deleteCustomer.id);

            if (customerIndex !== -1) {
              customersData.splice(customerIndex, 1);
            }
            return {customersData};
          });
          AlertMessage.showAlertMessage('Successfully removed', 'success', 'top-right');
        }
      }

    } catch(error) {
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      console.log('Error remove customer from list', error);
    }
  };

  handleAddNewCustomer = (customer) => {
    this.setState(prevState => {
      const customersData = [...prevState.customersData];

      customersData.push(customer);

      return {customersData};
    });
    AlertMessage.showAlertMessage('Successfully added', 'success', 'top-right');
  };

  handleUpdateCustomer = (customerId, customer) => {
    this.setState(prevState => {
      const customersData = [...prevState.customersData];
      const customerIndex = customersData.findIndex(customer => customer.id === customerId);

      if (customerIndex !== -1) {
        customersData[customerIndex] = customer;
      }

      return {customersData};
    });
    AlertMessage.showAlertMessage('Successfully edited', 'success', 'top-right');
  };

  render() {
    const { loading, searchQuery, isModalShown, isUpdateModalShown, selectedCustomer } = this.state;

    if(loading) {
      return (
        <Loader />
      );
    }

    return (
      <div>
        <TitleHeader title={'Užívatelia majetku'} />
        <ActionHeaderPanel
          searchInputValue={searchQuery}
          onSearchInputChange={this.handleSearchInputChange}
          onAddNewCustomerClick={this.handleShowModal}
        />
        <CustomersList
          data={this.getCustomers()}
          onRemoveClick={this.handleRemoveCustomer}
          onEditClick={this.handleUpdateModalShow}
        />
        <AddNewCustomerModal
          isModalShown={isModalShown}
          onModalClose={this.handleModalClose}
          onAddCustomer={this.handleAddNewCustomer}
        />
        <UpdateCustomerModal
          isModalShown={isUpdateModalShown}
          onModalClose={this.handleUpdateModalClose}
          onUpdateCustomer={this.handleUpdateCustomer}
          companyId={this.props.companyId}
          customerId={selectedCustomer}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companyId: state.company.companyId,
});

export default connect(mapStateToProps)(Customers);