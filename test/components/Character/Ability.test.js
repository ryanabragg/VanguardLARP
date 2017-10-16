import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import { JSDOM } from 'jsdom';

import Ability from '../../../src/components/Character/Ability';
import Field from '../../../src/components/util/Field';

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

describe('<Ability />', () => {
  it('renders an input (count prop) and label (name prop)', () => {
    const view = spy(), update = spy();
    const wrapper = shallow(<Ability id={42} name='test' count={1} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find(Field)).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find(Field).prop('type')).to.equal('number');
    expect(wrapper.find(Field).prop('value')).to.equal(1);
    expect(wrapper.find('label').text()).to.equal('test');
    wrapper.setProps({name: 'testing', count: 3});
    expect(wrapper.find(Field).prop('value')).to.equal(3);
    expect(wrapper.find('label').text()).to.equal('testing');
  });

  it('renders an checkbox input if the display prop is checkbox', () => {
    const view = spy(), update = spy();
    const wrapper = shallow(<Ability id={42} name='test' display='checkbox' viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find(Field)).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find(Field).prop('type')).to.equal('checkbox');
  });

  it('renders a select with options instead of an input if the display prop is tiers', () => {
    const view = spy(), update = spy();
    const wrapper = shallow(<Ability id={42} name='test' display='tiers' viewDescription={view} editCharacter={update}/>);
    const tiers = [
      {value: 1, label: 'Apprentice' },
      {value: 2, label: 'Journeyman' },
      {value: 3, label: 'Craftsman' },
      {value: 4, label: 'Master' },
      {value: 5, label: 'Grandmaster' },
    ];
    expect(wrapper.find(Field)).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find(Field).prop('type')).to.equal('select');
    expect(wrapper.find(Field).prop('options')).to.deep.equal(tiers);
  });

  it('calls the viewDescription prop when the name is clicked', () => {
    const view = spy(), update = spy();
    const wrapper = mount(<Ability id={42} name='test' viewDescription={view} editCharacter={update}/>);
    wrapper.find('label').simulate('click');
    expect(view.calledOnce).to.equal(true);
    expect(view.getCall(0).args[0]).to.equal(42);
  });

  it('calls the editCharacter prop when the count is changed', () => {
    const view = spy(), update = spy();
    const wrapper = mount(<Ability id={42} name='test' viewDescription={view} editCharacter={update}/>);
    wrapper.find({className: 'button'}).at(0).simulate('click');
    expect(update.callCount).to.equal(1);
    expect(update.getCall(0).args[0]).to.deep.equal({type: 'SKILL INCREMENT', data: { id: 42, source: 'build' }});
    wrapper.find({className: 'button'}).at(1).simulate('click');
    expect(update.callCount).to.equal(2);
    expect(update.getCall(1).args[0]).to.deep.equal({type: 'SKILL DECREMENT', data: { id: 42, source: 'build' }});
    wrapper.setProps({display: 'checkbox', source: 'other'});
    wrapper.find('input').simulate('change', {target: {name: 'count', checked: true, stopPropagation: () => {}}});
    expect(update.callCount).to.equal(3);
    expect(update.getCall(2).args[0]).to.deep.equal({type: 'SKILL', data: { id: 42, count: 1, source: 'other' }});
    wrapper.find('input').simulate('change', {target: {name: 'count', checked: false, stopPropagation: () => {}}});
    expect(update.callCount).to.equal(4);
    expect(update.getCall(3).args[0]).to.deep.equal({type: 'SKILL', data: { id: 42, count: 0, source: 'other' }});
    wrapper.setProps({display: ''}); // invariant violation if switching from checkbox to tiers?
    wrapper.setProps({display: 'tiers', count: 3, source: ''});
    wrapper.find('select').simulate('change', {target: {name: 'count', value: 2, stopPropagation: () => {}}});
    expect(update.callCount).to.equal(5);
    expect(update.getCall(4).args[0]).to.deep.equal({type: 'SKILL', data: { id: 42, count: 2, source: ''}});
  });
});
