import React from 'react';
import PropTypes from 'prop-types';

const Save = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-save-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-save-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-save-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-save-desc'>{props.description}</desc>
      }
      <path fill={color} d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
    </svg>
  );
};

Save.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

Save.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Save;
