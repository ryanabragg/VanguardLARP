import React from 'react';
import PropTypes from 'prop-types';

const Checkmark = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-checkmark-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-checkmark-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-checkmark-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-checkmark-desc'>{props.description}</desc>
      }
      <path fill={color} d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  );
};

Checkmark.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

Checkmark.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Checkmark;
