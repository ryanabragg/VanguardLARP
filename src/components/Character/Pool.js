import React from 'react';
import PropTypes from 'prop-types';

import Ability from './Ability';

class Pool extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.id;
    delete rest.name;
    delete rest.count;
    delete rest.source;
    delete rest.tags;
    delete rest.abilities;
    delete rest.viewDescription;
    delete rest.editCharacter;
    const tags = this.props.tags ? ' (' + this.props.tags * this.props.count + ' tags)' : '';
    return (
      <div {...rest} className='pool'>
        <Ability
          id={this.props.id}
          name={this.props.name + tags}
          count={this.props.count}
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
                display='none'
                count={ability.count}
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
  count: 0,
  source: 'build',
  tags: 0,
  abilities: []
};

Pool.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number,
  source: PropTypes.string,
  tags: PropTypes.number,
  abilities: PropTypes.array.isRequired,
  viewDescription: PropTypes.func.isRequired,
  editCharacter: PropTypes.func.isRequired
};

export default Pool;
