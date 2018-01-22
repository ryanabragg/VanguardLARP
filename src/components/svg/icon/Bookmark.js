import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-bookmark-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-bookmark-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-bookmark-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-bookmark-desc'>{props.description}</desc>
      }
      <path fill={color} d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
    </svg>
  );
};

Bookmark.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

Bookmark.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Bookmark;
