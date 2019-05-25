import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoggedInRouter, LoggedOutRouter } from './router';
import { Loader, AlertMessage as AlertMessageComponent } from './components/ui';
import './style/style.css';
import AlertMessage from './libs/AlertMessage';

class App extends Component {

  renderApp = () => {
    const {loggedUserId, isCompanyBlocked, isUserBlocked} = this.props;
    const isBlocked = isUserBlocked || isCompanyBlocked;

    return (
      <div>
        {!loggedUserId ? <LoggedOutRouter /> : <LoggedInRouter isBlocked={isBlocked} />}
        <AlertMessageComponent ref={ref => AlertMessage.setAlertMessageRef(ref)} />
      </div>
    )
  };

  render() {
    const { appIsReady } = this.props;

    if (!appIsReady) {
      return <Loader />
    }
    return this.renderApp();
  }
}


const mapStateToProps = state => ({
  appIsReady: state.init.appIsReady,
  loggedUserId: state.user.loggedUserId,
  isCompanyBlocked: state.company.blocked,
  isUserBlocked: state.user.blocked,
});

export default connect(mapStateToProps)(App);
