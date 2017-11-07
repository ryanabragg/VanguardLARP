import React from 'react';
import PropTypes from 'prop-types';

const Leave = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-leave-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-leave-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-leave-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-leave-desc'>{props.description}</desc>
      }
      <path fill={color} d="m 7.5,8.5 0,6 6,0 0,4 7,-7 -7,-7 0,4 z m -2,-4 0,14 -2,0 0,-14 z"/>
    </svg>
  );
};

Leave.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

Leave.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Leave;
