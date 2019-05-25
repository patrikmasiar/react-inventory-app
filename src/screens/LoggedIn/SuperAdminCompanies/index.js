import React, { Component } from 'react';
import { Loader, TitleHeader } from '../../../components/ui';
import ActionHeaderPanel from '../../../components/LoggedIn/Companies/ActionHeaderPanel';
import client from '../../../utils/apolloClient';
import { allCompanies, updateCompanyBlockStatus } from 'queries';
import CopmaniesList from '../../../components/LoggedIn/Companies/CompaniesList';
import UpdateCompanyModal from '../../../components/LoggedIn/Companies/UpdateCompanyModal';
import AlertMessage from '../../../libs/AlertMessage';

const removeDiacritics = require('diacritics').remove;

class SuperAdminCompanies extends Component {

  state = {
    loading: false,
    searchQuery: '',
    companiesData: [],
    isEditModalShown: false,
    companyToEdit: '',
  };

  componentDidMount() {
    this.loadCompanies();
  }

  loadCompanies = async () => {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: allCompanies,
      });

      if(response && response.data.allCompanies) {
        this.setState({ companiesData: response.data.allCompanies });
      }

      this.setState({loading: false});

    } catch(error) {
      console.log(error);
      AlertMessage.showAlertMessage('Can not load data', 'danger', 'top-right');
      this.setState({ loading: false });
    }
  };

  handleSearchInputChange = (event) => {
    const { value: searchQuery } = event.target;
    this.setState({ searchQuery });
  };

  getCompanies() {
    const {searchQuery, companiesData} = this.state;

    if(searchQuery.length === 0) {
      return companiesData;
    }

    const query = removeDiacritics(searchQuery.toLowerCase());

    const filteredCompanies = companiesData.filter(company => {
      const companyName = removeDiacritics(company.name.toLowerCase());
      return companyName.includes(query);
    });

    return filteredCompanies;
  }

  handleShowEditModal = (companyId) => {
    this.setState({ isEditModalShown: true, companyToEdit: companyId });
  };

  handleCloseEditModal = () => {
    this.setState({ isEditModalShown: false, companyToEdit: '' });
  };

  handleChangeBlockStatus = async (companyId, status) => {
    try {
      const response = await client.mutate({
        mutation: updateCompanyBlockStatus,
        variables: {
          id: companyId,
          blocked: !status
        }
      });

      if(response && response.data.updateCompany) {
        this.handleUpdateCompany(response.data.updateCompany, response.data.updateCompany.id);
        AlertMessage.showAlertMessage('Successfully edited', 'success', 'top-right');
        this.setState({ loading: false });
      }

    } catch(error) {
      console.log(error);
      AlertMessage.showAlertMessage('Can not block company', 'danger', 'top-right');
      this.setState({ loading: false });
    }
  };

  handleUpdateCompany = (company, companyId) => {
    this.setState(prevState => {
      const companiesData = [...prevState.companiesData];
      const index = companiesData.findIndex(company => company.id === companyId);

      if (index !== -1) {
        companiesData[index] = company;
      }

      return {companiesData};
    });
  };

  render() {
    const { loading, searchQuery, isEditModalShown, companyToEdit } = this.state;
    
    if(loading) {
      return (
        <Loader />
      );
    }

    return (
      <div>
        <TitleHeader title={'Registrované spoločnosti'} />
        <ActionHeaderPanel
          searchInputValue={searchQuery}
          onSearchInputChange={this.handleSearchInputChange}
        />
        <CopmaniesList
          data={this.getCompanies()}
          onEditClick={this.handleShowEditModal}
          onBlockBtnClick={this.handleChangeBlockStatus}
        />
        <UpdateCompanyModal
          isModalShown={isEditModalShown}
          companyId={companyToEdit}
          onUpdateCompany={this.handleUpdateCompany}
          onModalClose={this.handleCloseEditModal}
        />
      </div>
    );
  }
}

export default SuperAdminCompanies;