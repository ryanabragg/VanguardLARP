import React from 'react';
import PropTypes from 'prop-types';

import Field from '../util/Field';

const FormField = (props) => (
  <div className='form-field'>
    {!props.label ? null : <label>{props.label}</label>}
    <Field type={props.type}
      rows={10} cols={50}
      name={props.name}
      value={props.value}
      options={props.options}
      onChange={props.onChange}
    />
  </div>
);

FormField.defaultProps = {
  type: 'text'
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default FormField;
