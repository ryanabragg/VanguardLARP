import React from 'react';
import PropTypes from 'prop-types';

import Ability from './Ability';

class DomainTier extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div data-character='tier'>
        <span data-character='tier-label'>Tier {this.props.tier}</span>
        {this.props.abilities.map(ability => {
          return (
            <Ability
              key={ability.id}
              id={ability.id}
              name={ability.name}
              display={ability.display}
              count= {ability.count}
              viewDescription={this.props.viewDescription}
              updateCharacterAbility={this.props.updateCharacterAbility}
            />
          );
        })}
      </div>
    );
  }
}

//DomainTier.defaultProps = {};

DomainTier.propTypes = {
  tier: PropTypes.number.isRequired,
  abilities: PropTypes.array.isRequired,
  viewDescription: PropTypes.func.isRequired,
  updateCharacterAbility: PropTypes.func.isRequired
};

export default DomainTier;
