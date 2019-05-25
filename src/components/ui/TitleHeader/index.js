import React from 'react';
import PropTypes from 'prop-types';

const TitleHeader = ({ title }) => (
  <div className="main-title">
    {title}
  </div>
);

TitleHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
 
export { TitleHeader };