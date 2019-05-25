import React from 'react';
import { ActionHeader } from '../../../../ui';
import PropTypes from 'prop-types';
import ExportInventoryButton from './ExportInventoryButton';

const ActionHeaderPanel = ({ inventoryData, onRemoveClick, userRole, onEditClick }) => (
  <ActionHeader>
    <div style={{ marginLeft: 'auto' }}>
      <ExportInventoryButton inventoryData={inventoryData} />
    </div>
    {userRole !== 'user' && (
      <button type="button" onClick={onEditClick} disabled={inventoryData !== null && inventoryData.isClosed} style={{ marginRight: 5 }} className="btn btn-sm btn-warning">
          Upraviť inventúru
      </button>
    )}
    {userRole !== 'user' && (
      <button type="button" onClick={onRemoveClick} className="btn btn-sm btn-danger">
          Vymazať inventúru
      </button>
    )}
  </ActionHeader>
);

ActionHeaderPanel.propTypes = {
  inventoryData: PropTypes.object,
  onRemoveClick: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

ActionHeaderPanel.defaultProps = {
  inventoryData: null,
};
 
export default ActionHeaderPanel;