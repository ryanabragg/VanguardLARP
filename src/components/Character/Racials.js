import React from 'react';
import PropTypes from 'prop-types';

import Field from '../util/styled/Field';

import Ability from './Ability';
import AbilityGroup from './AbilityGroup';

class Racials extends React.Component {
  constructor(props) {
    super(props);

    this.renderAbilities = this.renderAbilities.bind(this);
  }

  renderAbilities(abilities, source='race') {
    const options = abilities.filter(rule => rule.category == 'Option');
    const choices = abilities.filter(rule => rule.category == 'Choice');
    const normal = abilities.filter(rule => {
      return rule.count > 0 && rule.category != 'Option' && rule.category != 'Choice'
      && (!rule.group || choices.find(c => c.name == rule.group && c.count > 0));
    });
    const availableOptions = options.filter(rule => {
      return !rule.group || choices.find(c => c.name == rule.group && c.count > 0);
    });
    return (
      <div data-source={source}>
        {normal.map(ability => {
          return (
            <Ability
              key={ability._id}
              source={source}
              id={ability._id}
              name={ability.name}
              display={ability.display}
              count={ability.count}
              viewDescription={this.props.viewDescription}
              editCharacter={this.props.editCharacter}
            />
          );
        })}
        {!availableOptions.length ? null : <div className='divider' />}
        {availableOptions.map(ability => {
          return (
            <div key={ability._id}>
              <label className='option'>{ability.name + (ability.max ? ' (' + ability.max + ')' : '')}</label>
              <AbilityGroup
                source={source}
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

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.race;
    delete rest.culture;
    delete rest.prodigy;
    delete rest.racials;
    delete rest.viewDescription;
    delete rest.editCharacter;
    return (
      <div {...rest}>
        {!this.props.prodigy ? null :
          <div className='prodigy'>
            Prodigy
            <div className='divider' />
          </div>
        }
        {this.renderAbilities(this.props.racials.filter(r => {
          return r.race == this.props.race && !r.culture;
        }), 'race')}
        {!this.props.race ? null : <div className='divider' />}
        {this.renderAbilities(this.props.racials.filter(r => {
          return r.culture && r.culture == this.props.culture;
        }), 'culture')}
      </div>
    );
  }
}

Racials.defaultProps = {
  race: '',
  culture: '',
  prodigy: false,
  racials: []
};

Racials.propTypes = {
  race: PropTypes.string,
  culture: PropTypes.string,
  prodigy: PropTypes.bool,
  racials: PropTypes.array,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default Racials;
