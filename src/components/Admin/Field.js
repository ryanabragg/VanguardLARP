import React from 'react';
import PropTypes from 'prop-types';

const Field = (props) => (
  <div
    name={props.name}
    className={!props.text ? 'placeholder' : undefined}
    id={props.id}
    onClick={props.onClick}
  >
    {props.text || props.name}
  </div>
);

Field.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  onClick: PropTypes.func
};

export default Field;
