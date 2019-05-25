import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UpdateCompanyModalForm from './UpdateCompanyModalForm';

class UpdateCompanyModal extends Component {

  render() {
    const { isModalShown, onModalClose, onUpdateCompany, companyId } = this.props;

    return (
      <Modal show={isModalShown} onHide={onModalClose}>
        <Modal.Header closeButton>
          Upraviť spoločnosť
        </Modal.Header>
        <Modal.Body>
          <UpdateCompanyModalForm companyId={companyId} onCancelClick={onModalClose} onUpdateCompany={onUpdateCompany} />
        </Modal.Body>
      </Modal>
    );
  }
}

UpdateCompanyModal.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onUpdateCompany: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
};

UpdateCompanyModal.defaultProps = {
  officeId: '',
};
 
export default UpdateCompanyModal;