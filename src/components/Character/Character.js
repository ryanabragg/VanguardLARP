import React from 'react';
import PropTypes from 'prop-types';

import Box from './styled/Box';

import Field from '../util/styled/Field';

import Levels from './styled/Levels';
import Stones from './styled/Stones';
import SourceMarks from './styled/SourceMarks';
import Crafting from './styled/Crafting';
import AbilityGroup from './styled/AbilityGroup';
import Racials from './styled/Racials';
import Pools from './styled/Pools';
import Domain from './styled/Domain';
import AdvancedArts from './styled/AdvancedArts';

// import the notifications component to access static methods (don't import styled version)
import NotificationList from '../util/NotificationList';

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
        culture: '',
        prodigy: {
          race: '',
          culture: ''
        }
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

    this.getFreeSkills = this.getFreeSkills.bind(this);

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

    this.props.api.service('rules').on('created', rule => {
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(this.syncInProgress)
          this.syncData.add = this.syncData.add.concat(rule);
        else
          nextState.rules = prevState.rules.concat(rule);
        return nextState;
      });
    });

    this.props.api.service('rules').on('patched', rule => {
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(this.syncInProgress)
          this.syncData.modify = this.syncData.modify.concat(rule);
        else
          nextState.rules[prevState.rules.map(item => item._id).indexOf(rule._id)] = Object.assign({}, rule);
        return nextState;
      });
    });

    this.props.api.service('rules').on('removed', rule => {
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
    this.props.api.service('rules').removeListener('created');
    this.props.api.service('rules').removeListener('patched');
    this.props.api.service('rules').removeListener('removed');
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
    this.props.api.service('rules').find({
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
      let total = skills.reduce((total, skill) => { return total + skill.count}, 0);
      let count = {
        count: !rule.max ? total : Math.min(rule.max, total)
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
      racials: rules.filter(rule => rule.race != '' && rule.category != 'Race' && rule.category != 'Culture'),
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
      advancedArts: rules.filter(rule => rule.category == 'Advanced Art')
        .sort((a, b) => a.name > b.name ? 1 : -1),
      pools: rules.filter(rule =>
        (rule.category == 'Pool' || rule.category == 'Pool Ability' ) &&
        !rule.race && !rule.culture
      ),
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
      },
      extraTags: {
        chemix: granted.reduce((total, rule) => {
          let count = rule.grants.split(', ')
            .filter(g => g.includes('Chemix Tag:'))
            .reduce((count, g) => count + (parseInt(g.split(': ')[1]) || 0), 0);
          return total + rule.count * count;
        }, 0),
        melee: granted.reduce((total, rule) => {
          let count = rule.grants.split(', ')
            .filter(g => g.includes('Melee Tag:'))
            .reduce((count, g) => count + (parseInt(g.split(': ')[1]) || 0), 0);
          return total + rule.count * count;
        }, 0),
        spell: granted.reduce((total, rule) => {
          let count = rule.grants.split(', ')
            .filter(g => g.includes('Spell Tag:'))
            .reduce((count, g) => count + (parseInt(g.split(': ')[1]) || 0), 0);
          return total + rule.count * count;
        }, 0),
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

  getFreeSkills() {
    const skills = this.state.character.skills.filter(skill => Number(skill.source) > 0);
    return skills.map(skill => {
      let rule = this.state.rules.filter(rule => rule._id == skill.id);
      return {
        id: skill.id,
        level: skill.source,
        name: rule.name
      };
    });
  }

  encode() {}

  decode(code) {}

  saveCharacter() {}

  loadCharacter() {}

  editCharacter(action) {
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
        nextState = this.stateLivesChange(prevState, action); break;
      case 'RACE':
      case 'CULTURE':
      case 'PRODIGY':
        nextState = this.stateRaceChange(prevState, action); break;
      case 'SOURCE MARK':
        nextState.character.sourceMarks = action.data; break;
      case 'SKILL':
        nextState = this.stateSkillChange(prevState, action); break;
      default:
        return prevState;
      }
      return nextState;
    });
  }

  stateLivesChange(prevState, action) {
    let nextState = Object.assign({}, prevState);
    switch(action.type) {
    case 'ENABLE LIFE':
      nextState.character.lives = prevState.character.lives.map(stone => {
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
    case 'DISABLE LIFE':
      nextState.character.lives = prevState.character.lives.map(stone => {
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
    }
    return nextState;
  }

  stateRaceChange(prevState, action) {
    //@todo: race/culture change should affect build and skills
    let nextState = Object.assign({}, prevState);
    switch(action.type) {
    case 'RACE':
      nextState.character.race.name = action.data;
      nextState.character.race.culture = '';
      break;
    case 'CULTURE':
      nextState.character.race.culture = action.data;
      if(action.data)
        nextState.character.race.name = prevState.rules.filter(rule => {
          return rule.category == 'Culture' && rule.name == action.data;
        })[0].race;
      break;
    case 'PRODIGY':
      nextState.character.race.prodigy = action.data;
      break;
    default:
    }
    return nextState;
  }

  stateSkillChange(prevState, action) {
    let nextState = Object.assign({}, prevState);

    let { id, count, source } = action.data;
    if(!id || count < 0)
      return prevState;

    let rule = prevState.rules.filter(rule => rule._id == id);
    if(!rule.length)
      return prevState;
    rule = rule[0];

    let canLearn = !rule.race
      || rule.race == prevState.character.race.name
      || (rule.prodigy && rule.race == prevState.character.race.prodigy.race);
    if(!canLearn)
      return prevState;

    let build = Object.assign({}, prevState.character.build);
    let skills = prevState.character.skills.slice();

    let choice = {
      limit: rule.max,
      known: 0
    };
    if(rule.category == 'Choice') {
      let option = prevState.rules.filter(r => r.name == rule.group && r.category == 'Option');
      let optionIndex = 0;
      if(option.length > 1) {
        let parentSelection = option.map(o => prevState.rules.filter(r => r.name == o.group)[0])
          .filter(o => skills.findIndex(skill => skill.id == o._id && skill.source == source && skill.count > 0) > -1)[0];
        optionIndex = option.findIndex(o => o.group == parentSelection.name);
      }
      let choices = prevState.rules.filter(r => r.group == option[optionIndex].name);
      choice.limit = option[optionIndex].max;
      choice.known = choices.map(r => skills[skills.findIndex(s => s.id == r._id)])
        .filter(skill => skill != undefined && skill.id != id)
        .reduce((total, skill) => total + skill.count, 0);
    }

    if((rule.max != 0 && count > rule.max) || (choice.limit && count + choice.known > choice.limit))
      return prevState;

    let granted = rule.grants.split(', ');
    if(granted.length) {
      for(var i = 0; i < granted.length; i++) {
        
      }
    }

    let target = skills.findIndex(skill => skill.id == id && skill.source == source);

    if(typeof source == 'number') {
      target = skills.findIndex(skill => skill.source == source);
      if(target == -1)
        nextState.character.skills = skills.concat({
          id: id,
          name: rule.name,
          count: count,
          source: source
        });
      else
        nextState.character.skills[target] = {
          id: id,
          name: rule.name,
          count: count,
          source: source
        };
    }
    else if(target == -1) {
      nextState.character.build.spent += count * rule.build;
      nextState.character.build.nonDomain += (rule.category == 'Domain' ? count * rule.build : 0);
      nextState.character.skills = skills.concat({
        id: id,
        name: rule.name,
        count: count,
        source: source
      });
    }
    else {
      nextState.character.build.spent += (count - skills[target].count) * rule.build;
      nextState.character.build.nonDomain += (rule.category != 'Domain' ? (count - skills[target].count) * rule.build : 0);
      nextState.character.skills[target].count = count;
    }

    nextState.character.skills = nextState.character.skills.filter(skill => skill.count > 0);

    return nextState;
  }

  render() {
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
      level,
      body,
      buffs,
      inscriptions,
      T1,
      T2,
      T3,
      AA
    } = this.levelValues();
    const freeSkills = this.getFreeSkills();
    const {
      races,
      cultures,
      racials,
      weapons,
      aptitudes,
      crafts,
      domains,
      advancedArts,
      pools,
      bodyMod,
      sourceMark,
      extraTags
    } = this.parseRules();
    const domainNames = domains.map(rule => rule.group)
      .filter((rule, index, self) => self.indexOf(rule) == index)
      .sort((a, b) => {
        return a == 'Generic' ? -1
        : b == 'Generic' ? 1
        : a == 'Burn' ? 1
        : b == 'Burn' ? -1
        : a > b ? 1
        : -1;
      });
    let bodyTotal = (body + bodyMod.extra + bodyMod.perLevel * level) * (bodyMod.double ? 2 : 1);
    return (
      <div data-character='sheet'>
        <Box label='Player'>
          <Field
            name='player name'
            value={player.name}
          />
        </Box>
        <Box color label='Character'>
          <Field
            name='name'
            value={name}
            editCharacter={this.editCharacter}
          />
        </Box>
        <Box color label='Player Build' factor={1/3}>
          <Field
            name='player build'
            value={player.build}
            editCharacter={this.editCharacter}
          />
        </Box>
        <Box label='Build Total' factor={1/3}>
          <Field
            name='total build'
            value={build.total}
          />
        </Box>
        <Box label='Build Spent' factor={1/3}>
          <Field
            name='spent build'
            value={build.spent}
          />
        </Box>
        <Box label='Level' factor={0.25}>
          <Field
            name='level'
            value={level}
          />
          <Levels
            level={level}
            domains={domains}
            known={freeSkills}
            T1={T1}
            T2={T2}
            T3={T3}
            editCharacter={this.editCharacter}
          />
        </Box>
        <Box label='Body' factor={0.25}>
          <Field
            name='body'
            value={bodyTotal}
          />
        </Box>
        <Box label='Buffs' factor={0.25}>
          <Field
            name='buffs'
            value={buffs}
          />
        </Box>
        <Box label='Tattoos' factor={0.25}>
          <Field
            name='inscriptions'
            value={inscriptions}
          />
        </Box>
        <Box color label='Ressurection Bag'>
          <Stones
            stones={lives}
            type='life'
            stoneClick={this.editCharacter}
          />
        </Box>
        <Box label='Recoveries'>
          <Stones
            stones={recoveries}
          />
        </Box>
        <Box color label='Race' factor={0.5}>
          <Field
            name='race'
            value={race.name}
            type='select'
            options={races.map(r => r.name)}
            editCharacter={this.editCharacter}
          />
        </Box>
        <Box color label='Culture' factor={0.5}>
          <Field
            name='culture'
            value={race.culture}
            type='select'
            options={cultures.filter(c => !race.name || c.race == race.name).map(c => c.name)}
            editCharacter={this.editCharacter}
          />
        </Box>
        <Box color={!!race.name}
          label='Racial'>
          <Racials
            race={race.name}
            culture={race.culture}
            prodigy={race.prodigy}
            races={races}
            cultures={cultures}
            racials={racials}
            viewDescription={this.viewRule}
            editCharacter={this.editCharacter}
          />
        </Box>
        <Box label='Crafting'>
          <Crafting />
        </Box>
        <Box color label='Craft Skills'>
          <AbilityGroup
            abilities={crafts}
            viewDescription={this.viewRule}
            editCharacter={this.editCharacter}
          />
        </Box>
        <Box color label='Weapon Skills'>
          <AbilityGroup
            abilities={weapons}
            viewDescription={this.viewRule}
            editCharacter={this.editCharacter}
          />
        </Box>
        <Box color label='Aptitudes'>
          <AbilityGroup
            abilities={aptitudes}
            viewDescription={this.viewRule}
            editCharacter={this.editCharacter}
          />
        </Box>
        <Box color={sourceMark.limit}
          label='Source Mark Elements'
        >
          <SourceMarks
            limit={sourceMark.limit}
            mastery={sourceMark.mastery}
            known={sourceMarks}
            editCharacter={this.editCharacter}
          />
        </Box>
        <Box color label='Combat Pools'>
          <Pools
            extraTags={extraTags}
            abilities={pools}
            viewDescription={this.viewRule}
            editCharacter={this.editCharacter}
          />
        </Box>
        {domainNames.map(domain => {
          return (
            <Box color label={domain} key={domain}>
              <Domain
                name={domain}
                abilities={domains.filter(rule => rule.group == domain)}
                viewDescription={this.viewRule}
                editCharacter={this.editCharacter}
              />
            </Box>
          );
        })}
        <Box color label='Advanced Arts'>
          <AdvancedArts
            abilities={advancedArts}
            viewDescription={this.viewRule}
            editCharacter={this.editCharacter}
          />
        </Box>
      </div>
    );
  }
}

Character.propTypes = {
  api: PropTypes.object.isRequired
};

export default Character;
