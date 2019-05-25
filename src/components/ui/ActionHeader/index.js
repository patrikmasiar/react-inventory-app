import React from 'react';
import { Panel } from 'react-bootstrap';

const ActionHeader = ({ children }) => (
  <Panel style={{ marginBottom: 50 }}>
    <Panel.Body>
      <div className="action-header-panel-wrapper">
          {children}
      </div>
    </Panel.Body>
  </Panel>
);
 
export { ActionHeader };