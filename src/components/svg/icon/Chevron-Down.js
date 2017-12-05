import React from 'react';
import PropTypes from 'prop-types';

const ChevronDown = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-chevron-down-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-chevron-down-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-chevron-down-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-chevron-down-desc'>{props.description}</desc>
      }
      <path fill={color} d="M16.594 8.578l1.406 1.406-6 6-6-6 1.406-1.406 4.594 4.594z" />
    </svg>
  );
};

ChevronDown.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

ChevronDown.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ChevronDown;
