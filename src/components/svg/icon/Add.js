import React from 'react';
import PropTypes from 'prop-types';

const Add = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  );
};

Add.defaultProps = {
  color: '#000000',
  width: undefined,
  height: undefined
};

Add.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default Add;
