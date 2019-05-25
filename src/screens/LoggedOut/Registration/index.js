import React, { Component } from 'react';
import { validateEmail } from '../../../libs';
import RegistrationForm from '../../../components/LoggedOut/RegistrationForm';
import client from '../../../utils/apolloClient';
import { createUser } from 'queries';
import { history } from '../../../store/index';
import AlertMessage from '../../../libs/AlertMessage';

const ROLE_SETTER = 'cjolmz8ymk41j018378yuqc9w';

class Registration extends Component {

    state = {
        submitLoading: false,
        companyValue: '',
        fullNameValue: '',
        passwordValue: '',
        passwordAgainValue: '',
        emailValue: '',
    };

    handleChangeCompanyName = (companyValue) => {
        this.setState({companyValue});
    };

    handleChangeFullName = (fullNameValue) => {
        this.setState({fullNameValue});
    };

    handleChangePassword = (passwordValue) => {
        this.setState({passwordValue});
    };

    handleChangePasswordAgain = (passwordAgainValue) => {
        this.setState({passwordAgainValue});
    };

    handleEmailChange = (emailValue) => {
        this.setState({emailValue});
    };

    onUserSubmitLoginForm = async (e) => {
        e.preventDefault();
        const {submitLoading, companyValue, fullNameValue, passwordValue, passwordAgainValue, emailValue} = this.state;
        
        try {
            if(submitLoading) {
                return false;
            }

            if(companyValue.length < 3) {
                AlertMessage.showAlertMessage('Short companyname', 'danger', 'top-center');
                return false;
            }

            if(fullNameValue.length < 5) {
                AlertMessage.showAlertMessage('Short fullname', 'danger', 'top-center');
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

            if(passwordValue.length < 8) {
                AlertMessage.showAlertMessage('Short password', 'danger', 'top-center');
                return false;
            }

            if(passwordValue !== passwordAgainValue) {
                AlertMessage.showAlertMessage('Not equals passwords', 'danger', 'top-center');
                return false;
            }

            this.setState({submitLoading: true});

            const userResponse = await client.mutate({
                mutation: createUser,
                variables: {
                    company: {
                        name: companyValue,
                        blocked: false,
                    },
                    fullName: fullNameValue,
                    roleId: ROLE_SETTER,
                    authProvider: {
                        email: {
                            email: emailValue,
                            password: passwordValue
                        }
                    },
                    blocked: false,
                },
            });

            if(userResponse && userResponse.data.createUser.id) {
                AlertMessage.showAlertMessage('Registration successful', 'success', 'top-center');
                window.location.href = "/Login";
            }
                    
        } catch (error) {
            console.log('Error submit registration form', error);
            AlertMessage.showAlertMessage(error.message, 'danger', 'top-center');
        } finally {
            this.setState({ submitLoading: false });
        }
    };

    render() {
        const {submitLoading, companyValue, fullNameValue, passwordAgainValue, passwordValue, emailValue} = this.state;

        return (
            <div className="registration-wrapper">
                <RegistrationForm
                    history={history}
                    loading={submitLoading}
                    companyValue={companyValue}
                    fullNameValue={fullNameValue}
                    passwordValue={passwordValue}
                    passwordAgainValue={passwordAgainValue}
                    emailValue={emailValue}
                    setEmail={this.handleEmailChange}
                    setCompanyName={this.handleChangeCompanyName}
                    setFullName={this.handleChangeFullName}
                    setPassword={this.handleChangePassword}
                    setPasswordAgain={this.handleChangePasswordAgain}
                    onSubmit={this.onUserSubmitLoginForm}
                />
            </div>
        );
    }
}
 
export default Registration;