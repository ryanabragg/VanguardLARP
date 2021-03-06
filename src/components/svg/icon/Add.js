import React from 'react';
import PropTypes from 'prop-types';

const Add = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-add-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-add-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-add-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-add-desc'>{props.description}</desc>
      }
      <path fill={color} d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  );
};

Add.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

Add.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Add;
