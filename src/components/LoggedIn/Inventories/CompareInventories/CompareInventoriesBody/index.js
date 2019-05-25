import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import DataLabel from './DataLabel';
import moment from 'moment';

class CompareInventoriesBody extends Component {

  render() {
    const { firstData, secondData } = this.props;
        
    return (
      <div>
        <div className={"col-md-6"}>
        {!!firstData ? (
          <ListGroup>
            <ListGroupItem header="Popis / Titulok">
              <DataLabel labelOne={firstData.description} labelTwo={!!secondData ? secondData.description : null} />
            </ListGroupItem>
            <ListGroupItem header="Dátum začiatku inventúry">
              <DataLabel labelOne={moment(firstData.startDate).format("DD.MM.YYYY")} labelTwo={!!secondData ? moment(secondData.startDate).format("DD.MM.YYYY") : null} />
            </ListGroupItem>
            <ListGroupItem header="Dátum predpokladaného konca inventúry">
              <DataLabel labelOne={moment(firstData.endDate).format("DD.MM.YYYY")} labelTwo={!!secondData ? moment(secondData.endDate).format("DD.MM.YYYY") : null} />
            </ListGroupItem>
            <ListGroupItem header="Priradená pobočka">
              <DataLabel
                labelOne={!!firstData.office ? `${firstData.office.name} / ${firstData.office.address.city}, ${firstData.office.address.street}, ${firstData.office.address.postCode}` : '-'}
                labelTwo={!!secondData ? !!secondData.office ? `${secondData.office.name} / ${secondData.office.address.city}, ${secondData.office.address.street}, ${secondData.office.address.postCode}` : '-' : null }
                />
            </ListGroupItem>
            <ListGroupItem header="Priradená miestnosť pobočky">
              <DataLabel
                labelOne={!!firstData.officeRoom ? `${firstData.officeRoom.name} / ${firstData.officeRoom.tag}` : '-'}
                labelTwo={!!secondData ? !!secondData.officeRoom ? `${secondData.officeRoom.name} / ${secondData.officeRoom.tag}` : '-' : null}
              />
              </ListGroupItem>
            <ListGroupItem header="Priradený používateľia k inventúre">
              <DataLabel
                labelOne={!!firstData.users && (firstData.users.length > 0 ? firstData.users.map(user => user.fullName).join(", ") : '-')}
                labelTwo={!!secondData ? secondData.users.length > 0 ? secondData.users.map(user => user.fullName).join(", ") : '-' : null}
              />
            </ListGroupItem>
            <ListGroupItem header="Priradený užívateľ majetku">
              <DataLabel
                labelOne={!!firstData.customer ? firstData.customer.fullName : '-'}
                labelTwo={!!secondData ? !!secondData.customer ? secondData.customer.fullName : '-' : null}
              />
            </ListGroupItem>
            <ListGroupItem header="Informácia o majetku">
              <DataLabel
                labelOne={`${firstData.property.title} / ${firstData.property.count} ks`}
                labelTwo={!!secondData ? `${secondData.property.title} / ${secondData.property.count} ks` : null}
              />
            </ListGroupItem>
          </ListGroup>
        ) : (
          <div>
            <span style={{ fontWeight: 'bold', fontSize: 18, color: 'gray' }}>Nie je vybraná inventúra pre porovnanie</span>
          </div>
        )}
        </div>
        <div className={"col-md-6"}>
          {!!secondData ? (
            <div>
              <ListGroup>
                <ListGroupItem header="Popis / Titulok">
                  <DataLabel labelOne={secondData.description} labelTwo={!!firstData ? firstData.description : null} />
                </ListGroupItem>
                <ListGroupItem header="Dátum začiatku inventúry">
                  <DataLabel labelOne={moment(secondData.startDate).format("DD.MM.YYYY")} labelTwo={!!firstData ? moment(firstData.startDate).format("DD.MM.YYYY") : null} />
                </ListGroupItem>
                <ListGroupItem header="Dátum predpokladaného konca inventúry">
                  <DataLabel labelOne={moment(secondData.endDate).format("DD.MM.YYYY")} labelTwo={!!firstData ? moment(firstData.endDate).format("DD.MM.YYYY") : null} />
                </ListGroupItem>
                <ListGroupItem header="Priradená pobočka">
                  <DataLabel
                    labelOne={!!secondData.office ? `${secondData.office.name} / ${secondData.office.address.city}, ${secondData.office.address.street}, ${secondData.office.address.postCode}` : '-'}
                    labelTwo={!!firstData ? !!firstData.office ? `${firstData.office.name} / ${firstData.office.address.city}, ${firstData.office.address.street}, ${firstData.office.address.postCode}` : '-' : null }
                    />
                </ListGroupItem>
                <ListGroupItem header="Priradená miestnosť pobočky">
                  <DataLabel
                    labelOne={!!secondData.officeRoom ? `${secondData.officeRoom.name} / ${secondData.officeRoom.tag}` : '-'}
                    labelTwo={!!firstData ? !!firstData.officeRoom ? `${firstData.officeRoom.name} / ${firstData.officeRoom.tag}` : '-' : null}
                  />
                  </ListGroupItem>
                <ListGroupItem header="Priradený používateľia k inventúre">
                  <DataLabel
                    labelOne={!!secondData.users && (secondData.users.length > 0 ? secondData.users.map(user => user.fullName).join(", ") : '-')}
                    labelTwo={!!firstData ? firstData.users.length > 0 ? firstData.users.map(user => user.fullName).join(", ") : '-' : null}
                  />
                </ListGroupItem>
                <ListGroupItem header="Priradený užívateľ majetku">
                  <DataLabel
                    labelOne={!!secondData.customer ? secondData.customer.fullName : '-'}
                    labelTwo={!!firstData ? !!firstData.customer ? firstData.customer.fullName : '-' : null}
                  />
                </ListGroupItem>
                <ListGroupItem header="Informácia o majetku">
                  <DataLabel
                    labelOne={`${secondData.property.title} / ${secondData.property.count} ks`}
                    labelTwo={!!firstData ? `${firstData.property.title} / ${firstData.property.count} ks` : null}
                  />
                </ListGroupItem>
              </ListGroup>
            </div>
          ) : (
            <div>
              <span style={{ fontWeight: 'bold', fontSize: 18, color: 'gray' }}>Nie je vybraná inventúra pre porovnanie</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

CompareInventoriesBody.propTypes = {
  firstData: PropTypes.object,
  secondData: PropTypes.object,
};

CompareInventoriesBody.defaultProps = {
  firstData: null,
  secondData: null,
};
 
export default CompareInventoriesBody;