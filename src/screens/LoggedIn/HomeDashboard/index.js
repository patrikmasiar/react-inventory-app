import React, { Component } from 'react';
import { TitleHeader, WarningDashboardPanel } from '../../../components/ui';
import DashboardWarnings from '../../../components/LoggedIn/Dashboard/DashboardWarnings';
import DashboardWarningsitem from '../../../components/LoggedIn/Dashboard/DashboardWrarningsItem';
import { history } from '../../../store/index';
import { connect } from 'react-redux';
import SystemUsersPanel from '../../../components/DashboardPanels/SystemUsersPanel';
import AddNewCompanyUserModal from '../../../components/LoggedIn/Users/AddNewCompanyUserModal';
import SuperAdminCompanies from '../SuperAdminCompanies';
import SystemInventoriesPanel from '../../../components/DashboardPanels/SystemInventoriesPanel';
import SystemOfficesPanel from '../../../components/DashboardPanels/SystemOfficesPanel';
import AddNewCompanyOfficeModal from '../../../components/LoggedIn/Offices/AddNewCompanyOfficeModal';
import UserInventories from '../../../components/LoggedIn/Dashboard/UserInventories';
import SetterProgressBars from '../../../components/LoggedIn/Dashboard/SetterProgressBars';

class HomeDashboard extends Component {

  state = {
    isAddUserModalShown: false,
    isOfficesModalShown: false,
  };

  handleShowAddUserModal = () => {
    this.setState({ isAddUserModalShown: true });
  };

  handleCloseAddUserModal = () => {
    this.setState({ isAddUserModalShown: false });
  };

  handleShowAddOfficeModal = () => {
    this.setState({ isOfficesModalShown: true });
  };

  handleCloseAddOfficeModal = () => {
    this.setState({ isOfficesModalShown: false });
  };

  render() {
    const { companyAddressId, userRole, isUserBlocked, isCompanyBlocked } = this.props;
    const { isAddUserModalShown, isOfficesModalShown } = this.state;

    if (isUserBlocked || isCompanyBlocked) {
      const warningText = isUserBlocked ? 'Administrátor Vašej spoločnosti Vám zablokoval prístup do systému.' :
        'Vašej spoločnosti bol zablokovaný prístup do systému';
      
      return (
        <WarningDashboardPanel
          title={'Zablokovaný prístup'}
          text={warningText}
        />
      );
    }

    return (
      <div>
        {userRole !== 'superadmin' && <TitleHeader title={'Dashboard'} />}
        {(companyAddressId === null && ['setter', 'admin'].includes(userRole)) && (
          <DashboardWarnings>
            <DashboardWarningsitem
              text={'Nastavte adresné údaje spoločnosti'}
              buttonLabel={'Nastaviť'}
              onClick={ () => history.push('/CompanySettings') }
            />
          </DashboardWarnings>
        )}
        {['setter', 'admin'].includes(userRole) && (
          <SetterProgressBars />
        )}
        {(['setter', 'admin'].includes(userRole) && this.props.companyId !== null) && (
          <div className="row">
            <div className={userRole === 'admin' ? "col-md-6" : "col-md-4"}>
              <SystemUsersPanel
                onAddClick={this.handleShowAddUserModal}
                companyId={this.props.companyId}
                isAdmin={userRole === 'admin'}
              />
            </div>
            <div className={userRole === 'admin' ? "col-md-6" : "col-md-4"}>
              <SystemInventoriesPanel
                onAddClick={ () => history.push('/Inventories') }
                companyId={this.props.companyId}
                isAdmin={userRole === 'admin'}
              />
            </div>
            {userRole === 'setter' && (
              <div className="col-md-4">
                <SystemOfficesPanel
                  onAddClick={ this.handleShowAddOfficeModal }
                  companyId={this.props.companyId}
                />
              </div>
            )}
          </div>
        )}
        {userRole === 'setter' && (
          <AddNewCompanyUserModal
            isModalShown={isAddUserModalShown}
            onModalClose={this.handleCloseAddUserModal}
          />
        )}
        {userRole === 'setter' && (
          <AddNewCompanyOfficeModal
            isModalShown={isOfficesModalShown}
            onModalClose={this.handleCloseAddOfficeModal}
          />
        )}
        {(userRole === 'user' && this.props.companyId !== null) && (
          <UserInventories
            companyId={this.props.companyId}
            userId={this.props.userId}
            onAddClick={ () => history.push('/Inventories') }
          />
        )}
        {userRole === 'superadmin' && (
          <SuperAdminCompanies />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companyAddressId: state.company.companyAddressId,
  userRole: state.user.userRole,
  companyId: state.company.companyId,
  userId: state.user.loggedUserId,
  isUserBlocked: state.user.blocked,
  isCompanyBlocked: state.company.blocked,
});
  
export default connect(mapStateToProps)(HomeDashboard);