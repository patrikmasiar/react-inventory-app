import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RegistrationForm extends Component {

    handleCompanyChange = (e) => {
        const {value: companyValue} = e.target;
        this.props.setCompanyName(companyValue);
    };

    handleFullNameChange = (e) => {
        const {value: fullNameValue} = e.target;
        this.props.setFullName(fullNameValue);
    };

    handlePasswordChange = (e) => {
        const {value: passwordValue} = e.target;
        this.props.setPassword(passwordValue);
    };

    handlePasswordAgainChange = (e) => {
        const {value: passwordAgainValue} = e.target;
        this.props.setPasswordAgain(passwordAgainValue);
    };

    handleEmailChange = (e) => {
        const {value: emailValue} = e.target;
        this.props.setEmail(emailValue);
    };

    handleBackToLoginClick = () => {
        this.props.history.push('/Login');
    };

    render() {
        const {loading, companyValue, onSubmit, fullNameValue, passwordValue, passwordAgainValue, emailValue} = this.props;
        const btnTitle = loading ? 'Načítavam...' : 'Registrovať spoločnosť';

        return (
            <div className='login-form-box'>
                <form className='form-signin' onSubmit={onSubmit}>
                    <fieldset disabled={loading}>
                        <span className="signed-out-form-title">Registrácia</span>
                        <div className="form-group">
                            <input type="text" value={companyValue} onChange={this.handleCompanyChange} className="form-control" placeholder="Názov spoločnosti" autoFocus required />
                        </div>
                        <span className='signed-out-form-subtitle'>Používateľ</span>
                        <div className="form-group">
                            <input type="text" value={fullNameValue} onChange={this.handleFullNameChange} className="form-control" placeholder="Celé meno" required />
                        </div>
                        <div className="form-group">
                            <input type="email" value={emailValue} onChange={this.handleEmailChange} className="form-control" placeholder="Prihlasovací e-mail" required />
                        </div>
                        <div className="form-group">
                            <input type="password" value={passwordValue} onChange={this.handlePasswordChange} className="form-control" placeholder="Heslo" required />
                        </div>
                        <div className="form-group">
                            <input type="password" value={passwordAgainValue} onChange={this.handlePasswordAgainChange} className="form-control" placeholder="Zopakovať heslo" required />
                        </div>
                    </fieldset>
                    <button disabled={loading} className="btn btn-primary btn-block" type="submit">
                        {btnTitle}
                    </button>
                </form>
                <div className="text-center links">
                    <button onClick={this.handleBackToLoginClick} className="btn btn-link btn-block">Späť na prighásenie</button>
                </div>
            </div>
        );
    }
}

RegistrationForm.propTypes = {
    loading: PropTypes.bool.isRequired,
    companyValue: PropTypes.string.isRequired,
    fullNameValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired,
    passwordAgainValue: PropTypes.string.isRequired,
    setCompanyName: PropTypes.func.isRequired,
    setFullName: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setPasswordAgain: PropTypes.func.isRequired,
    emailValue: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
};
 
export default RegistrationForm;