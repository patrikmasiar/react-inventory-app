import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
import PropTypes from 'prop-types';

class DashboardListPanel extends Component {

  render() {
    const { onAddClick, onViewAllClick, title, bodyComponent, addBtnLabel, styleType } = this.props;

    return (
      <Panel bsStyle={styleType}>
        <Panel.Heading>
          <Panel.Title>
            <div className="settings-panel-header">
              {title}
              <button onClick={ onViewAllClick } style={{ padding: 5, color: 'white' }} className="btn btn-sm btn-success">Pozrieť všetko</button>
            </div>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body style={{ height: 250, overflow: 'scroll' }}>
          { bodyComponent }
        </Panel.Body>
        {!this.props.isAdmin && (
          <Panel.Footer>
            <button className="btn btn-xs btn-link btn-block" type="button" onClick={onAddClick}>{addBtnLabel}</button>
          </Panel.Footer>
        )}
      </Panel>
    );
  }
}

DashboardListPanel.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  onViewAllClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  bodyComponent: PropTypes.any.isRequired,
  addBtnLabel: PropTypes.string.isRequired,
  styleType: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
};
 
export { DashboardListPanel };