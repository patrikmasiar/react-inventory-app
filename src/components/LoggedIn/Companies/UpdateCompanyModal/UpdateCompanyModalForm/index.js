import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../../../../ui';
import { company as companyDetailQuery, updateCompany, allCompanies } from 'queries';
import client from '../../../../../utils/apolloClient';

class UpdateCompanyModalForm extends Component {
  
  state = {
    loading: false,
    submitLoading: false,
    companyName: '',
    icoValue: '',
    dicValue: '',
    icdphValue: '',
    cityValue: '',
    streetValue: '',
    postcodeValue: '',
  };

  componentDidMount() {
    this.loadCompany();
  }

  loadCompany = async () => {
    try {
      this.setState({ loading: true });
      const response = await client.query({
        query: companyDetailQuery,
        variables: { id: this.props.companyId }, 
      });

      if(response && response.data.Company) {
        this.setState({
          companyName: response.data.Company.name,
          icoValue: !!response.data.Company.ico ? response.data.Company.ico : '',
          dicValue: !!response.data.Company.dic ? response.data.Company.dic : '',
          icdphValue: !!response.data.Company.icdph ? response.data.Company.icdph : '',
          cityValue: !!response.data.Company.address ? response.data.Company.address.city : '',
          streetValue: !!response.data.Company.address ? response.data.Company.address.street : '',
          postcodeValue: !!response.data.Company.address ? response.data.Company.address.postCode : '',
        });
      }

      this.setState({ loading: false });

    } catch(error) {
      console.log('Error load company info data', error);
      this.setState({ loading: false });
    }
  };

  handleCompanyNameChange = (e) => {
    const {value: companyName} = e.target;
    this.setState({ companyName });
  };

  handleIcoChange = (e) => {
    const {value: icoValue} = e.target;
    this.setState({ icoValue });
  };

  handleDicChange = (e) => {
    const {value: dicValue} = e.target;
    this.setState({ dicValue });
  };

  handleIcdphChange = (e) => {
    const {value: icdphValue} = e.target;
    this.setState({ icdphValue });
  };

  handleCityChange = (e) => {
    const {value: cityValue} = e.target;
    this.setState({ cityValue });
  };

  handleStreetChange = (e) => {
    const {value: streetValue} = e.target;
    this.setState({ streetValue });
  };

  handlePostcodeChange = (e) => {
    const {value: postcodeValue} = e.target;
    this.setState({ postcodeValue });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      this.setState({ submitLoading: true });

      const response = await client.mutate({
        mutation: updateCompany,
        variables: {
          id: this.props.companyId,
          name: this.state.companyName,
          ico: this.state.icoValue,
          dic: this.state.dicValue,
          icdph: this.state.icdphValue,
          address: {
            city: this.state.cityValue,
            street: this.state.streetValue,
            postCode: this.state.postcodeValue,
          }
        },
        refetchQueries: [{
          query: allCompanies,
        }]
      });

      if(response && response.data.updateCompany) {
        this.props.onUpdateCompany(response.data.updateCompany, response.data.updateCompany.id);
        this.props.onCancelClick();
      }
      
    } catch(error) {
      console.log('Error update company', error);
      this.setState({ submitLoading: false });
    }
  };
  
  render() {
    const { onCancelClick } = this.props;
    const { submitLoading, loading, companyName, icoValue, dicValue, icdphValue, cityValue, streetValue, postcodeValue } = this.state;
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
          <span className="main-subtitle">Údaje spoločnosti</span>
          <div className="form-group">
              <input type="text" className="form-control" value={companyName} onChange={this.handleCompanyNameChange} placeholder="Názov spoločnosti" required />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" value={icoValue} onChange={this.handleIcoChange} placeholder="IČO" required />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" value={dicValue} onChange={this.handleDicChange} placeholder="DIČ" required />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" value={icdphValue} onChange={this.handleIcdphChange} placeholder="IČ DPH" required />
          </div>
          <span className="main-subtitle">Adresné údaje</span>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" className="form-control" value={cityValue} onChange={this.handleCityChange} placeholder="Mesto" required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" className="form-control" value={streetValue} onChange={this.handleStreetChange} placeholder="Ulica" required />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" className="form-control" value={postcodeValue} onChange={this.handlePostcodeChange} placeholder="PSČ" required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input disabled type="text" value="Slovenská rebublika" className="form-control" placeholder="Štát" required />
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

UpdateCompanyModalForm.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onUpdateCompany: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
};

export default UpdateCompanyModalForm;