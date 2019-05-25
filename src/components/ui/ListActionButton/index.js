import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class ListActionButton extends Component {

  getIcon(type) {
    switch(type) {
      case 'edit':
        return 'fa fa-edit';
      case 'remove':
        return 'fa fa-trash';
      case 'info':
        return 'fa fa-info-circle'
      default:
        return '';
    }
  }

  getBtnClass(type) {
    switch(type) {
      case 'edit':
        return 'warning';
      case 'remove':
        return 'danger';
      case 'info':
        return 'info';
      default:
        return '';
    }
  }

  render() {
    const {type, onClick, tooltip, isDisabled} = this.props;
    const tooltipComponent = <Tooltip id="tooltip">{tooltip}</Tooltip>;
  
    let bodyComponent = null;
    if(!!tooltip) {
      bodyComponent = (
        <OverlayTrigger placement="top" overlay={tooltipComponent}>
          <button type="button" onClick={onClick} disabled={isDisabled} className={`btn btn-xs btn-${this.getBtnClass(type)}`}>
            <span className={this.getIcon(type)} />
          </button>
        </OverlayTrigger>
      );
    } else {
      bodyComponent = (
        <button type="button" onClick={onClick} disabled={isDisabled} className={`btn btn-xs btn-${this.getBtnClass(type)}`}>
          <span className={this.getIcon(type)} />
        </button>
      );
    }
    
    return bodyComponent;
  }
}

ListActionButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
  isDisabled: PropTypes.bool,
};

ListActionButton.defaultProps = {
  tooltip: null,
  isDisabled: false,
};
 
export { ListActionButton };