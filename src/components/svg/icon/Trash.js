import React from 'react';
import PropTypes from 'prop-types';

const Trash = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-trash-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-trash-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-trash-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-trash-desc'>{props.description}</desc>
      }
      <path fill={color} d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>
  );
};

Trash.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

Trash.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Trash;
