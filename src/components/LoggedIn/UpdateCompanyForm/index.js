import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UpdateCompanyForm extends Component {

    handleCompanyNameChange = (e) => {
        const {value: companyName} = e.target;
        this.props.setCompanyName(companyName);
    };

    handleIcoChange = (e) => {
        const {value: icoValue} = e.target;
        this.props.setIco(icoValue);
    };

    handleDicChange = (e) => {
        const {value: dicValue} = e.target;
        this.props.setDic(dicValue);
    };

    handleIcdphChange = (e) => {
        const {value: icdphValue} = e.target;
        this.props.setIcdph(icdphValue);
    };

    handleCityChange = (e) => {
        const {value: cityValue} = e.target;
        this.props.setCity(cityValue);
    };

    handleStreetChange = (e) => {
        const {value: streetValue} = e.target;
        this.props.setStreet(streetValue);
    };

    handlePostcodeChange = (e) => {
        const {value: postcodeValue} = e.target;
        this.props.setPostcode(postcodeValue);
    };

    render() {
        const {loading, companyName, icoValue, dicValue, icdphValue, cityValue, streetValue, postcodeValue, onSubmitForm} = this.props;
        const btnTitle = loading ? 'Načítavam' : 'Potvrdiť';

        return (
            <form onSubmit={onSubmitForm} method="POST">
                <fieldset disabled={loading}>
                    <span className="main-subtitle">Údaje spoločnosti</span>
                    <div className="form-group">
                        <input type="text" className="form-control" value={companyName} onChange={this.handleCompanyNameChange} placeholder="Názov spoločnosti" required />
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="text" className="form-control" value={icoValue} onChange={this.handleIcoChange} placeholder="IČO" required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="text" className="form-control" value={dicValue} onChange={this.handleDicChange} placeholder="DIČ" required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="text" className="form-control" value={icdphValue} onChange={this.handleIcdphChange} placeholder="IČ DPH" required />
                            </div>
                        </div>
                    </div>
                    <span className="main-subtitle">Adresné údaje</span>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" value={cityValue} onChange={this.handleCityChange} placeholder="Mesto" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" value={streetValue} onChange={this.handleStreetChange} placeholder="Ulica" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" value={postcodeValue} onChange={this.handlePostcodeChange} placeholder="PSČ" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input disabled type="text" value="Slovenská rebublika" className="form-control" placeholder="Štát" required />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div className="text-right">
                    <button disabled={loading} type="submit" className="btn btn-primary">{btnTitle}</button>
                </div>
            </form>
        );
    }
}

UpdateCompanyForm.propTypes = {
    loading: PropTypes.bool.isRequired,
    companyName: PropTypes.string.isRequired,
    setCompanyName: PropTypes.func.isRequired,
    icoValue: PropTypes.string.isRequired,
    setIco: PropTypes.func.isRequired,
    icdphValue: PropTypes.string.isRequired,
    setIcdph: PropTypes.func.isRequired,
    dicValue: PropTypes.string.isRequired,
    setDic: PropTypes.func.isRequired,
    cityValue: PropTypes.string.isRequired,
    setCity: PropTypes.func.isRequired,
    streetValue: PropTypes.string.isRequired,
    setStreet: PropTypes.func.isRequired,
    postcodeValue: PropTypes.string.isRequired,
    setPostcode: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
};
 
export default UpdateCompanyForm;