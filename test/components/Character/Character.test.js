import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Character from '../../../src/components/Character/Character';
import Player from '../../../src/components/Character/Player';
import Bio from '../../../src/components/Character/Bio';
import Stones from '../../../src/components/Character/Stones';

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

describe('<Character />', () => {
  it('calls componentDidMount', () => {
    spy(Character.prototype, 'componentDidMount');
    expect(Character.prototype.componentDidMount.calledOnce).to.be.false;
    const wrapper = mount(<Character />); // eslint-disable-line no-unused-vars
    expect(Character.prototype.componentDidMount.calledOnce).to.be.true;
  });

  describe('Children', () => {
    it('contains a Player component', () => {
      const wrapper = shallow(<Character />);
      expect(wrapper.find(Player)).to.have.length(1);
      expect(wrapper.find(Player).prop('name')).to.equal('Unknown');
      expect(wrapper.find(Player).prop('build')).to.equal(0);
      expect(wrapper.find(Player).prop('editCharacter')).to.be.a('function');
    });

    it('contains a Bio component', () => {
      const wrapper = shallow(<Character />);
      expect(wrapper.find(Bio)).to.have.length(1);
      expect(wrapper.find(Bio).prop('name')).to.equal('NPC');
      expect(wrapper.find(Bio).prop('race')).to.equal('');
      expect(wrapper.find(Bio).prop('build')).to.equal(0);
      expect(wrapper.find(Bio).prop('level')).to.equal(-3);
      expect(wrapper.find(Bio).prop('body')).to.equal(-5);
      expect(wrapper.find(Bio).prop('buffs')).to.equal(2);
      expect(wrapper.find(Bio).prop('inscriptions')).to.equal(0);
      expect(wrapper.find(Bio).prop('editCharacter')).to.be.a('function');
      expect(wrapper.find(Bio).prop('editRace')).to.be.a('function');
    });

    it('contains a Stones ressurection bag component', () => {
      const wrapper = shallow(<Character />);
      expect(wrapper.find(Stones).find({label: 'ressurection-bag'})).to.have.length(1);
      expect(wrapper.find(Stones).find({label: 'ressurection-bag'}).prop('stones')).to.deep.equal({blue: 1, black: 1, red: 2, white: 9, lost: 0});
      expect(wrapper.find(Stones).find({label: 'ressurection-bag'}).prop('stoneClick')).to.be.a('function');
    });

    it('contains a Stones recoveries component', () => {
      const wrapper = shallow(<Character />);
      expect(wrapper.find(Stones).find({label: 'recoveries'})).to.have.length(1);
      expect(wrapper.find(Stones).find({label: 'recoveries'}).prop('stones')).to.equal(6);
      expect(wrapper.find(Stones).find({label: 'recoveries'}).prop('stoneClick')).to.be.a('function');
    });

    it('contains a racial skills component');
    it('contains a constant skills component');
    it('contains a crafting skills component');
    it('contains a combat pools component');
    it('contains a domains component');
    it('contains an advanced arts component');
  });

  describe('State', () => {
    it('loads rules data after mounting');
    it('loads character data after mounting');
    it('tracks build spent');
    it('allows editing the build available if the user is an admin');
    it('alerts on missing requirements for abilities');
    it('renders a save/cancel prompt after changes');
    it('keeps a list of changes since last save');
    it('keeps a log of changes saved to a character');
  });

  describe('User Authentification', () => {
    it('renders a login button if not logged in');
    it('renders the user name and build available if logged in');
    it('calculates build extra/deficit when adjusting abilities known');
    it('stores the character data to a database when clicking on Save');
    it('loads the character data from a database when clicking on the Reload button');
    it('passes the player name and build available/deficit to the player component');
  });

  describe('updates the URI string with character details', () => {
    it('updates the URI with player props');
    it('updates the URI with bio props');
    it('updates the URI with recoveries props');
    it('updates the URI with ressurection props');
    it('updates the URI with racial skills props');
    it('updates the URI with constant skills props');
    it('updates the URI with crafting props');
    it('updates the URI with combat pools props');
    it('updates the URI with domains props');
    it('updates the URI with advanced arts props');
  });

  describe('recognizes the URI string for character details', () => {
    it('loads player props from the URI');
    it('loads bio props from the URI');
    it('loads recoveries props from the URI');
    it('loads ressurection props from the URI');
    it('loads racial skills props from the URI');
    it('loads constant skills props from the URI');
    it('loads crafting props from the URI');
    it('loads combat pools props from the URI');
    it('loads domains props from the URI');
    it('loads advanced arts props from the URI');
  });

  it('accepts a code to add an ability');
});
