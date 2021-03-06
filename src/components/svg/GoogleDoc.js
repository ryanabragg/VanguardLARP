import React from 'react';
import PropTypes from 'prop-types';

const IconGoogleDoc = (props) => {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <path fill={props.color} d="M41.707,13.793l-11.5-11.5C30.02,2.105,29.766,2,29.5,2H11.491C9.566,2,8,3.561,8,5.479v38.422C8,46.161,9.845,48,12.113,48 h25.774C40.155,48,42,46.161,42,43.901V14.5C42,14.235,41.895,13.98,41.707,13.793z M17,37c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1s1,0.448,1,1C18,36.552,17.552,37,17,37z M17,32c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1 C18,31.552,17.552,32,17,32z M17,27c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C18,26.552,17.552,27,17,27z M33,37H21v-2 h12V37z M33,32H21v-2h12V32z M33,27H21v-2h12V27z M31.667,14C30.748,14,30,13.252,30,12.333V4.914L39.086,14H31.667z"></path>
    </svg>
  );
};

IconGoogleDoc.defaultProps = {
  color: '#2196F3',
  width: undefined,
  height: undefined
};

IconGoogleDoc.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default IconGoogleDoc;
