import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';

import api from '../../../src/util/api';

import Rules from '../../../src/components/Admin/Rules';

describe('<Rules />', () => {

  it('loads rules data after mounting');
  it('lists the rules');
  it('allows editing the rules if the user is an admin');
  it('alerts the user if the rule selected is modified');
  it('alerts the user if the rule selected is deleted');
  it('lets the user search for rules');
  it('adds new or modified rules to search results if newly matching');

  describe('User Authentication', () => {
    it('renders a login button if not logged in');
    it('renders the user name and log out button if logged in');
  });
});
