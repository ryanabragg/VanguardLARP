import React from 'react';
import PropTypes from 'prop-types';

const FormField = (props) => (
  props.type == 'textarea'
  ? <div className='form-field'>
      {props.label ? <label>{props.label}</label> : null}
      <textarea rows={props.rows} cols={props.cols}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  : <div className='form-field'>
      {props.label ? <label>{props.label}</label> : null}
      <input type={props.type}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
);

FormField.defaultProps = {
  type: 'text'
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default FormField;
