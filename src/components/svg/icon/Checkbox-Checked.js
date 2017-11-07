import React from 'react';
import PropTypes from 'prop-types';

const CheckedboxChecked = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-checkedbox-checked-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-checkedbox-checked-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-checkedbox-checked-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-checkedbox-checked-desc'>{props.description}</desc>
      }
      <path fill={color} d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
};

CheckedboxChecked.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

CheckedboxChecked.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default CheckedboxChecked;
