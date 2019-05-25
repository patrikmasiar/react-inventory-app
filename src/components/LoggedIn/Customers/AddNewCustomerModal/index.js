import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddNewCustomerModalForm from './AddNewCustomerModalForm';

class AddNewCustomerModal extends Component {

  render() {
    const { isModalShown, onModalClose, onAddCustomer } = this.props;

    return (
      <Modal show={isModalShown} onHide={onModalClose}>
        <Modal.Header closeButton>
          Pridať nového užívateľa majetku
        </Modal.Header>
        <Modal.Body>
          <AddNewCustomerModalForm onCancelClick={onModalClose} onAddCustomer={onAddCustomer} />
        </Modal.Body>
      </Modal>
    );
  }
}

AddNewCustomerModal.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onAddCustomer: PropTypes.func.isRequired,
};
 
export default AddNewCustomerModal;