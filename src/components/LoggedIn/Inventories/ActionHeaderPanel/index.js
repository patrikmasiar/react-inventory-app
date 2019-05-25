import React from 'react';
import PropTypes from 'prop-types';
import { ActionHeader } from '../../../ui';

const ActionHeaderPanel = ({ searchInputValue, onSearchInputChange, onAddNewClick, onImportClick, onCompareClick, userRole }) => (
  <ActionHeader>
    <span style={{ fontSize: 18, marginRight: 10, color: '#aeb6c1' }} className='fa fa-search' />
    <input
      value={searchInputValue}
      onChange={onSearchInputChange}
      type="text"
      className="form-control action-panel-search-input"
      placeholder="Vyhľadať inventúru"
    />
    <a href="http://inventoryapp.masso.sk/example-inventory-import.xlsx" style={{ marginLeft: 'auto' }} className="btn btn-sm btn-link" download>
      STIAHNUŤ VZOROVÉ DÁTA PRE IMPORT
    </a>
    <button style={{ marginLeft: 5 }} onClick={onCompareClick} className="btn btn-sm btn-primary">
      Porovnať inventúry
    </button>
    {userRole !== 'user' && (
      <button style={{ marginLeft: 5 }} onClick={onAddNewClick} className="btn btn-sm btn-success">
        Pridať novú inventúru
      </button>
    )}
    {userRole !== 'user' && (
      <button style={{ marginLeft: 5 }} onClick={onImportClick} className="btn btn-sm btn-info">
        <span style={{ marginRight: 5 }} className={'fa fa-upload'} />
        Importovať
      </button>
    )}
  </ActionHeader>
);

ActionHeaderPanel.propTypes = {
  searchInputValue: PropTypes.string.isRequired,
  onSearchInputChange: PropTypes.func.isRequired,
  onAddNewClick: PropTypes.func.isRequired,
  onImportClick: PropTypes.func.isRequired,
  onCompareClick: PropTypes.func.isRequired,
};
 
export default ActionHeaderPanel;