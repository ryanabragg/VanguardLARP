import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import Field from '../../../src/components/util/Field';

describe('<Field />', () => {
  it('renders an input', () => {
    const edit = spy();
    const wrapper = shallow(<Field name='test' value='try' />);
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
    const wrapper = shallow(<Field name='test' onChange={edit} />);
    wrapper.find('input').simulate('change', {target: {name: 'test', value: 'blah'}, stopPropagation: () => {}});
    expect(edit.callCount).to.equal(1);
    expect(edit.firstCall.args[0]).to.deep.equal({type: 'test', data: 'blah'});
    wrapper.setProps({
      type: 'text',
      value: 0
    });
    wrapper.find('input').simulate('change', {target: {name: 'trY', value: '4'}, stopPropagation: () => {}});
    expect(edit.callCount).to.equal(2);
    expect(edit.secondCall.args[0]).to.deep.equal({type: 'trY', data: '4'});
    wrapper.setProps({
      type: 'number',
      value: 4
    });
    wrapper.find('input').simulate('change', {target: {name: 'trY', value: '2'}, stopPropagation: () => {}});
    expect(edit.callCount).to.equal(3);
    expect(edit.thirdCall.args[0]).to.deep.equal({type: 'trY', data: 2});
  });

  it('renders a select instead of an input if type is select', () => {
    const edit = spy();
    const wrapper = shallow(<Field name='test' onChange={edit} />);
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
    wrapper.find('select').simulate('change', {target: {name: 'test', value: 42}, stopPropagation: () => {}});
    expect(edit.callCount).to.equal(1);
    expect(edit.firstCall.args[0]).to.deep.equal({type: 'test', data: 42});
  });

  it('renders a checkbox instead of an normal input if type is checkbox', () => {
    const edit = spy();
    const wrapper = shallow(<Field name='test' onChange={edit} />);
    expect(wrapper.find({type: 'checkbox'})).to.have.length(0);
    wrapper.setProps({
      type: 'checkbox'
    });
    expect(wrapper.find({type: 'checkbox'})).to.have.length(1);
    wrapper.find('input').simulate('change', {target: {name: 'test', checked: true}, stopPropagation: () => {}});
    expect(edit.callCount).to.equal(1);
    expect(edit.firstCall.args[0]).to.deep.equal({type: 'test', data: 1});
    wrapper.find('input').simulate('change', {target: {name: 'test', checked: false}, stopPropagation: () => {}});
    expect(edit.callCount).to.equal(2);
    expect(edit.secondCall.args[0]).to.deep.equal({type: 'test', data: 0});
  });
});
