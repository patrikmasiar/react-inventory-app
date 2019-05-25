import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CopmaniesListItem from './CompaniesListItem';
import { Table } from 'react-bootstrap';

class CopmaniesList extends Component {
  
  render() {
    const { data, onEditClick, onBlockBtnClick } = this.props;

    if(data.length === 0) {
      return <div className="list-no-data-result">Žiadne spoločnosti sa nenašli</div>;
    }

    return (
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Názov spoločnosti</th>
            <th>Adresa spoločnosti</th>
            <th>Počet pobočiek</th>
            <th>Počet používateľov</th>
            <th>Blokovanie spoločnosti</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((company, index) => {
            return (
              <CopmaniesListItem
                key={index}
                companyId={company.id}
                number={index + 1}
                name={company.name}
                address={!!company.address ? `${company.address.city} / ${company.address.street}, ${company.address.postCode}` : '-----'}
                officesCount={company.offices.length}
                usersCount={company.users.length}
                isBlocked={company.blocked}
                onEditClick={onEditClick}
                onBlockBtnClick={onBlockBtnClick}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

CopmaniesList.propTypes = {
  data: PropTypes.array.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onBlockBtnClick: PropTypes.func.isRequired,
};
 
export default CopmaniesList;