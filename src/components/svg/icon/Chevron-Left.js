import React from 'react';
import PropTypes from 'prop-types';

const ChevronLeft = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-chevron-left-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-chevron-left-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-chevron-left-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-chevron-left-desc'>{props.description}</desc>
      }
      <path fill={color} d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  );
};

ChevronLeft.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

ChevronLeft.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ChevronLeft;
