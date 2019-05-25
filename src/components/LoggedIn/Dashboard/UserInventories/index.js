import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { userInventories as inventoriesQuery } from 'queries';
import client from '../../../../utils/apolloClient';
import { history } from '../../../../store/index';
import { DashboardListPanel, Loader } from '../../../ui';

class UserInventories extends Component {

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
        variables: {
          first: 10,
          filter: {
            company: { id: this.props.companyId },
            users_some: { id: this.props.userId }
          },
        }, 
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
      bodyComponent = <div style={{ padding: 50, textAlign: 'center', color: '#aab0a1' }}>Žiadne pridelené inventúry</div>;
    } else {
      bodyComponent = (
        <div className="dashboard-users-list-wrapper">
          {inventoriesData.map((inventory, index) => {
            return (
              <div key={index} tabIndex={0} onClick={() => history.push(`/InventoryDetail/${inventory.id}`)} className={'users-dashboard-inventory-item'} style={{ borderBottom: '1px solid', borderBottomColor: '#edf0f1' }}>
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
        title={ 'Moje inventúry' }
        addBtnLabel={ 'Pozrieť všetko' }
        styleType={ 'info' }
        bodyComponent={ bodyComponent }
      />
    );
  }
}

UserInventories.propTypes = {
  companyId: PropTypes.string.isRequired,
};
 
export default UserInventories;