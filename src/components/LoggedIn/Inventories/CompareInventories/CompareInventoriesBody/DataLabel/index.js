import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DataLabel extends Component {
    
  render() {
    const { labelOne, labelTwo } = this.props;

    if ( labelTwo === null ) {
      return <span>{labelOne}</span>;
    }

    if ( labelTwo !== null ) {
      if (labelOne !== labelTwo) {
        return <span style={{ backgroundColor: 'rgba(255,0,0,0.4)', borderRadius: 4 }}>{labelOne}</span>
      }
    }

    return <span>{labelOne}</span>;
  }
}

DataLabel.propTypes = {
  labelOne: PropTypes.string.isRequired,
  labelTwo: PropTypes.string,
};

DataLabel.defaultProps = {
  labelTwo: null,
};
 
export default DataLabel;