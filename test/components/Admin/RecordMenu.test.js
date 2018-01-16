import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import RecordMenu from '../../../src/components/Admin/RecordMenu';
import Button from '../../../src/components/util/styled/Button';

describe('<RecordMenu />', () => {
  it('renders a div with Buttons based on props', () => {
    const wrapper = shallow(<RecordMenu />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find(Button)).to.have.length(0);

    const fn = () => undefined;

    wrapper.setProps({
      reload: fn
    });
    expect(wrapper.find(Button)).to.have.length(1);
    expect(wrapper.find(Button).prop('label')).to.equal('Reload Data');
    expect(wrapper.find(Button).prop('callback')).to.equal(fn);
    expect(wrapper.find(Button).prop('radius')).to.equal('100%');

    wrapper.setProps({
      reload: undefined,
      new: fn
    });
    expect(wrapper.find(Button)).to.have.length(1);
    expect(wrapper.find(Button).prop('label')).to.equal('New Record');
    expect(wrapper.find(Button).prop('callback')).to.equal(fn);
    expect(wrapper.find(Button).prop('radius')).to.equal('100%');

    wrapper.setProps({
      new: undefined,
      submit: fn
    });
    expect(wrapper.find(Button)).to.have.length(1);
    expect(wrapper.find(Button).prop('label')).to.equal('Submit Record');
    expect(wrapper.find(Button).prop('callback')).to.equal(fn);
    expect(wrapper.find(Button).prop('radius')).to.equal('100%');

    wrapper.setProps({
      submit: undefined,
      cancel: fn
    });
    expect(wrapper.find(Button)).to.have.length(1);
    expect(wrapper.find(Button).prop('label')).to.equal('Cancel; Clear Record Selection');
    expect(wrapper.find(Button).prop('callback')).to.equal(fn);
    expect(wrapper.find(Button).prop('radius')).to.equal('100%');

    wrapper.setProps({
      cancel: undefined,
      delete: fn
    });
    expect(wrapper.find(Button)).to.have.length(1);
    expect(wrapper.find(Button).prop('label')).to.equal('Delete Record');
    expect(wrapper.find(Button).prop('callback')).to.equal(fn);
    expect(wrapper.find(Button).prop('radius')).to.equal('100%');
  });

  it('has a search button that pops out a search input and buttons');
});
