import React from 'react';
import PropTypes from 'prop-types';

const Remove = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-remove-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-remove-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-remove-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-remove-desc'>{props.description}</desc>
      }
      <path fill={color} d="M19 13H5v-2h14v2z" />
    </svg>
  );
};

Remove.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

Remove.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Remove;
