import React from 'react';
import { ActionHeader } from '../../../ui';
import PropTypes from 'prop-types';

const AdminActionHeaderPanel = ({ searchInputValue, onSearchInputChange }) => (
  <ActionHeader>
    <span style={{ fontSize: 18, marginRight: 10, color: '#aeb6c1' }} className='fa fa-search' />
    <input
      value={searchInputValue}
      onChange={onSearchInputChange}
      type="text"
      className="form-control action-panel-search-input"
      placeholder="Vyhľadať inventúru"
    />
  </ActionHeader>
);

AdminActionHeaderPanel.propTypes = {
  searchInputValue: PropTypes.string.isRequired,
  onSearchInputChange: PropTypes.func.isRequired,
};
 
export default AdminActionHeaderPanel;