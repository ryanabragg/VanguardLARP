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
  }

  componentDidMount () {
    // load user authentification
    // load character
    // load rules
  }

  getLevelValues() {
    const build = this.state.character.build;
    return {
      buildAvailable: this.state.character.player.build,
      buildUsed: build,
      level: (build - 25) / 10,
      body: 10 + 5 * (build - 25) / 10,
      buffs: 1 + (build - 25) / 10 / 5
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

  render() {
    console.log(this.state.character);
    console.log(this.getLevelValues());
    const { buildAvailable, buildUsed, level, body, buffs } = this.getLevelValues();
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
          build={character.build}
          level={level}
          body={body}
          buffs={buffs}
          editCharacter={this.editCharacter}
        />
      </div>
    );
  }
}

export default Character;
