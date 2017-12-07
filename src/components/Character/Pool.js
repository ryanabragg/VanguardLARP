import React from 'react';
import PropTypes from 'prop-types';

import Ability from './styled/Ability';

class Pool extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.id;
    delete rest.name;
    delete rest.category;
    delete rest.max;
    delete rest.min;
    delete rest.count;
    delete rest.uses;
    delete rest.usesPer;
    delete rest.source;
    delete rest.abilities;
    delete rest.viewDescription;
    delete rest.editCharacter;
    return (
      <div {...rest} className='pool'>
        <Ability
          id={this.props.id}
          name={this.props.name}
          category={this.props.category}
          max={this.props.max}
          min={this.props.min}
          count={this.props.count}
          uses={this.props.uses}
          usesPer={this.props.usesPer}
          source={this.props.source}
          viewDescription={this.props.viewDescription}
          editCharacter={this.props.editCharacter}
        />
        <div className='pool-abilities'>
          {this.props.abilities.map(ability => {
            return (
              <Ability
                key={ability._id}
                id={ability._id}
                name={ability.name}
                display={false}
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
      </div>
    );
  }
}

Pool.defaultProps = {
  name: 'Default Pool',
  category: 'Pool',
  max: 0,
  min: 0,
  count: 0,
  uses: 4,
  usesPer: 'per Short Recovery',
  source: 'build',
  abilities: []
};

Pool.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  name: PropTypes.string,
  category: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  count: PropTypes.number,
  uses: PropTypes.number,
  usesPer: PropTypes.string,
  source: PropTypes.string,
  abilities: PropTypes.array.isRequired,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default Pool;
