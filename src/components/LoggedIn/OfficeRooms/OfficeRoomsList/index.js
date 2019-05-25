import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import OfficeRoomsListItem from './OfficeRoomsListItem';

class OfficeRoomsList extends Component {
  
  render() {
    const {data, onDeleteClick, onEditClick} = this.props;

    if(data.length === 0) {
      return <div className="list-no-data-result">Žiadne miestnosti sa nenašli</div>;
    }

    return (
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Názov miestnosti</th>
            <th>Označenie miestnosti</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((room, index) => {
            return (
              <OfficeRoomsListItem
                key={index}
                number={index + 1}
                roomName={room.name}
                roomTag={room.tag}
                roomId={room.id}
                onDeleteClick={onDeleteClick}
                onEditClick={onEditClick}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

OfficeRoomsList.propTypes = {
  data: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};
 
export default OfficeRoomsList;