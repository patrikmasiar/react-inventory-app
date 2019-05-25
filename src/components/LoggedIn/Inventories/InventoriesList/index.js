import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InventoriesListItem from './InventoriesListItem';
import { Table } from 'react-bootstrap';
import { history } from '../../../../store/index';

class InventoriesList extends Component {
  
  render() {
    const { data, onDeleteClick, userRole, onEditClick } = this.props;

    if(data.length === 0) {
      return <div className="list-no-data-result">Žiadne inventúry sa nenašli</div>;
    }

    return (
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Popis inventúry</th>
            <th>Dátum začiatku</th>
            <th>Dátum konca</th>
            <th>Pobočka</th>
            <th>Miestnosť</th>
            <th>Dostupná</th>
            <th>Uzavretá</th>
            <th></th>
            {userRole !== 'user' && <th></th>}
            {userRole !== 'user' && <th></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((inventory, index) => {
            return (
              <InventoriesListItem
                key={index}
                number={index+1}
                inventoryId={inventory.id}
                description={inventory.description}
                startDate={inventory.startDate}
                endDate={inventory.endDate}
                isAvailable={inventory.isAvailable}
                isClosed={inventory.isClosed}
                onDeleteClick={onDeleteClick}
                office={inventory.office !== null ? inventory.office.name : ''}
                officeRoom={`${inventory.officeRoom !== null ? inventory.officeRoom.name : ''} / ${inventory.officeRoom !== null ? inventory.officeRoom.tag : ''}`}
                onDetailClick={() => history.push(`InventoryDetail/${inventory.id}`)}
                userRole={userRole}
                onEditClick={onEditClick}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

InventoriesList.propTypes = {
  data: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
};
 
export default InventoriesList;