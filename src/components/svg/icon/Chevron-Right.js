import React from 'react';
import PropTypes from 'prop-types';

const ChevronRight = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-chevron-right-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-chevron-right-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-chevron-right-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-chevron-right-desc'>{props.description}</desc>
      }
      <path fill={color} d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  );
};

ChevronRight.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

ChevronRight.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ChevronRight;
