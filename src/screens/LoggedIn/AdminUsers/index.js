import React, { Component } from 'react';
import { Loader, TitleHeader } from '../../../components/ui';
import AdminActionHeaderPanel from '../../../components/LoggedIn/Users/AdminActionHeaderPanel';
import AdminUsersList from '../../../components/LoggedIn/Users/AdminUsersList';
import client from '../../../utils/apolloClient';
import { allCompanyUsers as companyUsersQuery, deleteUser, updateBlockUserStatus } from 'queries';
import { connect } from 'react-redux';
import AlertMessage from '../../../libs/AlertMessage';

const removeDiacritics = require('diacritics').remove;

class AdminUsers extends Component {

  state = {
    loading: false,
    searchQuery: '',
    selectedCompany: null,
    usersData: [],
  };

  componentDidMount() {
    this.loadUsersData();
  }

  loadUsersData = async () => {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: companyUsersQuery,
        variables: {filter: {company: {id: this.props.companyId}, id_not: this.props.userId}},
      });

      if(response && response.data.allUsers) {
        this.setState({ usersData: response.data.allUsers });
      }

      this.setState({loading: false});

    } catch(error) {
      console.log(error);
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      this.setState({loading: false});
    }
  };

  handleRemoveClick = async (userId) => {
    try {

      if (window.confirm("Naozaj si želáte vymazať používateľa?")) { 
        const response = await client.mutate({
          mutation: deleteUser,
          variables: { id: userId },
          refetchQueries: [{
            query: companyUsersQuery,
          }]
        });

        if(response && response.data.deleteUser.id) {
          this.setState(prevState => {
            const usersData = [...prevState.usersData];
            const userIndex = usersData.findIndex(user => user.id === response.data.deleteUser.id);

            if (userIndex !== -1) {
              usersData.splice(userIndex, 1);
            }
            return {usersData};
          });
          AlertMessage.showAlertMessage('Successfully removed', 'success', 'top-right');
        }
      }

    } catch(error) {
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      console.log('Error remove user from list', error);
    }
  };

  handleSearchInputChange = (event) => {
    const { value: searchQuery } = event.target;
    this.setState({ searchQuery });
  };

  getUsers() {
    const {searchQuery, usersData} = this.state;

    if(searchQuery.length === 0) {
      return usersData;
    }

    const query = removeDiacritics(searchQuery.toLowerCase());

    const filteredUsers = usersData.filter(user => {
      const userName = removeDiacritics(user.fullName.toLowerCase());
      return userName.includes(query);
    });

    return filteredUsers;
  }

  handleBlockClick = async (userId, status) => {
    try {
      const response = await client.mutate({
        mutation: updateBlockUserStatus,
        variables: {
          id: userId,
          blocked: !status
        },
        refetchQueries: [{
          query: companyUsersQuery,
        }]
      });

      if(response && response.data.updateUser) {
        this.setState(prevState => {
          const usersData = [...prevState.usersData];
          const index = usersData.findIndex(user => user.id === response.data.updateUser.id);
    
          if (index !== -1) {
            usersData[index] = response.data.updateUser;
          }
    
          return {usersData};
        });
        AlertMessage.showAlertMessage('Successfully edited', 'success', 'top-right');
      }

    } catch(error) {
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      console.log(error);
    }
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
        <TitleHeader title={'Registrovaní používatelia'} />
        <AdminActionHeaderPanel
          searchInputValue={searchQuery}
          onSearchInputChange={this.handleSearchInputChange}
        />
        <AdminUsersList
          data={this.getUsers()}
          onRemoveClick={this.handleRemoveClick}
          onBlockBtnClick={this.handleBlockClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companyId: state.company.companyId,
  userId: state.user.loggedUserId,
});

export default connect(mapStateToProps)(AdminUsers);