import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListActionButton } from '../../../../ui';

class CopmaniesListItem extends Component {

  render() {
    const { number, name, address, officesCount, usersCount, isBlocked, onEditClick, companyId, onBlockBtnClick } = this.props;
    const blockBtnClass = isBlocked ? 'btn btn-xs btn-danger' : 'btn btn-xs btn-warning';
    const blockBtnTitle = isBlocked ? 'Odblokovať' : 'Zablokovať';

    return (
      <tr>
        <td>{number}</td>
        <td>{name}</td>
        <td>{address}</td>
        <td>{officesCount}</td>
        <td>{usersCount}</td>
        <td>
          <button onClick={onBlockBtnClick.bind(this, companyId, isBlocked)} className={blockBtnClass} type="button">{blockBtnTitle}</button>
        </td>
        <td><ListActionButton tooltip={`Upraviť spolčnosť ${name}`} onClick={onEditClick.bind(this, companyId)} type='edit' /></td>
      </tr>
    );
  }
}

CopmaniesListItem.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  officesCount: PropTypes.number.isRequired,
  usersCount: PropTypes.number.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  companyId: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onBlockBtnClick: PropTypes.func.isRequired,
};
 
export default CopmaniesListItem;