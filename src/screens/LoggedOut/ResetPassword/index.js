import React, { Component } from 'react';
import ResetPasswordForm from '../../../components/LoggedOut/ResetPasswordForm';
//helpers
import {validateEmail} from '../../../libs';

class ResetPassword extends Component {

    state = {
        emailInput: '',
        submitLoading: false,
    };

    onEmailInputChange = (emailInput) => {
        this.setState({emailInput});
    };

    onUserSubmitForm = async (e) => {
        e.preventDefault();
        const {emailInput, submitLoading} = this.state;
        
        try {
            if(submitLoading) {
                return false;
            }

            if(emailInput.length < 2) {
                alert('Zadajte e-mail');
                return false;
            }

            if(!validateEmail(emailInput)) {
                alert('Zadaný email nie je validný!')
                return false;
            }

            this.setState({submitLoading: true});

            setTimeout(() => {
                this.setState({ emailInput: '', submitLoading: false });
            }, 1500);
        } catch (error) {
            console.log('Error submit reset password', error);
        } finally {
            this.setState({ submitLoading: false });
        }
    };

    render() {
        const { emailInput, submitLoading } = this.state;

        return (
            <ResetPasswordForm
                emailInput={emailInput}
                loading={submitLoading}
                setEmail={this.onEmailInputChange}
                onSubmit={this.onUserSubmitForm}
            />
        );
    }
}
 
export default ResetPassword;