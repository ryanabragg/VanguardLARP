import React from 'react';
import PropTypes from 'prop-types';

const ArrowUp = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-arrow-up-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-arrow-up-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-arrow-up-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-arrow-up-desc'>{props.description}</desc>
      }
      <path fill={color} d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
    </svg>
  );
};

ArrowUp.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

ArrowUp.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ArrowUp;
