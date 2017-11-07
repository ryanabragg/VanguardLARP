import React from 'react';
import PropTypes from 'prop-types';

const CheckboxUnchecked = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-checkbox-unchecked-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-checkbox-unchecked-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-checkbox-unchecked-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-checkbox-unchecked-desc'>{props.description}</desc>
      }
      <path fill={color} d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
};

CheckboxUnchecked.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

CheckboxUnchecked.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default CheckboxUnchecked;
