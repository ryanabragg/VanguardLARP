import React from 'react';
import PropTypes from 'prop-types';

const Magnifier = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-magnifier-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-magnifier-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-magnifier-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-magnifier-desc'>{props.description}</desc>
      }
      <path fill={color} d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  );
};

Magnifier.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

Magnifier.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Magnifier;
