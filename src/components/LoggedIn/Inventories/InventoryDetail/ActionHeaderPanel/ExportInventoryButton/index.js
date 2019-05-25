import React, { Component } from 'react';
import ReactExport from "react-data-export";
import PropTypes from 'prop-types';
import moment from 'moment';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ExportInventoryButton extends Component  {

  getDataSet() {
    const {inventoryData} = this.props;
    if(inventoryData !== null) {
      return [{
        description: !!inventoryData.description ? inventoryData.description : '',
        startDate: !!inventoryData.startDate ? moment(inventoryData.startDate).format('YYYY-MM-DD') : '',
        endDate: !!inventoryData.endDate ? moment(inventoryData.endDate).format('YYYY-MM-DD') : '',
        office: !!inventoryData.office ? inventoryData.office.name : '',
        officeRoom: !!inventoryData.officeRoom ? inventoryData.officeRoom.tag : '',
        users: !!inventoryData.users && inventoryData.users.length !== 0 ?
          inventoryData.users.map(user => user.email).join(", ") : '',
        customer: !!inventoryData.customer ? inventoryData.customer.fullName : '',
        propertyName: !!inventoryData.property ? inventoryData.property.title : '',
        propertyCount: !!inventoryData.property ? inventoryData.property.count : '',
      }];
    }
    return [];
  }

    render() {
      const { inventoryData } = this.props;

      return (
        <ExcelFile
          element={<button
            type="button"
            disabled={inventoryData !== null && !inventoryData.isAvailable}
            style={{ marginRight: 5 }} className="btn btn-sm btn-info">
              <span className="fa fa-download" style={{ marginRight: 5 }} /> Exportovať inventúru
            </button>
          }>
            <ExcelSheet data={this.getDataSet()} name="Inventory">
                <ExcelColumn value="description"/>
                <ExcelColumn value="startDate"/>
                <ExcelColumn value="endDate"/>
                <ExcelColumn value="office" />
                <ExcelColumn value="officeRoom" />
                <ExcelColumn value="users" />
                <ExcelColumn value="customer" />
                <ExcelColumn value="propertyName" />
                <ExcelColumn value="propertyCount" />
            </ExcelSheet>
        </ExcelFile>
      );
    }
}

ExportInventoryButton.propTypes = {
  inventoryData: PropTypes.object,
};

export default ExportInventoryButton;