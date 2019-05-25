import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResetPasswordForm extends Component {
    
    handleEmailChange = (e) => {
        const {value: emailInput} = e.target;
        this.props.setEmail(emailInput);
    };

    render() {
        const {loading, emailInput, onSubmit} = this.props;
        const btnTitle = loading ? 'Načítavam...' : 'Potvrdiť';

        return (
            <div className='login-form-box'>
                <form className='form-signin' onSubmit={onSubmit}>
                    <fieldset disabled={loading}>
                        <span className="signed-out-form-title">Obnovenie hesla</span>
                        <div className="form-group">
                            <input type="email" value={emailInput} onChange={this.handleEmailChange} className="form-control" placeholder="Prihlasovací e-mail" autoFocus required />
                        </div>
                    </fieldset>
                    <button disabled={loading || emailInput.length < 2} className="btn btn-primary btn-block" type="submit">
                        {btnTitle}
                    </button>
                </form>
                <div className="text-center links">
                    <a href="/Login">Späť na prihlásenie</a>
                </div>
            </div>
        );
    }
}

ResetPasswordForm.propTypes = {
    loading: PropTypes.bool.isRequired,
    emailInput: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
};
 
export default ResetPasswordForm;