import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickInside = this.handleClickInside.bind(this);
  }

  componentDidMount() {
    if(this.props.timeout)
      this.timeout = setTimeout(
        this.modalTimeout,
        this.props.timeout
      );
  }

  componentWillUnmount() {
    if(this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  modalTimeout() {
    this.timeout = undefined;
    this.props.onTimeout();
    this.props.close();
  }

  handleClickOutside(e) {
    e.preventDefault();
    if(this.props.closeOnClickOutside)
      this.props.close();
  }

  handleClickInside(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.close;
    delete rest.visible;
    delete rest.closeOnClickOutside;
    delete rest.closeButton;
    delete rest.timeout;
    delete rest.onTimeout;
    if (this.props.visible == false)
      return null;
    return (
      <div {...rest} data-modal='container' onClick={this.handleClickOutside}>
        <div data-modal='content' onClick={this.handleClickInside}>
          {this.props.children}
          {this.props.closeButton && (
            <span data-modal='close-button' title="Close Modal" onClick={this.props.close}>
              &times;
            </span>
          )}
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  visible: false,
  closeOnClickOutside: true,
  closeButton: true,
  timeout: undefined
};

Modal.propTypes = {
  children: PropTypes.any,
  close: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  closeOnClickOutside: PropTypes.bool,
  closeButton: PropTypes.bool,
  timeout: PropTypes.number,
  onTimeout: PropTypes.func
};

export default Modal;