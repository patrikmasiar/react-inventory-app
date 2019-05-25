import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UpdateOfficeRoomModalForm from './UpdateOfficeRoomModalForm';

class UpdateOfficeRoomModal extends Component {

  render() {
    const { isModalShown, onModalClose, onUpdateOfficeRoom, officeRoomId, officeId } = this.props;

    return (
      <Modal show={isModalShown} onHide={onModalClose}>
        <Modal.Header closeButton>
          Upraviť miestnosť
        </Modal.Header>
        <Modal.Body>
          <UpdateOfficeRoomModalForm officeRoomId={officeRoomId} officeId={officeId} onCancelClick={onModalClose} onUpdateOfficeRoom={onUpdateOfficeRoom} />
        </Modal.Body>
      </Modal>
    );
  }
}

UpdateOfficeRoomModal.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onUpdateOfficeRoom: PropTypes.func.isRequired,
  officeRoomId: PropTypes.string,
  officeId: PropTypes.string,
};

UpdateOfficeRoomModal.defaultProps = {
  officeRoomId: '',
};
 
export default UpdateOfficeRoomModal;