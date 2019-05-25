import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListActionButton } from '../../../../ui';

class CustomersListItem extends Component {

  render() {
    const { customerName, number, customerId, onRemoveClick, onEditClick } = this.props;

    return (
      <tr>
        <td><strong>{number}</strong></td>
        <td>{customerName}</td>
        <td><ListActionButton tooltip={`Upraviť používateľa ${customerName}`} onClick={onEditClick.bind(this, customerId)} type='edit' /></td>
        <td><ListActionButton tooltip={`Vymazať používateľa ${customerName}`} onClick={onRemoveClick.bind(this, customerId)} type='remove' /></td>
      </tr>
    );
  }
}

CustomersListItem.propTypes = {
  number: PropTypes.number.isRequired,
  customerName: PropTypes.string.isRequired,
  customerId: PropTypes.string.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};
 
export default CustomersListItem;