import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

//components
import AppNavbar from '../components/AppNavbar';

//LOGGED IN SCREENS
import HomeDashboard from '../screens/LoggedIn/HomeDashboard';
import Inventories from '../screens/LoggedIn/Inventories';
import Offices from '../screens/LoggedIn/Offices';
import CompanySettings from '../screens/LoggedIn/CompanySettings';
import Users from '../screens/LoggedIn/Users';
import OfficeRooms from '../screens/LoggedIn/OfficeRooms';
import Customers from '../screens/LoggedIn/Customers';
import AddInventory from '../screens/LoggedIn/AddInventory';
import InventoryDetail from '../screens/LoggedIn/InventoryDetail';
import UserSettings from '../screens/LoggedIn/UserSettings';
import SuperAdminCompanies from '../screens/LoggedIn/SuperAdminCompanies';
import AdminUsers from '../screens/LoggedIn/AdminUsers';
import AdminInventories from '../screens/LoggedIn/AdminInventories';
import CompareInventories from '../screens/LoggedIn/CompareInventories';

//LOGGED OUT SCREENS
import Login from '../screens/LoggedOut/Login';
import Registration from '../screens/LoggedOut/Registration';
import ResetPassword from '../screens/LoggedOut/ResetPassword';

//router history from redux
import { history } from '../store/index';

const LoggedInRouter = ({isBlocked}) => {
    return (
        <ConnectedRouter history={history}>
            <div>
                <AppNavbar />
                <div className="container-fluid">
                    <Switch>
                        <Route exact={true} path="/" component={HomeDashboard} />
                        {!isBlocked && <Route exact={true} path="/Inventories" component={Inventories} />}
                        {!isBlocked && <Route exact={true} path="/Offices" component={Offices} />}
                        {!isBlocked && <Route exact={true} path="/CompanySettings" component={CompanySettings} />}
                        {!isBlocked && <Route exact={true} path="/Users" component={Users} />}
                        {!isBlocked && <Route exact={true} path={"/OfficeRooms/:officeId"} component={OfficeRooms} />}
                        {!isBlocked && <Route exact={true} path={"/Customers"} component={Customers} />}
                        {!isBlocked && <Route exact={true} path={"/AddInventory"} component={AddInventory} />}
                        {!isBlocked && <Route exact={true} path={"/InventoryDetail/:inventoryId"} component={InventoryDetail} />}
                        {!isBlocked && <Route exact={true} path={"/PersonalInfoSettings"} component={UserSettings} />}
                        {!isBlocked && <Route exact={true} path={"/RegisteredCompanies"} component={SuperAdminCompanies} />}
                        {!isBlocked && <Route exact={true} path={"/RegisteredUsers"} component={AdminUsers} />}
                        {!isBlocked && <Route exact={true} path={"/AllInventories"} component={AdminInventories} />}
                        {!isBlocked && <Route exact={true} path={"/CompareInventories"} component={CompareInventories} />}
                    </Switch>
                </div>
            </div>
        </ConnectedRouter>
    );
};

const LoggedOutRouter = () => {
    return (
        <ConnectedRouter history={history}>
            <div className={'container'}>
                <Switch>
                    <Route exact={true} path="/" component={Login} />
                    <Route exact={true} path="/Login" component={Login} />
                    <Route exact={true} path="/Registration" component={Registration} />
                    <Route exact={true} path="/ResetPassword" component={ResetPassword} />
                </Switch>
            </div>
        </ConnectedRouter>
    );
};

export { LoggedInRouter, LoggedOutRouter };