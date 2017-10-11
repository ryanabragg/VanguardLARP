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
    const wrapper = shallow(<Field name='test' value='try'/>);
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('input').prop('type')).to.equal('text');
    expect(wrapper.find('input').prop('name')).to.equal('test');
    wrapper.setProps({
      type: 'number',
      placeholder: '4'
    });
    expect(wrapper.find('input').prop('type')).to.equal('number');
    expect(wrapper.find('input').prop('value')).to.equal('try');
    expect(wrapper.find('input').prop('placeholder')).to.equal('4');
    expect(wrapper.find('input').prop('readOnly')).to.equal(true);
    wrapper.setProps({
      onChange: edit
    });
    expect(wrapper.find('input').prop('readOnly')).to.equal(false);
  });

  it('executes the onChange prop when the value is changed', () => {
    const edit = spy();
    const wrapper = shallow(<Field name='test' onChange={edit}/>);
    wrapper.find('input').simulate('change', {target: {name: 'test', value: 'blah'}, preventDefault: () => {}});
    expect(edit.callCount).to.equal(1);
    expect(edit.firstCall.args[0]).to.deep.equal({type: 'TEST', data: 'blah'});
    wrapper.setProps({
      type: 'text',
      value: 0
    });
    wrapper.find('input').simulate('change', {target: {name: 'try', value: '4'}, preventDefault: () => {}});
    expect(edit.callCount).to.equal(2);
    expect(edit.secondCall.args[0]).to.deep.equal({type: 'TRY', data: '4'});
    wrapper.setProps({
      type: 'number',
      value: 4
    });
    wrapper.find('input').simulate('change', {target: {name: 'try', value: '2'}, preventDefault: () => {}});
    expect(edit.callCount).to.equal(3);
    expect(edit.thirdCall.args[0]).to.deep.equal({type: 'TRY', data: 2});
  });

  it('renders a select instead of an input if type is select', () => {
    const wrapper = shallow(<Field name='test' />);
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('select')).to.have.length(0);
    wrapper.setProps({
      type: 'select'
    });
    expect(wrapper.find('input')).to.have.length(0);
    expect(wrapper.find('select')).to.have.length(1);
    expect(wrapper.find('option')).to.have.length(1);
    expect(wrapper.find('option').prop('value')).to.equal('');
    expect(wrapper.find('option').text()).to.equal('');
    wrapper.setProps({
      options: [{value: 42, label: 'one'}, {value: 'test', label: 2}]
    });
    expect(wrapper.find('option')).to.have.length(3);
    expect(wrapper.find('option').at(0).prop('value')).to.equal('');
    expect(wrapper.find('option').at(0).text()).to.equal('');
    expect(wrapper.find('option').at(1).prop('value')).to.equal(42);
    expect(wrapper.find('option').at(1).text()).to.equal('one');
    expect(wrapper.find('option').at(2).prop('value')).to.equal('test');
    expect(wrapper.find('option').at(2).text()).to.equal('2');
  });

  it('renders a checkbox instead of an input if type is checkbox');
});
