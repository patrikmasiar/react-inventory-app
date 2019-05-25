import React, { Component } from 'react';
import UpdateCompanyForm from '../../../components/LoggedIn/UpdateCompanyForm';
import { company as companyQuery, updateCompany, createAddress, updateAddress } from 'queries';
import { connect } from 'react-redux';
import client from '../../../utils/apolloClient';
import store from '../../../store';
import { updateLoggedCompany } from '../../../store/actions';
import { Loader, TitleHeader } from '../../../components/ui';
import AlertMessage from '../../../libs/AlertMessage';

class CompanySettings extends Component {

    state = {
        loading: false,
        companyName: '',
        icoValue: '',
        dicValue: '',
        icdphValue: '',
        streetValue: '',
        cityValue: '',
        postcodeValue: '',
        submitLoading: false,
    };

    componentDidMount() {
        this.loadCompanyData()
    }

    handleChangeCompanyName = (companyName) => {
        this.setState({companyName});
    };

    handleIcoChange = (icoValue) => {
        this.setState({icoValue});
    };

    handleDicChange = (dicValue) => {
        this.setState({dicValue});
    };

    handleIcdphChange = (icdphValue) => {
        this.setState({icdphValue});
    };

    handleCityChange = (cityValue) => {
        this.setState({cityValue});
    };

    handleStreetChange = (streetValue) => {
        this.setState({streetValue});
    };

    handlePostcodeChange = (postcodeValue) => {
        this.setState({postcodeValue});
    };

    loadCompanyData = async () => {
        try {
            this.setState({loading: true});

            const response = await client.query({
                query: companyQuery,
                variables: { id: this.props.companyId }, 
            });

            if(response && response.data.Company) {
                const company = response.data.Company;
                this.setState({
                    companyName: company.name,
                    icoValue: company.ico === null ? '' : company.ico,
                    dicValue: company.dic === null ? '' : company.dic,
                    icdphValue: company.icdph === null ? '' : company.icdph,
                    cityValue: company.address === null ? '' : company.address.city,
                    streetValue: company.address === null ? '' : company.address.street,
                    postcodeValue: company.address === null ? '' : company.address.postCode,
                });
            }

            this.setState({loading: false});

        } catch(error) {
            console.log(error);
            AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
            this.setState({loading: false});
        }
        
    };

    handleSubmitForm = async (e) => {
        e.preventDefault();
        const {companyName, cityValue, postcodeValue, streetValue, icoValue, icdphValue, dicValue, submitLoading} = this.state;

        try {
            if(submitLoading) {
                return false;
            }

            this.setState({submitLoading: true});

            let addressResponse = null;
            if(this.props.companyAddressId === null) {
                addressResponse = await client.mutate({
                    mutation: createAddress,
                    variables: {
                        companiesIds: this.props.companyId,
                        city: cityValue,
                        street: streetValue,
                        postCode: postcodeValue,
                        state: 'Slovensá republika',
                    },
                });

                if(addressResponse && addressResponse.data.createAddress.id) {
                    store.dispatch(updateLoggedCompany({
                        companyName,
                        companyAddressId: addressResponse.data.createAddress.id,
                    }));
                }

            } else {
                addressResponse = await client.mutate({
                    mutation: updateAddress,
                    variables: {
                        id: this.props.companyAddressId,
                        city: cityValue,
                        street: streetValue,
                        postCode: postcodeValue,
                    },
                });

                if(addressResponse && addressResponse.data.updateAddress) {
                    store.dispatch(updateLoggedCompany({
                        companyName,
                        companyAddressId: this.props.companyAddressId,
                    }));
                }
            }

            const addressId = this.props.companyAddressId !== null ? this.props.companyAddressId : addressResponse.data.createAddress.id;

            if(addressResponse) {
                await client.mutate({
                    mutation: updateCompany,
                    variables: {
                        id: this.props.companyId,
                        name: companyName,
                        ico: icoValue,
                        dic: dicValue,
                        icdph: icdphValue,
                        addressId
                    },
                    refetchQueries: [{
                        query: companyQuery,
                        variables: { id: this.props.companyId }, 
                    }]
                });
                AlertMessage.showAlertMessage('Informations update success', 'success', 'top-right');
            }

            this.setState({submitLoading: false});

        } catch(error) {
            console.log(error);
            AlertMessage.showAlertMessage(error.message, 'danger', 'top-right');
            this.setState({ submitLoading: false });
        }
    };

    render() {
        const {loading, submitLoading, companyName, icoValue, dicValue, icdphValue, cityValue, streetValue, postcodeValue } = this.state;

        if(loading) {
            return (
                <Loader />
            );
        }
        
        return (
            <div>
                <TitleHeader title={'Nastavenia spoločnosti'} />
                <UpdateCompanyForm
                    loading={submitLoading}
                    companyName={companyName}
                    setCompanyName={this.handleChangeCompanyName}
                    icoValue={icoValue}
                    dicValue={dicValue}
                    icdphValue={icdphValue}
                    streetValue={streetValue}
                    cityValue={cityValue}
                    postcodeValue={postcodeValue}
                    setIco={this.handleIcoChange}
                    setIcdph={this.handleIcdphChange}
                    setDic={this.handleDicChange}
                    setCity={this.handleCityChange}
                    setStreet={this.handleStreetChange}
                    setPostcode={this.handlePostcodeChange}
                    onSubmitForm={this.handleSubmitForm}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    companyId: state.company.companyId,
    companyAddressId: state.company.companyAddressId,
});

export default connect(mapStateToProps)(CompanySettings);