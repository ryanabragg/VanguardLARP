import React from 'react';
import PropTypes from 'prop-types';

import Ability from './styled/Ability';

class AbilityGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.source;
    delete rest.abilities;
    delete rest.viewDescription;
    delete rest.editCharacter;
    const tiers = this.props.abilities.map(ability => ability.tier)
      .filter((tier, index, self) => index == self.indexOf(tier) && tier != '')
      .sort((a, b) => a - b);
    if(tiers.length)
      return (
        <div {...rest}>
          {tiers.map((tier, index) => {
            return (
              <div className='tier' key={index}>
                <label className='tier'>{tier}</label>
                {this.props.abilities.filter(ability => tier === ability.tier).map(ability => {
                  return (
                    <Ability
                      key={ability._id}
                      id={ability._id}
                      name={ability.name}
                      category={ability.category}
                      max={ability.max}
                      min={ability.granted}
                      count={ability.count}
                      uses={ability.usesTotal}
                      usesPer={ability.usesType}
                      source={this.props.source}
                      viewDescription={this.props.viewDescription}
                      editCharacter={this.props.editCharacter}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    return (
      <div {...rest}>
        {this.props.abilities.map(ability => {
          return (
            <Ability
              key={ability._id}
              id={ability._id}
              name={ability.name}
              category={ability.category}
              max={ability.max}
              min={ability.granted}
              count={ability.count}
              uses={ability.usesTotal}
              usesPer={ability.usesType}
              source={this.props.source}
              viewDescription={this.props.viewDescription}
              editCharacter={this.props.editCharacter}
            />
          );
        })}
      </div>
    );
  }
}

AbilityGroup.defaultProps = {
  source: 'build',
  abilities: []
};

AbilityGroup.propTypes = {
  source: PropTypes.string,
  abilities: PropTypes.array,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default AbilityGroup;
