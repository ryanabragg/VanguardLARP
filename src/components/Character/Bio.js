import React from 'react';
import PropTypes from 'prop-types';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    this.props.editCharacter({
      type: 'CHANGE NAME',
      data: e.target.value
    });
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.name;
    delete rest.race;
    delete rest.build;
    delete rest.level;
    delete rest.body;
    delete rest.buffs;
    delete rest.inscriptions;
    delete rest.armor;
    delete rest.editCharacter;
    delete rest.editRace;
    return (
      <div {...rest} data-character='bio'>
        <input data-character='character-name'
          name='name' onChange={this.handleInputChange}
          value={this.props.name}
        />
        <div data-character='character-build' className='number'>{this.props.build}</div>
        <div data-character='character-race'
          onClick={this.props.editRace}
        >{this.props.race}</div>
        <div data-character='character-level' className='number'>{this.props.level}</div>
        <div data-character='character-body' className='number under-text'>{this.props.body}</div>
        <div data-character='character-buffs' className='number under-text'>{this.props.buffs}</div>
        <div data-character='character-inscriptions' className='number under-text'>{this.props.inscriptions}</div>
        <div data-character='character-armor' className='number under-text'>{this.props.armor}</div>
      </div>
    );
  }
}

Player.defaultProps = {
  name: 'New Character',
  race: '',
  build: 0,
  level: 0,
  body: 0,
  buffs: 0,
  inscriptions: 0,
  armor: ''
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
  race: PropTypes.string,
  build: PropTypes.number,
  level: PropTypes.number,
  body: PropTypes.number,
  buffs: PropTypes.number,
  inscriptions: PropTypes.number,
  armor: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  editCharacter: PropTypes.func.isRequired,
  editRace: PropTypes.func.isRequired
};

export default Player;
