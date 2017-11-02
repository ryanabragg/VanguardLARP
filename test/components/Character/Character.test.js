import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import { JSDOM } from 'jsdom';
import { ThemeProvider } from 'styled-components';

import api from '../../../src/util/api';

import theme from '../../../src/components/theme';

import Character from '../../../src/components/Character/Character';

import Box from '../../../src/components/Character/styled/Box';
import Stones from '../../../src/components/Character/styled/Stones';
import AbilityGroup from '../../../src/components/Character/styled/AbilityGroup';
import SourceMarks from '../../../src/components/Character/styled/SourceMarks';
import Crafting from '../../../src/components/Character/styled/Crafting';

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

  describe('Children', () => {
    it('contains a bio components'/*, () => {
      const wrapper = shallow(<Character />);
      expect(wrapper.find(Bio)).to.have.length(1);
      expect(wrapper.find(Bio).prop('player')).to.equal('Anonymous');
      expect(wrapper.find(Bio).prop('playerBuild')).to.equal(0);
      expect(wrapper.find(Bio).prop('name')).to.equal('New Character');
      expect(wrapper.find(Bio).prop('race')).to.equal('');
      expect(wrapper.find(Bio).prop('culture')).to.equal('');
      expect(wrapper.find(Bio).prop('build')).to.equal(35);
      expect(wrapper.find(Bio).prop('spent')).to.equal(0);
      expect(wrapper.find(Bio).prop('level')).to.equal(-3);
      expect(wrapper.find(Bio).prop('body')).to.equal(-5);
      expect(wrapper.find(Bio).prop('buffs')).to.equal(2);
      expect(wrapper.find(Bio).prop('inscriptions')).to.equal(0);
      expect(wrapper.find(Bio).prop('editCharacter')).to.be.a('function');
    }*/);

    it('contains a styled Stones ressurection bag component', () => {
      const wrapper = shallow(<Character api={api} />);
      expect(wrapper.find(Box).find({label: 'Ressurection Bag'}).find(Stones)).to.have.length(1);
      expect(wrapper.find(Box).find({label: 'Ressurection Bag'}).find(Stones).prop('stones')).to.deep.equal([
        { color: 'blue', count: 1, disabled: 0 },
        { color: 'black', count: 1, disabled: 0 },
        { color: 'red', count: 2, disabled: 0 },
        { color: 'white', count: 9, disabled: 0 }
      ]);
      expect(wrapper.find(Box).find({label: 'Ressurection Bag'}).find(Stones).prop('stoneClick')).to.be.a('function');
    });

    it('contains a styled Stones recoveries component', () => {
      const wrapper = shallow(<Character api={api} />);
      expect(wrapper.find(Box).find({label: 'Recoveries'}).find(Stones)).to.have.length(1);
      expect(wrapper.find(Box).find({label: 'Recoveries'}).find(Stones).prop('stones')).to.equal(6);
      expect(wrapper.find(Box).find({label: 'Recoveries'}).find(Stones).prop('stoneClick')).to.equal(undefined);
    });

    it('contains a styled racial skills component');

    it('contains a styled constant skills component', () => {
      const wrapper = shallow(<Character api={api} />);
      expect(wrapper.find(Box).find({label: 'Constant Skills'}).find(AbilityGroup)).to.have.length(1);
      //@todo: check props
    });

    it('contains a styled source mark list component', () => {
      const wrapper = shallow(<Character api={api} />);
      expect(wrapper.find(Box).find({label: 'Source Mark Elements'}).find(SourceMarks)).to.have.length(1);
      //@todo: check props
    });

    it('contains a styled crafting info component', () => {
      const wrapper = shallow(<Character api={api} />);
      expect(wrapper.find(Box).find(Crafting)).to.have.length(1);
    });

    it('contains a styled crafting skills component', () => {
      const wrapper = shallow(<Character api={api} />);
      expect(wrapper.find(Box).find({label: 'Craft Skills'}).find(AbilityGroup)).to.have.length(1);
      //@todo: check props
    });

    it('contains a styled combat pools component');
    it('contains a styled domains component');
    it('contains a styled advanced arts component');
  });

  describe('State', () => {
    it('loads rules data after mounting');
    it('loads character data after mounting');
    it('tracks build spent');
    it('has a reset character fucntion');
    it('has a remake character funciton');
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
