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
      type: 'CHANGE ' + e.target.name.toUpperCase(),
      data: e.target.value
    });
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.player;
    delete rest.playerBuild;
    delete rest.name;
    delete rest.race;
    delete rest.build;
    delete rest.spent;
    delete rest.level;
    delete rest.body;
    delete rest.buffs;
    delete rest.inscriptions;
    delete rest.armor;
    delete rest.editCharacter;
    delete rest.editRace;
    return (
      <div {...rest} data-character='bio'>
        <div data-character='player-name' className='form-field'>
          <label>Player</label>
          <input value={this.props.player} />
        </div>
        <div data-character='character-name' className='form-field edit'>
          <label>Character</label>
          <input name='name' onChange={this.handleInputChange}
            type='text' value={this.props.name}
          />
        </div>
        <div data-character='race' className='form-field edit' onClick={this.props.editRace}>
          <label>Race</label>
          <input value={this.props.race} />
        </div>
        <div data-character='build-player' className='form-field x3 edit'>
          <label>Player Build</label>
          <input name='player build' onChange={this.handleInputChange}
            type='number' value={this.props.playerBuild}
          />
        </div>
        <div data-character='build-total' className='form-field x3'>
          <label>Build Total</label>
          <input value={this.props.build} />
        </div>
        <div data-character='build-spent' className='form-field x3e'>
          <label>Build Spent</label>
          <input value={this.props.spent} />
        </div>
        <div data-character='level' className='form-field x4'>
          <label>Level</label>
          <input value={this.props.level} />
        </div>
        <div data-character='body' className='form-field x4'>
          <label>Body</label>
          <input value={this.props.body} />
        </div>
        <div data-character='buffs' className='form-field x4'>
          <label>Buffs</label>
          <input value={this.props.buffs} />
        </div>
        <div data-character='inscriptions' className='form-field x4e'>
          <label>Tattoos</label>
          <input value={this.props.inscriptions} />
        </div>
      </div>
    );
  }
}

Player.defaultProps = {
  player: 'Anonymous',
  playerBuild: 0,
  name: 'New Character',
  race: '',
  build: 0,
  spent: 0,
  level: 0,
  body: 0,
  buffs: 0,
  inscriptions: 0,
  armor: ''
};

Player.propTypes = {
  player: PropTypes.string,
  playerBuild: PropTypes.number,
  name: PropTypes.string.isRequired,
  race: PropTypes.string,
  build: PropTypes.number,
  spent: PropTypes.number,
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
