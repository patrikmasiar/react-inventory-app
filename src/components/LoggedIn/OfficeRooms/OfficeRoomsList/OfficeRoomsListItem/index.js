import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListActionButton } from '../../../../ui';

class OfficeRoomsListItem extends Component {

  render() {
    const { number, roomTag, roomName, onDeleteClick, roomId, onEditClick } = this.props;

    return (
      <tr>
        <td>{number}</td>
        <td>{roomName}</td>
        <td>{roomTag}</td>
        <td><ListActionButton tooltip={`Upraviť miestnosť ${roomName}`} onClick={onEditClick.bind(this, roomId)} type='edit' /></td>
        <td><ListActionButton tooltip={`Vymazať miestnosť ${roomName}`} onClick={onDeleteClick.bind(this, roomId)} type='remove' /></td>
      </tr>
    );
  }
}

OfficeRoomsListItem.propTypes = {
  number: PropTypes.number.isRequired,
  roomId: PropTypes.string.isRequired,
  roomTag: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired
};
 
export default OfficeRoomsListItem;