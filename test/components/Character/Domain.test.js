import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Domain from '../../../src/components/Character/Domain';
import DomainTier from '../../../src/components/Character/DomainTier';

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

describe('<Domain />', () => {
  it('renders a div with a span and an DomainTier component for each tier of abilities in the abilities prop', () => {
    const view = spy(), update = spy();
    let list = [{
      id: 42,
      name: 'test',
      tier: 1
    }];
    const wrapper = shallow(<Domain name='test' abilities={list} viewDescription={view} updateCharacterAbility={update}/>);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').childAt(0).type()).to.equal('span');
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('div').childAt(1).type()).to.equal(DomainTier);
    expect(wrapper.find(DomainTier)).to.have.length(list.map(ability => ability.tier).filter((tier, index, self) => index === self.indexOf(tier)).length);
    list = list.concat([{
      id: 7,
      name: 'lucky',
      tier: 1,
      display: 'checkbox',
      count: 11
    }, {
      id: 0,
      name: 'choice',
      tier: 3,
      display: 'tiers',
      count: 1
    }]);
    wrapper.setProps({abilities: list});
    expect(wrapper.find(DomainTier)).to.have.length(list.map(ability => ability.tier).filter((tier, index, self) => index === self.indexOf(tier)).length);
  });

  it('renders the DomainTier components with the propper props from the array object', () => {
    const view = spy(), update = spy();
    const list = [{
      id: 42,
      name: 'test',
      tier: 2
    }, {
      id: 7,
      name: 'lucky',
      tier: 1,
      display: 'checkbox',
      count: 11
    }, {
      id: 0,
      name: 'choice',
      tier: 1,
      display: 'tiers',
      count: 1
    }, {
      id: 0,
      name: 'angels',
      tier: 3,
      display: 'host',
      count: 1
    }, {
      id: 0,
      name: 'demons',
      tier: 3,
      display: 'legion',
      count: 1
    }];
    const tiers = list.map(ability => ability.tier).filter((tier, index, self) => index === self.indexOf(tier)).sort((a, b) => a - b);
    const wrapper = shallow(<Domain name='test' abilities={list} viewDescription={view} updateCharacterAbility={update}/>);
    expect(wrapper.find(DomainTier).at(0).prop('tier')).to.equal(tiers[0]);
    expect(wrapper.find(DomainTier).at(0).prop('abilities')).to.deep.equal(list.filter(ability => tiers[0] === ability.tier));
    expect(wrapper.find(DomainTier).at(0).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(DomainTier).at(0).prop('updateCharacterAbility')).to.equal(update);
    expect(wrapper.find(DomainTier).at(1).prop('tier')).to.equal(tiers[1]);
    expect(wrapper.find(DomainTier).at(1).prop('abilities')).to.deep.equal(list.filter(ability => tiers[1] === ability.tier));
    expect(wrapper.find(DomainTier).at(1).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(DomainTier).at(1).prop('updateCharacterAbility')).to.equal(update);
    expect(wrapper.find(DomainTier).at(2).prop('tier')).to.equal(tiers[2]);
    expect(wrapper.find(DomainTier).at(2).prop('abilities')).to.deep.equal(list.filter(ability => tiers[2] === ability.tier));
    expect(wrapper.find(DomainTier).at(2).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(DomainTier).at(2).prop('updateCharacterAbility')).to.equal(update);
  });
});
