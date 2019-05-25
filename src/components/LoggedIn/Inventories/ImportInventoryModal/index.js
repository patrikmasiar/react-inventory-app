import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ImportInventoryModalForm from './ImportInventoryModalForm';

class ImportInventoryModal extends Component {

  render() {
    const { isModalShown, onModalClose, companyId, onSuccessImport } = this.props;

    return (
      <Modal show={isModalShown} onHide={onModalClose}>
        <Modal.Header closeButton>
          Importovať inventúru
        </Modal.Header>
        <Modal.Body>
          <ImportInventoryModalForm companyId={companyId} onSuccessImport={onSuccessImport} onCancelClick={onModalClose} />
        </Modal.Body>
      </Modal>
    );
  }
}

ImportInventoryModal.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
  onSuccessImport: PropTypes.func,
};
 
export default ImportInventoryModal;