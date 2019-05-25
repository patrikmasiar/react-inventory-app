import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListActionButton } from '../../../../ui';
import moment from 'moment';

class AdminInventoriesListItem extends Component {

  render() {
    const { number, description, startDate, endDate, office, officeRoom, isAvailable, isClosed, inventoryId, onDetailClick, onCloseClick, onAvailableClick } = this.props;
    const availableBtnClass = isAvailable ? 'btn btn-xs btn-danger' : 'btn btn-xs btn-warning';
    const availableBtnTitle = isAvailable ? 'Nepovoliť' : 'Povoliť';
    const closedBtnClass = isClosed ? 'btn btn-xs btn-danger' : 'btn btn-xs btn-warning';
    const closedBtnTitle = isClosed ? 'Otvoriť' : 'Uzavrieť';

    return (
      <tr>
        <td>{number}</td>
        <td>{description}</td>
        <td>{moment(startDate).format('DD.MM.YYYY')}</td>
        <td>{moment(endDate).format('DD.MM.YYYY')}</td>
        <td>{office}</td>
        <td>{officeRoom}</td>
        <td>
          <button onClick={onAvailableClick.bind(this, inventoryId, isAvailable)} className={availableBtnClass} type="button">{availableBtnTitle}</button>
        </td>
        <td>
          <button onClick={onCloseClick.bind(this, inventoryId, isClosed)} className={closedBtnClass} type="button">{closedBtnTitle}</button>
        </td>
        <td><ListActionButton tooltip={`Zobraziť detail ${description}`} onClick={onDetailClick} type='info' /></td>
      </tr>
    );
  }
}

AdminInventoriesListItem.propTypes = {
  number: PropTypes.number.isRequired,
  inventoryId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  office: PropTypes.string,
  officeRoom: PropTypes.string,
  isAvailable: PropTypes.bool.isRequired,
  isClosed: PropTypes.bool.isRequired,
  endDate: PropTypes.string.isRequired,
  onDetailClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onAvailableClick: PropTypes.func.isRequired,
};

AdminInventoriesListItem.defaultProps = {
  office: '',
  officeRoom: '',
};
 
export default AdminInventoriesListItem;