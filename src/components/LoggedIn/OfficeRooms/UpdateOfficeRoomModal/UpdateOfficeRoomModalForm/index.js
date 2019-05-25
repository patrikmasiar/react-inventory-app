import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../../../../ui';
import { officeRoomInfo, updateOfficeRoom, allOfficeRooms as officeRoomsQuery } from 'queries';
import client from '../../../../../utils/apolloClient';

class UpdateOfficeRoomModalForm extends Component {
  
  state = {
    loading: false,
    roomName: '',
    roomTag: '',
    submitLoading: false,
  };

  componentDidMount() {
    this.loadOfficeRoom();
  }

  loadOfficeRoom = async () => {
    try {
      this.setState({ loading: true });
      const response = await client.query({
        query: officeRoomInfo,
        variables: { id: this.props.officeRoomId }, 
      });

      if(response && response.data.OfficeRoom) {
        this.setState({
          roomName: response.data.OfficeRoom.name,
          roomTag: response.data.OfficeRoom.tag
        });
      }

      this.setState({ loading: false });

    } catch(error) {
      console.log('Error load office room info data', error);
      this.setState({ loading: false });
    }
  };

  handleRoomNameChange = (event) => {
    const { value: roomName } = event.target;
    this.setState({ roomName });
  };

  handleRoomTagChange = (event) => {
    const { value: roomTag } = event.target;
    this.setState({ roomTag });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { officeId } = this.props;
    const { roomName, roomTag, submitLoading } = this.state;

    try {
      if (submitLoading) {
        return false;
      }
      
      this.setState({ submitLoading: true });

      const response = await client.mutate({
        mutation: updateOfficeRoom,
        variables: {
          id: this.props.officeRoomId,
          name: roomName,
          tag: roomTag,
        },
        refetchQueries: [{
          query: officeRoomsQuery,
          variables: {filter: {office: { id: officeId }}}, 
        }]
      });

      if(response && response.data.updateOfficeRoom.id) {
        this.props.onUpdateOfficeRoom(response.data.updateOfficeRoom, response.data.updateOfficeRoom.id);
        this.props.onCancelClick();
      }
      
    } catch(error) {
      console.log('Error update office room', error);
      this.setState({ submitLoading: false });
    }
  };
  
  render() {
    const { onCancelClick } = this.props;
    const { submitLoading, roomName, roomTag, loading } = this.state;
    const btnTitle = submitLoading ? 'Načítavam...' : 'Potvrdiť';

    if(loading) {
      return (
        <div style={{ position: 'relative', height: 200 }}>
          <Loader />
        </div>
      );
    }

    return (
      <form onSubmit={this.handleFormSubmit}>
        <fieldset disabled={submitLoading}>
          <div className="form-group">
            <input type="text" value={roomName} onChange={this.handleRoomNameChange} className="form-control" placeholder="Názov miestnosti" required />
          </div>
          <div className="form-group">
            <input type="text" value={roomTag} onChange={this.handleRoomTagChange} className="form-control" placeholder="Označenie miestnosti" required />
          </div>
        </fieldset>
        <div className="modal-form-footer-wrapper">
          <button disabled={submitLoading} onClick={onCancelClick} className="btn btn-sm btn-default" type="button">
            Zatvoriť
          </button>
          <button style={{ marginLeft: 'auto' }} disabled={submitLoading} className="btn btn-sm btn-primary" type="submit">
            {btnTitle}
          </button>
        </div>
      </form>
    );
  }
}

UpdateOfficeRoomModalForm.propTypes = {
  officeId: PropTypes.string,
  officeRoomId: PropTypes.string.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onUpdateOfficeRoom: PropTypes.func.isRequired,
};

export default UpdateOfficeRoomModalForm;