import React from 'react';
import PropTypes from 'prop-types';

import Field from '../util/styled/Field';

import Ability from './Ability';
import AbilityGroup from './AbilityGroup';

class Racials extends React.Component {
  constructor(props) {
    super(props);

    this.handleProdigyRacial = this.handleProdigyRacial.bind(this);

    this.renderAbilities = this.renderAbilities.bind(this);
  }

  handleProdigyRacial(action) {
    let prodigy = {
      race: action.type == 'RACE' ? action.data : this.props.prodigy.race,
      culture: action.type == 'CULTURE' ? action.data : this.props.prodigy.culture
    };
    this.props.editCharacter({
      type: 'PRODIGY',
      data: prodigy
    });
  }

  renderAbilities(abilities, source='race') {
    const options = abilities.filter(rule => rule.category == 'Option');
    const choices = abilities.filter(rule => rule.category == 'Choice');
    const normal = abilities.filter(rule => {
      return rule.category != 'Option' && rule.category != 'Choice'
      && (!rule.group || choices.find(ability => ability.name == rule.group && ability.count > 0));
    });
    const availableOptions = options.filter(rule => {
      return !rule.group || choices.find(ability => ability.name == rule.group && ability.count > 0);
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
    delete rest.races;
    delete rest.cultures;
    delete rest.racials;
    delete rest.culturals;
    delete rest.viewDescription;
    delete rest.editCharacter;
    const race = this.props.culture == 'Prodigy' ? this.props.prodigy.race : this.props.race;
    const culture = this.props.culture == 'Prodigy' ? this.props.prodigy.culture : this.props.culture;
    return (
      <div {...rest}>
        {this.props.culture != 'Prodigy' ? null :
          <div>
            <Field
              name='race'
              placeholder='Race'
              value={this.props.prodigy.race}
              type='select'
              options={this.props.races.filter(r => r.prodigy).map(r => {
                return { value: r.name, label: r.name };
              })}
              onChange={this.handleProdigyRacial}
            />
            <Field
              name='culture'
              placeholder='Culture'
              value={this.props.prodigy.culture}
              type='select'
              options={this.props.cultures.filter(c => {
                return c.prodigy && (!this.props.prodigy.race || c.race == this.props.prodigy.race);
              }).map(c => {
                return { value: c.name, label: c.name };
              })}
              onChange={this.handleProdigyRacial}
            />
            <div className='divider' />
          </div>
        }
        {this.renderAbilities(this.props.racials.filter(r => {
          return r.race == race && !r.culture && (this.props.culture != 'Prodigy' || r.prodigy);
        }), 'race')}
        {!race ? null : <div className='divider' />}
        {this.renderAbilities(this.props.racials.filter(r => {
          return r.culture && (r.culture == culture || (this.props.culture == 'Prodigy' && (r.culture == 'Prodigy' || r.prodigy)));
        }), 'culture')}
      </div>
    );
  }
}

Racials.defaultProps = {
  race: '',
  culture: '',
  prodigy: {
    race: '',
    culture: ''
  },
  races: [],
  cultures: [],
  racials: []
};

Racials.propTypes = {
  race: PropTypes.string,
  culture: PropTypes.string,
  prodigy: PropTypes.object,
  races: PropTypes.array,
  cultures: PropTypes.array,
  racials: PropTypes.array,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default Racials;
