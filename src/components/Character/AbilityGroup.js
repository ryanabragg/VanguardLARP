import React from 'react';
import PropTypes from 'prop-types';

import Ability from './Ability';

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
    const tiers =
      this.props.abilities
      .map(ability => ability.tier)
      .filter((tier, index, self) => index == self.indexOf(tier) && tier != '')
      .sort((a, b) => a - b);
    return (
      <div {...rest}>
        {tiers.length
        ? tiers.map(tier => {
          return (
            <div className='tier' key={tier}>
              <label className='tier'>{tier}</label>
              {this.props.abilities.filter(ability => tier === ability.tier).map(ability => {
                return (
                  <Ability
                    key={ability._id}
                    id={ability._id}
                    name={ability.name}
                    display={ability.display}
                    count={ability.count}
                    viewDescription={this.props.viewDescription}
                    editCharacter={this.props.editCharacter}
                  />
                );
              })}
            </div>
          );
        })
        : this.props.abilities.map(ability => {
          return (
            <Ability
              key={ability._id}
              source={this.props.source}
              id={ability._id}
              name={ability.name}
              display={ability.display}
              count={ability.count}
              viewDescription={this.props.viewDescription}
              editCharacter={this.props.editCharacter}
            />
          );
        })
        }
      </div>
    );
  }
}

AbilityGroup.defaultProps = {
  source: 'build'
};

AbilityGroup.propTypes = {
  source: PropTypes.string,
  abilities: PropTypes.array.isRequired,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default AbilityGroup;
