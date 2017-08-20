import React from 'react';
import PropTypes from 'prop-types';

const IconExpandLess = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M12 8.016l6 6-1.406 1.406-4.594-4.594-4.594 4.594-1.406-1.406z" />
    </svg>
  );
};

IconExpandLess.defaultProps = {
  color: '#000000',
  width: undefined,
  height: undefined
};

IconExpandLess.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default IconExpandLess;
