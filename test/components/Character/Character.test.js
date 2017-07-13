import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Character from '../../../src/components/Character/Character';
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

describe('<Character />', () => {
  it('calls componentDidMount', () => {
    spy(Character.prototype, 'componentDidMount');
    expect(Character.prototype.componentDidMount.calledOnce).to.be.false;
    const wrapper = mount(<Character />); // eslint-disable-line no-unused-vars
    expect(Character.prototype.componentDidMount.calledOnce).to.be.true;
  });

  describe('Component children', () => {
    it('contains a player component', () => {
      const wrapper = shallow(<Character />);
      expect(wrapper.find(Player)).to.have.length(1);
    });

    it('contains a bio component');
    it('contains a recoveries component');
    it('contains a ressurection component');
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