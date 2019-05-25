import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListActionButton } from '../../../../ui';
import moment from 'moment';

class InventoriesListItem extends Component {

  render() {
    const { number, description, startDate, endDate, office, officeRoom, isAvailable, isClosed, onDeleteClick, inventoryId, onDetailClick, userRole, onEditClick } = this.props;

    return (
      <tr>
        <td>{number}</td>
        <td>{description}</td>
        <td>{moment(startDate).format('DD.MM.YYYY')}</td>
        <td>{moment(endDate).format('DD.MM.YYYY')}</td>
        <td>{office}</td>
        <td>{officeRoom}</td>
        <td><span style={{ color: isAvailable ? 'green' : 'red', fontSize: 20 }} className={isAvailable ? 'far fa-check-circle' : 'fa fa-ban'} /></td>
        <td><span style={{ color: isClosed ? 'green' : 'red', fontSize: 20 }} className={isClosed ? 'fa fa-check-circle' : 'fa fa-ban'} /></td>
        <td><ListActionButton tooltip={`Zobraziť detail ${description}`} onClick={onDetailClick} type='info' /></td>
        {userRole !== 'user' && <td><ListActionButton isDisabled={isClosed} tooltip={`Upraviť pobočku ${description}`} onClick={onEditClick.bind(this, inventoryId)} type='edit' /></td>}
        {userRole !== 'user' && <td><ListActionButton tooltip={`Vymazať pobočku ${description}`} onClick={onDeleteClick.bind(this, inventoryId)} type='remove' /></td>}
      </tr>
    );
  }
}

InventoriesListItem.propTypes = {
  number: PropTypes.number.isRequired,
  inventoryId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  office: PropTypes.string,
  officeRoom: PropTypes.string,
  isAvailable: PropTypes.bool.isRequired,
  isClosed: PropTypes.bool.isRequired,
  endDate: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDetailClick: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

InventoriesListItem.defaultProps = {
  office: '',
  officeRoom: '',
};
 
export default InventoriesListItem;