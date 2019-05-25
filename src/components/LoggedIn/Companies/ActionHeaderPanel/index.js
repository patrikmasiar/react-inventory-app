import React from 'react';
import PropTypes from 'prop-types';
import { ActionHeader } from '../../../ui';

const ActionHeaderPanel = ({ searchInputValue, onSearchInputChange }) => (
  <ActionHeader>
    <span style={{ fontSize: 18, marginRight: 10, color: '#aeb6c1' }} className='fa fa-search' />
    <input
      value={searchInputValue}
      onChange={onSearchInputChange}
      type="text"
      className="form-control action-panel-search-input"
      placeholder="Vyhľadať spoločnosť"
    />
  </ActionHeader>
);

ActionHeaderPanel.propTypes = {
  searchInputValue: PropTypes.string.isRequired,
  onSearchInputChange: PropTypes.func.isRequired,
};
 
export default ActionHeaderPanel;