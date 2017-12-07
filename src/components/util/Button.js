import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      pressed: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
    if(this.props.disabled)
      return;
    if(typeof this.props.callback == 'function')
      this.props.callback();
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.label;
    delete rest.disabled;
    delete rest.callback;

    return (
      <div {...rest} role='button' tabIndex='0'
        onClick={this.handleClick}
        aria-label={this.props.label}
        data-disabled={this.props.disabled}
      >
        {!this.props.children ? this.props.label : this.props.children}
      </div>
    );
  }
}

Button.defaultProps = {
  label: '',
  disabled: false
};

Button.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  callback: PropTypes.func.isRequired,
};

export default Button;
