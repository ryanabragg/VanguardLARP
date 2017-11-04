import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import FormField from '../../../src/components/Admin/FormField';
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

describe('<FormField />', () => {
  it('renders a div with className "form-field"', () => {
    const onChange = spy();
    const wrapper = shallow(<FormField name='test' value='testing' onChange={onChange} />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').prop('className')).to.equal('form-field');
  });

  it('renders a label if the label prop is passed, with text equaling the prop', () => {
    const onChange = spy();
    const wrapper = shallow(<FormField name='test' value='testing' onChange={onChange} />);
    expect(wrapper.find('div').find('label')).to.have.length(0);
    wrapper.setProps({label: 'lebal'});
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('label').text()).to.equal('lebal');
  });

  it('renders a Field component', () => {
    const onChange = spy();
    const wrapper = shallow(<FormField name='test' value='testing' onChange={onChange} />);
    expect(wrapper.find('div').find(Field)).to.have.length(1);
    expect(wrapper.find(Field).prop('type')).to.equal('text');
    wrapper.setProps({type: 'number'});
    expect(wrapper.find(Field).prop('type')).to.equal('number');
    wrapper.setProps({type: 'select', options: ['one', 'two']});
    expect(wrapper.find(Field).prop('type')).to.equal('select');
    expect(wrapper.find(Field).prop('name')).to.equal('test');
    expect(wrapper.find(Field).prop('value')).to.equal('testing');
    expect(wrapper.find(Field).prop('options')).to.deep.equal(['one', 'two']);
    expect(wrapper.find(Field).prop('onChange')).to.equal(onChange);
  });
});
