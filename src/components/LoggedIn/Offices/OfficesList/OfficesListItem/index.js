import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListActionButton } from '../../../../ui';

class OfficesListItem extends Component {

  render() {
    const { number, officeCity, officeName, officeStreet, onDetailClick, onDeleteClick, officeId, onEditClick } = this.props;

    return (
      <tr>
        <td>{number}</td>
        <td>{officeName}</td>
        <td>{`${officeCity}, ${officeStreet}`}</td>
        <td><ListActionButton tooltip={`Zobraziť detail ${officeName}`} onClick={onDetailClick} type='info' /></td>
        <td><ListActionButton tooltip={`Upraviť pobočku ${officeName}`} onClick={onEditClick.bind(this, officeId)} type='edit' /></td>
        <td><ListActionButton tooltip={`Vymazať pobočku ${officeName}`} onClick={onDeleteClick.bind(this, officeId)} type='remove' /></td>
      </tr>
    );
  }
}

OfficesListItem.propTypes = {
  number: PropTypes.number.isRequired,
  officeId: PropTypes.string.isRequired,
  officeName: PropTypes.string.isRequired,
  officeCity: PropTypes.string.isRequired,
  officeStreet: PropTypes.string.isRequired,
  onDetailClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};
 
export default OfficesListItem;