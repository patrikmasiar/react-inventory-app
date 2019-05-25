import React, { Component } from 'react';
import { TitleHeader, Loader } from '../../../components/ui';
import client from '../../../utils/apolloClient';
import ActionHeaderPanel from '../../../components/LoggedIn/Inventories/InventoryDetail/ActionHeaderPanel';
import InventoryDetailComponent from '../../../components/LoggedIn/Inventories/InventoryDetail';
import { inventoryDetail as inventoryQuery, deleteInventory } from 'queries';
import { history } from '../../../store/index';
import { connect } from 'react-redux';
import UpdateInventoryModal from '../../../components/LoggedIn/Inventories/UpdateInventoryModal';
import AlertMessage from '../../../libs/AlertMessage';

class InventoryDetail extends Component {

  state = {
    inventoryId: null,
    inventoryData: null,
    loading: false,
    isEditModalShown: false,
    inventoryIdForEdit: null,
  };

  componentDidMount() {
    const inventoryId = this.props.match.params.inventoryId;
    if(!!inventoryId) {
      this.setState({ inventoryId });
      this.loadInventoryData(inventoryId);
    }
  }

  loadInventoryData = async (inventoryId) => {
    try {

      this.setState({loading: true});
      const response = await client.query({
        query: inventoryQuery,
        variables: { id: inventoryId }, 
      });

      if(response && response.data.Inventory) {
        this.setState({ inventoryData: response.data.Inventory });
      }

      this.setState({loading: false});

    } catch(error) {
      console.log('Error load inventory detail data', error);
      AlertMessage.showAlertMessage('Can not load data', 'danger', 'top-right');
      this.setState({ loading: false });
    }
  };

  handleRemoveClick = async () => {
    if ( window.confirm('Naozaj si želáte vymazať inventúru?') ) {
      try {
        const inventoryId = this.props.match.params.inventoryId;

        AlertMessage.showAlertMessage('Removing inventory', 'warning', 'top-right');
        const response = await client.mutate({
          mutation: deleteInventory,
          variables: { id: inventoryId }, 
        });

        if(response && response.data.deleteInventory.id) {
          history.replace('/Inventories');
        }

      } catch(error) {
        console.log('Error remove inventory from detail', error);
        AlertMessage.showAlertMessage('Can not remove inventory', 'danger', 'top-right');
        this.setState({ loading: false });
      }
    } else {
      return false;
    }
  };

  handleEditModalShow = () => {
    const inventoryId = this.props.match.params.inventoryId;

    this.setState({ isEditModalShown: true, inventoryIdForEdit: inventoryId });
  };

  handleEditModalClose = () => {
    this.setState({ isEditModalShown: false, inventoryIdForEdit: null });
  };

  render() {
    const { loading, inventoryData, isEditModalShown, inventoryIdForEdit } = this.state;

    if(loading) {
      return (
        <Loader />
      );
    }

    return (
      <div>
        <TitleHeader title={'Detail inventúry'} />
        <ActionHeaderPanel
          inventoryData={inventoryData}
          onRemoveClick={this.handleRemoveClick}
          userRole={this.props.userRole}
          onEditClick={this.handleEditModalShow}
        />
        <InventoryDetailComponent
          data={inventoryData}
        />
        <UpdateInventoryModal
          isModalShown={isEditModalShown}
          onModalClose={this.handleEditModalClose}
          inventoryId={inventoryIdForEdit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userRole: state.user.userRole,
});

export default connect(mapStateToProps)(InventoryDetail);
