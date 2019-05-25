import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { allCompanyUsers as companyUsersQuery } from 'queries';
import client from '../../../utils/apolloClient';
import { history } from '../../../store/index';
import { DashboardListPanel, Loader } from '../../ui';

class SystemUsersPanel extends Component {

  state = {
    loading: false,
    usersData: [],
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: companyUsersQuery,
        variables: {first: 5, filter: {company: {id: this.props.companyId}, role: {role: 'user'}}}, 
      });

      if(response && response.data.allUsers) {
        this.setState({ usersData: response.data.allUsers });
      }

      this.setState({loading: false});

    } catch(error) {
      console.log(error);
      this.setState({loading: false});
    }
  };

  render() {
    const { loading, usersData } = this.state;
    const { onAddClick } = this.props;

    let bodyComponent = null;
    if(loading) {
      bodyComponent = (
        <div style={{ position: 'relative', height: 150 }}>
          <Loader />
        </div>
      );
    } else if(usersData.length === 0) {
      bodyComponent = <div style={{ padding: 50, textAlign: 'center', color: '#aab0a1' }}>Žiadni používatelia systému</div>;
    } else {
      bodyComponent = (
        <div className="dashboard-users-list-wrapper">
          {usersData.map((user, index) => {
            return (
              <div key={index} style={{ paddingTop: 8, paddingBottom: 8, borderBottom: '1px solid', borderBottomColor: '#edf0f1' }}>
                {user.fullName}
              </div>
            )
          })}
        </div>
      );
    }

    return (
      <DashboardListPanel
        onAddClick={ onAddClick }
        onViewAllClick={ () => history.push('/Users') }
        title={ 'Používatelia systému' }
        addBtnLabel={ 'Pridať nového používateľa' }
        styleType={ 'info' }
        bodyComponent={ bodyComponent }
        isAdmin={this.props.isAdmin}
      />
    );
  }
}

SystemUsersPanel.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
};
 
export default SystemUsersPanel;