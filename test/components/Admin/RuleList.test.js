import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import RuleList from '../../../src/components/Admin/RuleList';
import RuleForm from '../../../src/components/Admin/RuleForm';
import Rule from '../../../src/components/Admin/Rule';

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

describe('<RuleList />', () => {
  it('renders an article with an array of rule objects as Rule components', () => {
    const onClick = spy(),
      onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(
      <RuleList
        list={[]}
        selected={{_id: ''}}
        onClick={onClick}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
    expect(wrapper.find('article')).to.have.length(1);
    expect(wrapper.find(RuleForm)).to.have.length(0);
    expect(wrapper.find(Rule)).to.have.length(0);
    wrapper.setProps({
      list: [{
        _id: '42',
        name: 'test',
        category: 'case'
      }, {
        _id: '7',
        name: 'lucky',
        category: 'number'
      }]
    });
    expect(wrapper.find('article')).to.have.length(1);
    expect(wrapper.find(RuleForm)).to.have.length(0);
    expect(wrapper.find(Rule)).to.have.length(2);
  });

  it('handles a blank selected prop', () => {
    const onClick = spy(),
      onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(
      <RuleList
        list={[]}
        onClick={onClick}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
    expect(wrapper.find('article')).to.have.length(1);
    expect(wrapper.find(RuleForm)).to.have.length(0);
    expect(wrapper.find(Rule)).to.have.length(0);
    wrapper.setProps({
      list: [{
        _id: '42',
        name: 'test',
        category: 'case'
      }, {
        _id: '7',
        name: 'lucky',
        category: 'number'
      }]
    });
    expect(wrapper.find('article')).to.have.length(1);
    expect(wrapper.find(RuleForm)).to.have.length(0);
    expect(wrapper.find(Rule)).to.have.length(2);
  });

  it('renders a RuleForm instead of a Rule for the array object matching the selected object id', () => {
    const onClick = spy(),
      onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(
      <RuleList
        list={[]}
        selected={{_id: ''}}
        onClick={onClick}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
    expect(wrapper.find('article')).to.have.length(1);
    expect(wrapper.find(RuleForm)).to.have.length(0);
    expect(wrapper.find(Rule)).to.have.length(0);
    wrapper.setProps({
      list: [{
        _id: '42',
        name: 'test',
        category: 'case'
      }, {
        _id: '7',
        name: 'lucky',
        category: 'number'
      }],
      selected: {
        _id: '42',
        name: 'test',
        category: 'case'
      }
    });
    expect(wrapper.find('article')).to.have.length(1);
    expect(wrapper.find(RuleForm)).to.have.length(1);
    expect(wrapper.find(Rule)).to.have.length(1);
  });

  it('passes the correct props to each Rule', () => {
    const onClick = spy(),
      onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(
      <RuleList
        list={[]}
        selected={{_id: ''}}
        onClick={onClick}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
    wrapper.setProps({
      list: [{
        _id: '42',
        name: 'Dog',
        build: 5,
        max: 1,
        category: 'pet',
        group: 'cat',
        tier: '3',
        level: 7,
        effect: 'entertainment',
        race: 'feline',
        culture: 'hunter',
        delivery: 'pounce',
        verbal: 'meow',
        uses: 9,
        usesPerAptitude: 0,
        usesType: 'per Event',
        description: 'lazy',
        requires: 'food',
        requeresAny: 'attention',
        conflicts: 'laser pointer',
        removes: 'master',
        grants: 'purring',
        grantsUseOf: '',
        increaseMax: 'litter',
        disable: 1,
        prodigy: false,
        hidden: true
      }]
    });
    expect(wrapper.find(Rule).prop('id')).to.equal('42');
    expect(wrapper.find(Rule).prop('name')).to.equal('Dog');
    expect(wrapper.find(Rule).prop('category')).to.equal('pet');
    expect(wrapper.find(Rule).prop('group')).to.equal('cat (3)');
    expect(wrapper.find(Rule).prop('race')).to.equal('feline');
    expect(wrapper.find(Rule).prop('culture')).to.equal('hunter');
    expect(wrapper.find(Rule).prop('onClick')).to.equal(onClick);
  });

  it('passes the correct props to the RuleForm', () => {
    const onClick = spy(),
      onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(
      <RuleList
        list={[]}
        selected={{_id: ''}}
        onClick={onClick}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    );
    wrapper.setProps({
      list: [{
        _id: '42',
        name: 'Dog',
        build: 5,
        max: 1,
        category: 'pet',
        group: 'cat',
        tier: '3',
        level: 7,
        effect: 'entertainment',
        race: 'feline',
        culture: 'hunter',
        delivery: 'pounce',
        verbal: 'meow',
        uses: 9,
        usesPerAptitude: 0,
        usesType: 'per Event',
        description: 'lazy',
        requires: 'food',
        requeresAny: 'attention',
        conflicts: 'laser pointer',
        removes: 'master',
        grants: 'purring',
        grantsUseOf: '',
        increaseMax: 'litter',
        disable: 1,
        prodigy: false,
        hidden: true
      }],
      selected: {
        _id: '42',
        name: 'Dog',
        build: 5,
        max: 1,
        category: 'pet',
        group: 'cat',
        tier: '3',
        level: 7,
        effect: 'entertainment',
        race: 'feline',
        culture: 'hunter',
        delivery: 'pounce',
        verbal: 'meow',
        uses: 9,
        usesPerAptitude: 0,
        usesType: 'per Event',
        description: 'lazy',
        requires: 'food',
        requeresAny: 'attention',
        conflicts: 'laser pointer',
        removes: 'master',
        grants: 'purring',
        grantsUseOf: '',
        increaseMax: 'litter',
        disable: 1,
        hidden: true
      },
      scrollToForm: true
    });
    expect(wrapper.find(RuleForm).prop('id')).to.equal('42');
    expect(wrapper.find(RuleForm).prop('name')).to.equal('Dog');
    expect(wrapper.find(RuleForm).prop('build')).to.equal(5);
    expect(wrapper.find(RuleForm).prop('max')).to.equal(1);
    expect(wrapper.find(RuleForm).prop('category')).to.equal('pet');
    expect(wrapper.find(RuleForm).prop('group')).to.equal('cat');
    expect(wrapper.find(RuleForm).prop('tier')).to.equal('3');
    expect(wrapper.find(RuleForm).prop('level')).to.equal(7);
    expect(wrapper.find(RuleForm).prop('effect')).to.equal('entertainment');
    expect(wrapper.find(RuleForm).prop('race')).to.equal('feline');
    expect(wrapper.find(RuleForm).prop('culture')).to.equal('hunter');
    expect(wrapper.find(RuleForm).prop('delivery')).to.equal('pounce');
    expect(wrapper.find(RuleForm).prop('verbal')).to.equal('meow');
    expect(wrapper.find(RuleForm).prop('uses')).to.equal(9);
    expect(wrapper.find(RuleForm).prop('usesPerAptitude')).to.equal(0);
    expect(wrapper.find(RuleForm).prop('usesType')).to.equal('per Event');
    expect(wrapper.find(RuleForm).prop('description')).to.equal('lazy');
    expect(wrapper.find(RuleForm).prop('requires')).to.equal('food');
    expect(wrapper.find(RuleForm).prop('requeresAny')).to.equal('attention');
    expect(wrapper.find(RuleForm).prop('conflicts')).to.equal('laser pointer');
    expect(wrapper.find(RuleForm).prop('removes')).to.equal('master');
    expect(wrapper.find(RuleForm).prop('grants')).to.equal('purring');
    expect(wrapper.find(RuleForm).prop('grantsUseOf')).to.equal('');
    expect(wrapper.find(RuleForm).prop('increaseMax')).to.equal('litter');
    expect(wrapper.find(RuleForm).prop('disable')).to.equal(1);
    expect(wrapper.find(RuleForm).prop('hidden')).to.equal(true);
    expect(wrapper.find(RuleForm).prop('onChange')).to.equal(onChange);
    expect(wrapper.find(RuleForm).prop('onSubmit')).to.equal(onSubmit);
    expect(wrapper.find(RuleForm).prop('onCancel')).to.equal(onCancel);
    expect(wrapper.find(RuleForm).prop('onDelete')).to.equal(onDelete);
    expect(wrapper.find(RuleForm).prop('scrollToForm')).to.equal(true);
  });
});
