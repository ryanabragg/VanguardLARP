import React from 'react';
import PropTypes from 'prop-types';

const Link = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    >
      <path fill={color} d="M0 0h24v24H0z" fill="none"/>
      <path fill={color} d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
    </svg>
  );
};

Link.defaultProps = {
  color: '#000000',
  width: undefined,
  height: undefined
};

Link.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default Link;
