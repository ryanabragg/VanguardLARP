import React from 'react';
import PropTypes from 'prop-types';

class Field extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    if(typeof this.props.editCharacter == 'function')
      this.props.editCharacter({
        type: e.target.name.toUpperCase(),
        data: e.target.value
      });
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.type;
    delete rest.name;
    delete rest.value;
    delete rest.editCharacter;
    delete rest.label;
    delete rest.labelPosition;
    return (
      <div {...rest}>
        {this.props.label && this.props.labelPosition < 0 ? <label>{this.props.label}</label> : null}
        <input
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleInputChange}
          readOnly={typeof this.props.editCharacter != 'function'}
        />
        {this.props.label && this.props.labelPosition > 0 ? <label>{this.props.label}</label> : null}
      </div>
    );
  }
}

Field.defaultProps = {
  type: 'text',
  labelPosition: 1
};

Field.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  editCharacter: PropTypes.func,
  label: PropTypes.string,
  labelPosition: PropTypes.number
};

export default Field;
