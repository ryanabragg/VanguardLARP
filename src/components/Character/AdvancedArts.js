import React from 'react';
import PropTypes from 'prop-types';

import Ability from './Ability';

class AdvancedArts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.label;
    delete rest.abilities;
    delete rest.viewDescription;
    delete rest.editCharacter;
    return (
      <div {...rest} data-character='advanced-arts'>
        <label className='floating'>{this.props.label}</label>
        {this.props.abilities.map(ability => {
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
  }
}

//AdvancedArts.defaultProps = {};

AdvancedArts.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  abilities: PropTypes.array.isRequired,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default AdvancedArts;
