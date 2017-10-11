import React from 'react';
import PropTypes from 'prop-types';

class Field extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.renderCheckbox = this.renderCheckbox.bind(this);
  }

  handleInputChange(e) {
    if(typeof this.props.onChange != 'function')
      return;

    e.preventDefault();

    let payload = {
      type: e.target.name.toUpperCase(),
      data: undefined
    };

    switch(this.props.type) {
    case 'number':
      payload.data = Number(e.target.value);
      break;
    default:
      payload.data = e.target.value;
    }

    this.props.onChange(payload);
  }

  renderInput() {
    return (
      <input
        type={this.props.type}
        name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.handleInputChange}
        readOnly={typeof this.props.onChange != 'function'}
      />
    );
  }

  renderSelect() {
    return (
      <select
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
          </option>)
        )}
      </select>
    );
  }

  renderCheckbox() {}

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.type;
    delete rest.name;
    delete rest.placeholder;
    delete rest.value;
    delete rest.options;
    delete rest.onChange;
    delete rest.label;
    delete rest.labelPosition;
    return (
      <div {...rest}>
        {this.props.label && this.props.labelPosition < 0 ? <label>{this.props.label}</label> : null}
        {this.props.type == 'select'
        ? this.renderSelect()
        : this.props.type == 'checkbox'
        ? this.renderCheckbox()
        : this.renderInput()
        }
        {this.props.label && this.props.labelPosition > 0 ? <label>{this.props.label}</label> : null}
      </div>
    );
  }
}

Field.defaultProps = {
  type: 'text',
  options: [],
  labelPosition: 1
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
  onChange: PropTypes.func,
  label: PropTypes.string,
  labelPosition: PropTypes.number
};

export default Field;
