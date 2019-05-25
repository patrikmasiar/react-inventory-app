import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OfficesSelector, UsersMultiSelector, OfficeRoomSelector, CustomersSelector } from '../../../ui';

class AddInventoryForm extends Component {

  handleDescriptionChange = (event) => {
    const { value: description } = event.target;
    this.props.onDescriptionChange(description);
  };

  handleStartDateChange = (event) => {
    const { value: startDate } = event.target;
    this.props.onStartDateChange(startDate);
  };

  handleEndDateChange = (event) => {
    const { value: endDate } = event.target;
    this.props.onEndDateChange(endDate);
  };

  handlePropertyTitleChange = (event) => {
    const { value: propertyTitle } = event.target;
    this.props.onPropertyTitleChange(propertyTitle);
  };

  handlePropertyCountChange = (event) => {
    const { value: propertyCount } = event.target;
    this.props.onPropertyCountChange(propertyCount);
  };

  render() {
    const { loading, description, startDate, endDate, companyId, onSelectOffice, selectedOffice, onSelectUser, selectedUsers, submitLoading, onSubmit, selectedOfficeRoom, onSelectOfficeRoom, onSelectCustomer, selectedCustomer, propertyTitle, propertyCount } = this.props;
    const btnTitle = submitLoading ? 'Načítavam...' : 'Potvrdiť';

    return (
      <form onSubmit={onSubmit} method="POST">
        <fieldset disabled={ loading }>
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
            <div className="col-md-6">
              <OfficesSelector companyId={companyId} onSelectOffice={onSelectOffice} selectedOffice={selectedOffice} />
            </div>
            <div className="col-md-6">
              <OfficeRoomSelector officeId={selectedOffice} selectedOfficeRoom={selectedOfficeRoom} onSelectOfficeRoom={onSelectOfficeRoom} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <UsersMultiSelector selectedUsers={selectedUsers} onSelectUser={onSelectUser} companyId={companyId} />
            </div>
            <div className="col-md-6">
              <CustomersSelector companyId={companyId} onSelectCustomer={onSelectCustomer} selectedCustomer={selectedCustomer} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Názov majetku</label>
                <input type="text" className="form-control" value={propertyTitle} onChange={this.handlePropertyTitleChange} placeholder="Názov majetku" required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Počet kusov majetku</label>
                <input type="number" min="1" className="form-control" value={propertyCount} placeholder="Počet kusov majetku" onChange={this.handlePropertyCountChange} required />
              </div>
            </div>
          </div>
        </fieldset>
        <div style={{ marginTop: 30 }} className="text-right">
          <button disabled={submitLoading} type="submit" className="btn btn-primary">{btnTitle}</button>
        </div>
      </form>
    );
  }
}

AddInventoryForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  companyId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  endDate: PropTypes.string.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  onSelectOffice: PropTypes.func.isRequired,
  selectedOffice: PropTypes.string.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  selectedUsers: PropTypes.array.isRequired,
  submitLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedOfficeRoom: PropTypes.string.isRequired,
  onSelectOfficeRoom: PropTypes.func.isRequired,
  selectedCustomer: PropTypes.string.isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
  propertyTitle: PropTypes.string.isRequired,
  onPropertyTitleChange: PropTypes.func.isRequired,
  propertyCount: PropTypes.string.isRequired,
  onPropertyCountChange: PropTypes.func.isRequired,
};
 
export default AddInventoryForm;