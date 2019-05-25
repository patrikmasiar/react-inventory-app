import React, { Component } from 'react';
import { Loader, TitleHeader } from '../../../components/ui';
import { connect } from 'react-redux';
import client from '../../../utils/apolloClient';
import { userDetail as userQuery } from 'queries';
import PersonalInfoPanel from '../../../components/LoggedIn/Users/PersonalUserSettings/PersonalInfoPanel';
//import UpdatePasswordPanel from '../../../components/LoggedIn/Users/PersonalUserSettings/UpdatePasswordPanel';

class UserSettings extends Component {

  state = {
    loading: false,
    userData: null,
  };

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = async () => {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: userQuery,
        variables: { id: this.props.loggedUserId }, 
      });

      if(response && response.data.User) {
        this.setState({ userData: response.data.User });
      }

      this.setState({loading: false});

    } catch(error) {
      console.log('Error load user info data', error);
      this.setState({loading: false});
    }
  };

  render() {
    const { loading, userData, } = this.state;
    
    if(loading) {
      return (
        <Loader />
      );
    }

    return (
      <div>
        <TitleHeader title={'Osobné nastavenia'} />
        <div className="row">
          <div className="col-md-6">
            <PersonalInfoPanel userId={this.props.loggedUserId} companyId={this.props.companyId} user={userData} />
          </div>
          {/*<div className="col-md-6">
            <UpdatePasswordPanel />
          </div>*/}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedUserId: state.user.loggedUserId,
  companyId: state.company.companyId,
});

export default connect(mapStateToProps)(UserSettings);