import React from 'react';
import PropTypes from 'prop-types';

import Box from './styled/Box';

import Field from '../util/styled/Field';

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
      advancedArts: rules.filter(rule => rule.category == 'Advanced Art')
        .sort((a, b) => a.name > b.name ? 1 : -1),
      pools: rules.filter(rule =>
        (rule.category == 'Pool' || rule.category == 'Pool Ability' ) &&
        !rule.race && !rule.culture
      ),
      racials: rules.filter(rule => {
        return rule.race == race.name
          && rule.race != ''
          && !rule.culture
          && rule.category != 'Race'
          && rule.category != 'Culture'
      }),
      culturals: rules.filter(rule => rule.culture == race.culture && rule.culture != ''),
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
        change = this.stateLivesChange(prevState, action);
        nextState.character.lives = change;
        break;
      case 'RACE':
      case 'CULTURE':
        change = this.stateRaceChange(prevState, action);
        nextState.character.race = change;
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
      edit = prevState.character.lives.slice();
    }
    return edit;
  }

  stateRaceChange(prevState, action) {
    //@todo: race/culture change should affect build and skills
    let edit = {};
    switch(action.type) {
    case 'RACE':
      edit.name = action.data;
      if(prevState.character.race.name != action.data)
        edit.culture = '';
      else
        edit.culture = prevState.character.race.culture.slice();
      break;
    case 'CULTURE':
      edit.culture = action.data;
      if(action.data)
        edit.name = prevState.rules.filter(rule => {
          return rule.category == 'Culture' && rule.name == action.data;
        })[0].race;
      else
        edit.name = prevState.character.race.name;
      break;
    default:
      edit = Object.assign({}, prevState.character.race);
    }
    return edit;
  }

  stateSkillChange(prevState, action) {
    let { id, count, source } = action.data;
    if(!id || count < 0)
      return { build: prevState.character.build, skills: prevState.character.skills };

    let { total, spent, nonDomain } = prevState.character.build;

    let rule = prevState.rules.filter(rule => rule._id == id);
    if(!rule.length || (rule[0].race && rule[0].race != prevState.character.race.name))
      return { build: prevState.character.build, skills: prevState.character.skills };

    let cost = source == 'build' ? rule[0].build : 0;

    let skills = prevState.character.skills.slice();
    let index = skills.findIndex(skill => skill.id == id && skill.source == source);

    let choice = {
      limit: rule[0].max,
      known: 0
    };
    if(rule[0].category == 'Choice') {
      let option = prevState.rules.filter(r => r.name == rule[0].group && r.category == 'Option');
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

    if(index == -1 && count <= rule[0].max && count + choice.known <= choice.limit)
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

    if(rule[0].max != 0 && (count > rule[0].max || count + choice.known > choice.limit))
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
        nonDomain: nonDomain + (rule[0].category == 'Domain' ? diff * cost : 0)
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
      racials,
      culturals,
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
            options={cultures.map(c => c.name)}
            editCharacter={this.editCharacter}
          />
        </Box>
        <Box color label='Racial'>
          <Racials
            type='race'
            abilities={racials.filter(racial => racial.race == race.name)}
            viewDescription={this.viewRule}
            editCharacter={this.editCharacter}
          />
          <Racials
            type='culture'
            abilities={culturals.filter(cultural => cultural.culture == race.culture)}
            viewDescription={this.viewRule}
            editCharacter={this.editCharacter}
          />
        </Box>
        <Box label='Crafting'>
          <Crafting />
        </Box>
        <Box label='Craft Skills'>
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
