import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import { JSDOM } from 'jsdom';

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

describe('<Ability />', () => {
  it('renders an div with an input (count prop) and label (name prop)', () => {
    const view = spy(), update = spy();
    const wrapper = shallow(<Ability id={42} name='test' count={1} viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').childAt(0).type()).to.equal('input');
    expect(wrapper.find('div').childAt(0).prop('value')).to.equal(1);
    expect(wrapper.find('div').childAt(1).type()).to.equal('label');
    expect(wrapper.find('div').childAt(1).text()).to.equal('test');
    wrapper.setProps({name: 'testing', count: 3});
    expect(wrapper.find('div').childAt(0).prop('value')).to.equal(3);
    expect(wrapper.find('div').childAt(1).text()).to.equal('testing');
  });

  it('renders an checkbox input if the display prop is checkbox', () => {
    const view = spy(), update = spy();
    const wrapper = shallow(<Ability id={42} name='test' display='checkbox' viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').childAt(0).type()).to.equal('input');
    expect(wrapper.find('div').childAt(0).prop('type')).to.equal('checkbox');
    expect(wrapper.find('div').childAt(1).type()).to.equal('label');
  });

  it('renders a select with five options instead of an input if the display prop is tiers', () => {
    const view = spy(), update = spy();
    const wrapper = shallow(<Ability id={42} name='test' display='tiers' viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').childAt(0).type()).to.equal('select');
    expect(wrapper.find('div').childAt(1).type()).to.equal('label');
    expect(wrapper.find('option')).to.have.length(6);
    expect(wrapper.find('option').find({value: 0}).text()).to.equal('');
    expect(wrapper.find('option').find({value: 1}).text()).to.equal('Apprentice');
    expect(wrapper.find('option').find({value: 2}).text()).to.equal('Journeyman');
    expect(wrapper.find('option').find({value: 3}).text()).to.equal('Craftsman');
    expect(wrapper.find('option').find({value: 4}).text()).to.equal('Master');
    expect(wrapper.find('option').find({value: 5}).text()).to.equal('Grandmaster');
  });

  it('calls the viewDescription prop when the name is clicked', () => {
    const view = spy(), update = spy();
    const wrapper = mount(<Ability id={42} name='test' viewDescription={view} editCharacter={update}/>);
    wrapper.find('label').simulate('click');
    expect(view.calledOnce).to.equal(true);
  });

  it('calls the viewDescription prop with the correct args', () => {
    const view = spy(), update = spy();
    const wrapper = mount(<Ability id={42} name='test' viewDescription={view} editCharacter={update}/>);
    wrapper.find('label').simulate('click');
    expect(view.calledWith(42)).to.equal(true);
  });

  it('calls the editCharacter prop when the count is changed', () => {
    const view = spy(), update = spy();
    const wrapper = mount(<Ability id={42} name='test' viewDescription={view} editCharacter={update}/>);
    wrapper.find('input').simulate('change', {target: {name: 'count', value: 1}});
    expect(update.callCount).to.equal(1);
    wrapper.setProps({display: 'tiers'});
    wrapper.find('select').simulate('change', {target: {name: 'count', value: 2}});
    expect(update.callCount).to.equal(2);
  });

  it('calls the editCharacter prop with the correct args', () => {
    const view = spy(), update = spy();
    const wrapper = mount(<Ability id={42} name='test' viewDescription={view} editCharacter={update}/>);
    wrapper.find('input').simulate('change', {target: {name: 'count', value: 1}});
    expect(update.firstCall.args[0]).to.deep.equal({ type: 'SKILL', data: { id: 42, count: 1, source: 'build' }});
    wrapper.setProps({display: 'tiers', count: 3, source: 'race'});
    wrapper.find('select').simulate('change', {target: {name: 'count', value: 2}});
    expect(update.secondCall.args[0]).to.deep.equal({ type: 'SKILL', data: { id: 42, count: 2, source: 'race'}});
  });
});
