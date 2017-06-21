import React from 'react';

const IconFacebook = (props) => {
  let color = props.color || '#3B5998';
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M1579 128q35 0 60 25t25 60v1366q0 35-25 60t-60 25h-391v-595h199l30-232h-229v-148q0-56 23.5-84t91.5-28l122-1v-207q-63-9-178-9-136 0-217.5 80t-81.5 226v171h-200v232h200v595h-735q-35 0-60-25t-25-60v-1366q0-35 25-60t60-25h1366z"/>
    </svg>
  );
}

export default IconFacebook;
