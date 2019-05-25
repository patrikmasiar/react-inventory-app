import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({title, value, isLoading, type}) => {
  const className = isLoading ? 'progress progress-striped active' : 'progress progress-striped';
  const barClassName = isLoading ? 'progress-bar' : `progress-bar progress-bar-${type}`;

  return (
    <div>
      <h4>{isLoading ? 'Načítavam... ' : title}</h4>
      <div className={className}>
        <div className={barClassName} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
};

ProgressBar.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export {ProgressBar};