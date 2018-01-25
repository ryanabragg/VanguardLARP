import React from 'react';
import PropTypes from 'prop-types';

import CharacterMenu from './styled/CharacterMenu';
import CharacterSheet from './styled/CharacterSheet';
import ModalViewRule from './styled/ModalViewRule';

// import the notifications component to access static methods (don't import styled version)
import NotificationList from '../util/NotificationList';

class Character extends React.Component {
  constructor (props) {
    super(props);

    this.blankCharacter = {
      _id: '',
      _player: '',
      type: 'freestyle',
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
      race: {
        name: '',
        culture: '',
        prodigy: false
      },
      sourceMarks: [],
      skills: []
    };

    this.state = {
      character: this.blankCharacter,
      rule: undefined
    };

    this.redoBuild = false;

    this.characterObserver = this.characterObserver.bind(this);
    this.reloadServices = this.reloadServices.bind(this);

    this.setCharacterLink = this.setCharacterLink.bind(this);
    this.getCharacterFromLink = this.getCharacterFromLink.bind(this);

    this.newCharacter = this.newCharacter.bind(this);
    this.resetCharacter = this.resetCharacter.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);
    this.loadCharacter = this.loadCharacter.bind(this);

    this.viewRule = this.viewRule.bind(this);
    this.hideRule = this.hideRule.bind(this);

    this.getRuleBuild = this.getRuleBuild.bind(this);
    this.getRules = this.getRules.bind(this);
    this.parseRules = this.parseRules.bind(this);

    this.updateCharacterBuild = this.updateCharacterBuild.bind(this);

    this.editCharacter = this.editCharacter.bind(this);
    this.stateLivesChange = this.stateLivesChange.bind(this);
    this.stateRaceChange = this.stateRaceChange.bind(this);
    this.stateSkillChange = this.stateSkillChange.bind(this);
  }

  async componentDidMount () {
    this.unsubscribe = this.props.subscribeService('characters', this.characterObserver);
    await this.props.loadService('characters');
    await this.props.loadService('rules');
    if(this.props.match.params.hasOwnProperty('link'))
      this.getCharacterFromLink(this.props.match.params.link);
    if(this.props.match.params.hasOwnProperty('id'))
      this.loadCharacter(this.props.match.params.id);
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  characterObserver(payload) {
    let notification = undefined;
    switch(payload.type) {
    case 'created':
      break;
    case 'updated':
      if(payload.data._id == this.state.character._id && payload.data._modifiedBy != this.props.user._id)
        notification = {
          timeoutDuration: 0,
          type: 'warning',
          title: 'Updated',
          message: 'The character you are viewing has been modified. Applying the changes will remove any of your own.',
          action: 'APPLY',
          actionFunction: (param) => this.setState({character: Object.assign({}, param)}),
          actionParam: payload.data
        };
      break;
    case 'removed':
      if(payload.data._id == this.state.character._id && payload.data._modifiedBy != this.props.user._id)
        notification = {
          timeoutDuration: 0,
          type: 'alert',
          title: 'Deleted',
          message: 'The character you are viewing has been deleted.'
        };
      break;
    }
    if(notification)
      NotificationList.notify(notification);
  }

  reloadServices() {
    this.props.loadService('characters', true);
    this.props.loadService('rules', true);
  }

  setCharacterLink() {
    let character = Object.assign({}, this.state.character);
    let encoded = JSON.stringify(character);
    this.props.history.push('/character/link/' + btoa(encoded));
  }

  getCharacterFromLink(code) {
    let data = undefined;
    try{
      data = JSON.parse(atob(code));
    } catch(e) {
      data = this.blankCharacter;
    }
    this.setState({character: data});
  }

  newCharacter() {
    this.setState({character: this.blankCharacter});
  }

  resetCharacter() {}

  saveCharacter() {
    if(Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object) {
      NotificationList.alert('Not signed in');
      return;
    }
    if(!this.state.character._id){
      let character = Object.assign({}, this.state.character);
      delete character._id;
      this.props.create('characters', character).then(c => {
        this.setState({character: c});
        NotificationList.success('Character created');
        this.props.history.push('/character/' + this.state.character._id);
      }).catch(error => {
        NotificationList.alert(error.errors[0], 'Failed to create character.');
      });
    }
    else
      this.props.update('characters', this.state.character).then(c => {
        NotificationList.success('Character updated');
      }).catch(error => {
        NotificationList.alert(error.errors[0], 'Failed to update character.');
      });
  }

  loadCharacter(id) {
    let character = this.props.characters.filter(c => c._id == id);
    if(!character.length){
      NotificationList.alert('Character not found');
      return;
    }
    character = character[0];
    this.setState({character: Object.assign({}, this.blankCharacter, character)});
  }

  viewRule(id) {
    if(!id)
      return;
    let rule = this.props.rules.filter(rule => rule._id == id);
    if(!rule.length)
      return;
    rule = Object.assign({}, rule[0], {
      build: this.getRuleBuild(id),
      buildBase: rule[0].build,
      count: this.state.character.skills.filter(s => s.id == id)
        .reduce((t, s) => t + s.count, 0)
    });
    this.setState({rule: rule});
  }

  hideRule() {
    this.setState({rule: undefined});
  }

  getRuleBuild(id) {
    let skills = this.state.character.skills;
    let rule = this.props.rules.filter(rule => rule._id == id);
    if(!rule.length)
      return 0;
    rule = rule[0];
    let build = rule.build;
    if(rule.group == 'Alchemy') {
      build -= skills.filter(s => s.id == 'rQZtxDdJPKYn5fDF').reduce((t, s) => t + s.count, 0);
      build -= rule.tier * skills.filter(s => s.id == 'Ugf8nn8ysQDKMTKW').reduce((t, s) => t + s.count, 0);
    }
    if(rule.group == 'Combat') {
      build -= skills.filter(s => s.id == '0Q4JLDA9n2Nyodln').reduce((t, s) => t + s.count, 0);
      build -= rule.tier * skills.filter(s => s.id == 'vADtxxrt89WnboWo').reduce((t, s) => t + s.count, 0);
    }
    if(rule.group == 'Faith') {
      build -= skills.filter(s => s.id == 'lLqBfuHQtCoJGxUJ').reduce((t, s) => t + s.count, 0);
      build -= rule.tier * skills.filter(s => s.id == 'Ql54KJac67UmrkV5').reduce((t, s) => t + s.count, 0);
    }
    if(rule.group == 'Insight') {
      build -= skills.filter(s => s.id == 'xcEqoKjW3bzEe70P').reduce((t, s) => t + s.count, 0);
      build -= rule.tier * skills.filter(s => s.id == 'UKBhCRlZMVx5BWpm').reduce((t, s) => t + s.count, 0);
    }
    if(rule.group == 'Stealth') {
      build -= skills.filter(s => s.id == 'LoRpBQpAw4I5Hwla').reduce((t, s) => t + s.count, 0);
      build -= rule.tier * skills.filter(s => s.id == 'KlwvkK0b8WJ4Yh1c').reduce((t, s) => t + s.count, 0);
    }
    if(rule.group == 'Burn') {
      build -= skills.filter(s => s.id == 'IHfGY0P6gU4APd5q').reduce((t, s) => t + s.count, 0);
      build -= rule.tier * skills.filter(s => s.id == '9ccyQgpaHbW0Zh7N').reduce((t, s) => t + s.count, 0);
    }
    if(rule.category == 'Pool') {
      if(rule._id == 'znYnAukGjreX2vOp') // Chemix Pool
        build -= skills.filter(s => s.id == 'KO7ERx1NuaUDMeB7').reduce((t, s) => t + s.count, 0);
      if(rule._id == '89L88N3OtHNvjnVr') // Melee Pool
        build -= skills.filter(s => s.id == 'FvYhZnEXaacz3MIw').reduce((t, s) => t + s.count, 0);
      if(rule._id == 'QAma29B8RcXwNDLS') // Spell Pool
        build -= skills.filter(s => s.id == 'MK4mjAxfXMWfthUE').reduce((t, s) => t + s.count, 0);
    }
    if(rule.category == 'Craft') {
      if(rule._id != 'cwB8oaUJQWHsw5oj') // generic craft reducer, doesn't affect Jack of All Trades
        build -= skills.filter(s => s.id == 'Dzj6aIPhxb9bIPox').reduce((t, s) => t + s.count, 0);
      if(rule._id == '7YAY5bnJC2l15Qvi') // Apothecary
        build -= skills.filter(s => s.id == 'VZggn8mKlMa5J1rh').reduce((t, s) => t + s.count, 0);
      if(rule._id == 'x9yxEliF4P2AlIcQ') // Armorsmithing
        build -= skills.filter(s => s.id == '9AqB00GqyXUzfatt').reduce((t, s) => t + s.count, 0);
      if(rule._id == 'EB7ZLCrTMncostR5') // Boomersmithing
        build -= skills.filter(s => s.id == 'ymOJrVmbcDVeXFHf').reduce((t, s) => t + s.count, 0);
      if(rule._id == 'Gm6PnucyBJg9Vy1x') // Clockwork
        build -= skills.filter(s => s.id == 'EVAyjJ709619JAjp').reduce((t, s) => t + s.count, 0);
      if(rule._id == 'fld4x99cwvtcf1xY') // Enchanting
        build -= skills.filter(s => s.id == 'vwXrNSFvRAmDSPgO').reduce((t, s) => t + s.count, 0);
      if(rule._id == 'JNiEZ58d1DNfxgZZ') // Field Surgeon
        build -= skills.filter(s => s.id == 'OykKTl3kyTCIonOu').reduce((t, s) => t + s.count, 0);
      if(rule._id == 'G1xorWOoLS2jc3oy') // Scribing
        build -= skills.filter(s => s.id == 'QSeKc7sZQ4eptxSb').reduce((t, s) => t + s.count, 0);
      if(rule._id == '1dOq8uHq876WUuQz') // Source Engineering
        build -= skills.filter(s => s.id == 'fsKIx9LRpqzImL1f').reduce((t, s) => t + s.count, 0);
      if(rule._id == 'MDGpvPLv6wPxm4x2') // Trinket Crafting
        build -= skills.filter(s => s.id == 'KMfJNHbadCS5miYm').reduce((t, s) => t + s.count, 0);
      if(rule._id == 'fMmzyBULpa8SUxh6') // Underwater Basket Weaving
        build -= skills.filter(s => s.id == 'rmZfZh5QyfuIot8O').reduce((t, s) => t + s.count, 0);
      if(rule._id == 'svgUCKVdVPqfiPrJ') // Weaponsmithing
        build -= skills.filter(s => s.id == 'HW5gddHQ8pGGfqfa').reduce((t, s) => t + s.count, 0);
    }
    return Math.max(0, build);
  }

  getRules() {
    const increaseMax = this.props.rules.filter(r => r.increaseMax != '');
    const grantsUseOf = this.props.rules.filter(r => r.grantsUseOf != '');
    const aptitudesCombat = this.state.character.skills.filter(s => s.id == 'EU07O6zCUA4nUM6i');
    const aptitudesArmor = this.state.character.skills.filter(s => s.id == 'UDgik1fvfhVo6icT');
    const aptitudes = {
      combat: aptitudesCombat.length > 0 ? aptitudesCombat[0].count : 0,
      armor: aptitudesArmor.length > 0 ? aptitudesArmor[0].count : 0,
    };

    return this.props.rules.map(m => {
      let rule = Object.assign({}, m);

      if(rule.max)
        rule.max += increaseMax.filter(r => (
          r.increaseMax.split(', ').includes(m._id)
        )).map(r => (
          this.state.character.skills.filter(s => s.id == r._id)
            .reduce((t, s) => t + s.count, 0)
        )).reduce((t, r) => t + r, 0);

      let skill = this.state.character.skills.filter(s => s.id == rule._id);
      let count = skill.reduce((t, s) => t + s.count, 0);
      let granted = skill.filter(s => s.source != 'build')
        .reduce((t, s) => t + s.count, 0);
      count = !Number(rule.max) ? count : Math.min(rule.max, count);
      granted = !Number(rule.max) ? granted : Math.min(rule.max, granted);

      let display = '';
      if(rule.category == 'Craft' && rule.max == 5)
        display = 'tiers';
      else if (rule.max == 1)
        display = 'checkbox';

      let usesTotal = 0;
      if(count > 0 && rule.uses > 0) {
        let usesGranted = grantsUseOf.filter(r => (
          r.grantsUseOf.split(', ').includes(m._id)
        )).map(r => (
          this.state.character.skills.filter(s => s.id == r._id)
            .reduce((t, s) => t + s.count, 0)
        )).reduce((t, r) => t + r, 0);
        if(rule.category == 'Pool')
          usesGranted = count * usesGranted;
        let aptitudesTotal = aptitudes.combat;
        if(rule.group == 'Burn' || rule.group == 'True Faith')
          aptitudesTotal += aptitudes.armor;
        usesTotal = count * rule.uses + usesGranted;
        if(rule.usesPerXAptitudes)
          usesTotal += Math.floor(rule.usesExtra * aptitudesTotal / rule.usesPerXAptitudes);
      }

      return Object.assign({}, rule, {
        build: this.getRuleBuild(rule._id),
        buildBase: rule.build,
        display: display,
        count: count,
        granted: granted,
        usesTotal: usesTotal
      });
    }).sort((a, b) => a.name > b.name ? 1 : -1);
  }

  parseRules() {
    const level = Math.max(0, Math.floor((this.state.character.build.spent - 25) / 10));
    const interval = 5;

    const rules = this.getRules();

    return {
      interval: interval,
      level: level,
      canLearn: {
        T1: level >= interval,
        T2: level >= 2 * interval && this.state.character.build.nonDomain >= 100,
        T3: level >= 3 * interval && this.state.character.build.nonDomain >= 125,
        AA: level >= 4 * interval
      },
      races: rules.filter(r => r.category == 'Race' && r.group == ''),
      cultures: rules.filter(r => r.category == 'Race' && r.group != ''),
      racials: rules.filter(r => r.race != '' && r.category != 'Language'),
      languages: rules.filter(r => r.category == 'Language'),
      constants: rules.filter(r =>  r.category == 'Constant' && r.race == ''),
      crafts: rules.filter(r => r.category == 'Craft')
        .sort((a, b) => {
          if(a.name == 'Jack of All Trades')
            return -1;
          if(b.name == 'Jack of All Trades')
            return 1;
          return a.name < b.name ? -1 : 1;
        }),
      domains: rules.filter(r => r.category == 'Domain'),
      advancedArts: rules.filter(rule => rule.category == 'Advanced Art'),
      pools: rules.filter(r => (
        r.category == 'Pool' || r.category == 'Pool Ability'
      )),
      sourceMark: {
        limit: this.state.character.skills
          .filter(s => s.id == 'A5J1m0CmywjGazW1')
          .reduce((t, s) => t + s.count, 0),
        mastery: this.state.character.skills
          .filter(s => s.id == 'BmrhniaHJ3oTeiwz')
          .reduce((t, s) => t + s.count, 0) > 0,
        granted: [
          {name: 'Earth', id: 'JLMbeGHguMCqImBS'},
          {name: 'Crystal', id: 'C3ktPo3FyEaRlvAQ'},
          {name: 'Fire', id: 'gh65YHVkXIn1j93I'},
          {name: 'Plasma', id: 'cdvGE8XqEH1HU6iT'},
          {name: 'Water', id: 'jWZx5ESHT99bCBeO'},
          {name: 'Ice', id: 'z5WLF6exadRZhj93'},
          {name: 'Wind', id: '4wYP6LaqKgsD3mBl'},
          {name: 'Lightning', id: '7RygGGqp8cX5RQGd'},
          {name: 'Light', id: 'aNX4DbOu1SCCTEGf'},
          {name: 'Dark', id: 'slcqZqmjXWiik7di'},
          {name: 'Holy', id: 'IYVuPgPwN7JV25Rf'},
          {name: 'Infernal', id: 'Nlsy0Fg8KiG12pjg'},
          {name: 'Magic', id: 'QpBlKVlUTxY2EaOL'}
        ].map(e => {
          return {
            name: e.name,
            count: this.state.character.skills
              .filter(s => s.id == e.id)
              .reduce((t, s) => t + s.count, 0)
          };
        }).filter(e => e.count > 0).map(e => e.name)
      },
      recoveries: {
        base: 6,
        extra: this.state.character.skills
          .filter(s => s.id == 'YK1e3EA72tIu37uK') // extra
          .reduce((t, s) => t + s.count, 0)
        + this.state.character.skills
          .filter(s => s.id == 'RzEFIfjy1KtLorVk') // extra per 10 levels
          .reduce((t, s) => t + s.count, 0) * Math.floor(level / 10),
      },
      body: {
        base: 10 + 5 * level,
        extra: this.state.character.skills
          .filter(s => s.id == 'DwCTFLBVfnZRl2y6') // extra
          .reduce((t, s) => t + s.count, 0),
        perLevel: this.state.character.skills
          .filter(s => s.id == 'nTgJJHGcKLHnJfy7') // extra per level
          .reduce((t, s) => t + s.count, 0),
        double: this.state.character.skills
          .filter(s => s.id == 'gQM9ot97a2ROBS7N') // double
          .reduce((t, s) => t + s.count, 0) > 0,
        static: {
          extra: this.state.character.skills
            .filter(s => s.id == 'D5ZLPXyomskpvvRm') // extra
            .reduce((t, s) => t + s.count, 0),
          perLevel: this.state.character.skills
            .filter(s => s.id == 'nKkpDCrU1m9S19Jf') // extra per level
            .reduce((t, s) => t + s.count, 0)
        }
      },
      buffs: {
        base: 3 + Math.floor(level / 10),
        extra: this.state.character.skills
          .filter(s => s.id == '05RHlXMcrs7Sa3pM') // extra
          .reduce((t, s) => t + s.count, 0),
      },
      inscriptions: {
        base: 1 + Math.floor(level / 5),
        extra: this.state.character.skills
          .filter(s => s.id == 'ZbJdBt91GzSQTCnL') // extra
          .reduce((t, s) => t + s.count, 0)
        + this.state.character.skills
          .filter(s => s.id == 'aV3rS9qZpp48Jn7h') // extra per 5 levels
          .reduce((t, s) => t + s.count, 0) * Math.floor(level / 5),
      },
      armor: {
        AP: {
          passive: 0,
          cap: 0,
          remaining: 0
        },
        DR: {
          passive: 0,
          cap: 0,
          remaining: 0
        },
        mods: {
          base: 8,
          extra: this.state.character.skills
            .filter(s => s.id == 'YK1e3EA72tIu37uK') // extra
            .reduce((t, s) => t + s.count, 0)
          + this.state.character.skills
            .filter(s => s.id == 'cg70AS8V1xf7k3Cf') // extra per 10 levels
            .reduce((t, s) => t + s.count, 0) * (1 + Math.floor(level / 10))
        }
      },
      damage: {
        melee: this.state.character.skills
          .filter(s => s.id == 'qB6SPd8ygEKXoZY6')
          .reduce((t, s) => t + s.count, 0),
        ranged: this.state.character.skills
          .filter(s => s.id == 'qB6SPd8ygEKXoZY6')
          .reduce((t, s) => t + s.count, 0),
        sourceMark: this.state.character.skills
          .filter(s => s.id == 'qB6SPd8ygEKXoZY6')
          .reduce((t, s) => t + s.count, 0),
        rearAttackBonus: this.state.character.skills
          .filter(s => s.id == 'qB6SPd8ygEKXoZY6')
          .reduce((t, s) => t + s.count, 0)
      },
      healing: this.state.character.skills
        .filter(s => s.id == 'qB6SPd8ygEKXoZY6')
        .reduce((t, s) => t + s.count, 0),
      freeSkills: this.state.character.skills
        .filter(s => typeof s.source == 'number')
        .map(s => {
          return {
            id: s.id,
            level: s.source,
            name: this.props.rules.filter(r => r._id == s.id)[0].name
          };
        })
    };
  }

  updateCharacterBuild(prevState) {
    let nextState = Object.assign({}, prevState);
    let build = {
      total: nextState.character.build.total,
      spent: 0,
      nonDomain: 0
    };
    nextState.character.skills.filter(s => s.source == 'build').forEach(s => {
      let rule = this.props.rules.filter(r => r._id == s.id);
      if(!rule.length)
        return;
      rule = rule[0];
      let cost = this.getRuleBuild(rule._id);
      let total = cost * s.count;
      if(rule.category == 'Craft' && s.count == 5) {
        total = cost * 4 + rule.build;
      }
      build.spent += total;
      if(rule.category != 'Domain')
        build.nonDomain += total;
    });
    nextState.character.build = build;
    return nextState;
  }

  editCharacter(payload) {
    let action = payload;
    action.type = payload.type.toUpperCase();
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      let current = [];
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
        nextState = this.stateRaceChange(prevState, action); break;
      case 'PRODIGY':
        nextState.character.race.prodigy = action.data; break;
      case 'SOURCE MARK':
        nextState.character.sourceMarks = action.data; break;
      case 'SKILL INCREMENT':
        current = this.state.character.skills.filter(skill => {
          return skill.id == action.data.id && skill.source == action.data.source;
        });
        nextState = this.stateSkillChange(prevState, {
          type: 'SKILL',
          data: {
            id: action.data.id,
            count: current.length ? current[0].count + 1 : 1,
            source: action.data.source
          }
        });
        break;
      case 'SKILL DECREMENT':
        current = this.state.character.skills.filter(skill => {
          return skill.id == action.data.id && skill.source == action.data.source;
        });
        nextState = this.stateSkillChange(prevState, {
          type: 'SKILL',
          data: {
            id: action.data.id,
            count: current.length ? current[0].count - 1 : 0,
            source: action.data.source
          }
        });
        break;
      case 'SKILL':
        nextState = this.stateSkillChange(prevState, action); break;
      default:
        return prevState;
      }
      return nextState;
    }, () => {
      if(this.redoBuild) {
        this.setState(this.updateCharacterBuild, () => {this.redoBuild = false;});
      }
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
    let nextState = Object.assign({}, prevState);

    let rule = this.props.rules.filter(r => (
      r.category == 'Race' && r.name == action.data
    ));
    if(rule.length)
      rule = rule[0];
    else if(action.data != '')
      return prevState;

    let previous = {
      race: prevState.character.race.name,
      culture: prevState.character.race.culture
    };

    switch(action.type) {
    case 'RACE':
      nextState.character.race.name = action.data;
      nextState.character.race.culture = '';
      break;
    case 'CULTURE':
      if(action.data != '')
        nextState.character.race.name = rule.group;
      nextState.character.race.culture = action.data;
      break;
    default:
      return prevState;
    }

    let next = {
      race: nextState.character.race.name,
      culture: nextState.character.race.culture
    };

    if(previous.race != '' && previous.race != next.race)
      nextState = this.stateSkillChange(nextState, {
        type: 'SKILL',
        data: {
          id: this.props.rules.filter(r => (
            r.category == 'Race' && r.name == previous.race
          ))[0]._id,
          count: 0,
          source: 'race'
        }
      });
    if(previous.culture != '' && previous.culture != next.culture)
      nextState = this.stateSkillChange(nextState, {
        type: 'SKILL',
        data: {
          id: this.props.rules.filter(r => (
            r.category == 'Race' && r.name == previous.culture
          ))[0]._id,
          count: 0,
          source: 'culture'
        }
      });

    if(next.race != '' && previous.race != next.race)
      nextState = this.stateSkillChange(nextState, {
        type: 'SKILL',
        data: {
          id: this.props.rules.filter(r => (
            r.category == 'Race' && r.name == next.race
          ))[0]._id,
          count: 1,
          source: 'race'
        }
      });
    if(next.culture != '' && previous.culture != next.culture)
      nextState = this.stateSkillChange(nextState, {
        type: 'SKILL',
        data: {
          id: this.props.rules.filter(r => (
            r.category == 'Race' && r.name == next.culture
          ))[0]._id,
          count: 1,
          source: 'culture'
        }
      });

    return nextState;
  }

  stateSkillChange(prevState, action) {
    //@todo: add 'cascade remove' field to rules (Option removed from skills removed its choices, etc.)
    let nextState = Object.assign({}, prevState);

    let { id, count, source } = action.data;
    if(!id || count < 0)
      return prevState;

    let rule = this.props.rules.filter(rule => rule._id == id);
    if(!rule.length)
      return prevState;
    rule = rule[0];

    if(rule.block && source == 'build')
      return prevState;
    /* disabled for now, needs better logic to still allow race change to update skills
    if(rule.race && rule.category != 'Choice' && rule.race == prevState.character.race.name)
      return prevState;*/

    let skills = prevState.character.skills.slice();

    if(!count && rule.category == 'Option') {
      this.props.rules
        .filter(r => r.category == 'Choice' && r.group == rule.name)
        .map(r => {
          return {
            id: r._id,
            count: this.state.character.skills.filter(s => s.id == r._id)
              .reduce((t, s) => t + s.count, 0)
          };
        }).filter(s => s.count > 0)
        .forEach(s => {
          nextState = this.stateSkillChange(nextState, {
            type: 'SKILL',
            data: {
              id: s.id,
              count: 0,
              source: rule.culture ? 'culture' : 'race'
            }
          });
        });
    }

    let choice = {
      limit: Number(rule.max),
      known: 0
    };
    if(count && rule.category == 'Choice') {
      let option = this.props.rules.filter(r => r.name == rule.group && r.category == 'Option')
        .filter(r => skills.findIndex(s => s.id == r._id) > -1);
      if(!option.length)
        return prevState;
      option = option[0];
      choice.limit = Number(option.max);
      choice.known = this.props.rules.filter(r => r.category == 'Choice' && r.group == option.name)
        .map(r => skills[skills.findIndex(s => s.id == r._id)])
        .filter(skill => skill != undefined && skill.id != id)
        .reduce((total, skill) => total + skill.count, 0);
    }

    let otherSources = skills.filter(s => s.id == id && s.source != source).reduce((t, s) => t + s.count, 0);
    if((rule.max != 0 && count + otherSources > rule.max) || (choice.limit && count + choice.known > choice.limit))
      return prevState;

    let target = skills.findIndex(skill => skill.id == id && skill.source == source);

    let cost = -1 == ['build','race','culture'].indexOf(source) ? 0 : rule.build;
    if(cost && typeof source != 'number') {
      cost = this.getRuleBuild(rule._id);
    }

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
      nextState.character.build.spent += count * cost;
      nextState.character.build.nonDomain += (rule.category != 'Domain' ? count * cost : 0);
      nextState.character.skills = skills.concat({
        id: id,
        name: rule.name,
        count: count,
        source: source
      });
    }
    else {
      nextState.character.build.spent += (count - skills[target].count) * cost;
      nextState.character.build.nonDomain += (rule.category != 'Domain' ? (count - skills[target].count) * cost : 0);
      nextState.character.skills[target].count = count;
    }

    if(rule.grants)
      rule.grants.split(', ')
        .filter((text, index, self) => self.indexOf(text) == index)
        .map(text => {
          return {
            id: text,
            count: count * rule.grants.split(', ').filter(g => g == text).length,
            source: `${source}: ${id}`
          };
        }).forEach(grant => {
          nextState = this.stateSkillChange(nextState, {
            type: 'SKILL',
            data: grant
          });
        });

    if(rule._id == 'MQxu5lE0qQvJdZCQ') { // red stones are white
      let blues = prevState.character.lives.filter(l => l.color == 'blue')[0];
      let blacks = prevState.character.lives.filter(l => l.color == 'black')[0];
      let reds = prevState.character.lives.filter(l => l.color == 'red')[0];
      let whites = prevState.character.lives.filter(l => l.color == 'white')[0];
      nextState.character.lives = [{
        color: 'blue',
        count: blues.count,
        disabled: blues.disabled
      }, {
        color: 'black',
        count: blacks.count,
        disabled: blacks.disabled
      }, {
        color: 'red',
        count: reds.count + (!count ? 2 : -2),
        disabled: 0
      }, {
        color: 'white',
        count: whites.count + (!count ? -2 : 2),
        disabled: whites.disabled
      }];
    }

    if(rule.group == 'Build')
      this.redoBuild = true;

    nextState.character.skills = nextState.character.skills.filter(skill => skill.count > 0);

    return nextState;
  }

  render() {
    return (
      <div>
        <CharacterMenu
          user={this.props.user}
          logout={this.props.logout}
          reloadServices={this.reloadServices}
          link={this.setCharacterLink}
          save={this.saveCharacter}
          reset={this.saveCharacter}
          new={this.newCharacter}
        />
        <CharacterSheet
          character={this.state.character}
          rules={this.parseRules()}
          viewRule={this.viewRule}
          editCharacter={this.editCharacter}
        />
        <ModalViewRule
          close={this.hideRule}
          rule={this.state.rule}
        />
      </div>
    );
  }
}

Character.defaultProps = {
  user: {},
  rules: [],
  characters: []
};

Character.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  rules: PropTypes.array,
  characters: PropTypes.array,
  subscribeService: PropTypes.func.isRequired,
  loadService: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  patch: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default Character;
