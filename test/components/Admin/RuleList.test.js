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
        name: 'test',
        build: 42,
        delivery: 'touch',
        category: 'case',
        group: 'testing',
        tier: 'trial',
        race: 'mocha',
        culture: 'expect',
        description: 'blah',
        max: 0,
        extraUses: 'iteration',
        requires: 'modules',
        requeresAny: 'code',
        conflicts: 'bugs',
        replaces: 'unwritten',
        grants: 'reliability'
      }]
    });
    expect(wrapper.find(Rule).prop('id')).to.equal('42');
    expect(wrapper.find(Rule).prop('name')).to.equal('test');
    expect(wrapper.find(Rule).prop('category')).to.equal('case');
    expect(wrapper.find(Rule).prop('group')).to.equal('testing');
    expect(wrapper.find(Rule).prop('tier')).to.equal('trial');
    expect(wrapper.find(Rule).prop('race')).to.equal('mocha');
    expect(wrapper.find(Rule).prop('culture')).to.equal('expect');
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
        name: 'these are not used',
        build: NaN,
        delivery: 'these are not used',
        category: 'these are not used',
        group: 'these are not used',
        tier: 'these are not used',
        race: 'these are not used',
        culture: 'these are not used',
        description: 'these are not used',
        max: NaN,
        extraUses: 'these are not used',
        requires: 'these are not used',
        requeresAny: 'these are not used',
        conflicts: 'these are not used',
        replaces: 'these are not used',
        grants: 'these are not used'
      }],
      selected: {
        _id: '42',
        name: 'test',
        build: 42,
        delivery: 'touch',
        category: 'case',
        group: 'testing',
        tier: 'trial',
        race: 'mocha',
        culture: 'expect',
        description: 'blah',
        max: 0,
        extraUses: 'iteration',
        requires: 'modules',
        requeresAny: 'code',
        conflicts: 'bugs',
        replaces: 'unwritten',
        grants: 'reliability'
      },
      scrollToForm: true
    });
    expect(wrapper.find(RuleForm).prop('id')).to.equal('42');
    expect(wrapper.find(RuleForm).prop('name')).to.equal('test');
    expect(wrapper.find(RuleForm).prop('build')).to.equal(42);
    expect(wrapper.find(RuleForm).prop('delivery')).to.equal('touch');
    expect(wrapper.find(RuleForm).prop('category')).to.equal('case');
    expect(wrapper.find(RuleForm).prop('group')).to.equal('testing');
    expect(wrapper.find(RuleForm).prop('tier')).to.equal('trial');
    expect(wrapper.find(RuleForm).prop('race')).to.equal('mocha');
    expect(wrapper.find(RuleForm).prop('culture')).to.equal('expect');
    expect(wrapper.find(RuleForm).prop('description')).to.equal('blah');
    expect(wrapper.find(RuleForm).prop('max')).to.equal(0);
    expect(wrapper.find(RuleForm).prop('extraUses')).to.equal('iteration');
    expect(wrapper.find(RuleForm).prop('requires')).to.equal('modules');
    expect(wrapper.find(RuleForm).prop('requeresAny')).to.equal('code');
    expect(wrapper.find(RuleForm).prop('conflicts')).to.equal('bugs');
    expect(wrapper.find(RuleForm).prop('replaces')).to.equal('unwritten');
    expect(wrapper.find(RuleForm).prop('grants')).to.equal('reliability');
    expect(wrapper.find(RuleForm).prop('onChange')).to.equal(onChange);
    expect(wrapper.find(RuleForm).prop('onSubmit')).to.equal(onSubmit);
    expect(wrapper.find(RuleForm).prop('onCancel')).to.equal(onCancel);
    expect(wrapper.find(RuleForm).prop('onDelete')).to.equal(onDelete);
    expect(wrapper.find(RuleForm).prop('scrollToForm')).to.equal(true);
  });
});
