import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListActionButton } from '../../../../ui';

class AdminUsersListItem extends Component {

  render() {
    const {userName, userEmail, userRole, number, userId, onRemoveClick, companyName, isBlocked, onBlockBtnClick} = this.props;
    const roleName = userRole === 'setter' ? 'Správca systému' : 'Používateľ systému';
    const blockBtnClass = isBlocked ? 'btn btn-xs btn-danger' : 'btn btn-xs btn-warning';
    const blockBtnTitle = isBlocked ? 'Odblokovať' : 'Zablokovať';

    return (
      <tr>
        <td><strong>{number}</strong></td>
        <td>{userName}</td>
        <td>{userEmail}</td>
        <td>{roleName}</td>
        <td>{companyName}</td>
        <td>
          <button onClick={onBlockBtnClick.bind(this, userId, isBlocked)} className={blockBtnClass} type="button">{blockBtnTitle}</button>
        </td>
        <td><ListActionButton tooltip={`Vymazať používateľa ${userName}`} onClick={onRemoveClick.bind(this, userId)} type='remove' /></td>
      </tr>
    );
  }
}

AdminUsersListItem.propTypes = {
  number: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired, 
  onRemoveClick: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  onBlockBtnClick: PropTypes.func.isRequired,
};
 
export default AdminUsersListItem;