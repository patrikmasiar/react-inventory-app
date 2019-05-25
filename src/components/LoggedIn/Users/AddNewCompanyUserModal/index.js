import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddNewCompanyUserModalForm from './AddNewCompanyUserModalForm';

class AddNewCompanyUserModal extends Component {

  render() {
    const {isModalShown, onModalClose, onAddNewUser} = this.props;

    return (
      <Modal show={isModalShown} onHide={onModalClose}>
        <Modal.Header closeButton>
          Pridať nového používateľa
        </Modal.Header>
        <Modal.Body>
          <AddNewCompanyUserModalForm onAddNewUser={onAddNewUser} onCancelClick={onModalClose} />
        </Modal.Body>
      </Modal>
    );
  }
}

AddNewCompanyUserModal.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onAddNewUser: PropTypes.func,
};
 
export default AddNewCompanyUserModal;