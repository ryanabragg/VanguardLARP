import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { JSDOM } from 'jsdom';

import Bio from '../../../src/components/Character/Bio';

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

describe('<Bio />', () => {
  it('renders an input with the character name from props', () => {
    const editCharacter = spy(), editRace = spy();
    const wrapper = mount(<Bio name='test' editCharacter={editCharacter} editRace={editRace}/>);
    expect(wrapper.find('[data-character="character-name"]')).to.have.length(1);
    expect(wrapper.find('[data-character="character-name"]').type()).to.equal('input');
    expect(wrapper.prop('name')).to.equal('test');
    expect(wrapper.find('[data-character="character-name"]').prop('value')).to.equal('test');
    wrapper.setProps({name: 'testing'});
    expect(wrapper.prop('name')).to.equal('testing');
    expect(wrapper.find('[data-character="character-name"]').prop('value')).to.equal('testing');
  });

  it('calls the editCharacter prop when the name is changed', () => {
    const editCharacter = spy(), editRace = spy();
    const wrapper = mount(<Bio name='test' editCharacter={editCharacter} editRace={editRace}/>);
    wrapper.find('[data-character="character-name"]').simulate('change', {target: {name: 'build', value: 13}});
    expect(editCharacter.calledOnce).to.equal(true);
  });

  it('calls the editCharacter prop with the correct args', () => {
    const editCharacter = spy(), editRace = spy();
    const wrapper = mount(<Bio name='test' editCharacter={editCharacter} editRace={editRace}/>);
    wrapper.find('[data-character="character-name"]').simulate('change', {target: {name: 'name', value: 'testing'}});
    expect(editCharacter.calledWith({ type: 'CHANGE NAME', data: 'testing' })).to.equal(true);
  });

  it('renders a span with the character race from props', () => {
    const editCharacter = spy(), editRace = spy();
    const wrapper = mount(<Bio name='test' race='angel' editCharacter={editCharacter} editRace={editRace}/>);
    expect(wrapper.find('[data-character="character-race"]')).to.have.length(1);
    expect(wrapper.find('[data-character="character-race"]').type()).to.equal('span');
    expect(wrapper.prop('race')).to.equal('angel');
    expect(wrapper.find('[data-character="character-race"]').text()).to.equal('angel');
    wrapper.setProps({race: 'demon'});
    expect(wrapper.prop('race')).to.equal('demon');
    expect(wrapper.find('[data-character="character-race"]').text()).to.equal('demon');
  });

  it('calls the editRace prop when the race is clicked on', () => {
    const editCharacter = spy(), editRace = spy();
    const wrapper = mount(<Bio name='test' race='angel' editCharacter={editCharacter} editRace={editRace}/>);
    wrapper.find('[data-character="character-race"]').simulate('click');
    expect(editRace.calledOnce).to.equal(true);
  });

  it('renders a span with the character build from props', () => {
    const editCharacter = spy(), editRace = spy();
    const wrapper = mount(<Bio name='test' build={42} editCharacter={editCharacter} editRace={editRace}/>);
    expect(wrapper.find('[data-character="character-build"]')).to.have.length(1);
    expect(wrapper.find('[data-character="character-build"]').type()).to.equal('span');
    expect(wrapper.prop('build')).to.equal(42);
    expect(wrapper.find('[data-character="character-build"]').text()).to.equal('42');
    wrapper.setProps({build: 13});
    expect(wrapper.prop('build')).to.equal(13);
    expect(wrapper.find('[data-character="character-build"]').text()).to.equal('13');
  });

  it('renders a span with the character level from props', () => {
    const editCharacter = spy(), editRace = spy();
    const wrapper = mount(<Bio name='test' level={1} editCharacter={editCharacter} editRace={editRace}/>);
    expect(wrapper.find('[data-character="character-level"]')).to.have.length(1);
    expect(wrapper.find('[data-character="character-level"]').type()).to.equal('span');
    expect(wrapper.prop('level')).to.equal(1);
    expect(wrapper.find('[data-character="character-level"]').text()).to.equal('1');
    wrapper.setProps({level: 13});
    expect(wrapper.prop('level')).to.equal(13);
    expect(wrapper.find('[data-character="character-level"]').text()).to.equal('13');
  });

  it('renders a span with the character body from props', () => {
    const editCharacter = spy(), editRace = spy();
    const wrapper = mount(<Bio name='test' body={10} editCharacter={editCharacter} editRace={editRace}/>);
    expect(wrapper.find('[data-character="character-body"]')).to.have.length(1);
    expect(wrapper.find('[data-character="character-body"]').type()).to.equal('span');
    expect(wrapper.prop('body')).to.equal(10);
    expect(wrapper.find('[data-character="character-body"]').text()).to.equal('10');
    wrapper.setProps({body: 13});
    expect(wrapper.prop('body')).to.equal(13);
    expect(wrapper.find('[data-character="character-body"]').text()).to.equal('13');
  });

  it('renders a span with the character buffs from props', () => {
    const editCharacter = spy(), editRace = spy();
    const wrapper = mount(<Bio name='test' buffs={3} editCharacter={editCharacter} editRace={editRace}/>);
    expect(wrapper.find('[data-character="character-buffs"]')).to.have.length(1);
    expect(wrapper.find('[data-character="character-buffs"]').type()).to.equal('span');
    expect(wrapper.prop('buffs')).to.equal(3);
    expect(wrapper.find('[data-character="character-buffs"]').text()).to.equal('3');
    wrapper.setProps({buffs: 13});
    expect(wrapper.prop('buffs')).to.equal(13);
    expect(wrapper.find('[data-character="character-buffs"]').text()).to.equal('13');
  });

  it('renders a span with the character inscriptions from props', () => {
    const editCharacter = spy(), editRace = spy();
    const wrapper = mount(<Bio name='test' inscriptions={1} editCharacter={editCharacter} editRace={editRace}/>);
    expect(wrapper.find('[data-character="character-inscriptions"]')).to.have.length(1);
    expect(wrapper.find('[data-character="character-inscriptions"]').type()).to.equal('span');
    expect(wrapper.prop('inscriptions')).to.equal(1);
    expect(wrapper.find('[data-character="character-inscriptions"]').text()).to.equal('1');
    wrapper.setProps({inscriptions: 13});
    expect(wrapper.prop('inscriptions')).to.equal(13);
    expect(wrapper.find('[data-character="character-inscriptions"]').text()).to.equal('13');
  });

  it('renders a span with the character armor from props', () => {
    const editCharacter = spy(), editRace = spy();
    const wrapper = mount(<Bio name='test' armor={0} editCharacter={editCharacter} editRace={editRace}/>);
    expect(wrapper.find('[data-character="character-armor"]')).to.have.length(1);
    expect(wrapper.find('[data-character="character-armor"]').type()).to.equal('span');
    expect(wrapper.prop('armor')).to.equal(0);
    expect(wrapper.find('[data-character="character-armor"]').text()).to.equal('0');
    wrapper.setProps({armor: '2 DR'});
    expect(wrapper.prop('armor')).to.equal('2 DR');
    expect(wrapper.find('[data-character="character-armor"]').text()).to.equal('2 DR');
  });
});
