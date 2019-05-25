import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListActionButton } from '../../../../ui';

class UsersListItem extends Component {

  render() {
    const {userName, userEmail, userRole, number, userId, onRemoveClick, onEditClick, isBlocked} = this.props;
    const roleName = userRole === 'setter' ? 'Správca systému' : 'Používateľ systému';

    return (
      <tr>
        <td><strong>{number}</strong></td>
        <td style={isBlocked ? {color: 'red'} : null}>{userName}</td>
        <td style={isBlocked ? {color: 'red'} : null}>{userEmail}</td>
        <td style={isBlocked ? {color: 'red'} : null}>{roleName}</td>
        <td><ListActionButton isDisabled={isBlocked} tooltip={`Upraviť používateľa ${userName}`} onClick={onEditClick.bind(this, userId)} type='edit' /></td>
        <td><ListActionButton tooltip={`Vymazať používateľa ${userName}`} onClick={onRemoveClick.bind(this, userId)} type='remove' /></td>
      </tr>
    );
  }
}

UsersListItem.propTypes = {
  number: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired, 
  onRemoveClick: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
};
 
export default UsersListItem;