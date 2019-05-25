import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inventoryDetail as inventoryQuery, updateInventoryGeneralData, allCompanyInventories as inventoriesQuery } from 'queries';
import client from '../../../../../utils/apolloClient';
import { OfficesSelector, UsersMultiSelector, OfficeRoomSelector, CustomersSelector, Loader } from '../../../../ui';
import moment from 'moment';
import { connect } from 'react-redux';

class UpdateInventoryModalForm extends Component {
  
  state = {
    loading: false,
    submitLoading: false,
    description: '',
    startDate: '',
    endDate: '',
    propertyTitle: '',
    propertyCount: '',
    selectedOffice: '',
    selectedUsers: [],
    selectedOfficeRoom: '',
    selectedCustomer: '',
  };

  componentDidMount() {
    this.loadInvenotoryData();
  }

  loadInvenotoryData = async () => {
    try {

      this.setState({loading: true});
      const response = await client.query({
        query: inventoryQuery,
        variables: { id: this.props.inventoryId }, 
      });

      if(response && response.data.Inventory) {
        this.setState({
          description: response.data.Inventory.description,
          startDate: moment(response.data.Inventory.startDate).format('YYYY-MM-DD'),
          endDate: moment(response.data.Inventory.endDate).format('YYYY-MM-DD'),
          propertyTitle: response.data.Inventory.property.title,
          propertyCount: response.data.Inventory.property.count,
          selectedOffice: !!response.data.Inventory.office ? response.data.Inventory.office.id : '',
          selectedCustomer: !!response.data.Inventory.customer ? response.data.Inventory.customer.id : '',
          selectedOfficeRoom: !!response.data.Inventory.officeRoom ? response.data.Inventory.officeRoom.id : '',
          selectedUsers: !!response.data.Inventory.users ? response.data.Inventory.users.map(user => user.id) : [],
        });
      }

      this.setState({loading: false});

    } catch(error) {
      console.log('Error load inventory detail data in update inventory form', error);
      this.setState({
        loading: false,
      });
    }
  };

  handleDescriptionChange = (event) => {
    const { value: description } = event.target;
    this.setState({ description });
  };

  handleStartDateChange = (event) => {
    const { value: startDate } = event.target;
    this.setState({ startDate });
  };

  handleEndDateChange = (event) => {
    const { value: endDate } = event.target;
    this.setState({ endDate });
  };

  handlePropertyTitleChange = (event) => {
    const { value: propertyTitle } = event.target;
    this.setState({ propertyTitle });
  };

  handlePropertyCountChange = (event) => {
    const { value: propertyCount } = event.target;
    this.setState({ propertyCount });
  };

  handleSubmitForm = async (event) => {
    event.preventDefault();
    const { submitLoading, description, startDate, endDate, propertyCount, propertyTitle, selectedCustomer, selectedOffice, selectedOfficeRoom, selectedUsers } = this.state;

    try {
      if(submitLoading) {
        return false;
      }

      this.setState({ submitLoading: true });

      const response = await client.mutate({
        mutation: updateInventoryGeneralData,
        variables: {
          id: this.props.inventoryId,
          description,
          startDate,
          endDate,
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

      if(response && response.data.updateInventory.id) {
        this.setState({ submitLoading: false });
        this.props.onUpdateInventory(response.data.updateInventory, response.data.updateInventory.id);
        this.props.onCancelClick();
      }

    } catch(error) {
      console.log('Error add new inventory', error);
      this.setState({ submitLoading: false });
    }
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

  handleSelectOffice = (selectedOffice) => {
    this.setState({ selectedOffice });
  };

  handleSelectOfficeRoom = (selectedOfficeRoom) => {
    this.setState({ selectedOfficeRoom });
  };

  handleSelectCustomer = (selectedCustomer) => {
    this.setState({ selectedCustomer });
  };

  render() {
    const { onCancelClick } = this.props;
    const { submitLoading, description, startDate, endDate, propertyCount, propertyTitle, loading, selectedCustomer, selectedOffice, selectedOfficeRoom, selectedUsers } = this.state;
    const btnTitle = submitLoading ? 'Načítavam...' : 'Upraviť';

    if(loading) {
      return (
        <div style={{ position: 'relative', height: 300 }}>
          <Loader />
        </div>
      );
    }

    return (
      <form onSubmit={this.handleSubmitForm}>
        <fieldset disabled={submitLoading}>
        <div className="form-group">
            <input type="text" className="form-control" value={description} onChange={this.handleDescriptionChange} placeholder="Názov / popis inventúry" required />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Dátum začiarku spracovania</label>
                <input type="date" className="form-control" value={startDate} onChange={this.handleStartDateChange} required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Dátum predpokladaného ukončenia</label>
                <input type="date" className="form-control" value={endDate} onChange={this.handleEndDateChange} required />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <OfficesSelector companyId={this.props.companyId} onSelectOffice={this.handleSelectOffice} selectedOffice={selectedOffice} />
            </div>
            <div className="col-md-12">
              <OfficeRoomSelector officeId={selectedOffice} selectedOfficeRoom={selectedOfficeRoom} onSelectOfficeRoom={this.handleSelectOfficeRoom} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <UsersMultiSelector selectedUsers={selectedUsers} onSelectUser={this.handleSelectUser} companyId={this.props.companyId} />
            </div>
            <div className="col-md-12">
              <CustomersSelector companyId={this.props.companyId} onSelectCustomer={this.handleSelectCustomer} selectedCustomer={selectedCustomer} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Názov majetku</label>
                <input type="text" className="form-control" value={propertyTitle} onChange={this.handlePropertyTitleChange} placeholder="Názov majetku" required />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>Počet kusov majetku</label>
                <input type="number" min="1" className="form-control" value={propertyCount} placeholder="Počet kusov majetku" onChange={this.handlePropertyCountChange} required />
              </div>
            </div>
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

UpdateInventoryModalForm.propTypes = {
  inventoryId: PropTypes.string,
  onSuccessUpdate: PropTypes.func,
  onCancelClick: PropTypes.func.isRequired,
  onUpdateInventory: PropTypes.func,
};

const mapStateToProps = state => ({
  companyId: state.company.companyId,
});

export default connect(mapStateToProps)(UpdateInventoryModalForm);