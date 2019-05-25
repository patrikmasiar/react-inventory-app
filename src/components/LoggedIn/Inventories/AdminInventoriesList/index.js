import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminInventoriesListItem from './AdminInventoriesListItem';
import { Table } from 'react-bootstrap';
import { history } from '../../../../store/index';

class AdminInventoriesList extends Component {
  
  render() {
    const { data, onCloseClick, onAvailableClick } = this.props;

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
            <th>Dostupnosť</th>
            <th>Uzavretá</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((inventory, index) => {
            return (
              <AdminInventoriesListItem
                key={index}
                number={index+1}
                inventoryId={inventory.id}
                description={inventory.description}
                startDate={inventory.startDate}
                endDate={inventory.endDate}
                isAvailable={inventory.isAvailable}
                isClosed={inventory.isClosed}
                onAvailableClick={onAvailableClick}
                onCloseClick={onCloseClick}
                office={inventory.office !== null ? inventory.office.name : ''}
                officeRoom={`${inventory.officeRoom !== null ? inventory.officeRoom.name : ''} / ${inventory.officeRoom !== null ? inventory.officeRoom.tag : ''}`}
                onDetailClick={() => history.push(`InventoryDetail/${inventory.id}`)}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

AdminInventoriesList.propTypes = {
  data: PropTypes.array.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onAvailableClick: PropTypes.func.isRequired,
};
 
export default AdminInventoriesList;