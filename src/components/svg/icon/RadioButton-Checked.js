import React from 'react';
import PropTypes from 'prop-types';

const RadioButtonUnchecked = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-radio-button-unchecked-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-radio-button-unchecked-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-radio-button-unchecked-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-radio-button-unchecked-desc'>{props.description}</desc>
      }
      <path fill={color} d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </svg>
  );
};

RadioButtonUnchecked.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

RadioButtonUnchecked.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default RadioButtonUnchecked;
