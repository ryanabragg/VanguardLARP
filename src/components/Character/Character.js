import React from 'react';

//import UUID from 'uuid/v1';

import Player from './Player';
import Bio from './Bio';

class Character extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      alerts: [],
      rules: [],
      character: {
        player: {
          name: 'Unknown',
          build: 0
        },
        name: 'NPC',
        build: 0,
        lives: {
          blue: 1,
          black: 1,
          red: 2,
          white: 9
        },
        race: {
          name: '',
          culture: ''
        },
        recoveries: 6,
        racials: {},
        skills: {},
        free: {}
      }
    };

    this.getLevelValues = this.getLevelValues.bind(this);
    this.updateURI = this.updateURI.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);
    this.characterHas = this.characterHas.bind(this);
    this.editCharacter = this.editCharacter.bind(this);
    this.editRace = this.editRace.bind(this);
  }

  componentDidMount () {
    // load user authentification
    // load character
    // load rules
  }

  getLevelValues() {
    const build = this.state.character.build;
    const level = Math.floor((build - 25) / 10);
    return {
      buildAvailable: this.state.character.player.build,
      buildUsed: build,
      level: level,
      body: 10 + 5 * level,
      buffs: 3 + Math.floor(level / 5),
      inscriptions: 1 + Math.floor(level / 5)
    };
  }

  getRuleData(id) {}

  updateURI() {}
  saveCharacter() {}

  characterHas(id) {
    const list = Object.assign({}, this.state.character.racials, this.state.character.skills);
    const has = list.keys().find(key => id === key);
    if(has === undefined)
      return 0;
    return list[id];
  }

  characterCanGet(id) {
    return true;
  }

  editCharacter(edit) {
    this.setState((prevState, props) => {
      let updated = Object.assign({}, prevState.character, edit);
      return {
        character: updated
      };
    });
  }

  editRace() {}

  render() {
    const { buildAvailable, buildUsed, level, body, buffs, inscriptions } = this.getLevelValues();
    const { character } = this.state;
    return (
      <div data-character='container'>
        <Player
          name={character.player.name}
          build={character.player.build}
          editCharacter={this.editCharacter}
        />
        <Bio
          name={character.name}
          race={character.race.name + character.race.culture ? ' - ' + character.race.name : ''}
          build={character.build}
          level={level}
          body={body}
          buffs={buffs}
          inscriptions={inscriptions}
          editCharacter={this.editCharacter}
          editRace={this.editRace}
        />
      </div>
    );
  }
}

export default Character;
