import React, { Component } from 'react';
import { Loader, TitleHeader } from '../../../components/ui';
import ActionHeaderPanel from '../../../components/LoggedIn/Inventories/ActionHeaderPanel';
import { connect } from 'react-redux';
import client from '../../../utils/apolloClient';
import { allCompanyInventories as inventoriesQuery, deleteInventory } from 'queries';
import { history } from '../../../store/index';
import InventoriesList from '../../../components/LoggedIn/Inventories/InventoriesList';
import ImportInventoryModal from '../../../components/LoggedIn/Inventories/ImportInventoryModal';
import UpdateInventoryModal from '../../../components/LoggedIn/Inventories/UpdateInventoryModal';
import AlertMessage from '../../../libs/AlertMessage';

const removeDiacritics = require('diacritics').remove;

class Inventories extends Component {

  state = {
    inventoriesData: [],
    searchQuery: '',
    loading: false,
    isModalShown: false,
    isImportModalShown: false,
    inventoryIdForEdit: null,
    isEditModalShown: false,
  };

  componentDidMount() {
    this.loadInventoriesData();
  }

  loadInventoriesData = async () => {
    try {
      const allFilter = {filter: {company: {id: this.props.companyId}}};
      const userFilter = {filter: {company: {id: this.props.companyId}, users_some:{id: this.props.userId}}};

      this.setState({loading: true});

      const response = await client.query({
        query: inventoriesQuery,
        variables: this.props.userRole === 'user' ? userFilter : allFilter,
      });

      if(response && response.data.allInventories) {
        this.setState({ inventoriesData: response.data.allInventories });
      }

      this.setState({loading: false});

    } catch(error) {
      console.log('Error load inventories data', error);
      this.setState({loading: false});
    }
  };

  handleSearchInputChange = (event) => {
    const { value: searchQuery } = event.target;
    this.setState({ searchQuery });
  };

  handleDeleteInventory = async (inventoryId) => {
    if ( window.confirm('Naozaj si želáte vymazať inventúru?') ) {
      try {
        const allFilter = {filter: {company: {id: this.props.companyId}}};
        const userFilter = {filter: {company: {id: this.props.companyId}, users_some:{id: this.props.userId}}};
  
        const response = await client.mutate({
          mutation: deleteInventory,
          variables: { id: inventoryId }, 
          refetchQueries: [{
            query: inventoriesQuery,
            variables: this.props.userRole === 'user' ? userFilter : allFilter,
          }],
        });
  
        if(response && response.data.deleteInventory.id) {
          this.setState(prevState => {
            const inventoriesData = [...prevState.inventoriesData];
            const index = inventoriesData.findIndex(inventory => inventory.id === response.data.deleteInventory.id);

            if (index !== -1) {
              inventoriesData.splice(index, 1);
            }
            return {inventoriesData};
          });
          AlertMessage.showAlertMessage('Inventory deleted', 'success', 'top-right');
        }
  
      } catch(error) {
        console.log('Error remove inventory from list', error);
        AlertMessage.showAlertMessage('Can not remove inventory', 'danger', 'top-right');
      }
    } else {
      return false;
    }
    
  };

  handleImportModalShow = () => {
    this.setState({ isImportModalShown: true });
  };

  handleImportModalClose = () => {
    this.setState({ isImportModalShown: false });
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

  handleSuccesImport = () => {
    window.location.reload();
  };

  handleEditModalShow = (inventoryId) => {
    this.setState({ isEditModalShown: true, inventoryIdForEdit: inventoryId });
  };

  handleEditModalClose = () => {
    this.setState({ isEditModalShown: false, inventoryIdForEdit: null });
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
    AlertMessage.showAlertMessage('Successfully edited', 'success', 'top-right');
  };

  render() {
    const { loading, searchQuery, isImportModalShown, inventoryIdForEdit, isEditModalShown } = this.state;

    if(loading) {
      return (
        <Loader />
      );
    }
    
    return (
      <div>
        <TitleHeader title={'Inventúry'} />
        <ActionHeaderPanel
          searchInputValue={searchQuery}
          onSearchInputChange={this.handleSearchInputChange}
          onAddNewClick={() => history.push('/AddInventory')}
          onImportClick={this.handleImportModalShow}
          onCompareClick={() => history.push('/CompareInventories')}
          userRole={this.props.userRole}
        />
        <InventoriesList
          data={this.getInventories()}
          onDeleteClick={this.handleDeleteInventory}
          userRole={this.props.userRole}
          onEditClick={this.handleEditModalShow}
        />
        <ImportInventoryModal
          isModalShown={isImportModalShown}
          onModalClose={this.handleImportModalClose}
          companyId={this.props.companyId}
          onSuccessImport={this.handleSuccesImport}
        />
        <UpdateInventoryModal
          isModalShown={isEditModalShown}
          onModalClose={this.handleEditModalClose}
          inventoryId={inventoryIdForEdit}
          onUpdateInventory={this.handleUpdateInventory}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companyId: state.company.companyId,
  userRole: state.user.userRole,
  userId: state.user.loggedUserId,
});

export default connect(mapStateToProps)(Inventories);