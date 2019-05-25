import React, { Component } from 'react';
import { Loader, TitleHeader } from '../../../components/ui';
import client from '../../../utils/apolloClient';
import { allCompanyInventories as inventoriesQuery, updateInventoryAvailable, updateInventoryClosed } from 'queries';
import AdminActionHeaderPanel from '../../../components/LoggedIn/Inventories/AdminActionHeaderPanel';
import AdminInventoriesList from '../../../components/LoggedIn/Inventories/AdminInventoriesList';
import AlertMessage from '../../../libs/AlertMessage';

const removeDiacritics = require('diacritics').remove;

class AdminInventories extends Component {

  state = {
    inventoriesData: [],
    searchQuery: '',
    loading: false,
  };

  componentDidMount() {
    this.loadInventoriesData();
  }

  loadInventoriesData = async () => {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: inventoriesQuery,
      });

      if(response && response.data.allInventories) {
        this.setState({ inventoriesData: response.data.allInventories });
      }

      this.setState({loading: false});

    } catch(error) {
      console.log('Error load inventories data', error);
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      this.setState({loading: false});
    }
  };

  handleSearchInputChange = (event) => {
    const { value: searchQuery } = event.target;
    this.setState({ searchQuery });
  };

  getInventories() {
    const { searchQuery, inventoriesData } = this.state;

    if(searchQuery.length === 0) {
      return inventoriesData;
    }

    const query = removeDiacritics(searchQuery.toLowerCase());

    const filteredInventories = inventoriesData.filter(inventory => {
      const inventoryDesc = removeDiacritics(inventory.description.toLowerCase());
      return inventoryDesc.includes(query);
    });

    return filteredInventories;
  }

  handleCloseBtnClick = async (id, status) => {
    try {
      const response = await client.mutate({
        mutation: updateInventoryClosed,
        variables: {
          id,
          isClosed: !status
        }
      });

      if(response && response.data.updateInventory) {
        this.handleUpdateInventory(response.data.updateInventory, response.data.updateInventory.id);
        AlertMessage.showAlertMessage('Successfully edited', 'success', 'top-right');
      }

    } catch(error) {
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      console.log(error);
    }
  };

  handleAvailableBtnClick = async (id, status) => {
    try {
      const response = await client.mutate({
        mutation: updateInventoryAvailable,
        variables: {
          id,
          isAvailable: !status
        }
      });

      if(response && response.data.updateInventory) {
        this.handleUpdateInventory(response.data.updateInventory, response.data.updateInventory.id);
        AlertMessage.showAlertMessage('Successfully edited', 'success', 'top-right');
      }

    } catch(error) {
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      console.log(error);
    }
  };

  handleUpdateInventory = (inventory, inventoryId) => {
    this.setState(prevState => {
      const inventoriesData = [...prevState.inventoriesData];
      const index = inventoriesData.findIndex(inventory => inventory.id === inventoryId);

      if (index !== -1) {
        inventoriesData[index] = inventory;
      }

      return {inventoriesData};
    });
  };

  render() {
    const { loading, searchQuery } = this.state;

    if(loading) {
      return (
        <Loader />
      );
    }
    
    return (
      <div>
        <TitleHeader title={'Všetky inventúry'} />
        <AdminActionHeaderPanel
          searchInputValue={searchQuery}
          onSearchInputChange={this.handleSearchInputChange}
        />
        <AdminInventoriesList
          data={this.getInventories()}
          onAvailableClick={this.handleAvailableBtnClick}
          onCloseClick={this.handleCloseBtnClick}
        />
      </div>
    );
  }
}

export default AdminInventories;