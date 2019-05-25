import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';

class InventoryDetail extends Component {

  render() {
    const { data } = this.props;

    if(data === null) {
      return <div className="list-no-data-result">Žiadne načítané dáta o inventúre</div>;
    }
      
    return (
      <ListGroup>
        <ListGroupItem header="Popis / Titulok">{data.description}</ListGroupItem>
        <ListGroupItem header="Dátum začiatku inventúry">{moment(data.startDate).format("DD.MM.YYYY")}</ListGroupItem>
        <ListGroupItem header="Dátum predpokladaného konca inventúry">{moment(data.endDate).format("DD.MM.YYYY")}</ListGroupItem>
        <ListGroupItem header="Priradená pobočka">{!!data.office ? `${data.office.name} / ${data.office.address.city}, ${data.office.address.street}, ${data.office.address.postCode}` : '-'}</ListGroupItem>
        <ListGroupItem header="Priradená miestnosť pobočky">{!!data.officeRoom ? `${data.officeRoom.name} / ${data.officeRoom.tag}` : '-'}</ListGroupItem>
        <ListGroupItem header="Priradený používateľia k inventúre">{!!data.users && (data.users.length > 0 ? data.users.map(user => user.fullName).join(", ") : '-')}</ListGroupItem>
        <ListGroupItem header="Priradený užívateľ majetku">{!!data.customer ? data.customer.fullName : '-'}</ListGroupItem>
        <ListGroupItem header="Informácia o majetku">{`${data.property.title} / ${data.property.count} ks`}</ListGroupItem>
        <ListGroupItem bsStyle={data.isAvailable ? 'success' : 'danger'}>{data.isAvailable ? "Dostupná" : "Nedostupná"}</ListGroupItem>
        <ListGroupItem bsStyle={data.isClosed ? 'success' : 'danger'}>{data.isClosed ? "Uzavretá" : "Nie je uzvretá"}</ListGroupItem>
      </ListGroup>
    );
  }
}

InventoryDetail.propTypes = {
  data: PropTypes.object,
};

InventoryDetail.defaultProps = {
  data: null,
};
 
export default InventoryDetail;