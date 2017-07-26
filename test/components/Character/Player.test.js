import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { JSDOM } from 'jsdom';

import Player from '../../../src/components/Character/Player';

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

describe('<Player />', () => {
  it('renders a div with the player name from props', () => {
    const callback = spy();
    const wrapper = mount(<Player name='test' build={42} editCharacter={callback}/>);
    expect(wrapper.find('[data-character="player-name"]')).to.have.length(1);
    expect(wrapper.find('[data-character="player-name"]').type()).to.equal('div');
    expect(wrapper.prop('name')).to.equal('test');
    expect(wrapper.find('[data-character="player-name"]').text()).to.equal('test');
    wrapper.setProps({name: 'testing'});
    expect(wrapper.prop('name')).to.equal('testing');
    expect(wrapper.find('[data-character="player-name"]').text()).to.equal('testing');
  });

  it('renders an input with the player build from props', () => {
    const callback = spy();
    const wrapper = mount(<Player name='test' build={42} editCharacter={callback}/>);
    expect(wrapper.find('[data-character="player-build"]')).to.have.length(1);
    expect(wrapper.find('[data-character="player-build"]').type()).to.equal('input');
    expect(wrapper.prop('build')).to.equal(42);
    expect(wrapper.find('[data-character="player-build"]').prop('value')).to.equal(42);
    wrapper.setProps({build: 13});
    expect(wrapper.prop('build')).to.equal(13);
    expect(wrapper.find('[data-character="player-build"]').prop('value')).to.equal(13);
  });

  it('calls the editCharacter prop when the build is changed', () => {
    const callback = spy();
    const wrapper = mount(<Player name='test' build={42} editCharacter={callback}/>);
    wrapper.find('[data-character="player-build"]').simulate('change', {target: {name: 'build', value: 13}});
    expect(callback.calledOnce).to.equal(true);
  });

  it('calls the editCharacter prop with the correct args', () => {
    const callback = spy();
    const wrapper = mount(<Player name='test' build={42} editCharacter={callback}/>);
    wrapper.find('[data-character="player-build"]').simulate('change', {target: {name: 'build', value: 13}});
    expect(callback.calledWith({ type: 'CHANGE PLAYER BUILD', data: 13 })).to.equal(true);
  });
});
