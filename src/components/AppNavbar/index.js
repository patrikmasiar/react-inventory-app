import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Navbar, NavItem, MenuItem, NavDropdown, Nav} from 'react-bootstrap';
import store from '../../store';
import { history } from '../../store/index';
import {resetLoggedCompany, resetLoggedUser} from '../../store/actions';

class AppNavbar extends Component {

  handleLogOut = (e) => {
    e.preventDefault();

    store.dispatch(resetLoggedUser());
    store.dispatch(resetLoggedCompany());

    history.replace('/');
  };
    
  render() {
    const {companyName, loggedUserName, userRole} = this.props;

    if (this.props.isUserBlocked || this.props.isCompanyBlocked) {
      return (
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <span style={{cursor: "pointer"}} onClick={() => history.push('/')} href="/">
                <strong>{companyName}</strong>
              </span>
              <span className="label label-danger" style={{marginLeft: 20}}>Zablokovaný prístup</span>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavDropdown eventKey={3} title={loggedUserName} id="basic-nav-dropdown">
                  <MenuItem onClick={this.handleLogOut} href="#" eventKey={3.2}>ODHLÁSIŤ SA</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      )
    }

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          {!userRole.includes('admin') ? (
            <Navbar.Brand>
              <span style={{cursor: "pointer"}} onClick={() => history.push('/')} href="/">
                <strong>{companyName}</strong>
              </span>
            </Navbar.Brand>
          ) : (
            <Navbar.Brand>
              <span style={{cursor: "pointer"}} onClick={() => history.push('/')} href="/">
                Dashboard
              </span>
            </Navbar.Brand>
          )}
          <Navbar.Toggle />
        </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {!userRole.includes('admin') && <NavItem eventKey={1} onClick={ () => history.push('/Inventories') }>Invenúry</NavItem>}
              {(!userRole.includes('admin') && userRole !== 'user') && <NavItem eventKey={2} onClick={ () => history.push('/Offices') }>Pobočky</NavItem>}
              {(!userRole.includes('admin') && userRole !== 'user') && <NavItem eventKey={3} onClick={ () => history.push('/Customers') }>Užívatelia majetku</NavItem>}
              {userRole === 'admin' && <NavItem eventKey={4} onClick={ () => history.push('/AllInventories') }>Vetky inventúry</NavItem>}
              {userRole === 'admin' && <NavItem eventKey={5} onClick={ () => history.push('/RegisteredUsers') }>Registrovaní používatelia</NavItem>}
            </Nav>
            <Nav pullRight>
              {(userRole !== 'superadmin' && userRole !== 'user') && (
                <NavDropdown eventKey={1} title="Nastavenia" id="basic-nav-dropdown">
                  {userRole === 'setter' && <MenuItem onClick={ () => history.push('/Users') } eventKey={1.1}>Používatelia</MenuItem>} 
                  {userRole === 'setter' && <MenuItem divider />}
                  {userRole !== 'user' && <MenuItem eventKey={1.2} onClick={ () => history.push('/CompanySettings') }>Nastavenia spoločnosti</MenuItem>}
                </NavDropdown>
              )}
              <NavDropdown eventKey={3} title={loggedUserName} id="basic-nav-dropdown">
                {userRole !== 'superadmin' && <MenuItem eventKey={3.1} onClick={ () => history.push('/PersonalInfoSettings') }>Osobné nastavenia</MenuItem>}
                {userRole !== 'superadmin' && <MenuItem divider />}
                <MenuItem onClick={this.handleLogOut} href="#" eventKey={3.2}>ODHLÁSIŤ SA</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  companyName: state.company.companyName,
  loggedUserName: state.user.fullName,
  userRole: state.user.userRole,
  isUserBlocked: state.user.blocked,
  isCompanyBlocked: state.company.blocked,
});
  
export default connect(mapStateToProps)(AppNavbar);
 