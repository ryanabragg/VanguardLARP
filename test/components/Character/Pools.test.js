import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Pools from '../../../src/components/Character/Pools';
import Pool from '../../../src/components/Character/Pool';

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

describe('<Pools />', () => {
  it('renders a div with a Pool component for each object in the abilities prop with a Pool category property', () => {
    const view = spy(), update = spy();
    let list = [{
      _id: 42,
      name: 'test',
      category: 'Pool'
    }];
    const wrapper = shallow(<Pools abilities={list} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find(Pool)).to.have.length(1);
    list = list.concat([{
      _id: 7,
      name: 'lucky',
      display: 'checkbox',
      count: 11,
      category: 'Pool Ability',
      group: 'Chemix Pool'
    }, {
      _id: 'target',
      name: 'Chemix Pool',
      count: 3,
      category: 'Pool'
    }, {
      _id: 0,
      name: 'choice',
      display: 'tiers',
      count: 1,
      category: 'not a pool nor pool ability'
    }]);
    wrapper.setProps({abilities: list});
    expect(wrapper.find(Pool)).to.have.length(2);
  });

  it('renders the Pool components with the propper props from the array object', () => {
    const view = spy(), update = spy();
    const list = [{
      _id: 42,
      name: 'test',
      category: 'Pool',
      tags: 2
    }, {
      _id: 7,
      name: 'lucky',
      display: 'checkbox',
      count: 11,
      category: 'Pool Ability',
      group: 'Chemix Pool'
    }, {
      _id: 'target',
      name: 'Chemix Pool',
      count: 3,
      category: 'Pool',
      tags: 4
    }, {
      _id: 0,
      name: 'choice',
      display: 'tiers',
      count: 1,
      category: 'not a pool nor pool ability'
    }];
    const wrapper = shallow(<Pools abilities={list} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find(Pool)).to.have.length(2);
    expect(wrapper.find(Pool).at(0).prop('id')).to.equal(42);
    expect(wrapper.find(Pool).at(0).prop('name')).to.equal('test');
    expect(wrapper.find(Pool).at(0).prop('count')).to.equal(undefined);
    expect(wrapper.find(Pool).at(0).prop('source')).to.equal('build');
    expect(wrapper.find(Pool).at(0).prop('tags')).to.equal(2);
    expect(wrapper.find(Pool).at(0).prop('abilities')).to.deep.equal([]);
    expect(wrapper.find(Pool).at(0).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Pool).at(0).prop('editCharacter')).to.equal(update);
    expect(wrapper.find(Pool).at(1).prop('id')).to.equal('target');
    expect(wrapper.find(Pool).at(1).prop('name')).to.equal('Chemix Pool');
    expect(wrapper.find(Pool).at(1).prop('count')).to.equal(3);
    expect(wrapper.find(Pool).at(1).prop('source')).to.equal('build');
    expect(wrapper.find(Pool).at(1).prop('tags')).to.equal(4);
    expect(wrapper.find(Pool).at(1).prop('abilities')).to.deep.equal(list.filter(rule => rule.group == 'Chemix Pool'));
    expect(wrapper.find(Pool).at(1).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Pool).at(1).prop('editCharacter')).to.equal(update);
    wrapper.setProps({
      source: 'testing'
    });
    expect(wrapper.find(Pool).at(0).prop('source')).to.equal('testing');
    expect(wrapper.find(Pool).at(1).prop('source')).to.equal('testing');
    wrapper.setProps({
      extraTags: {chemix: 1, melee: 0, spell: 0}
    });
    expect(wrapper.find(Pool).at(0).prop('tags')).to.equal(2);
    expect(wrapper.find(Pool).at(1).prop('tags')).to.equal(5);
  });
});
