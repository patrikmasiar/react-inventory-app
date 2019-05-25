import React, { Component } from 'react';
import { TitleHeader } from '../../../components/ui';
import { connect } from 'react-redux';
import AddInventoryForm from '../../../components/LoggedIn/Inventories/AddNewInventoryForm';
import { createInventory, allCompanyInventories as inventoriesQuery } from 'queries';
import client from '../../../utils/apolloClient';
import AlertMessage from '../../../libs/AlertMessage';

class AddInventory extends Component {

  state = {
    submitLoading: false,
    description: '',
    startDate: '',
    endDate: '',
    selectedOffice: '',
    selectedUsers: [],
    selectedOfficeRoom: '',
    selectedCustomer: '',
    propertyTitle: '',
    propertyCount: '1',
  };

  handleDescriptionChange = (description) => {
    this.setState({ description });
  };

  handleStartDateChange = (startDate) => {
    this.setState({ startDate });
  };

  handleEndDateChange = (endDate) => {
    this.setState({ endDate });
  };

  handleSelectOffice = (selectedOffice) => {
    this.setState({ selectedOffice });
  };

  handleSelectOfficeRoom = (selectedOfficeRoom) => {
    this.setState({ selectedOfficeRoom });
  };

  handleSelectCustomer = (selectedCustomer) => {
    this.setState({ selectedCustomer });
  };

  handlePropertyTitleChange = (propertyTitle) => {
    this.setState({ propertyTitle });
  };

  handlePropertyCountChange = (propertyCount) => {
    this.setState({ propertyCount });
  };

  handleSelectUser = (userId) => {
    this.setState(prevState => {
      const selectedUsers = [...prevState.selectedUsers];

      if(selectedUsers.includes(userId)) {
        selectedUsers.splice(selectedUsers.indexOf(userId), 1);
      } else {
        selectedUsers.push(userId);
      }

      return {selectedUsers};
    });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { submitLoading, description, startDate, endDate, selectedCustomer, selectedOffice, selectedOfficeRoom, selectedUsers, propertyCount, propertyTitle } = this.state;

    try {
      if(submitLoading) {
        return false;
      }

      this.setState({ submitLoading: true });

      const response = await client.mutate({
        mutation: createInventory,
        variables: {
          description,
          startDate,
          endDate,
          isAvailable: false,
          isClosed: false,
          companyId: this.props.companyId,
          customerId: selectedCustomer,
          officeId: selectedOffice,
          officeRoomId: selectedOfficeRoom,
          usersIds: selectedUsers,
          property: {
            count: parseInt(propertyCount),
            title: propertyTitle,
            customerId: selectedCustomer
          }
        },
        refetchQueries: [{
          query: inventoriesQuery,
          variables: {filter: {company: { id: this.props.companyId }}}, 
        }]
      });

      if(response && response.data.createInventory.id) {
        this.setState({ submitLoading: false });
        window.location.href = '/Inventories';
        AlertMessage.showAlertMessage('Successfully added', 'success', 'top-right');
      }

    } catch(error) {
      console.log('Error add new inventory', error);
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      this.setState({ submitLoading: false});
    }
  };

  render() {
    const { submitLoading, description, startDate, endDate, selectedOffice, selectedUsers, selectedOfficeRoom, selectedCustomer, propertyTitle, propertyCount } = this.state;
    
    return (
      <div>
        <TitleHeader title={'Pridanie novej inventúry'} />
        <AddInventoryForm
          loading={submitLoading}
          companyId={this.props.companyId}
          description={description}
          onDescriptionChange={this.handleDescriptionChange}
          startDate={startDate}
          onStartDateChange={this.handleStartDateChange}
          endDate={endDate}
          onEndDateChange={this.handleEndDateChange}
          selectedOffice={selectedOffice}
          onSelectOffice={this.handleSelectOffice}
          selectedUsers={selectedUsers}
          onSelectUser={this.handleSelectUser}
          submitLoading={submitLoading}
          onSubmit={this.handleFormSubmit}
          onSelectOfficeRoom={this.handleSelectOfficeRoom}
          selectedOfficeRoom={selectedOfficeRoom}
          selectedCustomer={selectedCustomer}
          onSelectCustomer={this.handleSelectCustomer}
          propertyTitle={propertyTitle}
          propertyCount={propertyCount}
          onPropertyTitleChange={this.handlePropertyTitleChange}
          onPropertyCountChange={this.handlePropertyCountChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companyId: state.company.companyId,
});

export default connect(mapStateToProps)(AddInventory);