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
    delete rest.abilities;
    delete rest.viewDescription;
    delete rest.editCharacter;
    const pools = this.props.abilities.filter(rule => rule.category == 'Pool');
    const abilities = this.props.abilities.filter(rule => rule.category == 'Pool Ability');
    return (
      <div {...rest}>
        {pools.map(pool => {
          return (
            <Pool
              key={pool._id}
              id={pool._id}
              name={pool.name}
              category='Pool'
              max={pool.max}
              min={pool.granted}
              count={pool.count}
              uses={pool.usesTotal}
              usesPer={pool.usesType}
              source={this.props.source}
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
  abilities: []
};

Pools.propTypes = {
  source: PropTypes.string,
  abilities: PropTypes.array.isRequired,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default Pools;
