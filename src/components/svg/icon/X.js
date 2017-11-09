import React from 'react';
import PropTypes from 'prop-types';

const X = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-x-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-x-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-x-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-x-desc'>{props.description}</desc>
      }
      <path fill={color} d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  );
};

X.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

X.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default X;
