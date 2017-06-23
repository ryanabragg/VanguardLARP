import React from 'react';

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
}

export default Modal;