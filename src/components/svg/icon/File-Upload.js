import React from 'react';
import PropTypes from 'prop-types';

const FileUpload = (props) => {
  const color = props.color == 'inherit' ? undefined : props.color;
  const aria = props.title ? 'svg-file-upload-title' : '' +
    props.title && props.description ? ' ' : '' +
    props.description ? 'svg-file-upload-desc' : '';
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg' role='img'
      aria-labelledby={aria}
    >
      {!props.title ? null :
        <title id='svg-file-upload-title'>{props.title}</title>
      }
      {!props.description ? null :
        <desc id='svg-file-upload-desc'>{props.description}</desc>
      }
      <path fill={color} d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
    </svg>
  );
};

FileUpload.defaultProps = {
  color: 'inherit',
  width: undefined,
  height: undefined,
  title: '',
  description: ''
};

FileUpload.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default FileUpload;
