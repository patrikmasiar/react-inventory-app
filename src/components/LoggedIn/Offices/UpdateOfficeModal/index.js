import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UpdateOfficeModalForm from './UpdateOfficeModalForm';

class UpdateOfficeModal extends Component {

  render() {
    const { isModalShown, onModalClose, onUpdateOffice, officeId, companyId } = this.props;

    return (
      <Modal show={isModalShown} onHide={onModalClose}>
        <Modal.Header closeButton>
          Upraviť pobočku
        </Modal.Header>
        <Modal.Body>
          <UpdateOfficeModalForm officeId={officeId} companyId={companyId} onCancelClick={onModalClose} onUpdateOffice={onUpdateOffice} />
        </Modal.Body>
      </Modal>
    );
  }
}

UpdateOfficeModal.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onUpdateOffice: PropTypes.func.isRequired,
  officeId: PropTypes.string,
  companyId: PropTypes.string.isRequired,
};

UpdateOfficeModal.defaultProps = {
  officeId: '',
};
 
export default UpdateOfficeModal;