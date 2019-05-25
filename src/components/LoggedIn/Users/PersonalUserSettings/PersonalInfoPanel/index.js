import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import client from '../../../../../utils/apolloClient';
import { updateUser, allCompanyUsers } from 'queries';
import { updateLoggedUserName } from '../../../../../store/actions';
import store from '../../../../../store';

class PersonalInfoPanel extends Component {

  state = {
    isEditable: false,
    submitLoading: false,
    fullName: '',
    email: '',
  };

  componentDidMount() {
    if(this.props.user !== null) {
      this.setState({
        fullName: this.props.user.fullName,
        email: this.props.user.email
      });
    }
  }

  handleFullNameChange = (event) => {
    const { value: fullName } = event.target;
    this.setState({ fullName });
  };

  handleToggleEditable = () => {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable,
    }));
  };

  handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      this.setState({ submitLoading: true });

      const response = await client.mutate({
        mutation: updateUser,
        variables: {
          id: this.props.userId,
          fullName: this.state.fullName,
        },
        refetchQueries: [{
          query: allCompanyUsers,
          variables: {filter: {company: { id: this.props.companyId }}}, 
        }]
      });

      if(response && response.data.updateUser.id) {
        this.setState({ isEditable: false });
          store.dispatch(updateLoggedUserName({
            fullName: this.state.fullName,
        }));
      }

      this.setState({ submitLoading: false });
    } catch(error) {
      console.log('Error update user info', error);
      this.setState({ submitLoading: false });
    }
  };

  render() {
    const { isEditable, submitLoading, fullName, email } = this.state;
    const disabledStyle = {background: 'white', borderWidth: 2, borderColor: 'white'};
    const btnTitle = submitLoading ? 'Načítavam' : 'Uložiť';

    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title>
            <div className="settings-panel-header">
              Osobné informácie
              <button onClick={this.handleToggleEditable} style={{ padding: 5, color: 'white' }} className="btn btn-link"><span className="fa fa-edit" /></button>
            </div>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <form onSubmit={this.handleSubmitForm} method="POST">
            <fieldset disabled={submitLoading}>
              <div className="form-group">
                <label>Celé meno</label>
                <input style={isEditable ? null : disabledStyle} disabled={!isEditable} type="text" className="form-control" value={fullName} onChange={this.handleFullNameChange} placeholder="Celé meno" required />
              </div>
              <div className="form-group">
                <label>E-mail (prihlasovacie meno)</label>
                <input style={disabledStyle} disabled type="email" className="form-control" value={email} placeholder="E-mail" required />
              </div>
            </fieldset>
            {isEditable && (
              <div className="text-right">
                <button onClick={this.handleToggleEditable} disabled={submitLoading} type="button" className="btn btn-default">Zrušiť</button>
                <button disabled={submitLoading} style={{ marginLeft: 5 }} type="submit" className="btn btn-primary">{btnTitle}</button>
              </div>
            )}
          </form>
        </Panel.Body>
      </Panel>
    );
  }
}

PersonalInfoPanel.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string.isRequired,
  companyId: PropTypes.string.isRequired,
};

PersonalInfoPanel.defaultProps = {
  user: null
};
 
export default PersonalInfoPanel;