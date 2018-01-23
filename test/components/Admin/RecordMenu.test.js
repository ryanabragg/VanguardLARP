import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import RecordMenu from '../../../src/components/Admin/RecordMenu';
import Button from '../../../src/components/util/styled/Button';

describe('<RecordMenu />', () => {
  it('renders a div with Buttons based on props', () => {
    const logout = spy();
    const wrapper = shallow(<RecordMenu logout={logout} />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find(Button)).to.have.length(1);
    expect(wrapper.find(Button).prop('link')).to.equal('/login');
    expect(wrapper.find(Button).prop('callback')).to.equal(null);
    expect(wrapper.find(Button).prop('label')).to.equal('Sign In');
    expect(wrapper.find(Button).childAt(0).text()).to.equal('Sign In');

    wrapper.setProps({
      user: {name: 'test'}
    });
    expect(wrapper.find(Button)).to.have.length(2);
    expect(wrapper.find(Button).at(0).prop('link')).to.equal(null);
    expect(wrapper.find(Button).at(0).prop('callback')).to.equal(logout);
    expect(wrapper.find(Button).at(0).prop('label')).to.equal('Sign Out');
    expect(wrapper.find(Button).at(0).childAt(0).text()).to.equal('Sign Out');
    expect(wrapper.find(Button).at(1).prop('link')).to.equal('/account');
    expect(wrapper.find(Button).at(1).prop('callback')).to.equal(undefined);
    expect(wrapper.find(Button).at(1).prop('label')).to.equal('Account');
    expect(wrapper.find(Button).at(1).childAt(0).text()).to.equal('Account');

    const fn = () => undefined;

    wrapper.setProps({
      user: undefined,
      reload: fn
    });
    expect(wrapper.find(Button)).to.have.length(2);
    expect(wrapper.find(Button).at(1).prop('callback')).to.equal(fn);
    expect(wrapper.find(Button).at(1).prop('label')).to.equal('Reload Data');
    expect(wrapper.find(Button).at(1).childAt(0).text()).to.equal('Reload Data');

    wrapper.setProps({
      reload: undefined,
      new: fn
    });
    expect(wrapper.find(Button)).to.have.length(2);
    expect(wrapper.find(Button).at(1).prop('callback')).to.equal(fn);
    expect(wrapper.find(Button).at(1).prop('label')).to.equal('New Record');
    expect(wrapper.find(Button).at(1).childAt(0).text()).to.equal('New');

    wrapper.setProps({
      new: undefined,
      submit: fn
    });
    expect(wrapper.find(Button)).to.have.length(2);
    expect(wrapper.find(Button).at(1).prop('callback')).to.equal(fn);
    expect(wrapper.find(Button).at(1).prop('label')).to.equal('Save Record');
    expect(wrapper.find(Button).at(1).childAt(0).text()).to.equal('Save');

    wrapper.setProps({
      submit: undefined,
      cancel: fn
    });
    expect(wrapper.find(Button)).to.have.length(2);
    expect(wrapper.find(Button).at(1).prop('callback')).to.equal(fn);
    expect(wrapper.find(Button).at(1).prop('label')).to.equal('Cancel; Clear Record Selection');
    expect(wrapper.find(Button).at(1).childAt(0).text()).to.equal('Cancel');

    wrapper.setProps({
      cancel: undefined,
      delete: fn
    });
    expect(wrapper.find(Button)).to.have.length(2);
    expect(wrapper.find(Button).at(1).prop('callback')).to.equal(fn);
    expect(wrapper.find(Button).at(1).prop('label')).to.equal('Delete Record');
    expect(wrapper.find(Button).at(1).childAt(0).text()).to.equal('Delete');
  });

  it('has a search button that pops out a search input and buttons');
});
