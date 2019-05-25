import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UpdateUserModalForm from './UpdateUserModalForm';

class UpdateUserModal extends Component {

  render() {
    const {isModalShown, onModalClose, onUpdateUser, companyId, userId} = this.props;

    return (
      <Modal show={isModalShown} onHide={onModalClose}>
        <Modal.Header closeButton>
          Upraviť používateľa
        </Modal.Header>
        <Modal.Body>
          <UpdateUserModalForm userId={userId} companyId={companyId} onCancelClick={onModalClose} onUpdateUser={onUpdateUser} />
        </Modal.Body>
      </Modal>
    );
  }
}

UpdateUserModal.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  onUpdateUser: PropTypes.func,
};

UpdateUserModal.defaultProps = {
  userId: '',
}
 
export default UpdateUserModal;