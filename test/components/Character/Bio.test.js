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
  it('renders a div with the player name from props', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio player='test' editCharacter={editCharacter}/>);
    expect(wrapper.find('[data-character="player-name"]')).to.have.length(1);
    expect(wrapper.find('[data-character="player-name"]').type()).to.equal('div');
    expect(wrapper.find('[data-character="player-name"]').find('label').text()).to.equal('Player');
    expect(wrapper.prop('player')).to.equal('test');
    expect(wrapper.find('[data-character="player-name"]').find('input').prop('value')).to.equal('test');
    wrapper.setProps({player: 'testing'});
    expect(wrapper.prop('player')).to.equal('testing');
    expect(wrapper.find('[data-character="player-name"]').find('input').prop('value')).to.equal('testing');
  });

  it('renders a div with the character name from props', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' editCharacter={editCharacter}/>);
    expect(wrapper.find('[data-character="character-name"]')).to.have.length(1);
    expect(wrapper.find('[data-character="character-name"]').type()).to.equal('div');
    expect(wrapper.find('[data-character="character-name"]').find('label').text()).to.equal('Character');
    expect(wrapper.prop('name')).to.equal('test');
    expect(wrapper.find('[data-character="character-name"]').find('input').prop('value')).to.equal('test');
    wrapper.setProps({name: 'testing'});
    expect(wrapper.prop('name')).to.equal('testing');
    expect(wrapper.find('[data-character="character-name"]').find('input').prop('value')).to.equal('testing');
  });

  it('calls the editCharacter prop with the correct args when the character name is changed', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' editCharacter={editCharacter}/>);
    wrapper.find('[data-character="character-name"]').find('input').simulate('change', {target: {name: 'name', value: 'testing'}});
    expect(editCharacter.calledOnce).to.equal(true);
    expect(editCharacter.firstCall.args[0]).to.deep.equal({ type: 'NAME', data: 'testing' });
  });

  it('renders a div with the character race from props as a select', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' race='angel' editCharacter={editCharacter}/>);
    expect(wrapper.find('[data-character="race"]')).to.have.length(1);
    expect(wrapper.find('[data-character="race"]').type()).to.equal('div');
    expect(wrapper.find('[data-character="race"]').find('label').text()).to.equal('Race');
    expect(wrapper.prop('race')).to.equal('angel');
    expect(wrapper.find('[data-character="race"]').find('select').prop('value')).to.equal('angel');
    wrapper.setProps({race: 'demon'});
    expect(wrapper.prop('race')).to.equal('demon');
    expect(wrapper.find('[data-character="race"]').find('select').prop('value')).to.equal('demon');
  });

  it('renders a race option per string in the races prop array');

  it('calls the editCharacter prop with the correct args when the race is changed', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' editCharacter={editCharacter}/>);
    wrapper.find('[data-character="race"]').find('select').simulate('change', {target: {name: 'race', value: 'testing'}});
    expect(editCharacter.calledOnce).to.equal(true);
    expect(editCharacter.firstCall.args[0]).to.deep.equal({ type: 'RACE', data: 'testing' });
  });

  it('renders a div with the character culture from props as a select', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' culture='angelic' editCharacter={editCharacter}/>);
    expect(wrapper.find('[data-character="culture"]')).to.have.length(1);
    expect(wrapper.find('[data-character="culture"]').type()).to.equal('div');
    expect(wrapper.find('[data-character="culture"]').find('label').text()).to.equal('Culture');
    expect(wrapper.prop('culture')).to.equal('angelic');
    expect(wrapper.find('[data-character="culture"]').find('select').prop('value')).to.equal('angelic');
    wrapper.setProps({culture: 'demonic'});
    expect(wrapper.prop('culture')).to.equal('demonic');
    expect(wrapper.find('[data-character="culture"]').find('select').prop('value')).to.equal('demonic');
  });

  it('renders a race option per string in the cultures prop array');

  it('calls the editCharacter prop with the correct args when the race is changed', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' editCharacter={editCharacter}/>);
    wrapper.find('[data-character="culture"]').find('select').simulate('change', {target: {name: 'culture', value: 'testing'}});
    expect(editCharacter.calledOnce).to.equal(true);
    expect(editCharacter.firstCall.args[0]).to.deep.equal({ type: 'CULTURE', data: 'testing' });
  });

  it('renders a div with the player build from props', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' playerBuild={42} editCharacter={editCharacter}/>);
    expect(wrapper.find('[data-character="build-player"]')).to.have.length(1);
    expect(wrapper.find('[data-character="build-player"]').type()).to.equal('div');
    expect(wrapper.find('[data-character="build-player"]').find('label').text()).to.equal('Player Build');
    expect(wrapper.prop('playerBuild')).to.equal(42);
    expect(wrapper.find('[data-character="build-player"]').find('input').prop('value')).to.equal(42);
    wrapper.setProps({playerBuild: 13});
    expect(wrapper.prop('playerBuild')).to.equal(13);
    expect(wrapper.find('[data-character="build-player"]').find('input').prop('value')).to.equal(13);
  });

  it('renders a div with the character build total from props', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' build={42} editCharacter={editCharacter}/>);
    expect(wrapper.find('[data-character="build-total"]')).to.have.length(1);
    expect(wrapper.find('[data-character="build-total"]').type()).to.equal('div');
    expect(wrapper.find('[data-character="build-total"]').find('label').text()).to.equal('Build Total');
    expect(wrapper.prop('build')).to.equal(42);
    expect(wrapper.find('[data-character="build-total"]').find('input').prop('value')).to.equal(42);
    wrapper.setProps({build: 13});
    expect(wrapper.prop('build')).to.equal(13);
    expect(wrapper.find('[data-character="build-total"]').find('input').prop('value')).to.equal(13);
  });

  it('renders a div with the character build spent from props', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' spent={42} editCharacter={editCharacter}/>);
    expect(wrapper.find('[data-character="build-spent"]')).to.have.length(1);
    expect(wrapper.find('[data-character="build-spent"]').type()).to.equal('div');
    expect(wrapper.find('[data-character="build-spent"]').find('label').text()).to.equal('Build Spent');
    expect(wrapper.prop('spent')).to.equal(42);
    expect(wrapper.find('[data-character="build-spent"]').find('input').prop('value')).to.equal(42);
    wrapper.setProps({spent: 13});
    expect(wrapper.prop('spent')).to.equal(13);
    expect(wrapper.find('[data-character="build-spent"]').find('input').prop('value')).to.equal(13);
  });

  it('renders a div with the character level from props', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' level={1} editCharacter={editCharacter}/>);
    expect(wrapper.find('[data-character="level"]')).to.have.length(1);
    expect(wrapper.find('[data-character="level"]').type()).to.equal('div');
    expect(wrapper.find('[data-character="level"]').find('label').text()).to.equal('Level');
    expect(wrapper.prop('level')).to.equal(1);
    expect(wrapper.find('[data-character="level"]').find('input').prop('value')).to.equal(1);
    wrapper.setProps({level: 13});
    expect(wrapper.prop('level')).to.equal(13);
    expect(wrapper.find('[data-character="level"]').find('input').prop('value')).to.equal(13);
  });

  it('renders a div with the character body from props', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' body={10} editCharacter={editCharacter}/>);
    expect(wrapper.find('[data-character="body"]')).to.have.length(1);
    expect(wrapper.find('[data-character="body"]').type()).to.equal('div');
    expect(wrapper.find('[data-character="body"]').find('label').text()).to.equal('Body');
    expect(wrapper.prop('body')).to.equal(10);
    expect(wrapper.find('[data-character="body"]').find('input').prop('value')).to.equal(10);
    wrapper.setProps({body: 13});
    expect(wrapper.prop('body')).to.equal(13);
    expect(wrapper.find('[data-character="body"]').find('input').prop('value')).to.equal(13);
  });

  it('renders a div with the character buffs from props', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' buffs={3} editCharacter={editCharacter}/>);
    expect(wrapper.find('[data-character="buffs"]')).to.have.length(1);
    expect(wrapper.find('[data-character="buffs"]').type()).to.equal('div');
    expect(wrapper.find('[data-character="buffs"]').find('label').text()).to.equal('Buffs');
    expect(wrapper.prop('buffs')).to.equal(3);
    expect(wrapper.find('[data-character="buffs"]').find('input').prop('value')).to.equal(3);
    wrapper.setProps({buffs: 13});
    expect(wrapper.prop('buffs')).to.equal(13);
    expect(wrapper.find('[data-character="buffs"]').find('input').prop('value')).to.equal(13);
  });

  it('renders a div with the character inscriptions from props', () => {
    const editCharacter = spy();
    const wrapper = mount(<Bio name='test' inscriptions={1} editCharacter={editCharacter}/>);
    expect(wrapper.find('[data-character="inscriptions"]')).to.have.length(1);
    expect(wrapper.find('[data-character="inscriptions"]').type()).to.equal('div');
    expect(wrapper.find('[data-character="inscriptions"]').find('label').text()).to.equal('Tattoos');
    expect(wrapper.prop('inscriptions')).to.equal(1);
    expect(wrapper.find('[data-character="inscriptions"]').find('input').prop('value')).to.equal(1);
    wrapper.setProps({inscriptions: 13});
    expect(wrapper.prop('inscriptions')).to.equal(13);
    expect(wrapper.find('[data-character="inscriptions"]').find('input').prop('value')).to.equal(13);
  });
});
