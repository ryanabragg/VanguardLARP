import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Pool from '../../../src/components/Character/Pool';
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

describe('<Pool />', () => {
  it('renders an Ability from props, plus an Ability per abilities array prop', () => {
    const view = spy(), update = spy();
    let list = [{
      _id: 42,
      name: 'testing'
    }];
    const wrapper = shallow(<Pool id='ID' name='test' abilities={list} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find('div')).to.have.length(2);
    expect(wrapper.find(Ability)).to.have.length(1 + list.length);
    expect(wrapper.find('div').at(1).prop('data-character')).to.equal('pool-abilities');
    expect(wrapper.find('div').at(1).find(Ability)).to.have.length(list.length);
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
    wrapper.setProps({name: 'testing', abilities: list});
    expect(wrapper.find(Ability)).to.have.length(1 + list.length);
    expect(wrapper.find('div').at(1).find(Ability)).to.have.length(list.length);
  });

  it('passes the correct props to the first Ability', () => {
    const view = spy(), update = spy();
    const wrapper = shallow(<Pool id='ID' name='test' abilities={[]} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find('div')).to.have.length(2);
    expect(wrapper.find(Ability)).to.have.length(1);
    expect(wrapper.find(Ability).prop('id')).to.equal('ID');
    expect(wrapper.find(Ability).prop('name')).to.equal('test');
    expect(wrapper.find(Ability).prop('count')).to.equal(0);
    expect(wrapper.find(Ability).prop('source')).to.equal('build');
    expect(wrapper.find(Ability).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Ability).prop('editCharacter')).to.equal(update);
    wrapper.setProps({
      count: 3,
      source: 'testing',
      tags: 4
    });
    expect(wrapper.find(Ability).prop('id')).to.equal('ID');
    expect(wrapper.find(Ability).prop('name')).to.equal('test (' + 12 + ' tags)');
    expect(wrapper.find(Ability).prop('count')).to.equal(3);
    expect(wrapper.find(Ability).prop('source')).to.equal('testing');
    expect(wrapper.find(Ability).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Ability).prop('editCharacter')).to.equal(update);
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
    const wrapper = shallow(<Pool id='ID' name='test' abilities={list} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find(Ability).at(1).prop('id')).to.equal(list[0]._id);
    expect(wrapper.find(Ability).at(1).prop('name')).to.equal(list[0].name);
    expect(wrapper.find(Ability).at(1).prop('display')).to.equal('none');
    expect(wrapper.find(Ability).at(1).prop('count')).to.equal(0);
    expect(wrapper.find(Ability).at(1).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Ability).at(1).prop('editCharacter')).to.equal(update);
    expect(wrapper.find(Ability).at(2).prop('id')).to.equal(list[1]._id);
    expect(wrapper.find(Ability).at(2).prop('name')).to.equal(list[1].name);
    expect(wrapper.find(Ability).at(2).prop('display')).to.equal('none');
    expect(wrapper.find(Ability).at(2).prop('count')).to.equal(list[1].count);
    expect(wrapper.find(Ability).at(2).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Ability).at(2).prop('editCharacter')).to.equal(update);
  });
});
