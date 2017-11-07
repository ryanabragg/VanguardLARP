import React from 'react';
import PropTypes from 'prop-types';

const DashboxDash = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-dashbox-dash-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-dashbox-dash-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-dashbox-dash-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-dashbox-dash-desc'>{props.description}</desc>
      }
      <path fill={color} clip-path="url(#b)" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
    </svg>
  );
};

DashboxDash.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

DashboxDash.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default DashboxDash;
