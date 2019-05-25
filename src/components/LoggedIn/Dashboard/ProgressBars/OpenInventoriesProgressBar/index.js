import React, { Component } from 'react';
import {ProgressBar} from '../../../../ui';
import {allCompanyInventories as inventoriesQuery} from 'queries';
import client from '../../../../../utils/apolloClient';
import { connect } from 'react-redux';

class OpenInventoriesProgressBar extends Component {

  state = {
    isLoading: true,
    inventoriesData: [],
  };

  componentDidMount() {
    setTimeout(() => {
      this.loadInventoriesData();
    }, 800);
  }

  getOpenInventories() {
    const {inventoriesData, isLoading} = this.state;

    if (isLoading) {
      return 0;
    }

    const closed = inventoriesData.filter(item => !item.isClosed);
    return closed.length;
  }

  getPercentualValue() {
    const {isLoading, inventoriesData} = this.state;

    if (isLoading) {
      return 50;
    }

    const value = (this.getOpenInventories() / inventoriesData.length) * 100;
    return value.toFixed(2);
  }

  loadInventoriesData = async () => {
    try {
      this.setState({isLoading: true});

      const response = await client.query({
        query: inventoriesQuery,
        variables: {filter: {company: {id: this.props.companyId}}}, 
      });

      if(response && response.data.allInventories) {
        this.setState({inventoriesData: response.data.allInventories});
      }

      this.setState({isLoading: false});

    } catch(error) {
      console.log(error);
      this.setState({isLoading: false});
    }
  };

  render() { 
    const {isLoading, inventoriesData} = this.state;

    return (
      <ProgressBar
        title={`${this.getOpenInventories()} / ${inventoriesData.length} inventúr sú otvorené (${this.getPercentualValue()}%)`}
        isLoading={isLoading}
        value={parseFloat(this.getPercentualValue())}
        type={'success'}
      />
    );
  }
}

const mapStateToProps = state => ({
  companyId: state.company.companyId,
});
 
export default connect(mapStateToProps)(OpenInventoriesProgressBar);