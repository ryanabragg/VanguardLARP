import React from 'react';
import { Link } from 'react-router-dom';
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
    delete rest.link;
    delete rest.label;
    delete rest.text;
    delete rest.icon;
    delete rest.iconSide;
    delete rest.pressed;
    delete rest.disabled;
    delete rest.callback;

    return (
      <button {...rest}
        onClick={this.handleClick}
        aria-label={this.props.label}
        data-disabled={this.props.disabled}
      >
        {!this.props.icon ? null :
          <span data-button='icon'>
            {!this.props.link ? this.props.icon :
              <Link to={this.props.link}>{this.props.icon}</Link>
            }
          </span>
        }
        {!this.props.children ? null :
          <span data-button='content'>
            {!this.props.link ? this.props.children :
              <Link to={this.props.link}>{this.props.children}</Link>
            }
          </span>
        }
      </button>
    );
  }
}

Button.defaultProps = {
  link: null,
  label: '',
  icon: null,
  pressed: false,
  disabled: false
};

Button.propTypes = {
  link: PropTypes.string,
  callback: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.element,
  pressed: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
