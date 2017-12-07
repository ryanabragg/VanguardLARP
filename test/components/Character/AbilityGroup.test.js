import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import AbilityGroup from '../../../src/components/Character/AbilityGroup';
import Ability from '../../../src/components/Character/styled/Ability';

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

describe('<AbilityGroup />', () => {
  it('renders an Ability component for each object in the abilities prop', () => {
    const view = spy(), update = spy();
    let list = [{
      _id: 42,
      name: 'test',
      category: 'Test',
      max: 5,
      granted: 1,
      count: 3,
      usesTotal: 10,
      usesType: 'per Event'
    }, {
      _id: 7,
      name: 'lucky',
      count: 11
    }];
    const wrapper = shallow(<AbilityGroup abilities={list} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find(Ability)).to.have.length(list.length);
    list = list.concat([{
      _id: 0,
      name: 'choice',
      count: 1
    }]);
    wrapper.setProps({abilities: list});
    expect(wrapper.find(Ability)).to.have.length(list.length);

    expect(wrapper.find(Ability).at(0).prop('id')).to.equal(42);
    expect(wrapper.find(Ability).at(0).prop('name')).to.equal('test');
    expect(wrapper.find(Ability).at(0).prop('category')).to.equal('Test');
    expect(wrapper.find(Ability).at(0).prop('max')).to.equal(5);
    expect(wrapper.find(Ability).at(0).prop('min')).to.equal(1);
    expect(wrapper.find(Ability).at(0).prop('count')).to.equal(3);
    expect(wrapper.find(Ability).at(0).prop('uses')).to.equal(10);
    expect(wrapper.find(Ability).at(0).prop('usesPer')).to.equal('per Event');
    expect(wrapper.find(Ability).at(0).prop('source')).to.equal('build');
    expect(wrapper.find(Ability).at(0).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Ability).at(0).prop('editCharacter')).to.equal(update);

    expect(wrapper.find(Ability).at(1).prop('id')).to.equal(7);
    expect(wrapper.find(Ability).at(1).prop('name')).to.equal('lucky');
    expect(wrapper.find(Ability).at(1).prop('category')).to.equal(undefined);
    expect(wrapper.find(Ability).at(1).prop('max')).to.equal(undefined);
    expect(wrapper.find(Ability).at(1).prop('min')).to.equal(undefined);
    expect(wrapper.find(Ability).at(1).prop('count')).to.equal(11);
    expect(wrapper.find(Ability).at(1).prop('uses')).to.equal(undefined);
    expect(wrapper.find(Ability).at(1).prop('usesPer')).to.equal(undefined);
    expect(wrapper.find(Ability).at(1).prop('source')).to.equal('build');
    expect(wrapper.find(Ability).at(1).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Ability).at(1).prop('editCharacter')).to.equal(update);

    expect(wrapper.find(Ability).at(2).prop('id')).to.equal(0);
    expect(wrapper.find(Ability).at(2).prop('name')).to.equal('choice');
    expect(wrapper.find(Ability).at(2).prop('category')).to.equal(undefined);
    expect(wrapper.find(Ability).at(2).prop('max')).to.equal(undefined);
    expect(wrapper.find(Ability).at(2).prop('min')).to.equal(undefined);
    expect(wrapper.find(Ability).at(2).prop('count')).to.equal(1);
    expect(wrapper.find(Ability).at(2).prop('uses')).to.equal(undefined);
    expect(wrapper.find(Ability).at(2).prop('usesPer')).to.equal(undefined);
    expect(wrapper.find(Ability).at(2).prop('source')).to.equal('build');
    expect(wrapper.find(Ability).at(2).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Ability).at(2).prop('editCharacter')).to.equal(update);
  });

  it('renders a div with labels per tier and Ability per item in the abilities prop', () => {
    const view = spy(), update = spy();
    const list = [{
      _id: 42,
      name: 'test',
      tier: 2
    }, {
      _id: 7,
      name: 'lucky',
      tier: 1,
      display: 'checkbox',
      count: 11
    }, {
      _id: 0,
      name: 'choice',
      tier: 1,
      display: 'tiers',
      count: 1
    }, {
      _id: 0,
      name: 'angels',
      tier: 3,
      display: 'host',
      count: 1
    }, {
      _id: 0,
      name: 'demons',
      tier: 3,
      display: 'legion',
      count: 1
    }];
    const sortedList = list.sort((a, b) => a.name < b.name ? -1 : 1);
    const tiers = list.map(ability => ability.tier).filter((tier, index, self) => index == self.indexOf(tier)).sort((a, b) => a - b);
    const wrapper = shallow(<AbilityGroup name='name' abilities={list} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find('div')).to.have.length(1 + tiers.length);
    expect(wrapper.find('label')).to.have.length(tiers.length);
    expect(wrapper.find(Ability)).to.have.length(5);
    expect(wrapper.find('label').at(0).text()).to.equal(tiers[0].toString());
    expect(wrapper.find('label').at(1).text()).to.equal(tiers[1].toString());
    expect(wrapper.find('label').at(2).text()).to.equal(tiers[2].toString());
    expect(wrapper.find(Ability).at(0).prop('name')).to.equal(sortedList.filter(ability => tiers[0] == ability.tier)[0].name);
    expect(wrapper.find(Ability).at(0).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Ability).at(0).prop('editCharacter')).to.equal(update);
    expect(wrapper.find(Ability).at(1).prop('name')).to.equal(sortedList.filter(ability => tiers[0] == ability.tier)[1].name);
    expect(wrapper.find(Ability).at(2).prop('name')).to.equal(sortedList.filter(ability => tiers[1] == ability.tier)[0].name);
    expect(wrapper.find(Ability).at(3).prop('name')).to.equal(sortedList.filter(ability => tiers[2] == ability.tier)[0].name);
    expect(wrapper.find(Ability).at(4).prop('name')).to.equal(sortedList.filter(ability => tiers[2] == ability.tier)[1].name);
  });
});
