import React from 'react';
import PropTypes from 'prop-types';

const ArrowDown = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-arrow-down-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-arrow-down-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-arrow-down-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-arrow-down-desc'>{props.description}</desc>
      }
      <path fill={color} d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
    </svg>
  );
};

ArrowDown.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

ArrowDown.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ArrowDown;
