import React from 'react';
import PropTypes from 'prop-types';

import Field from './Field';

const Rule = (props) => (
  <div id={props.id} onClick={props.onClick}>
    <Field
      id={props.id}
      name='date'
      text={props.date}
      onClick={props.onClick}
    />
    <Field
      id={props.id}
      name='location'
      text={props.location}
      onClick={props.onClick}
    />
    <Field
      id={props.id}
      name='area'
      text={props.area}
      onClick={props.onClick}
    />
  </div>
);

Rule.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  area: PropTypes.string,
  onClick: PropTypes.func
};

export default Rule;
