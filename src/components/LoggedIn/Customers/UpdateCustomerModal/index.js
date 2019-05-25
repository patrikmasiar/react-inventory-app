import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UpdateCustomerModalForm from './UpdateCustomerModalForm';

class UpdateCustomerModal extends Component {

  render() {
    const { isModalShown, onModalClose, onUpdateCustomer, customerId, companyId } = this.props;

    return (
      <Modal show={isModalShown} onHide={onModalClose}>
        <Modal.Header closeButton>
          Upraviť užívateľa majetku
        </Modal.Header>
        <Modal.Body>
          <UpdateCustomerModalForm customerId={customerId} companyId={companyId} onCancelClick={onModalClose} onUpdateCustomer={onUpdateCustomer} />
        </Modal.Body>
      </Modal>
    );
  }
}

UpdateCustomerModal.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onUpdateCustomer: PropTypes.func.isRequired,
  customerId: PropTypes.string.isRequired,
  companyId: PropTypes.string.isRequired,
};
 
export default UpdateCustomerModal;