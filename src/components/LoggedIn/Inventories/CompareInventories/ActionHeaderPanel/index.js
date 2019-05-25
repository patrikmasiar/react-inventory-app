import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
import PropTypes from 'prop-types';
import InventorySelector from '../InventorySelector';

class ActionHeaderPanel extends Component {

  render() {
    const { onImportClick, companyId, firstInventoryId, secondInventoryId, onFirstInventorySelect, onSecondInventorySelect } = this.props;
      
    return (
      <Panel bsStyle="info" style={{ marginBottom: 50 }}>
        <Panel.Body>
          <div className="action-header-panel-wrapper">
            <InventorySelector
              companyId={companyId}
              selectedInventory={firstInventoryId}
              onSelectInventory={onFirstInventorySelect}
            />
            <InventorySelector
              companyId={companyId}
              selectedInventory={secondInventoryId}
              onSelectInventory={onSecondInventorySelect}
              additionalStyle={{ marginLeft: 10 }}
            />
            {this.props.userRole !== 'user' && (
              <button style={{ marginLeft: 'auto' }} onClick={onImportClick} className="btn btn-sm btn-info">
                <span style={{ marginRight: 5 }} className={'fa fa-upload'} />
                Importovať
              </button>
            )}
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

ActionHeaderPanel.propTypes = {
  onImportClick: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
  firstInventoryId: PropTypes.string.isRequired,
  secondInventoryId: PropTypes.string.isRequired,
  onFirstInventorySelect: PropTypes.func.isRequired,
  onSecondInventorySelect: PropTypes.func.isRequired,
};
 
export default ActionHeaderPanel;