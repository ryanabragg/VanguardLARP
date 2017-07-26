import React from 'react';

import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';

import Player from './styled/Player';
import Bio from './styled/Bio';
import Stones from './styled/Stones';
import AbilityGroup from './styled/AbilityGroup';

// import the notifications component to access static methods (don't import styled version)
import NotificationList from '../NotificationList';

const socket = io('localhost:3030');
const app = feathers().configure(socketio(socket));

class Character extends React.Component {
  constructor (props) {
    super(props);

    this.newCharacter = {
      player: {
        name: 'Player Name',
        build: 0
      },
      name: 'New Character',
      build: {
        total: 35,
        spent: 0,
        nonDomain: 0
      },
      lives: [
        { color: 'blue', count: 1, disabled: 0 },
        { color: 'black', count: 1, disabled: 0 },
        { color: 'red', count: 2, disabled: 0 },
        { color: 'white', count: 9, disabled: 0 }
      ],
      recoveries: 6,
      race: {
        name: '',
        culture: ''
      },
      sourceMark: {
        limit: 0,
        innate: '',
        known: []
      },
      skills: []
    };

    this.syncData = {
      interval: 500, // ms
      paginate: 50,
      total: 0,
      progress: [],
      add: [],
      modify: [],
      remove:[]
    };

    this.state = {
      rules: [],
      character: this.newCharacter
    };

    this.startSync = this.startSync.bind(this);
    this.sync = this.sync.bind(this);

    this.viewRule = this.viewRule.bind(this);
    this.parseRules = this.parseRules.bind(this);

    this.updateURI = this.updateURI.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);

    this.levelValues = this.levelValues.bind(this);

    this.editCharacter = this.editCharacter.bind(this);
    this.editRace = this.editRace.bind(this);
    this.editLives = this.editLives.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.removeSkill = this.removeSkill.bind(this);
  }

  componentDidMount () {
    // load user authentication
    // load character

    app.service('rules').on('created', rule => {
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(this.syncInProgress)
          this.syncData.add = this.syncData.add.concat(rule);
        else
          nextState.rules = prevState.rules.concat(rule);
        return nextState;
      });
    });

    app.service('rules').on('patched', rule => {
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(this.syncInProgress)
          this.syncData.modify = this.syncData.modify.concat(rule);
        else
          nextState.rules[prevState.rules.map(item => item._id).indexOf(rule._id)] = Object.assign({}, rule);
        return nextState;
      });
    });

    app.service('rules').on('removed', rule => {
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(this.syncInProgress)
          this.syncData.remove = this.syncData.remove.concat(rule);
        else
          nextState.rules = prevState.rules.filter(listed => rule._id != listed._id);
        return nextState;
      });
    });

    this.startSync();
  }

  componentWillUnmount () {
    app.service('rules').removeListener('created');
    app.service('rules').removeListener('patched');
    app.service('rules').removeListener('removed');
  }

  startSync() {
    this.syncData = {
      interval: 500, // ms
      paginate: 50,
      total: 0,
      progress: [],
      add: [],
      modify: [],
      remove:[]
    };
    this.syncInProgress = setInterval(this.sync, this.syncData.interval);
  }

  sync() {
    app.service('rules').find({
      query:{
        $sort:{
          category: 1,
          group: 1,
          name: 1
        },
        $limit: this.syncData.paginate,
        $skip: this.syncData.progress.length
      }
    }).then(page => {
      this.syncData.total = page.total;
      this.syncData.progress = this.syncData.progress.concat(page.data);
      if(this.syncData.total == this.syncData.progress.length + this.syncData.add.length - this.syncData.remove.length) {
        clearInterval(this.syncInProgress);
        this.syncInProgress = 0;
        let modifyIDs = this.syncData.modify.map(rule => rule._id);
        let removeIDs = this.syncData.remove.map(rule => rule._id);
        this.setState((prevState, props) => {
          let nextState = Object.assign({}, prevState);
          nextState.rules = this.syncData.progress
            .filter(rule => removeIDs.indexOf(rule._id) === -1)
            .filter(rule => modifyIDs.indexOf(rule._id) === -1)
            .concat(this.syncData.modify)
            .concat(this.syncData.add);
          return nextState;
        });
      }
    });
  }

  viewRule(id) {}

  parseRules() {
    const rules = this.state.rules.map(rule => {
      if(rule.max == 1)
        rule.display = 'checkbox';
      else if (rule.category == 'Craft')
        rule.display = 'tiers';
      return rule;
    });
    const { race } = this.state.character;
    return {
      weapons: rules.filter(rule => rule.category == 'Weapon'),
      aptitudes: rules.filter(rule => rule.category == 'Aptitude'),
      crafts: rules.filter(rule => rule.category == 'Craft'),
      domains: rules.filter(rule => rule.category == 'Domain'),
      advancedArts: rules.filter(rule => rule.category == 'Advanced Arts'),
      pools: rules.filter(rule => rule.category == 'Pool' && !rule.race),
      racialPools: rules.filter(rule =>
        rule.category == 'Pool' &&
        rule.race != '' &&
        rule.race == race.name &&
        !rule.culture
      ),
      culturalPools: rules.filter(rule =>
        rule.category == 'Pool' &&
        rule.race != '' &&
        rule.culture == race.culture
      ),
      racials: rules.filter(rule =>
        rule.category != 'Pool' &&
        rule.race != '' &&
        rule.race == race.name
      ),
      culturals: rules.filter(rule =>
        rule.category != 'Pool' &&
        rule.race != '' &&
        rule.culture == race.culture
      )
    };
  }

  updateURI() {}
  saveCharacter() {}

  levelValues() {
    const build = this.state.character.build.spent;
    const level = Math.floor((build - 25) / 10);
    return {
      level: level,
      body: 10 + 5 * level,
      buffs: 3 + Math.floor(level / 5),
      inscriptions: 1 + Math.floor(level / 5),
      T1: level >= 5,
      T2: level >= 10 && this.state.character.build.nonDomain >= 100,
      T3: level >= 15 && this.state.character.build.nonDomain >= 125,
      AA: level >= 20
    };
  }

  editCharacter(action) {
    console.log(action);
    let edit = {};
    switch(action.type) {
    case 'CHANGE PLAYER NAME':
      edit = { player: { name: action.data }}; break;
    case 'CHANGE PLAYER BUILD':
      edit = { player: { build: action.data }}; break;
    case 'CHANGE NAME':
      edit = { name: action.data }; break;
    case 'CHANGE BUILD TOTAL':
      edit = { build: { total: action.data }}; break;
    case 'CHANGE BUILD SPENT':
      edit = { build: { spent: action.data }}; break;
    case 'CHANGE BUILD NONDOMAIN':
      edit = { build: { nonDomain: action.data }}; break;
    case 'CHANGE LIVES':
      edit = { lives: action.data }; break;
    case 'CHANGE RECOVERIES':
      edit = { lives: action.data }; break;
    case 'CHANGE RACE':
      edit = { race: { name: action.data }}; break;
    case 'CHANGE CULTURE':
      edit = { race: { culture: action.data }}; break;
    case 'ADD SKILL':
      edit = addSkill(action.data.id, action.data.count);
      if(!edit)
        return;
      break;
    case 'REMOVE SKILL':
      edit = removeSkill(action.data.id, action.data.count);
      if(!edit)
        return;
      break;
    default:
      return;
    }
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.character = Object.assign({}, prevState.character, edit);
      return nextState;
    });
  }

  editRace() {}

  editLives(action) {
    if(action.data == undefined)
      return;
    let edit = [];
    switch(action.type) {
    case 'ENABLE STONE':
      edit = this.state.character.lives.map(stone => {
        if(stone.color != action.data ||
          stone.disabled == 0 ||
          stone.count == 0
        )
          return stone;
        return {
          color: stone.color,
          count: stone.count,
          disabled: stone.disabled - 1
        };
      });
      break;
    case 'DISABLE STONE':
      edit = this.state.character.lives.map(stone => {
        if(stone.color != action.data ||
          stone.disabled == stone.count ||
          stone.count == 0
        )
          return stone;
        return {
          color: stone.color,
          count: stone.count,
          disabled: stone.disabled + 1
        };
      });
      break;
    default:
      return;
    }
    this.editCharacter({
      type: 'CHANGE LIVES',
      data: edit
    });
  }

  addSkill() {}

  removeSkill() {}

  render() {
    const {
      level,
      body,
      buffs,
      inscriptions,
      T1,
      T2,
      T3,
      AA
    } = this.levelValues();
    const {
      player,
      name,
      build,
      lives,
      race,
      recoveries,
      sourceMark,
      skills
    } = this.state.character;
    const {
      weapons,
      aptitudes,
      crafts,
      domains,
      advancedArts,
      pools,
      racialPools,
      culturalPools,
      racials,
      culturals
    } = this.parseRules();
    return (
      <div data-character='container'>
        <Player
          name={player.name}
          build={player.build}
          editCharacter={this.editCharacter}
        />
        <Bio
          name={name}
          race={race.name + race.culture ? ' - ' + race.culture : ''}
          build={build.spent}
          level={level}
          body={body}
          buffs={buffs}
          inscriptions={inscriptions}
          editCharacter={this.editCharacter}
          editRace={this.editRace}
        />
        <Stones
          label='Ressurection Bag'
          stones={lives}
          stoneClick={this.editLives}
        />
        <Stones
          label='Recoveries' 
          stones={recoveries}
        />
        <AbilityGroup
          label='Weapon Skills'
          abilities={weapons}
          viewDescription={this.viewRule}
          editCharacter={this.editCharacter}
        />
        <AbilityGroup
          label='Aptitudes'
          abilities={aptitudes}
          viewDescription={this.viewRule}
          editCharacter={this.editCharacter}
        />
      </div>
    );
  }
}

export default Character;
