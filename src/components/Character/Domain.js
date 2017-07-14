import React from 'react';
import PropTypes from 'prop-types';

import DomainTier from './DomainTier';

class Domain extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tiers =
      this.props.abilities
      .map(ability => ability.tier)
      .filter((tier, index, self) => index === self.indexOf(tier))
      .sort((a, b) => a - b);
    return (
      <div data-character='domain'>
        <span data-character='domain-label'>{this.props.name}</span>
        {tiers.map(tier => {
          return (
            <DomainTier
              key={tier}
              domain={this.props.name}
              tier={tier}
              abilities= {this.props.abilities.filter(ability => tier === ability.tier)}
              viewDescription={this.props.viewDescription}
              updateCharacterAbility={this.props.updateCharacterAbility}
            />
          );
        })}
      </div>
    );
  }
}

//Domain.defaultProps = {};

Domain.propTypes = {
  name: PropTypes.string.isRequired,
  abilities: PropTypes.array.isRequired,
  viewDescription: PropTypes.func.isRequired,
  updateCharacterAbility: PropTypes.func.isRequired
};

export default Domain;
