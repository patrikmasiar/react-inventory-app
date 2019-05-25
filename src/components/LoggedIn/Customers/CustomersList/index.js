import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomersListItem from './CustomersListItem';
import {Table} from 'react-bootstrap';

class CustomersList extends Component {

  render() {
    const {data, onRemoveClick, onEditClick} = this.props;

    if(data.length === 0) {
      return <div className="list-no-data-result">Žiadny užívatelia majetku sa nenašli</div>;
    }

    return (
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Celé meno</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer, index) => {
            return (
              <CustomersListItem
                key={index} number={index + 1}
                customerName={customer.fullName}
                customerId={customer.id}
                onRemoveClick={onRemoveClick}
                onEditClick={onEditClick}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

CustomersList.propTypes = {
  data: PropTypes.array.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired
};
 
export default CustomersList;