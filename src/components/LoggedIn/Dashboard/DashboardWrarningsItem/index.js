import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DashboardWarningsItem extends Component {

    render() {
        const {text, onClick, buttonLabel, withButton} = this.props;
        
        return (
            <div className="dashboard-warnings-item-wrapper">
                <span className="">
                    {text}
                </span>
                {withButton && (
                    <button onClick={onClick} className="btn btn-default" type="button">
                        {buttonLabel}
                    </button>
                )}
            </div>
        );
    }
}

DashboardWarningsItem.propTypes = {
    text: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string,
    onClick: PropTypes.func,
    withButton: PropTypes.bool,
};

DashboardWarningsItem.defaultProps = {
    onClick: () => null,
    buttonLabel: null,
    withButton: true,
}
 
export default DashboardWarningsItem;