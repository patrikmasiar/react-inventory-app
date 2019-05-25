import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../../../../ui';
import { allCompanyOffices as companyOfficesQuery, officeInfo, updateOffice } from 'queries';
import client from '../../../../../utils/apolloClient';

class UpdateOfficeModalForm extends Component {
  
  state = {
    loading: false,
    officeName: '',
    cityValue: '',
    streetValue: '',
    postcodeValue: '',
    submitLoading: false,
  };

  componentDidMount() {
    this.loadOffice();
  }

  loadOffice = async () => {
    try {
      this.setState({ loading: true });
      const response = await client.query({
        query: officeInfo,
        variables: { id: this.props.officeId }, 
      });

      if(response && response.data.Office) {
        this.setState({
          officeName: response.data.Office.name,
          cityValue: response.data.Office.address.city,
          streetValue: response.data.Office.address.street,
          postcodeValue: response.data.Office.address.postCode
        });
      }

      this.setState({ loading: false });

    } catch(error) {
      console.log('Error load office info data', error);
      this.setState({ loading: false });
    }
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

      const response = await client.mutate({
        mutation: updateOffice,
        variables: {
          id: this.props.officeId,
          name: officeName,
          address: {
            city: cityValue,
            street: streetValue,
            postCode: postcodeValue
          }
        },
        refetchQueries: [{
          query: companyOfficesQuery,
          variables: {filter: {company: { id: this.props.companyId }}}, 
        }]
      });

      if(response && response.data.updateOffice) {
        this.props.onUpdateOffice(response.data.updateOffice, response.data.updateOffice.id);
        this.props.onCancelClick();
      }
      
    } catch(error) {
      console.log('Error add new company office', error);
      this.setState({ submitLoading: false });
    }
  };
  
  render() {
    const { onCancelClick } = this.props;
    const { submitLoading, officeName, cityValue, streetValue, postcodeValue, loading } = this.state;
    const btnTitle = submitLoading ? 'Načítavam...' : 'Potvrdiť';

    if(loading) {
      return (
        <div style={{ position: 'relative', height: 200 }}>
          <Loader />
        </div>
      );
    }

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

UpdateOfficeModalForm.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onUpdateOffice: PropTypes.func.isRequired,
  officeId: PropTypes.string.isRequired,
  companyId: PropTypes.string.isRequired,
};

export default UpdateOfficeModalForm;