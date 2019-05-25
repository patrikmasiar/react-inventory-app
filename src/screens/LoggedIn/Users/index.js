import React, { Component } from 'react';
import UsersList from '../../../components/LoggedIn/Users/UsersList';
import { Loader, TitleHeader } from '../../../components/ui';
import ActionHeaderPanel from '../../../components/LoggedIn/Users/ActionHeaderPanel';
import { connect } from 'react-redux';
import AddNewCompanyUserModal from '../../../components/LoggedIn/Users/AddNewCompanyUserModal';
import client from '../../../utils/apolloClient';
import { allCompanyUsers as companyUsersQuery, deleteUser } from 'queries';
import UpdateUserModal from '../../../components/LoggedIn/Users/UpdateUserModal';
import AlertMessage from '../../../libs/AlertMessage';

const removeDiacritics = require('diacritics').remove;

class Users extends Component {

  state = {
    loading: false,
    usersData: [],
    searchQuery: '',
    isModalShown: false,
    isUpdateModalShown: false,
    userIdToEdit: ''
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

  handleSearchInputChange = (event) => {
    const {value: searchQuery} = event.target;
    this.setState({searchQuery});
  };

  handleShowAddUserModal = () => {
    this.setState({ isModalShown: true });
  };

  handleCloseAddUserModal = () => {
    this.setState({ isModalShown: false });
  };

  handleShowUpdateUserModal = (userId) => {
    this.setState({ isUpdateModalShown: true, userIdToEdit: userId });
  };

  handleCloseUpdateUserModal = () => {
    this.setState({ isUpdateModalShown: false, userId: '' });
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

  handleRemoveClick = async (userId) => {
    try {

      if (window.confirm("Naozaj si želáte vymazať používateľa?")) { 
        const response = await client.mutate({
          mutation: deleteUser,
          variables: { id: userId },
          refetchQueries: [{
            query: companyUsersQuery,
            variables: {filter: {company: {id: this.props.companyId}}}, 
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
      console.log('Error remove user from list', error);
    }
  };

  handleAddNewUser = (user) => {
    this.setState(prevState => {
      const usersData = [...prevState.usersData];

      usersData.push(user);

      return {usersData};
    });
    AlertMessage.showAlertMessage('Successfully added', 'success', 'top-right');
  };

  handleUpdateUser = (userId, user) => {
    this.setState(prevState => {
      const usersData = [...prevState.usersData];
      const userIndex = usersData.findIndex(user => user.id === userId);

      if (userIndex !== -1) {
        usersData[userIndex] = user;
      }

      return {usersData};
    });
    AlertMessage.showAlertMessage('Successfully edited', 'success', 'top-right');
  };

  render() {
    const {loading, searchQuery, isModalShown, isUpdateModalShown, userIdToEdit} = this.state;
    
    if(loading) {
      return (
        <Loader />
      );
    }

    return (
      <div>
        <TitleHeader title={'Používatelia'} />
        <ActionHeaderPanel
          searchInputValue={searchQuery}
          onSearchInputChange={this.handleSearchInputChange}
          onAddNewUserClick={this.handleShowAddUserModal}
        />
        <UsersList
          data={this.getUsers()}
          onRemoveClick={this.handleRemoveClick}
          onEditClick={this.handleShowUpdateUserModal}
        />
        <AddNewCompanyUserModal
          isModalShown={isModalShown}
          onModalClose={this.handleCloseAddUserModal}
          onAddNewUser={this.handleAddNewUser}
        />
        <UpdateUserModal
          isModalShown={isUpdateModalShown}
          companyId={this.props.companyId}
          onModalClose={this.handleCloseUpdateUserModal}
          userId={userIdToEdit}
          onUpdateUser={this.handleUpdateUser}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companyId: state.company.companyId,
  userId: state.user.loggedUserId,
});

export default connect(mapStateToProps)(Users);