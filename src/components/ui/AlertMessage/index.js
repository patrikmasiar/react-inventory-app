import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';
import {handleServerMessage} from '../../../libs';

class AlertMessage extends Component {

    state = {
        isVisible: false,
        message: null,
        position: null,
        type: null,
    };

    showAlertMessage(message, type, position) {
        this.setState({
            isVisible: true,
            message,
            type,
            position,
        });
    }

    closeAlertMessage = () => {
        this.setState({
            isVisible: false,
            message: null,
            type: null,
            position: null,
        });
    };

    getAlertPosition() {
        const { position } = this.state;
        switch(position) {
            case 'top-center':
                return 'alert-top-center';
            case 'top-right':
                return 'alert-top-right';
            default:
                return 'alert-top-center';
        }
    }

    render() {
        const {message, type, isVisible} = this.state;

        if (!isVisible) {
            return null;
        }

        return (
            <div className={`alert-component-wrapper ${this.getAlertPosition()}`}>
                <Alert bsStyle={type} onDismiss={this.closeAlertMessage}>
                    {handleServerMessage(message)}
                </Alert>
            </div>
        );
    }
}
 
export { AlertMessage };