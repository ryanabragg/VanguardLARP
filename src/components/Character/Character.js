import React from 'react';

import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';

import Section from './styled/Section';
import Bio from './styled/Bio';
import Stones from './styled/Stones';
import AbilityGroup from './styled/AbilityGroup';
import SourceMarks from './styled/SourceMarks';
import Crafting from './styled/Crafting';
import Pools from './styled/Pools';

// import the notifications component to access static methods (don't import styled version)
import NotificationList from '../NotificationList';

const socket = io('localhost:3030');
const app = feathers().configure(socketio(socket));

class Character extends React.Component {
  constructor (props) {
    super(props);

    this.newCharacter = {
      _id: '',
      player: {
        name: 'Anonymous',
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
      sourceMarks: [],
      skills: [] // { id, count, source } (source: 'race', 'culture', 'build', level number, 'code' )
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

    this.getRules = this.getRules.bind(this);
    this.parseRules = this.parseRules.bind(this);

    this.levelValues = this.levelValues.bind(this);

    this.encode = this.encode.bind(this);
    this.decode = this.decode.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);

    this.editCharacter = this.editCharacter.bind(this);
    this.stateLivesChange = this.stateLivesChange.bind(this);
    this.stateRaceChange = this.stateRaceChange.bind(this);
    this.stateSkillChange = this.stateSkillChange.bind(this);
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

  getRules() {
    return this.state.rules.map(rule => {
      let display = {
        display: rule.max == 1 ? 'checkbox' : rule.category == 'Craft' ? 'tiers' : ''
      };
      let skills = this.state.character.skills.filter(skill => skill.id == rule._id);
      if(!skills.length)
        return Object.assign({}, rule, { count: 0 }, display);
      let count = {
        count: skills.reduce((total, skill) => { return total + skill.count}, 0)
      };
      return Object.assign({}, rule, count, display);
    });
  }

  parseRules() {
    const rules = this.getRules();
    const granted = rules.filter(rule => rule.grants);
    const { race } = this.state.character;
    return { // @todo: change sort to be part of data entry
      races: rules.filter(rule => rule.category == 'Race')
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        }),
      cultures: rules.filter(rule => rule.category == 'Culture')
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        }),
      weapons: rules.filter(rule => rule.category == 'Weapon')
        .sort((a, b) => {
          return a.name == 'Student of War' ? -1
          : b.name == 'Student of War' ? 1
          : a.name == 'Source Mark' ? -1
          : b.name == 'Source Mark' ? 1
          : a.name > b.name ? 1
          : -1;
        }),
      aptitudes: rules.filter(rule => rule.category == 'Aptitude')
        .sort((a, b) => {
          return a.name == 'Student of War' ? -1
          : b.name == 'Student of War' ? 1
          : a.name == 'Source Mark' ? -1
          : b.name == 'Source Mark' ? 1
          : a.name == 'Armor' ? 1
          : b.name == 'Armor' ? -1
          : a.name > b.name ? 1
          : -1;
        }),
      crafts: rules.filter(rule => rule.category == 'Craft')
        .sort((a, b) => {
          return a.name == 'Jack of All Trades' ? -1
          : b.name == 'Jack of All Trades' ? 1
          : a.name > b.name ? 1
          : -1;
        }),
      domains: rules.filter(rule => rule.category == 'Domain'),
      advancedArts: rules.filter(rule => rule.category == 'Advanced Arts'),
      pools: rules.filter(rule =>
        (rule.category == 'Pool' || rule.category == 'Pool Ability' ) &&
        !rule.race && !rule.culture
      ),
      racial: rules.filter(rule => rule.race == race.name),
      cultural: rules.filter(rule => rule.culture == race.culture),
      bodyMod: {
        extra: granted.reduce((total, rule) => {
          let count = rule.grants.split(', ')
            .filter(g => g.includes('Body:'))
            .reduce((count, g) => count + (parseInt(g.split(': ')[1]) || 0), 0);
          return total + rule.count * count;
        }, 0),
        perLevel: granted.reduce((total, rule) => {
          let count = rule.grants.split(', ')
            .filter(g => g.includes('Body Per Level:'))
            .reduce((count, g) => count + (parseInt(g.split(': ')[1]) || 0), 0);
          return total + rule.count * count;
        }, 0),
        double: Boolean(granted.reduce((check, rule) => check || (rule.grants.includes('Double Body') && rule.count), false))
      },
      sourceMark: {
        limit: granted.reduce((total, rule) => {
          let count = rule.grants.split(', ')
            .filter(g => g.includes('Source Mark:'))
            .reduce((count, g) => count + (parseInt(g.split(': ')[1]) || 0), 0);
          return total + rule.count * count;
        }, 0),
        mastery: Boolean(granted.reduce((check, rule) => check || (rule.grants.includes('Source Mastery') && rule.count), false))
      }
    };
  }

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

  encode() {}

  decode(code) {}

  saveCharacter() {}

  loadCharacter() {}

  editCharacter(action) {
    console.log(this.state);
    console.log(action);
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      let change = {};
      switch(action.type) {
      case 'PLAYER NAME':
        nextState.character.player.name = action.data; break;
      case 'PLAYER BUILD':
        nextState.character.player.build = Number(action.data); break;
      case 'NAME':
        nextState.character.name = action.data; break;
      case 'BUILD TOTAL':
        nextState.character.build.total = Number(action.data); break;
      case 'BUILD SPENT':
        nextState.character.build.spent = Number(action.data); break;
      case 'BUILD NONDOMAIN':
        nextState.character.build.nonDomain = Number(action.data); break;
      case 'ENABLE LIFE':
      case 'DISABLE LIFE':
        change = this.stateLivesChange(prevState, action);
        nextState.character.lives = change.lives;
        break;
      case 'RACE':
      case 'CULTURE':
        change = this.stateRaceChange(prevState, action);
        break;
      case 'SOURCE MARK':
        nextState.character.sourceMarks = action.data; break;
      case 'SKILL':
        change = this.stateSkillChange(prevState, action);
        nextState.character.build = change.build;
        nextState.character.skills = change.skills;
        break;
      default:
        return prevState;
      }
      return nextState;
    }, () => {
      console.log(this.state);
    });
  }

  stateLivesChange(prevState, action) {
    let color = action.data;
    let edit = [];
    switch(action.type) {
    case 'ENABLE LIFE':
      edit = prevState.character.lives.map(stone => {
        if(stone.color != color ||
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
    case 'DISABLE LIFE':
      edit = prevState.character.lives.map(stone => {
        if(stone.color != color ||
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
      edit = prevState.character.slice();
    }
    return {
      lives: edit
    };
  }

  stateRaceChange(prevState, action) {
    console.log('@todo');
    return {
      build: {
        total: 0,
        spent: 0,
        nonDomain: 0
      },
      race: '',
      culture: '',
      skills: []
    }
  }

  stateSkillChange(prevState, action) {
    let { id, count, source } = action.data;
    if(!id || count < 0)
      return { build: prevState.character.build, skills: prevState.character.skills };

    let rule = prevState.rules.filter(rule => rule._id == id);
    if(!rule.length || (rule[0].race && rule[0].race != prevState.character.race.name))
      return { build: prevState.character.build, skills: prevState.character.skills };

    let skills = prevState.character.skills.slice();

    let { total, spent, nonDomain } = prevState.character.build;
    let cost = source == 'build' ? rule[0].build : 0;

    let index = skills.findIndex(skill => skill.id == id && skill.source == source);

    if(index == -1)
      return {
        build: {
          total: total,
          spent: spent + count * cost,
          nonDomain: nonDomain + (rule[0].category == 'Domain' ? count * cost : 0)
        },
        skills: skills.concat({
          id: id,
          count: count,
          source: source
        })
      };

    if(skills[index].count >= rule.max)
      return { build: prevState.character.build, skills: prevState.character.skills };

    let diff = count - skills[index].count;

    skills[index] = {
      id: id,
      count: count,
      source: source
    };

    return {
      build: {
        total: total,
        spent: spent + diff * cost,
        nonDomain: nonDomain + (rule[0].category == 'Domain' ? (count - skills[index].count) * cost : 0)
      },
      skills: skills
    };
  }

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
      sourceMarks,
      skills
    } = this.state.character;
    const {
      races,
      cultures,
      weapons,
      aptitudes,
      crafts,
      domains,
      advancedArts,
      pools,
      racial,
      cultural,
      bodyMod,
      sourceMark
    } = this.parseRules();
    let bodyTotal = (body + bodyMod.extra + bodyMod.perLevel * level) * (bodyMod.double ? 2 : 1);
    return (
      <div data-character='container'>
        <Section>
          <Bio
            player={player.name}
            playerBuild={player.build}
            name={name}
            race={race.name}
            races={races.map(rule => rule.name)}
            culture={race.culture}
            cultures={cultures.map(rule => rule.name)}
            build={build.total}
            spent={build.spent}
            level={level}
            body={bodyTotal}
            buffs={buffs}
            inscriptions={inscriptions}
            editCharacter={this.editCharacter}
          />
          <Stones
            label='Ressurection Bag'
            stones={lives}
            type='life'
            stoneClick={this.editCharacter}
          />
          <Stones
            label='Recoveries' 
            stones={recoveries}
          />
        </Section>
        <Section>
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
          <SourceMarks
            limit={sourceMark.limit}
            mastery={sourceMark.mastery}
            known={sourceMarks}
            editCharacter={this.editCharacter}
          />
        </Section>
        <Section>
          <Crafting />
          <AbilityGroup
            label='Craft Skills'
            abilities={crafts}
            viewDescription={this.viewRule}
            editCharacter={this.editCharacter}
          />
        </Section>
        <Section>
          <Pools
            label='Combat Pools'
            abilities={pools}
            viewDescription={this.viewRule}
            editCharacter={this.editCharacter}
          />
        </Section>
      </div>
    );
  }
}

export default Character;
