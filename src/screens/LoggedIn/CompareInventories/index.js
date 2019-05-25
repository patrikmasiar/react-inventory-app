import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TitleHeader } from '../../../components/ui';
import ActionHeaderPanel from '../../../components/LoggedIn/Inventories/CompareInventories/ActionHeaderPanel'
import CompareInventoriesBody from '../../../components/LoggedIn/Inventories/CompareInventories/CompareInventoriesBody';
import client from '../../../utils/apolloClient';
import { inventoryDetail } from 'queries';
import ImportInventoryModal from '../../../components/LoggedIn/Inventories/ImportInventoryModal';
import AlertMessage from '../../../libs/AlertMessage';

class CompareInventories extends Component {

  state = {
    firstData: null,
    secondData: null,
    firstInventoryId: '',
    secondInventoryId: '',
    isImportModalShown: false,
  };

  loadInventoryData = async (inventoryId) => {
    try {

      const response = await client.query({
        query: inventoryDetail,
        variables: {id: inventoryId}, 
      });

      if(response && response.data.Inventory) {
        return response.data.Inventory
      }

      return null;

    } catch(error) {
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      console.log('Error load inventory data', error);
    }
  };

  handleSelectFirstInventory = async (inventoryId) => {
    this.setState({ firstInventoryId: inventoryId});

    const response = await this.loadInventoryData(inventoryId);

    if (response !== null) {
      this.setState({firstData: response});
    } else {
      this.setState({firstData: null});
    }
  };

  handleSelectSecondInventory = async (inventoryId) => {
    this.setState(() => ({secondInventoryId: inventoryId}));
    
    const response = await this.loadInventoryData(inventoryId);

    if (response !== null) {
      this.setState({secondData: response});
    } else {
      this.setState({secondData: null});
    }
  };

  handleImportModalShow= () => {
    this.setState({ isImportModalShown: true });
  };

  handleImportModalClose = () => {
    this.setState({ isImportModalShown: false });
  };

  render() {
    const { firstData, secondData, secondInventoryId, firstInventoryId, isImportModalShown } = this.state;

    return (
      <div>
        <TitleHeader title={'Porovnať inventúry'} />
        <ActionHeaderPanel
          onImportClick={this.handleImportModalShow}
          companyId={this.props.companyId}
          firstInventoryId={firstInventoryId}
          secondInventoryId={secondInventoryId}
          onFirstInventorySelect={this.handleSelectFirstInventory}
          onSecondInventorySelect={this.handleSelectSecondInventory}
          userRole={this.props.userRole}
        />
        <CompareInventoriesBody
          firstData={firstData}
          secondData={secondData}
        />
        <ImportInventoryModal
          isModalShown={isImportModalShown}
          onModalClose={this.handleImportModalClose}
          companyId={this.props.companyId}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companyId: state.company.companyId,
  userRole: state.user.userRole,
});

export default connect(mapStateToProps)(CompareInventories);