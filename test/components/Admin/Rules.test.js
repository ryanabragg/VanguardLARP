import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { JSDOM } from 'jsdom';

import api from '../../../src/util/api';

import Rules from '../../../src/components/Admin/Rules';

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

describe('<Rules />', () => {

  it('loads rules data after mounting');
  it('lists the rules');
  it('allows editing the rules if the user is an admin');
  it('alerts the user if the rule selected is modified');
  it('alerts the user if the rule selected is deleted');
  it('lets the user search for rules');
  it('adds new or modified rules to search results if newly matching');

  describe('User Authentification', () => {
    it('renders a login button if not logged in');
    it('renders the user name and log out button if logged in');
  });
});
