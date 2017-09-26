import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Racials from '../../../src/components/Character/Racials';
import Ability from '../../../src/components/Character/Ability';
import AbilityGroup from '../../../src/components/Character/AbilityGroup';

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

  it('renders an Ability or AbilityGroup per item in abilities', () => {
    const view = spy(), update = spy();
    let list = [];
    const wrapper = shallow(<Racials abilities={list} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find(Ability)).to.have.length(0);
    expect(wrapper.find('label')).to.have.length(0);
    expect(wrapper.find(AbilityGroup)).to.have.length(0);
    list = [{
      _id: 1,
      name: 'lucky',
      category: 'racial',
      group: '',
      race: 'cat',
      culture: '',
      display: '',
      count: 9
    }, {
      _id: 2,
      name: 'tail',
      category: 'racial',
      group: '',
      race: 'cat',
      culture: '',
      display: '',
      count: 0
    }, {
      _id: 3,
      name: 'first',
      category: 'Option',
      group: '',
      race: 'cat',
      culture: '',
      display: '',
      count: 0
    }, {
      _id: 4,
      name: 'pounce',
      category: 'Choice',
      group: 'first',
      race: 'cat',
      culture: '',
      display: '',
      count: 0
    }, {
      _id: 5,
      name: 'purr',
      category: 'Choice',
      group: 'first',
      race: 'cat',
      culture: '',
      display: '',
      count: 0
    }, {
      _id: 6,
      name: 'second',
      category: 'Option',
      group: 'pounce',
      race: 'cat',
      culture: '',
      display: '',
      count: 9
    }, {
      _id: 7,
      name: 'tooth',
      category: 'Choice',
      group: 'second',
      race: 'cat',
      culture: '',
      display: '',
      count: 0
    }, {
      _id: 8,
      name: 'claw',
      category: 'Choice',
      group: 'second',
      race: 'cat',
      culture: '',
      display: '',
      count: 0
    }];
    wrapper.setProps({abilities: list});
    expect(wrapper.find(Ability)).to.have.length(2);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find(AbilityGroup)).to.have.length(1);
    list[3].count = 1;
    wrapper.setProps({abilities: list});
    expect(wrapper.find('label')).to.have.length(2);
    expect(wrapper.find(AbilityGroup)).to.have.length(2);
  });
});
