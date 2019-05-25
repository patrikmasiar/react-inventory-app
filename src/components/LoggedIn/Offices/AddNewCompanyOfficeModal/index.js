import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddNewCompanyOfficeModalForm from './AddNewCompanyOfficeModalForm';

class AddNewCompanyOfficeModal extends Component {

  render() {
    const { isModalShown, onModalClose, onAddOffice } = this.props;

    return (
      <Modal show={isModalShown} onHide={onModalClose}>
        <Modal.Header closeButton>
          Pridať novú pobočku
        </Modal.Header>
        <Modal.Body>
          <AddNewCompanyOfficeModalForm onCancelClick={onModalClose} onAddOffice={onAddOffice} />
        </Modal.Body>
      </Modal>
    );
  }
}

AddNewCompanyOfficeModal.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onAddOffice: PropTypes.func,
};

AddNewCompanyOfficeModal.defaultProps = {
  onAddOffice: () => null,
};
 
export default AddNewCompanyOfficeModal;