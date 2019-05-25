import React from 'react';
import {Panel} from 'react-bootstrap';

const WarningDashboardPanel = ({title, text}) => (
  <Panel bsStyle="danger">
    <Panel.Heading>
      <Panel.Title>
        <span style={{ marginRight: 10 }} className="fa fa-exclamation-circle" />
        {title}
      </Panel.Title>
    </Panel.Heading>
    <Panel.Body>
      <div className="dashboard-warnings-item-wrapper">
        <span className="">
          {text}
        </span>
      </div>
    </Panel.Body>
  </Panel>
);

export {WarningDashboardPanel};