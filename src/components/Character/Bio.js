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
      type: e.target.name.toUpperCase(),
      data: e.target.value
    });
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.player;
    delete rest.playerBuild;
    delete rest.name;
    delete rest.race;
    delete rest.races;
    delete rest.culture;
    delete rest.cultures;
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
          <label className='floating'>Player</label>
          <input value={this.props.player} readOnly />
        </div>
        <div data-character='character-name' className='form-field edit'>
          <label className='floating'>Character</label>
          <input name='name' onChange={this.handleInputChange}
            type='text' value={this.props.name}
          />
        </div>
        <div data-character='race' className='form-field x2 edit'>
          <label className='floating'>Race</label>
          <select name='race' onChange={this.handleInputChange}
            type='text' value={this.props.race}
          >
            <option value=''></option>
            {this.props.races.map(race => <option key={race} value={race}>{race}</option>)}
          </select>
        </div>
        <div data-character='culture' className='form-field x2e edit'>
          <label className='floating'>Culture</label>
          <select name='culture' onChange={this.handleInputChange}
            type='text' value={this.props.culture}
          >
            <option value=''></option>
            {this.props.cultures.map(culture => <option key={culture} value={culture}>{culture}</option>)}
          </select>
        </div>
        <div data-character='build-player' className='form-field x3 edit'>
          <label className='floating'>Player Build</label>
          <input name='player build' onChange={this.handleInputChange}
            type='number' value={this.props.playerBuild}
          />
        </div>
        <div data-character='build-total' className='form-field x3'>
          <label className='floating'>Build Total</label>
          <input value={this.props.build} readOnly />
        </div>
        <div data-character='build-spent' className='form-field x3e'>
          <label className='floating'>Build Spent</label>
          <input value={this.props.spent} readOnly />
        </div>
        <div data-character='level' className='form-field x4'>
          <label className='floating'>Level</label>
          <input value={this.props.level} readOnly />
        </div>
        <div data-character='body' className='form-field x4'>
          <label className='floating'>Body</label>
          <input value={this.props.body} readOnly />
        </div>
        <div data-character='buffs' className='form-field x4'>
          <label className='floating'>Buffs</label>
          <input value={this.props.buffs} readOnly />
        </div>
        <div data-character='inscriptions' className='form-field x4e'>
          <label className='floating'>Tattoos</label>
          <input value={this.props.inscriptions} readOnly />
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
  races: [],
  culture: '',
  cultures: [],
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
  races: PropTypes.array,
  culture: PropTypes.string,
  cultures: PropTypes.array,
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
  editCharacter: PropTypes.func.isRequired
};

export default Player;
