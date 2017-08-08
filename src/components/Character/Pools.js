import React from 'react';
import PropTypes from 'prop-types';

import Pool from './Pool';

class Pools extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.label;
    delete rest.abilities;
    delete rest.viewDescription;
    delete rest.editCharacter;
    const pools = this.props.abilities.filter(rule => rule.category == 'Pool');
    const abilities = this.props.abilities.filter(rule => rule.category == 'Pool Ability');
    return (
      <div {...rest} data-character='pool-group'>
        <label className='floating'>{this.props.label}</label>
        {pools.map(pool => {
          return (
            <Pool
              key={pool._id}
              id={pool._id}
              name={pool.name}
              count={pool.count}
              source={this.props.source}
              tags={Number(pool.tags)}
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

Pool.defaultProps = {
  source: 'build'
};

Pool.propTypes = {
  label: PropTypes.string.isRequired,
  source: PropTypes.string,
  abilities: PropTypes.array.isRequired,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default Pools;
