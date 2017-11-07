import React from 'react';
import PropTypes from 'prop-types';

const Arrive = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-arrive-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-arrive-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-arrive-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-arrive-desc'>{props.description}</desc>
      }
      <path fill={color} d="m 9.5,4.5 0,4 -6,0 0,6 6,0 0,4 7,-7 -7,-7 z m 9,14 2,0 0,-14 -2,0 0,14 z"/>
    </svg>
  );
};

Arrive.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

Arrive.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Arrive;
