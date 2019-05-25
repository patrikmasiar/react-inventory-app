import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { allCompanyOffices as allOfficesQuery } from 'queries';
import client from '../../../utils/apolloClient';
import { history } from '../../../store/index';
import { DashboardListPanel, Loader } from '../../ui';

class SystemOfficesPanel extends Component {

  state = {
    loading: false,
    officesData: [],
  };

  componentDidMount() {
    this.loadOffices();
  }

  loadOffices = async () => {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: allOfficesQuery,
        variables: {first: 6, filter: {company: {id: this.props.companyId}}}, 
      });

      if(response && response.data.allOffices) {
        this.setState({ officesData: response.data.allOffices });
      }

      this.setState({loading: false});

    } catch(error) {
      console.log(error);
      this.setState({loading: false});
    }
  };

  render() {
    const { loading, officesData } = this.state;
    const { onAddClick } = this.props;

    let bodyComponent = null;
    if(loading) {
      bodyComponent = (
        <div style={{ position: 'relative', height: 150 }}>
          <Loader />
        </div>
      );
    } else if(officesData.length === 0) {
      bodyComponent = <div style={{ padding: 50, textAlign: 'center', color: '#aab0a1' }}>Žiadne pridané pobočky</div>;
    } else {
      bodyComponent = (
        <div className="dashboard-users-list-wrapper">
          {officesData.map((office, index) => {
            return (
              <div key={index} style={{ paddingTop: 8, paddingBottom: 8, borderBottom: '1px solid', borderBottomColor: '#edf0f1' }}>
                {office.name}
              </div>
            )
          })}
        </div>
      );
    }

    return (
      <DashboardListPanel
        onAddClick={ onAddClick }
        onViewAllClick={ () => history.push('/Offices') }
        title={ 'Pobočky spoločnosti' }
        addBtnLabel={ 'Pridať novú pobočku' }
        styleType={ 'info' }
        bodyComponent={ bodyComponent }
      />
    );
  }
}

SystemOfficesPanel.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
};
 
export default SystemOfficesPanel;