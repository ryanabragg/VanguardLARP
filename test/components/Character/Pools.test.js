import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import Pools from '../../../src/components/Character/Pools';
import Pool from '../../../src/components/Character/Pool';

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
      _id: 0,
      name: 'null',
      count: 1,
      category: 'not a pool nor pool ability'
    }, {
      _id: 42,
      name: 'test',
      category: 'Pool',
      max: 5,
      granted: 1,
      count: 3,
      usesTotal: 10,
      usesType: 'per Event'
    }, {
      _id: 7,
      name: 'lucky',
      category: 'Pool',
      max: 13,
      granted: 4,
      count: 11,
      usesTotal: 21,
      usesType: 'per Short Recovery'
    }, {
      _id: 'one',
      name: 'Test Pool 1',
      category: 'Pool Ability',
      group: 'test'
    }, {
      _id: 'seven',
      name: 'Test Pool 2',
      category: 'Pool Ability',
      group: 'lucky'
    }, {
      _id: 'eleven',
      name: 'Test Pool 3',
      category: 'Pool Ability',
      group: 'lucky'
    }];
    const wrapper = shallow(<Pools abilities={list} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find(Pool)).to.have.length(2);

    expect(wrapper.find(Pool).at(0).prop('id')).to.equal(42);
    expect(wrapper.find(Pool).at(0).prop('name')).to.equal('test');
    expect(wrapper.find(Pool).at(0).prop('category')).to.equal('Pool');
    expect(wrapper.find(Pool).at(0).prop('max')).to.equal(5);
    expect(wrapper.find(Pool).at(0).prop('min')).to.equal(1);
    expect(wrapper.find(Pool).at(0).prop('count')).to.equal(3);
    expect(wrapper.find(Pool).at(0).prop('uses')).to.equal(10);
    expect(wrapper.find(Pool).at(0).prop('usesPer')).to.equal('per Event');
    expect(wrapper.find(Pool).at(0).prop('source')).to.equal('build');
    expect(wrapper.find(Pool).at(0).prop('abilities')).to.deep.equal(list.filter(r => r.group == 'test'));
    expect(wrapper.find(Pool).at(0).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Pool).at(0).prop('editCharacter')).to.equal(update);

    expect(wrapper.find(Pool).at(1).prop('id')).to.equal(7);
    expect(wrapper.find(Pool).at(1).prop('name')).to.equal('lucky');
    expect(wrapper.find(Pool).at(1).prop('category')).to.equal('Pool');
    expect(wrapper.find(Pool).at(1).prop('max')).to.equal(13);
    expect(wrapper.find(Pool).at(1).prop('min')).to.equal(4);
    expect(wrapper.find(Pool).at(1).prop('count')).to.equal(11);
    expect(wrapper.find(Pool).at(1).prop('uses')).to.equal(21);
    expect(wrapper.find(Pool).at(1).prop('usesPer')).to.equal('per Short Recovery');
    expect(wrapper.find(Pool).at(1).prop('source')).to.equal('build');
    expect(wrapper.find(Pool).at(1).prop('abilities')).to.deep.equal(list.filter(r => r.group == 'lucky'));
    expect(wrapper.find(Pool).at(1).prop('viewDescription')).to.equal(view);
    expect(wrapper.find(Pool).at(1).prop('editCharacter')).to.equal(update);

    wrapper.setProps({
      source: 'testing'
    });
    expect(wrapper.find(Pool).at(0).prop('source')).to.equal('testing');
    expect(wrapper.find(Pool).at(1).prop('source')).to.equal('testing');
  });
});
