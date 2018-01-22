import React from 'react';
import PropTypes from 'prop-types';

const ArrowLeft = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-arrow-left-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-arrow-left-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-arrow-left-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-arrow-left-desc'>{props.description}</desc>
      }
      <path fill={color} d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  );
};

ArrowLeft.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

ArrowLeft.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ArrowLeft;
