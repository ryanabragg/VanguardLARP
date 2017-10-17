import React from 'react';
import PropTypes from 'prop-types';

import Pool from './Pool';

class Pools extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.source;
    delete rest.extraTags;
    delete rest.abilities;
    delete rest.viewDescription;
    delete rest.editCharacter;
    const pools = this.props.abilities.filter(rule => rule.category == 'Pool');
    const abilities = this.props.abilities.filter(rule => rule.category == 'Pool Ability');
    return (
      <div {...rest}>
        {pools.map(pool => {
          let extra = 0;
          if(this.props.extraTags != undefined)
            switch(pool.name) {
            case 'Chemix Pool':
              extra = this.props.extraTags.chemix; break;
            case 'Melee Pool':
              extra = this.props.extraTags.melee; break;
            case 'Spell Pool':
              extra = this.props.extraTags.spell; break;
            }
          return (
            <Pool
              key={pool._id}
              id={pool._id}
              name={pool.name}
              count={pool.count}
              source={this.props.source}
              tags={Number(pool.tags) + extra}
              abilities={abilities.filter(rule => rule.group == pool.name)}
              viewDescription={this.props.viewDescription}
              editCharacter={this.props.editCharacter}
            />
          );
        })}
      </div>
    );
  }
}

Pools.defaultProps = {
  source: 'build',
  extraTags: {
    chemix: 0,
    melee: 0,
    spell: 0
  },
  abilities: []
};

Pools.propTypes = {
  source: PropTypes.string,
  extraTags: PropTypes.shape({
    chemix: PropTypes.number,
    melee: PropTypes.number,
    spell: PropTypes.number
  }),
  abilities: PropTypes.array.isRequired,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default Pools;
