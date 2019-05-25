import React from 'react';
import { ActionHeader } from '../../../ui';
import PropTypes from 'prop-types';

const ActionHeaderPanel = ({ searchInputValue, onSearchInputChange, onAddNewCustomerClick }) => (
  <ActionHeader>
    <span style={{ fontSize: 18, marginRight: 10, color: '#aeb6c1' }} className='fa fa-search' />
    <input
      value={searchInputValue}
      onChange={onSearchInputChange}
      type="text"
      className="form-control action-panel-search-input"
      placeholder="Vyhľadať užívateľa"
    />
    <button style={{ marginLeft: 'auto' }} onClick={onAddNewCustomerClick} className="btn btn-sm btn-success">
      Pridať užívateľa
    </button>
  </ActionHeader>
);

ActionHeaderPanel.propTypes = {
  searchInputValue: PropTypes.string.isRequired,
  onSearchInputChange: PropTypes.func.isRequired,
  onAddNewCustomerClick: PropTypes.func.isRequired,
};
 
export default ActionHeaderPanel;