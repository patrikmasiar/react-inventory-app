import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddNewOfficeRoomModalForm from './AddNewOfficeRoomModalForm';

class AddNewOfficeRoomModal extends Component {

  render() {
    const { isModalShown, onModalClose, onAddOfficeRoom, officeId, companyId } = this.props;

    return (
      <Modal show={isModalShown} onHide={onModalClose}>
        <Modal.Header closeButton>
          Pridať novú miestnosť
        </Modal.Header>
        <Modal.Body>
          <AddNewOfficeRoomModalForm companyId={companyId} officeId={officeId} onAddOfficeRoom={onAddOfficeRoom} onCancelClick={onModalClose} />
        </Modal.Body>
      </Modal>
    );
  }
}

AddNewOfficeRoomModal.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onAddOfficeRoom: PropTypes.func.isRequired,
  officeId: PropTypes.string,
  companyId: PropTypes.string,
};
 
export default AddNewOfficeRoomModal;