import React from 'react';
import PropTypes from 'prop-types';

const StarHalf = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-star-half-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-star-half-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-star-half-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-star-half-desc'>{props.description}</desc>
      }
      <path fill={color} clip-path="url(#b)" d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
    </svg>
  );
};

StarHalf.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

StarHalf.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default StarHalf;
