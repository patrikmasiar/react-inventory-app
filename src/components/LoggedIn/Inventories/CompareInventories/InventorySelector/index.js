import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../../../../utils/apolloClient';
import { allCompanyInventories as inventoriesQuery } from 'queries';

class InventorySelector extends Component {

  state = {
    loading: false,
    inventoriesData: [],
  };

  componentDidMount() {
    this.loadInventoriesData();
  }

  loadInventoriesData = async () => {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: inventoriesQuery,
        variables: {filter: {company: {id: this.props.companyId}}}, 
      });

      if(response && response.data.allInventories) {
        this.setState({inventoriesData: response.data.allInventories});
      }

      this.setState({loading: false});

    } catch(error) {
      console.log(error);
      this.setState({loading: false});
    }
  };

  handleSelectChange = (event) => {
    const { value: selectedInventoryId } = event.target;
    this.props.onSelectInventory(selectedInventoryId);
  };

  render() {
    const { selectedInventory, additionalStyle } = this.props;
    const { inventoriesData, loading } = this.state;

    if(loading) {
      return (
        <div className="form-group" style={additionalStyle}>
          <input className="form-control" disabled value={"Načítavam..."} />
        </div>
      );
    }

    if(inventoriesData.length === 0) {
      return (
        <div className="form-group" style={additionalStyle}>
          <input className="form-control" disabled value={"Žiadne pobočky sa nenašli"} />
        </div>
      );
    }

    return (
      <div className="form-group" style={additionalStyle}>
        <select className="form-control" value={selectedInventory} onChange={this.handleSelectChange} required>
          <option value={''} disabled>Zvoľte inventúru zo zoznamu</option>
          {inventoriesData.map(inventory => {
            return (
              <option key={inventory.id} value={inventory.id}>{`${inventory.description}`}</option>
            );
          })}
        </select>
      </div>
    );
  }
}

InventorySelector.propTypes = {
  companyId: PropTypes.string.isRequired,
  selectedInventory: PropTypes.string.isRequired,
  onSelectInventory: PropTypes.func.isRequired,
  additionalStyle: PropTypes.any,
};

InventorySelector.defaultProps = {
  additionalStyle: null,
};
 
export default InventorySelector;