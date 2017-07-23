import React from 'react';
import PropTypes from 'prop-types';

import Field from './Field';

const Rule = (props) => (
  <div id={props.id} onClick={props.onClick}>
    <Field
      id={props.id}
      name='name'
      text={props.name}
      onClick={props.onClick}
    />
    <Field
      id={props.id}
      name='category'
      text={props.category}
      onClick={props.onClick}
    />
    <Field
      id={props.id}
      name='group'
      text={props.group}
      onClick={props.onClick}
    />
    <Field
      id={props.id}
      name='tier'
      text={props.tier}
      onClick={props.onClick}
    />
    <Field
      id={props.id}
      name='race'
      text={props.race}
      onClick={props.onClick}
    />
    <Field
      id={props.id}
      name='culture'
      text={props.culture}
      onClick={props.onClick}
    />
  </div>
);

Rule.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  group: PropTypes.string,
  tier: PropTypes.string,
  race: PropTypes.string,
  culture: PropTypes.string,
  onClick: PropTypes.func
};

export default Rule;
