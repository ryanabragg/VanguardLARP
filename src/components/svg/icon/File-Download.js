import React from 'react';
import PropTypes from 'prop-types';

const FileDownload = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-file-download-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-file-download-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-file-download-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-file-download-desc'>{props.description}</desc>
      }
      <path fill={color} d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>
  );
};

FileDownload.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

FileDownload.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default FileDownload;
