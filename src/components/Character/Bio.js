import React from 'react';
import PropTypes from 'prop-types';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    let edit = {
      name: e.target.value
    };
    this.props.editCharacter(edit);
  }

  render() {
    return (
      <div data-character='bio'>
        <input data-character='character-name' name='name' onChange={this.handleInputChange} value={this.props.name} />
        <span data-character='character-race' onClick={this.props.editRace}>{this.props.race}</span>
        <span data-character='character-build'>{this.props.build}</span>
        <span data-character='character-level'>{this.props.level}</span>
        <span data-character='character-body'>{this.props.body}</span>
        <span data-character='character-buffs'>{this.props.buffs}</span>
        <span data-character='character-inscriptions'>{this.props.inscriptions}</span>
        <span data-character='character-armor'>{this.props.armor}</span>
      </div>
    );
  }
}

Player.defaultProps = {
  name: 'NPC',
  race: '',
  build: 35,
  level: 1,
  body: 15,
  buffs: 3,
  inscriptions: 1,
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
