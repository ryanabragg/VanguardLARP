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
    e.preventDefault();
    if(typeof this.props.onChange == 'function')
      this.props.onChange({
        type: e.target.name.toUpperCase(),
        data: e.target.value
      });
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
    const options = this.props.options
      .filter((rule, index, self) => self.indexOf(rule) == index);
    return (
      <select
        name={this.props.name}
        value={this.props.value}
        onChange={this.handleInputChange}
        readOnly={typeof this.props.onChange != 'function'}
      >
        <option default value={''}>{this.props.placeholder || ''}</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
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
  options: PropTypes.array,
  onChange: PropTypes.func,
  label: PropTypes.string,
  labelPosition: PropTypes.number
};

export default Field;
