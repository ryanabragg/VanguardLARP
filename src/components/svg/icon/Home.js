import React from 'react';
import PropTypes from 'prop-types';

const Home = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-home-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-home-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-home-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-home-desc'>{props.description}</desc>
      }
      <path fill={color} d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/>
    </svg>
  );
};

Home.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

Home.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Home;
