import React from 'react';
import PropTypes from 'prop-types';

import Ability from './Ability';

class Domain extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.name;
    delete rest.abilities;
    delete rest.viewDescription;
    delete rest.editCharacter;
    const tiers =
      this.props.abilities
      .map(ability => ability.tier)
      .filter((tier, index, self) => index === self.indexOf(tier))
      .sort((a, b) => a - b);
    return (
      <div {...rest} data-character='domain'>
        <label className='floating'>{this.props.name}</label>
        {tiers.map(tier => {
          return (
            <div key={tier}>
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
  editCharacter: PropTypes.func.isRequired
};

export default Domain;
