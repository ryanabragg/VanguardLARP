import React from 'react';
import PropTypes from 'prop-types';

import Ability from './Ability';
import AbilityGroup from './AbilityGroup';

class Racials extends React.Component {
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

  renderConstant() {

  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.type;
    delete rest.abilities;
    delete rest.viewDescription;
    delete rest.editCharacter;
    const options = this.props.abilities.filter(rule => rule.category == 'Option');
    const choices = this.props.abilities.filter(rule => rule.category == 'Choice');
    const normal = this.props.abilities.filter(rule => {
      return rule.category != 'Option' && rule.category != 'Choice'
      && (!rule.group || choices.find(ability => ability.name == rule.group && ability.count > 0));
    });
    const availableOptions = options.filter(rule => {
      return !rule.group || choices.find(ability => ability.name == rule.group && ability.count > 0);
    });
    return (
      <div {...rest}>
        {normal.map(ability => {
          return (
            <Ability
              key={ability._id}
              source={this.props.type}
              id={ability._id}
              name={ability.name}
              display={ability.display}
              count={ability.count}
              viewDescription={this.props.viewDescription}
              editCharacter={this.props.editCharacter}
            />
          );
        })}
        {availableOptions.map(ability => {
          return (
            <div key={ability._id}>
              <label className='option'>{ability.name + (ability.max ? ' (' + ability.max + ')' : '')}</label>
              <AbilityGroup
                source={this.props.type}
                abilities={choices.filter(rule => rule.group == ability.name)}
                viewDescription={this.props.viewDescription}
                editCharacter={this.props.editCharacter}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

Racials.defaultProps = {
  type: 'race',
  abilities: []
};

Racials.propTypes = {
  type: PropTypes.string,
  abilities: PropTypes.array,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default Racials;
