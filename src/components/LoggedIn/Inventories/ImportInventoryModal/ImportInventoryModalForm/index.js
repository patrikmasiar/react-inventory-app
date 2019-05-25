import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from '../../../../ui';
import client from '../../../../../utils/apolloClient';
import {
  createInventory,
  allCompanyInventories as inventoriesQuery,
  companyDataForImport,
} from 'queries';
import XLSX from 'xlsx';

class ImportInventoryModalForm extends Component {
  
  state = {
    submitLoading: false,
    dropAreaShown: false,
    uploadedFileName: null,
    uploadedData: [],
    usersData: [],
    officesData: [],
    customersData: [],
    officeRoomsData: [],
    loading: false,
  };

  inputRef = null;

  componentDidMount() {
    this.loadDataForImport();
  }
  
  handleUploadBtnClick = (event) => {
    event.target.blur();
    this.inputRef.click();
  };

  handleFileInputChange = (event) => {
    const { files } = event.target;
    const file = files[0];

    this.handleReadExcelData(file);
  };

  async loadDataForImport() {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: companyDataForImport,
        variables: {id: this.props.companyId},
      });

      if(response && response.data.Company) {
        this.setState({
          usersData: response.data.Company.users,
          officesData: response.data.Company.offices,
          customersData: response.data.Company.customers,
          officeRoomsData: response.data.Company.officeRooms,
        })
      }

      this.setState({loading: false});

    } catch(error) {
      console.log(error);
      this.setState({loading: false});
    }
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { uploadedData, submitLoading, usersData, officesData, customersData, officeRoomsData } = this.state;

    try {
      if(submitLoading) {
        return false;
      }

      if(uploadedData.length === 0) {
        alert('Žiadne dáta neboli nahrané');
        return false;
      }

      uploadedData.map(async data => {
        this.setState({ submitLoading: true });
        const usersEmailsFromFile =  !!data[5] ? data[5].split(",").map(user => user) : [];
        const customersFromFile = !!data[6] ? data[6].split(",").map(customer => customer) : [];
        const officesFromFile = !!data[3] ? data[3].split(",").map(office => office) : [];
        const officeRoomsFromFile = !!data[4] ? data[4].split(",").map(officeRoom => officeRoom) : [];
        
        const usersIdsArray = usersEmailsFromFile.map(userEmail => {
          const filteredUsers = usersData.filter(user => user.email === userEmail.trim());
          return filteredUsers[0].id;
        });

        const customersIdsArray = customersFromFile.map(customerName => {
          const filteredCustomers = customersData.filter(customer => customer.fullName === customerName.trim());
          return filteredCustomers[0].id;
        });

        const officesIdsArray = officesFromFile.map(officeName => {
          const filteredOffices = officesData.filter(office => office.name === officeName.trim());
          return filteredOffices[0].id;
        });

        const officeRoomsIdsArray = officeRoomsFromFile.map(officeRoomTag => {
          const filteredOfficeRooms = officeRoomsData.filter(officeRoom => officeRoom.tag === officeRoomTag.trim());

          return filteredOfficeRooms[0].id;
        });

        const response = await client.mutate({
          mutation: createInventory,
          variables: {
            description: data[0],
            startDate: data[1],
            endDate: data[2],
            isAvailable: false,
            isClosed: false,
            companyId: this.props.companyId,
            customerId: customersIdsArray.length !== 0 ? customersIdsArray[0] : null,
            officeId: officesIdsArray.length !== 0 ? officesIdsArray[0] : null,
            officeRoomId: officeRoomsIdsArray.length !== 0 ? officeRoomsIdsArray[0] : null,
            usersIds: usersIdsArray.length !== 0 ? usersIdsArray : null,
            property: {
              count: parseInt(data[8]),
              title: data[7],
              customerId: customersIdsArray.length !== 0 ? customersIdsArray[0] : null,
            }
          },
          refetchQueries: [{
            query: inventoriesQuery,
            variables: {filter: {company: { id: this.props.companyId }}}, 
          }]
        });

        if(response && response.data.createInventory) {
          this.setState({ submitLoading: false, uploadedFileName: null, uploadedData: [] });
          this.props.onSuccessImport();
        }
      });

    } catch (error) {
      console.log('Error upload document data to server', error);
      this.setState({ submitLoading: false });
    }
  };

  handleDragEnter = (event) => {
    event.preventDefault();
    this.setState({ dropAreaShown: true });
  };

  handleDragLeave = (event) => {
    event.preventDefault();
    this.setState({ dropAreaShown: false });
  };

  handleReadExcelData = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => { //evt = on_file_select event
      /* Parse data */
      const bstr = event.target.result;
      const wb = XLSX.read(bstr, {type:'binary'});
      console.log(file)
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {header:1});
      /* Update state */
      this.setState({ uploadedFileName: file.name, uploadedData: data, dropAreaShown: false });
    };

    reader.readAsBinaryString(file);
  };

  handleDrop = async (event) => {
    event.preventDefault();

    const { files } = event.dataTransfer;
    const file = files[0];

    this.handleReadExcelData(file);
  };

  preventDefault = (event) => {
    event.preventDefault();
  };
  
  render() {
    const { onCancelClick } = this.props;
    const { submitLoading, dropAreaShown, uploadedFileName, loading } = this.state;
    const btnTitle = submitLoading ? 'Načítavam...' : 'Potvrdiť';

    if(submitLoading || loading) {
      return (
        <div style={{ position: 'relative', height: 200 }}>
          <Loader />
        </div>
      );
    }

    return (
      <div>
        <div className="form-group">
          <button type="button" className="btn btn-block btn-default" onClick={this.handleUploadBtnClick}>Importovať XLSX súbor</button>
          <input style={{ display: 'none' }} type="file" onChange={this.handleFileInputChange} className="form-control" ref={ref => this.inputRef = ref} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
        </div>
        <div onDragEnter={this.handleDragEnter} onDragOver={this.preventDefault} style={{ marginBottom: 20 }} className="import-inventory-area">
          <span style={{ fontWeight: '100' }}>Potiahnite sem vybraný súbor</span>
          <span style={{ marginTop: 15, fontSize: 30 }} className="fa fa-file-excel" />
          {(dropAreaShown || uploadedFileName !== null) && (
            <div onDragLeave={this.handleDragLeave} onDrop={this.handleDrop} className="import-inventory-drop-area">
              <span>{uploadedFileName !== null ? uploadedFileName : 'Pustite vybraný súbor'}</span>
            </div>
          )}
        </div>
        <div className="modal-form-footer-wrapper">
          <button disabled={submitLoading || loading} onClick={onCancelClick} className="btn btn-sm btn-default" type="button">
            Zatvoriť
          </button>
          <button style={{ marginLeft: 'auto' }} onClick={this.handleFormSubmit} disabled={submitLoading || loading} className="btn btn-sm btn-primary" type="button">
            {btnTitle}
          </button>
        </div>
      </div>
    );
  }
}

ImportInventoryModalForm.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onSuccessImport: PropTypes.func,
};

ImportInventoryModalForm.defaultProps = {
  onSuccessImport: () => null,
};

const mapStateToProps = state => ({
  companyId: state.company.companyId,
});

export default connect(mapStateToProps)(ImportInventoryModalForm);