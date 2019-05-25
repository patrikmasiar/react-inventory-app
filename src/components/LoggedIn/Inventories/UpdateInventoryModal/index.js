import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UpdateInventoryModalForm from './UpdateInventoryModalForm';

class UpdateInventoryModal extends Component {

  render() {
    const { isModalShown, onModalClose, inventoryId, onSuccessUpdate, onUpdateInventory } = this.props;

    return (
      <Modal show={isModalShown} onHide={onModalClose}>
        <Modal.Header closeButton>
          Upraviť inventúru
        </Modal.Header>
        <Modal.Body>
          <UpdateInventoryModalForm onUpdateInventory={onUpdateInventory} inventoryId={inventoryId} onSuccessUpdate={onSuccessUpdate} onCancelClick={onModalClose} />
        </Modal.Body>
      </Modal>
    );
  }
}

UpdateInventoryModal.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  inventoryId: PropTypes.string,
  onSuccessUpdate: PropTypes.func,
  onUpdateInventory: PropTypes.func,
};
 
export default UpdateInventoryModal;