import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createOfficeRoom, allOfficeRooms as officeRoomsQuery } from 'queries';
import client from '../../../../../utils/apolloClient';

class AddNewOfficeRoomModalForm extends Component {
  
  state = {
    roomName: '',
    roomTag: '',
    submitLoading: false,
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
    const { officeId, companyId } = this.props;
    const { roomName, roomTag, submitLoading } = this.state;

    try {
      if (submitLoading) {
        return false;
      }

      this.setState({ submitLoading: true });

      const response = await client.mutate({
        mutation: createOfficeRoom,
        variables: {
          name: roomName,
          tag: roomTag,
          officeId,
          companyId,
        },
        refetchQueries: [{
          query: officeRoomsQuery,
          variables: {filter: {office: { id: officeId }}}, 
        }]
      });

      if(response && response.data.createOfficeRoom.id) {
        this.props.onAddOfficeRoom(response.data.createOfficeRoom);
        this.props.onCancelClick();
      }
      
    } catch(error) {
      console.log('Error add new office room', error);
      this.setState({ submitLoading: false });
    }
  };
  
  render() {
    const { onCancelClick } = this.props;
    const { submitLoading, roomName, roomTag } = this.state;
    const btnTitle = submitLoading ? 'Načítavam...' : 'Potvrdiť';

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

AddNewOfficeRoomModalForm.propTypes = {
  officeId: PropTypes.string,
  companyId: PropTypes.string,
  onCancelClick: PropTypes.func.isRequired,
  onAddOfficeRoom: PropTypes.func.isRequired,
};

export default AddNewOfficeRoomModalForm;