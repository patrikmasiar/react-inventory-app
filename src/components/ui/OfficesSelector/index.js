import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../../utils/apolloClient';
import { allCompanyOffices as companyOfficesQuery } from 'queries';

class OfficesSelector extends Component {

  state = {
    loading: false,
    officesData: [],
  };

  componentDidMount() {
    this.loadCompaniesData();
  }

  loadCompaniesData = async () => {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: companyOfficesQuery,
        variables: {filter: {company: {id: this.props.companyId}}}, 
      });

      if(response && response.data.allOffices) {
        this.setState({officesData: response.data.allOffices});
      }

      this.setState({loading: false});

    } catch(error) {
      console.log(error);
      this.setState({loading: false});
    }
  };

  handleSelectChange = (event) => {
    const { value: selectedOfficeId } = event.target;
    this.props.onSelectOffice(selectedOfficeId);
  };

  render() {
    const {selectedOffice} = this.props;
    const {officesData, loading} = this.state;

    if(loading) {
      return (
        <div className="form-group">
          <label>Vybrať pobočku</label>
          <input className="form-control" disabled value={"Načítavam..."} />
        </div>
      );
    }

    if(officesData.length === 0) {
      return (
        <div className="form-group">
          <label>Vybrať pobočku</label>
          <input className="form-control" disabled value={"Žiadne pobočky sa nenašli"} />
        </div>
      );
    }

    return (
      <div className="form-group">
        <label>Vybrať pobočku</label>
        <select className="form-control" value={selectedOffice} onChange={this.handleSelectChange} required>
          <option value={''} disabled>Zvoľte pobočku zo zoznamu</option>
          {officesData.map(office => {
            return (
              <option key={office.id} value={office.id}>{`${office.name} / ${office.address.city}, ${office.address.street}`}</option>
            );
          })}
        </select>
      </div>
    );
  }
}

OfficesSelector.propTypes = {
  companyId: PropTypes.string.isRequired,
  selectedOffice: PropTypes.string.isRequired,
  onSelectOffice: PropTypes.func.isRequired,
};
 
export { OfficesSelector };