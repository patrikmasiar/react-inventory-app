import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {

    handleChangeEmail = (e) => {
        const {value: emailValue} = e.target;
        this.props.setEmail(emailValue);
    };

    handleChangePassword = (e) => {
        const {value: passwordValue} = e.target;
        this.props.setPassword(passwordValue);
    };

    handleRegistrationClick = () => {
        this.props.history.push('/Registration');
    };

    handleResetPasswordClick = () => {
        this.props.history.push('/ResetPassword');
    };

    render() {
        const {loading, emailValue, passwordValue, onSubmit} = this.props;
        const btnTitle = loading ? 'Načítavam...' : 'Prihlásiť sa';

        return (
            <div className='login-form-box'>
                <form className='form-signin' onSubmit={onSubmit}>
                    <fieldset disabled={loading}>
                        <span className="signed-out-form-title">Prihlásenie</span>
                        <div className="form-group">
                            <input type="email" value={emailValue} onChange={this.handleChangeEmail} className="form-control" placeholder="Prihlasovací e-mail" autoFocus required />
                        </div>
                        <div className="form-group">
                            <input type="password" value={passwordValue} onChange={this.handleChangePassword} className="form-control" placeholder="Prihlasovacie heslo" required />
                        </div>
                    </fieldset>
                    <button disabled={loading} className="btn btn-primary btn-block" type="submit">
                        {btnTitle}
                    </button>
                </form>
                <div className="text-center links">
                    <button onClick={this.handleRegistrationClick} className="btn btn-block btn-link">REGISTRÁCIA</button>
                    {/*<button onClick={this.handleResetPasswordClick} className="btn btn-block btn-link">Zabudnuté heslo?</button>*/}
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    loading: PropTypes.bool.isRequired,
    emailValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
};
 
export default LoginForm;