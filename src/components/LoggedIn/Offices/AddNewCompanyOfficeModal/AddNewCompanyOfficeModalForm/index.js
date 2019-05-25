import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAddress, createOffice } from './office.gquery';
import { allCompanyOffices as companyOfficesQuery } from 'queries';
import client from '../../../../../utils/apolloClient';

class AddNewCompanyOfficeModalForm extends Component {
  
  state = {
    officeName: '',
    cityValue: '',
    streetValue: '',
    postcodeValue: '',
    submitLoading: false,
  };

  handleOfficeNameChange = (event) => {
    const { value: officeName } = event.target;
    this.setState({ officeName });
  };

  handleCityChange = (event) => {
    const { value: cityValue } = event.target;
    this.setState({ cityValue });
  };

  handleStreetChange = (event) => {
    const { value: streetValue } = event.target;
    this.setState({ streetValue });
  };

  handlePostcodeChange = (event) => {
    const { value: postcodeValue } = event.target;
    this.setState({ postcodeValue });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { officeName, cityValue, streetValue, postcodeValue } = this.state;

    try {
      this.setState({ submitLoading: true });

      const addressResponse = await client.mutate({
        mutation: createAddress,
        variables: {
          city: cityValue,
          street: streetValue,
          postCode: postcodeValue,
          state: 'Slovensá republika',
        },
      });

      if(addressResponse && addressResponse.data.createAddress.id) {
        const officeResponse = await client.mutate({
          mutation: createOffice,
          variables: {
            name: officeName,
            companyId: this.props.companyId,
            addressId: addressResponse.data.createAddress.id,
          },
          refetchQueries: [{
            query: companyOfficesQuery,
            variables: {filter: {company: { id: this.props.companyId }}}, 
          }]
        });
  
        if(officeResponse && officeResponse.data.createOffice.id) {
          this.props.onAddOffice(officeResponse.data.createOffice);
          this.props.onCancelClick();
        }
      }
      
    } catch(error) {
      console.log('Error add new company office', error);
      this.setState({ submitLoading: false });
    }
  };
  
  render() {
    const { onCancelClick } = this.props;
    const { submitLoading, officeName, cityValue, streetValue, postcodeValue } = this.state;
    const btnTitle = submitLoading ? 'Načítavam...' : 'Potvrdiť';

    return (
      <form onSubmit={this.handleFormSubmit}>
        <fieldset disabled={submitLoading}>
          <div className="form-group">
            <input type="text" value={officeName} onChange={this.handleOfficeNameChange} className="form-control" placeholder="Názov pobočky" required />
          </div>
          <span className="main-subtitle">Adresa</span>
          <div className="form-group">
            <input type="text" className="form-control" value={cityValue} onChange={this.handleCityChange} placeholder="Mesto" required />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" value={streetValue} onChange={this.handleStreetChange} placeholder="Ulica" required />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" value={postcodeValue} onChange={this.handlePostcodeChange} placeholder="PSČ" required />
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

AddNewCompanyOfficeModalForm.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onAddOffice: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  companyId: state.company.companyId,
});

export default connect(mapStateToProps)(AddNewCompanyOfficeModalForm);