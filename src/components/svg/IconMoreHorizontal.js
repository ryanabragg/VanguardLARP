import React from 'react';
import PropTypes from 'prop-types';

const IconMoreHorizontal = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M12 9.984c1.078 0 2.016 0.938 2.016 2.016s-0.938 2.016-2.016 2.016-2.016-0.938-2.016-2.016 0.938-2.016 2.016-2.016zM18 9.984c1.078 0 2.016 0.938 2.016 2.016s-0.938 2.016-2.016 2.016-2.016-0.938-2.016-2.016 0.938-2.016 2.016-2.016zM6 9.984c1.078 0 2.016 0.938 2.016 2.016s-0.938 2.016-2.016 2.016-2.016-0.938-2.016-2.016 0.938-2.016 2.016-2.016z" />
    </svg>
  );
};

IconMoreHorizontal.defaultProps = {
  color: '#000000',
  width: undefined,
  height: undefined
};

IconMoreHorizontal.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default IconMoreHorizontal;
