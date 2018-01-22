import React from 'react';
import PropTypes from 'prop-types';

const ArrowRight = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-arrow-right-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-arrow-right-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-arrow-right-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-arrow-right-desc'>{props.description}</desc>
      }
      <path fill={color} d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
    </svg>
  );
};

ArrowRight.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

ArrowRight.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ArrowRight;
