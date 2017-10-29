import React from 'react';
import PropTypes from 'prop-types';

class Field extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    if(typeof this.props.onChange != 'function')
      return;

    e.stopPropagation();

    let payload = {
      type: e.target.name,
      data: undefined
    };

    switch(this.props.type) {
    case 'number':
      payload.data = Number(e.target.value);
      break;
    case 'checkbox':
      payload.data = Number(e.target.checked);
      break;
    default:
      payload.data = e.target.value;
    }

    this.props.onChange(payload);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.type;
    delete rest.name;
    delete rest.placeholder;
    delete rest.value;
    delete rest.options;
    delete rest.onChange;

    if(this.props.type == 'textarea')
      return (
        <textarea {...rest}
          rows={this.props.rows}
          cols={this.props.cols}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value || ''}
          onChange={this.handleInputChange}
          readOnly={typeof this.props.onChange != 'function'}
        />
      );

    if(this.props.type == 'select')
      return (
        <select {...rest}
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleInputChange}
          readOnly={typeof this.props.onChange != 'function'}
        >
          <option default value=''>
            {this.props.placeholder || ''}
          </option>
          {this.props.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    if(this.props.type == 'checkbox')
      return (
        <input {...rest}
          type='checkbox'
          name={this.props.name}
          onChange={this.handleInputChange}
          value={this.props.value}
          checked={!this.props.value ? false : true}
          readOnly={typeof this.props.onChange != 'function'}
        />
      );

    return (
      <input {...rest}
        type={this.props.type}
        name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.handleInputChange}
        readOnly={typeof this.props.onChange != 'function'}
      />
    );
  }
}

Field.defaultProps = {
  type: 'text',
  value: '',
  options: [],
  rows: 5,
  cols: 5
};

Field.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })
  ),
  rows: PropTypes.number,
  cols: PropTypes.number,
  onChange: PropTypes.func
};

export default Field;
