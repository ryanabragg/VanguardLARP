import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Field from '../../../src/components/util/Field';

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

describe('<Field />', () => {

  it('renders an input', () => {
    const edit = spy();
    const wrapper = shallow(<Field name='test' />);
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('input').prop('type')).to.equal('text');
    expect(wrapper.find('input').prop('name')).to.equal('test');
    wrapper.setProps({
      type: 'number'
    });
    expect(wrapper.find('input').prop('type')).to.equal('number');
    expect(wrapper.find('input').prop('readOnly')).to.equal(true);
    wrapper.setProps({
      editCharacter: edit
    });
    expect(wrapper.find('input').prop('readOnly')).to.equal(false);
  });

  it('renders a label for the input', () => {
    const wrapper = shallow(<Field name='test' />);
    expect(wrapper.find('label')).to.have.length(0);
    wrapper.setProps({
      label: 'blah'
    });
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.childAt(0).type()).to.equal('input');
    expect(wrapper.childAt(1).type()).to.equal('label');
    wrapper.setProps({
      labelPosition: -1
    });
    expect(wrapper.childAt(0).type()).to.equal('label');
    expect(wrapper.childAt(1).type()).to.equal('input');
  });

  it('renders a select instead of an input if type is select');
  it('renders a checkbox instead of an input if type is checkbox');
});
