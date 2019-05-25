import React, { Component } from 'react';
import {validateEmail} from '../../../libs';
import LoginForm from '../../../components/LoggedOut/LoginForm';
import client from '../../../utils/apolloClient';
import { signinUser } from 'queries';
import store from '../../../store';
import {setLoggedUser, setLoggedCompany} from '../../../store/actions';
import { history } from '../../../store/index';
import AlertMessage from '../../../libs/AlertMessage';

class Login extends Component {

    state = {
        emailValue: '',
        passwordValue: '',
        submitLoading: false,
    };

    onEmailInputChange = (emailValue) => {
        this.setState({emailValue});
    };

    onPasswordInputChange = (passwordValue) => {
        this.setState({passwordValue});
    };
    
    onUserSubmitLoginForm = async (e) => {
        e.preventDefault();
        const {emailValue, passwordValue, submitLoading} = this.state;
        
        try {
            if(submitLoading) {
                return false;
            }

            if(emailValue.length < 2) {
                AlertMessage.showAlertMessage('Short email', 'danger', 'top-center');
                return false;
            }

            if(!validateEmail(emailValue)) {
                AlertMessage.showAlertMessage('Email is not valid', 'danger', 'top-center');
                return false;
            }

            if(passwordValue.length < 7) {
                AlertMessage.showAlertMessage('Short password', 'danger', 'top-center');
                return false;
            }

            this.setState({submitLoading: true});

            const response = await client.mutate({
                mutation: signinUser,
                variables: {
                    email: {
                      email: emailValue,
                      password: passwordValue
                    }
                }, 
            });

            if(response && response.data.signinUser.user.id) {
                this.setState({ submitLoading: false });
                store.dispatch(setLoggedUser({
                    loggedUserId: response.data.signinUser.user.id,
                    fullName: response.data.signinUser.user.fullName,
                    userRole: response.data.signinUser.user.role.role,
                    blocked: response.data.signinUser.user.blocked,
                }));

                const addressId = response.data.signinUser.user.company.address && response.data.signinUser.user.company.address.id ? response.data.signinUser.user.company.address.id : null;
                store.dispatch(setLoggedCompany({
                    companyId: response.data.signinUser.user.company.id,
                    companyName: response.data.signinUser.user.company.name,
                    companyAddressId: addressId,
                    blocked: response.data.signinUser.user.company.blocked,
                }));

                history.replace(`/`);
            }

        } catch (error) {
            console.log('Error submit login form', error);
            AlertMessage.showAlertMessage(error.message, 'danger', 'top-center');
            this.setState({ submitLoading: false });
        }
    };

    render() {
        const {emailValue, passwordValue, submitLoading} = this.state;
        
        return (
            <div>
                <LoginForm
                    history={history}
                    emailValue={emailValue}
                    loading={submitLoading}
                    passwordValue={passwordValue}
                    onSubmit={this.onUserSubmitLoginForm}
                    setEmail={this.onEmailInputChange}
                    setPassword={this.onPasswordInputChange}
                />
            </div>
        );
    }
}
 
export default Login;