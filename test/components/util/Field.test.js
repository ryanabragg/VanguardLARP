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
    expect(wrapper.find('label').text()).to.equal('blah');
    expect(wrapper.find('div').childAt(0).type()).to.equal('input');
    expect(wrapper.find('div').childAt(1).type()).to.equal('label');
    wrapper.setProps({
      labelPosition: -1
    });
    expect(wrapper.find('div').childAt(0).type()).to.equal('label');
    expect(wrapper.find('div').childAt(1).type()).to.equal('input');
  });

  it('executes the editCharacter prop when the value is changed', () => {
    const edit = spy();
    const wrapper = shallow(<Field name='test' editCharacter={edit}/>);
    wrapper.find('input').simulate('change', {target: {name: 'try', value: 'blah'}, preventDefault: () => {}});
    expect(edit.callCount).to.equal(1);
    expect(edit.firstCall.args[0]).to.deep.equal({type: 'TRY', data: 'blah'});
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
      options: ['one', 'two']
    });
    expect(wrapper.find('option')).to.have.length(3);
    expect(wrapper.find('option').at(0).text()).to.equal('');
    expect(wrapper.find('option').at(1).text()).to.equal('one');
    expect(wrapper.find('option').at(2).text()).to.equal('two');
    wrapper.setProps({
      placeholder: 'test',
      options: ['one', 'two', 'one', 'one', 'two']
    });
    expect(wrapper.find('option')).to.have.length(3);
    expect(wrapper.find('option').at(0).prop('value')).to.equal('');
    expect(wrapper.find('option').at(0).text()).to.equal('test');
  });

  it('renders a checkbox instead of an input if type is checkbox');
});
