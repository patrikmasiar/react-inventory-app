import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OfficesListItem from './OfficesListItem';
import { Table } from 'react-bootstrap';
import { history } from '../../../../store/index';

class OfficesList extends Component {
  
  render() {
    const { data, onDeleteClick, onEditClick } = this.props;

    if(data.length === 0) {
      return <div className="list-no-data-result">Žiadne pobočky sa nenašli</div>;
    }

    return (
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Názov pobočky</th>
            <th>Adresa pobočky</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((office, index) => {
            return (
              <OfficesListItem
                key={index}
                number={index + 1}
                officeId={office.id}
                officeName={office.name}
                officeCity={office.address.city}
                officeStreet={office.address.street}
                onDeleteClick={onDeleteClick}
                onEditClick={onEditClick}
                onDetailClick={() => history.push(`OfficeRooms/${office.id}`)}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

OfficesList.propTypes = {
  data: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};
 
export default OfficesList;