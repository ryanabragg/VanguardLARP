import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Racials from '../../../src/components/Character/Racials';
import Ability from '../../../src/components/Character/Ability';
import AbilityGroup from '../../../src/components/Character/AbilityGroup';
import Field from '../../../src/components/util/styled/Field';

const window = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}
copyProps(window, global);

describe('<Racials />', () => {

  it('renders an Ability or AbilityGroup per item in racials', () => {
    const view = spy(), update = spy();
    const wrapper = shallow(<Racials viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find(Ability)).to.have.length(0);
    expect(wrapper.find('label')).to.have.length(0);
    expect(wrapper.find(AbilityGroup)).to.have.length(0);
    let list = [{
      _id: 1,
      name: 'lucky',
      category: '',
      group: '',
      race: 'cat',
      culture: '',
      count: 9
    }, {
      _id: 2,
      name: 'tail',
      category: '',
      group: '',
      race: 'cat',
      culture: '',
      count: 0
    }, {
      _id: 3,
      name: 'first',
      category: 'Option',
      group: '',
      race: 'cat',
      culture: '',
      count: 0
    }, {
      _id: 4,
      name: 'pounce',
      category: 'Choice',
      group: 'first',
      race: 'cat',
      culture: '',
      count: 0
    }, {
      _id: 5,
      name: 'purr',
      category: 'Choice',
      group: 'first',
      race: 'cat',
      culture: '',
      count: 0
    }, {
      _id: 6,
      name: 'second',
      category: 'Option',
      group: 'pounce',
      race: 'cat',
      culture: '',
      count: 9
    }, {
      _id: 7,
      name: 'tooth',
      category: 'Choice',
      group: 'second',
      race: 'cat',
      culture: '',
      count: 0
    }, {
      _id: 8,
      name: 'claw',
      category: 'Choice',
      group: 'second',
      race: 'cat',
      culture: '',
      count: 0
    }];
    wrapper.setProps({racials: list});
    expect(wrapper.find(Ability)).to.have.length(0);
    expect(wrapper.find('label')).to.have.length(0);
    expect(wrapper.find(AbilityGroup)).to.have.length(0);
    wrapper.setProps({race: 'cat'});
    expect(wrapper.find(Ability)).to.have.length(2);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find(AbilityGroup)).to.have.length(1);
    list[3].count = 1;
    wrapper.setProps({racials: list});
    expect(wrapper.find('label')).to.have.length(2);
    expect(wrapper.find(AbilityGroup)).to.have.length(2);
  });

  it('segregates race and culture racials', () => {
    const view = spy(), update = spy();
    const wrapper = shallow(<Racials viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find(Ability)).to.have.length(0);
    expect(wrapper.find('label')).to.have.length(0);
    expect(wrapper.find(AbilityGroup)).to.have.length(0);
    let list = [{
      _id: 1,
      name: 'lucky',
      category: '',
      group: '',
      race: 'cat',
      culture: 'kitten',
      count: 9
    }, {
      _id: 2,
      name: 'tail',
      category: '',
      group: '',
      race: 'cat',
      culture: '',
      count: 0
    }, {
      _id: 3,
      name: 'first',
      category: 'Option',
      group: '',
      race: 'cat',
      culture: 'kitten',
      count: 0
    }, {
      _id: 4,
      name: 'pounce',
      category: 'Choice',
      group: 'first',
      race: 'cat',
      culture: 'kitten',
      count: 0
    }, {
      _id: 5,
      name: 'purr',
      category: 'Choice',
      group: 'first',
      race: 'cat',
      culture: 'kitten',
      count: 0
    }, {
      _id: 6,
      name: 'second',
      category: 'Option',
      group: 'pounce',
      race: 'cat',
      culture: 'kitten',
      count: 9
    }, {
      _id: 7,
      name: 'tooth',
      category: 'Choice',
      group: 'second',
      race: 'cat',
      culture: 'kitten',
      count: 0
    }, {
      _id: 8,
      name: 'claw',
      category: 'Choice',
      group: 'second',
      race: 'cat',
      culture: 'kitten',
      count: 0
    }];
    wrapper.setProps({racials: list});
    expect(wrapper.find(Ability)).to.have.length(0);
    expect(wrapper.find('label')).to.have.length(0);
    expect(wrapper.find(AbilityGroup)).to.have.length(0);
    wrapper.setProps({race: 'cat'});
    expect(wrapper.find(Ability)).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(0);
    expect(wrapper.find(AbilityGroup)).to.have.length(0);
    wrapper.setProps({culture: 'kitten'});
    expect(wrapper.find(Ability)).to.have.length(2);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find(AbilityGroup)).to.have.length(1);
    list[3].count = 1;
    wrapper.setProps({racials: list});
    expect(wrapper.find('label')).to.have.length(2);
    expect(wrapper.find(AbilityGroup)).to.have.length(2);
  });

  it('renders race and culture selects if the culture prop is Prodigy', () => {
    const view = spy(), update = spy();
    const wrapper = shallow(<Racials viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find(Field)).to.have.length(0);
    let races = [{
      name: 'cat',
      prodigy: 0
    }, {
      name: 'dog',
      prodigy: 0
    }, {
      name: 'monkey',
      prodigy: 1
    }, {
      name: 'human',
      prodigy: 1
    }];
    let cultures = [{
      name: 'kitten',
      prodigy: 0
    }, {
      name: 'puppy',
      prodigy: 0
    }, {
      name: 'baby monkey',
      race: 'monkey',
      prodigy: 1
    }, {
      name: 'baby',
      race: 'human',
      prodigy: 0
    }, {
      name: 'child',
      race: 'human',
      prodigy: 1
    }];
    wrapper.setProps({
      races: races,
      cultures: cultures
    });
    expect(wrapper.find(Field)).to.have.length(0);
    wrapper.setProps({
      culture: 'Prodigy'
    });
    expect(wrapper.find(Field)).to.have.length(2);
    expect(wrapper.find(Field).at(0).prop('options')).to.deep.equal([
      {value: 'monkey', label: 'monkey'},
      {value: 'human', label: 'human'}
    ]);
    expect(wrapper.find(Field).at(1).prop('options')).to.deep.equal([
      {value: 'baby monkey', label: 'baby monkey'},
      {value: 'child', label: 'child'}
    ]);
  });
});
