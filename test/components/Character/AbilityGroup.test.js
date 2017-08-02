import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import AbilityGroup from '../../../src/components/Character/AbilityGroup';
import Ability from '../../../src/components/Character/Ability';

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
  it('renders a div with a label and an Ability component for each object in the abilities prop', () => {
    const view = spy(), update = spy();
    let list = [{
      _id: 42,
      name: 'test'
    }];
    const wrapper = shallow(<AbilityGroup label={1} abilities={list} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').childAt(0).type()).to.equal('label');
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('label').text()).to.equal('1');
    expect(wrapper.find('div').childAt(1).type()).to.equal(Ability);
    expect(wrapper.find(Ability)).to.have.length(list.length);
    list = list.concat([{
      _id: 7,
      name: 'lucky',
      display: 'checkbox',
      count: 11
    }, {
      _id: 0,
      name: 'choice',
      display: 'tiers',
      count: 1
    }]);
    wrapper.setProps({label: 'Tier I', abilities: list});
    expect(wrapper.find(Ability)).to.have.length(list.length);
    expect(wrapper.find('label').text()).to.equal('Tier I');
  });

  it('renders the Ability components with the propper props from the array object', () => {
    const view = spy(), update = spy();
    const list = [{
      _id: 42,
      name: 'test'
    }, {
      _id: 7,
      name: 'lucky',
      display: 'checkbox',
      count: 11
    }];
    const wrapper = shallow(<AbilityGroup label={1} abilities={list} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find(Ability).at(0).prop('id')).to.equal(list[0]._id);
    expect(wrapper.find(Ability).at(0).prop('name')).to.equal(list[0].name);
    expect(wrapper.find(Ability).at(0).prop('display')).to.equal(undefined);
    expect(wrapper.find(Ability).at(0).prop('count')).to.equal(0);
    expect(wrapper.find(Ability).at(0).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Ability).at(0).prop('editCharacter')).to.equal(update);
    expect(wrapper.find(Ability).at(1).prop('id')).to.equal(list[1]._id);
    expect(wrapper.find(Ability).at(1).prop('name')).to.equal(list[1].name);
    expect(wrapper.find(Ability).at(1).prop('display')).to.equal(list[1].display);
    expect(wrapper.find(Ability).at(1).prop('count')).to.equal(list[1].count);
    expect(wrapper.find(Ability).at(1).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Ability).at(1).prop('editCharacter')).to.equal(update);
  });
});
