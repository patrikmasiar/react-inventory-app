import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminUsersListItem from './AdminUsersListItem';
import {Table} from 'react-bootstrap';

class AdminUsersList extends Component {

  render() {
    const {data, onRemoveClick, onBlockBtnClick} = this.props;

    if(data.length === 0) {
      return <div className="list-no-data-result">Žiadny používatelia sa nenašli</div>;
    }

    return (
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Celé meno</th>
            <th>E-mail</th>
            <th>Rola</th>
            <th>Spoločnosť</th>
            <th>Blokovanie</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => {
            return (
              <AdminUsersListItem
                key={index} number={index + 1}
                userName={user.fullName}
                userRole={user.role.role}
                userEmail={user.email}
                userId={user.id}
                companyName={user.company.name}
                onRemoveClick={onRemoveClick}
                isBlocked={user.blocked}
                onBlockBtnClick={onBlockBtnClick}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

AdminUsersList.propTypes = {
  data: PropTypes.array.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onBlockBtnClick: PropTypes.func.isRequired,
};
 
export default AdminUsersList;