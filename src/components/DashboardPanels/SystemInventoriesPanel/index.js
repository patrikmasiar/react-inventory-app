import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { allCompanyInventories as inventoriesQuery } from 'queries';
import client from '../../../utils/apolloClient';
import { history } from '../../../store/index';
import { DashboardListPanel, Loader } from '../../ui';

class SystemInventoriesPanel extends Component {

  state = {
    loading: false,
    inventoriesData: [],
  };

  componentDidMount() {
    this.loadInventories();
  }

  loadInventories = async () => {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: inventoriesQuery,
        variables: {first: 6, filter: {company: { id: this.props.companyId }}}, 
      });

      if(response && response.data.allInventories) {
        this.setState({ inventoriesData: response.data.allInventories });
      }

      this.setState({loading: false});

    } catch(error) {
      console.log(error);
      this.setState({loading: false});
    }
  };

  render() {
    const { loading, inventoriesData } = this.state;
    const { onAddClick } = this.props;

    let bodyComponent = null;
    if(loading) {
      bodyComponent = (
        <div style={{ position: 'relative', height: 150 }}>
          <Loader />
        </div>
      );
    } else if(inventoriesData.length === 0) {
      bodyComponent = <div style={{ padding: 50, textAlign: 'center', color: '#aab0a1' }}>Žiadni používatelia systému</div>;
    } else {
      bodyComponent = (
        <div className="dashboard-users-list-wrapper">
          {inventoriesData.map((inventory, index) => {
            return (
              <div key={index} style={{ paddingTop: 8, paddingBottom: 8, borderBottom: '1px solid', borderBottomColor: '#edf0f1' }}>
                {inventory.description}
              </div>
            )
          })}
        </div>
      );
    }

    return (
      <DashboardListPanel
        onAddClick={ onAddClick }
        onViewAllClick={ () => history.push('/Inventories') }
        title={ 'Najnovšie inventúry' }
        addBtnLabel={ 'Pridať novú inventúru' }
        styleType={ 'info' }
        bodyComponent={ bodyComponent }
        isAdmin={this.props.isAdmin}
      />
    );
  }
}

SystemInventoriesPanel.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
};
 
export default SystemInventoriesPanel;