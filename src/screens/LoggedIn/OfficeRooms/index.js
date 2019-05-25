import React, { Component } from 'react';
import { TitleHeader, Loader } from '../../../components/ui';
import OfficeRoomsList from '../../../components/LoggedIn/OfficeRooms/OfficeRoomsList';
import ActionHeaderPanel from '../../../components/LoggedIn/OfficeRooms/ActionHeaderPanel';
import AddNewOfficeRoomModal from '../../../components/LoggedIn/OfficeRooms/AddNewOfficeRoomModal';
import UpdateOfficeRoomModal from '../../../components/LoggedIn/OfficeRooms/UpdateOfficeRoomModal';
import { retrieveOfficeName } from './libs';
import client from '../../../utils/apolloClient';
import {
  allOfficeRooms as officeRoomsQuery,
  deleteOfficeRoom,
} from 'queries';
import { connect } from 'react-redux';
import AlertMessage from '../../../libs/AlertMessage';

const removeDiacritics = require('diacritics').remove;

class OfficeRooms extends Component {

  state = {
    officeRoomsData: [],
    officeName: '',
    officeId: null,
    searchQuery: '',
    loading: false,
    isModalShown: false,
    selectedOfficeRoom: '',
    isUpdateModalShown: false,
  };

  componentDidMount() {
    const officeId = this.props.match.params.officeId;
    if(!!officeId) {
      this.setState({ officeId });
      this.getOfficeName(officeId);
      this.getOfficeRoomsData(officeId);
    }
  }

  getOfficeName = async (officeId) => {
    try {
      const response = await retrieveOfficeName(officeId);

      if(response.length > 0) {
        this.setState({ officeName: response });
      }

    } catch(error) {
      console.log('Error get office name', error);
    }
  };

  getOfficeRoomsData = async (officeId) => {
    try {
      this.setState({loading: true});
      const response = await client.query({
        query: officeRoomsQuery,
        variables: {filter: {office: {id: officeId}}}, 
      });

      if(response && response.data.allOfficeRooms) {
        this.setState({ officeRoomsData: response.data.allOfficeRooms });
      }

      this.setState({loading: false});
    } catch(error) {
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      console.log('Error load office rooms data', error);
      this.setState({loading: false});
    }
  };

  handleSearchInputChange = (event) => {
    const { value: searchQuery } = event.target;
    this.setState({ searchQuery });
  };

  handleShowModal = () => {
    this.setState({ isModalShown: true });
  };

  handleModalClose = () => {
    this.setState({ isModalShown: false });
  };

  handleShowUpdateModal = (roomId) => {
    this.setState({ isUpdateModalShown: true, selectedOfficeRoom: roomId });
  };

  handleUpdateModalClose = () => {
    this.setState({ isUpdateModalShown: false, selectedOfficeRoom: '' });
  };

  getOfficeRooms() {
    const { searchQuery, officeRoomsData } = this.state;

    if(searchQuery.length === 0) {
      return officeRoomsData;
    }

    const query = removeDiacritics(searchQuery.toLowerCase());

    const filteredOfficeRooms = officeRoomsData.filter(officeRoom => {
      const officeName = removeDiacritics(officeRoom.name.toLowerCase());
      return officeName.includes(query);
    });

    return filteredOfficeRooms;
  }

  handleDeleteOfficeRoom = async (officeRoomId) => {
    try {
    
      if (window.confirm("Naozaj si želáte vymazať miestnosť?")) { 
        const response = await client.mutate({
          mutation: deleteOfficeRoom,
          variables: {id: officeRoomId}, 
          refetchQueries: [
            {
              query: officeRoomsQuery,
              variables: {filter: {office: {id: this.state.officeId}}}, 
            }
          ]
        });

        if(response && response.data.deleteOfficeRoom.id) {
          this.setState(prevState => {
            const officeRoomsData = [...prevState.officeRoomsData];
            const index = officeRoomsData.findIndex(officeRoom => officeRoom.id === response.data.deleteOfficeRoom.id);

            if (index!== -1) {
              officeRoomsData.splice(index, 1);
            }
            return {officeRoomsData};
          });
          AlertMessage.showAlertMessage('Successfully removed', 'success', 'top-right');
        }
      }

    } catch(error) {
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      console.log('Cant delete office room', error);
    }
  };

  handleAddOfficeRoom = (officeRoom) => {
    this.setState(prevState => {
      const officeRoomsData = [...prevState.officeRoomsData];

      officeRoomsData.push(officeRoom);

      return {officeRoomsData};
    });
    AlertMessage.showAlertMessage('Successfully added', 'success', 'top-right');
  };

  handleUpdateOfficeRoom = (officeRoom, officeRoomId) => {
    this.setState(prevState => {
      const officeRoomsData = [...prevState.officeRoomsData];
      const index = officeRoomsData.findIndex(officeRoom => officeRoom.id === officeRoomId);

      if (index !== -1) {
        officeRoomsData[index] = officeRoom;
      }

      return {officeRoomsData};
    });
    AlertMessage.showAlertMessage('Successfully edited', 'success', 'top-right');
  };

  render() {
    const { officeName, loading, searchQuery, isModalShown, officeId, selectedOfficeRoom, isUpdateModalShown } = this.state;

    if(loading) {
      return (
        <Loader />
      );
    }

    return (
      <div>
        <TitleHeader title={`Miestnosti pobočky: ${officeName}`} />
        <ActionHeaderPanel
            searchInputValue={searchQuery}
            onSearchInputChange={this.handleSearchInputChange}
            onAddNewOfficeRoomClick={this.handleShowModal}
        />
        <OfficeRoomsList
          data={this.getOfficeRooms()}
          onDeleteClick={this.handleDeleteOfficeRoom}
          onEditClick={this.handleShowUpdateModal}
        />
        <AddNewOfficeRoomModal
          isModalShown={isModalShown}
          onModalClose={this.handleModalClose}
          onAddOfficeRoom={this.handleAddOfficeRoom}
          officeId={officeId}
          companyId={this.props.companyId}
        />
        <UpdateOfficeRoomModal
          isModalShown={isUpdateModalShown}
          onModalClose={this.handleUpdateModalClose}
          onUpdateOfficeRoom={this.handleUpdateOfficeRoom}
          officeRoomId={selectedOfficeRoom}
          officeId={officeId}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companyId: state.company.companyId,
});
 
export default connect(mapStateToProps)(OfficeRooms);