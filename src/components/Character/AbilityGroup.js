import React from 'react';
import PropTypes from 'prop-types';

import Ability from './Ability';

class AbilityGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div data-character='ability-group'>
        <span data-character='label'>{this.props.label}</span>
        {this.props.abilities.map(ability => {
          return (
            <Ability
              key={ability.id}
              id={ability.id}
              name={ability.name}
              display={ability.display}
              count= {ability.count}
              viewDescription={this.props.viewDescription}
              editCharacter={this.props.editCharacter}
            />
          );
        })}
      </div>
    );
  }
}

//AbilityGroup.defaultProps = {};

AbilityGroup.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  abilities: PropTypes.array.isRequired,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default AbilityGroup;
