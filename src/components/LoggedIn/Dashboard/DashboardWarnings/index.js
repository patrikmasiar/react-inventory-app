import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';

class DashboardWarnings extends Component {

    render() { 
        return (
            <Panel bsStyle="danger">
                <Panel.Heading>
                    <Panel.Title>
                        <span style={{ marginRight: 10 }} className="fa fa-exclamation-circle" />
                        Chýbajúce nastavenia
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {this.props.children}
                </Panel.Body>
            </Panel>
        );
    }
}
 
export default DashboardWarnings;