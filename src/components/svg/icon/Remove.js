import React from 'react';
import PropTypes from 'prop-types';

const Remove = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M19 13H5v-2h14v2z" />
    </svg>
  );
};

Remove.defaultProps = {
  color: '#000000',
  width: undefined,
  height: undefined
};

Remove.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default Remove;
