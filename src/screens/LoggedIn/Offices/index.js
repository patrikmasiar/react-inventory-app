import React, { Component } from 'react';
import { TitleHeader, Loader } from '../../../components/ui';
import { connect } from 'react-redux';
import OfficesList from '../../../components/LoggedIn/Offices/OfficesList';
import ActionHeaderPanel from '../../../components/LoggedIn/Offices/ActionHeaderPanel';
import AddNewCompanyOfficeModal from '../../../components/LoggedIn/Offices/AddNewCompanyOfficeModal';
import UpdateOfficeModal from '../../../components/LoggedIn/Offices/UpdateOfficeModal';
import client from '../../../utils/apolloClient';
import { allCompanyOffices as companyOfficesQuery, deleteOffice } from 'queries';
import AlertMessage from '../../../libs/AlertMessage';

const removeDiacritics = require('diacritics').remove;

class Offices extends Component {

  state = {
    loading: false,
    officesData: [],
    searchQuery: '',
    isModalShown: false,
    isUpdateModalShown: false,
    selectedUpdateOffice: '',
  };

  componentDidMount() {
    this.loadCompaniesData();
  }

  loadCompaniesData = async () => {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: companyOfficesQuery,
        variables: {filter: {company: {id: this.props.companyId}}}, 
      });

      if(response && response.data.allOffices) {
        this.setState({officesData: response.data.allOffices});
      }

      this.setState({loading: false});

    } catch(error) {
      console.log(error);
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      this.setState({loading: false});
    }
  };

  handleSearchInputChange = (event) => {
    const {value: searchQuery} = event.target;
    this.setState({searchQuery});
  };

  handleShowModal = () => {
    this.setState({ isModalShown: true });
  };

  handleModalClose = () => {
    this.setState({ isModalShown: false });
  };

  handleShowUpdateModal = (officeId) => {
    this.setState({ isUpdateModalShown: true, selectedUpdateOffice: officeId });
  };

  handleUpdateModalClose = () => {
    this.setState({ isUpdateModalShown: false, selectedUpdateOffice: '' });
  };

  getOffices() {
    const { searchQuery, officesData } = this.state;

    if(searchQuery.length === 0) {
      return officesData;
    }

    const query = removeDiacritics(searchQuery.toLowerCase());

    const filteredOffices = officesData.filter(office => {
      const officeName = removeDiacritics(office.name.toLowerCase());
      return officeName.includes(query);
    });

    return filteredOffices;
  }

  handleDeleteOffice = async (officeId) => {
    try {
    
      if (window.confirm("Naozaj si želáte vymazať pobočku?")) { 
        const response = await client.mutate({
          mutation: deleteOffice,
          variables: {id: officeId},
          refetchQueries: [
            {
              query: companyOfficesQuery,
              variables: {filter: {company: {id: this.props.companyId}}}, 
            }
          ],
        });

        if(response && response.data.deleteOffice.id) {
          this.setState(prevState => {
            const officesData = [...prevState.officesData];
            const officeIndex = officesData.findIndex(office => office.id === response.data.deleteOffice.id);

            if (officeIndex !== -1) {
              officesData.splice(officeIndex, 1);
            }
            return {officesData};
          });
          AlertMessage.showAlertMessage('Successfully removed', 'success', 'top-right');
        }
      }

    } catch(error) {
      AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
      console.log('Cant delete office', error);
    }
  };

  handleAddOffice = (office) => {
    this.setState(prevState => {
      const officesData = [...prevState.officesData];

      officesData.push(office);

      return {officesData};
    });
    AlertMessage.showAlertMessage('Successfully added', 'success', 'top-right');
  };

  handleUpdateOffice = (office, officeId) => {
    this.setState(prevState => {
      const officesData = [...prevState.officesData];
      const officeIndex = officesData.findIndex(office => office.id === officeId);

      if (officeIndex !== -1) {
        officesData[officeIndex] = office;
      }

      return {officesData};
    });
    AlertMessage.showAlertMessage('Successfully edited', 'success', 'top-right');
  };

  render() {
    const { loading, searchQuery, isModalShown, isUpdateModalShown, selectedUpdateOffice } = this.state;

    if(loading) {
      return (
        <Loader />
      );
    }

    return (
      <div>
        <TitleHeader title={'Pobočky'} />
        <ActionHeaderPanel
            searchInputValue={searchQuery}
            onSearchInputChange={this.handleSearchInputChange}
            onAddNewOfficeClick={this.handleShowModal}
        />
        <OfficesList
          data={this.getOffices()}
          onDeleteClick={this.handleDeleteOffice}
          onEditClick={this.handleShowUpdateModal}
        />
        <AddNewCompanyOfficeModal
          isModalShown={isModalShown}
          onModalClose={this.handleModalClose}
          onAddOffice={this.handleAddOffice}
        />
        <UpdateOfficeModal
          isModalShown={isUpdateModalShown}
          onModalClose={this.handleUpdateModalClose}
          onUpdateOffice={this.handleUpdateOffice}
          officeId={selectedUpdateOffice}
          companyId={this.props.companyId}
        />
      </div>
    );
  }
}
 
const mapStateToProps = state => ({
  companyId: state.company.companyId,
});

export default connect(mapStateToProps)(Offices);