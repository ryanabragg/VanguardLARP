import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  const rest = Object.assign({}, props);
  delete rest.visible;
  delete rest.closeOnClickOutside;
  delete rest.closeModal;

  if (props.visible === false)
    return null;
  return (
    <div {...rest}>
      <div className='modal-content'>
        {props.closeOnClickOutside && <span className='modal-close' title="Close" onClick={props.closeModal}>&times;</span>}
        {props.children}
      </div>
    </div>
  );
};

Modal.defaultProps = {
  visible: false,
  type: 'info',
  timeoutDuration: 3000
};

Modal.propTypes = {
  visible: PropTypes.bool,
  closeOnClickOutside: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;