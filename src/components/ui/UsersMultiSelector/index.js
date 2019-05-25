import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { allCompanyUsers as companyUsersQuery } from 'queries';
import client from '../../../utils/apolloClient';

class UsersMultiSelector extends Component {
    
  state = {
    isListShown: false,
    usersData: [],
    loading: false,
  };

  componentDidMount() {
    this.loadUsersData();
  }

  loadUsersData = async () => {
    try {
      this.setState({loading: true});

      const response = await client.query({
        query: companyUsersQuery,
        variables: {filter: {company: {id: this.props.companyId}, role: { id: "cjolmzc70k5bl01677yj9qfyu" }}}, 
      });

      if(response && response.data.allUsers) {
        this.setState({ usersData: response.data.allUsers });
      }

      this.setState({loading: false});

    } catch(error) {
      console.log(error);
      this.setState({loading: false});
    }
  };

  getLabel() {
    const { selectedUsers } = this.props;
    const { usersData } = this.state;

    if(selectedUsers.length > 0) {
      return usersData.filter(user => selectedUsers.includes(user.id)).map(user => user.fullName).join(', ');
    }

    return 'Vybrať používateľov';
  }

  handleToggleSelector = () => {
    if(this.state.isListShown) {
        this.closeSuggestions();
    } else {
        this.setState({ isListShown: true });
    }
  }

  closeSuggestions() {
    this.setState({ isListShown: false });
  }


  render() {
    const { isListShown, usersData, loading } = this.state;
    const { onSelectUser, selectedUsers } = this.props;

    if(loading) {
      return (
        <div>
          <label>Vybrať používateľov</label>
          <div className="user-multiselect-wrapper">
            <div className="user-multiselect-label">Načítavam...</div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <label>Vybrať používateľov</label>
        <div className="user-multiselect-wrapper">
          <div onClick={this.handleToggleSelector} className="user-multiselect-label">
            <span className="user-multiselect-label-users">{this.getLabel()}</span>
            <span className={isListShown ? 'fa fa-angle-up' : 'fa fa-angle-down'} style={{ fontSize: 20, marginLeft: 'auto', color: 'gray' }} />
          </div>
          {isListShown && (
            <div className="user-multiselect-list">
              {usersData.map((user, index) => {
                const selected = selectedUsers.includes(user.id);
                const iconColor = selected ? '#313d51' : '#b7b7b7';
                const itemColor = selected ? '#ccc' : 'transparent';
                const itemFontWeight = selected ? 'bold' : '400';

                return (
                  <div style={{ backgroundColor: itemColor, fontWeight: itemFontWeight }} onClick={onSelectUser.bind(this, user.id)} className="user-multiselect-item" key={index}>
                    <span>{user.fullName}</span>
                    <span style={{ fontSize: 18, color: iconColor }} className="fa fa-check-square" />
                  </div>
                );
                }
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

UsersMultiSelector.propTypes = {
  companyId: PropTypes.string.isRequired,
  selectedUsers: PropTypes.array.isRequired,
  onSelectUser: PropTypes.func.isRequired,
};
 
export { UsersMultiSelector };