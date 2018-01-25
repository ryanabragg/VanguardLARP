import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickAway = this.handleClickAway.bind(this);
  }

  handleClickAway(e) {
    e.stopPropagation();
    if (this.props.closeOnClickAway && e.target === e.currentTarget)
      this.props.close();
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.visible;
    delete rest.close;
    delete rest.closeOnClickAway;
    if(!this.props.visible)
      return null;
    return (
      <div {...rest} onClick={this.handleClickAway}>
        {this.props.children}
      </div>
    );
  }
}

Modal.defaultProps = {
  visible: true,
  closeOnClickAway: true
};

Modal.propTypes = {
  children: PropTypes.any,
  visible: PropTypes.bool,
  close: PropTypes.func.isRequired,
  closeOnClickAway: PropTypes.bool
};

export default Modal;