import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UsersListItem from './UsersListItem';
import {Table} from 'react-bootstrap';

class UsersList extends Component {

  render() {
    const {data, onRemoveClick, onEditClick} = this.props;

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
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => {
            return (
              <UsersListItem
                key={index} number={index + 1}
                userName={user.fullName}
                userRole={user.role.role}
                userEmail={user.email}
                userId={user.id}
                onEditClick={onEditClick}
                onRemoveClick={onRemoveClick}
                isBlocked={user.blocked}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

UsersList.propTypes = {
  data: PropTypes.array.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};
 
export default UsersList;