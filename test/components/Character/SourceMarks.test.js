import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import { JSDOM } from 'jsdom';

import SourceMarks from '../../../src/components/Character/SourceMarks';

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

describe('<SourceMarks />', () => {
  it('renders an div with an unordered list', () => {
    const edit = spy();
    const wrapper = shallow(<SourceMarks editCharacter={edit} />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('ul')).to.have.length(1);
  });

  it('renders a custom value label, input, and button in a div if the mastery prop is true', () => {
    const edit = spy();
    const wrapper = mount(<SourceMarks editCharacter={edit} />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(0);
    expect(wrapper.find('input')).to.have.length(0);
    expect(wrapper.find('button')).to.have.length(0);
    wrapper.setProps({
      limit: 1,
      mastery: true
    });
    expect(wrapper.find('div')).to.have.length(2);
    expect(wrapper.find('div').find('[className="customize"]')).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('button')).to.have.length(1);
    wrapper.setProps({
      known: ['test']
    });
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(0);
    expect(wrapper.find('input')).to.have.length(0);
    expect(wrapper.find('button')).to.have.length(0);
  });

  it('updates state when the custom value input is changed', () => {
    const edit = spy();
    const wrapper = mount(<SourceMarks editCharacter={edit} />);
    wrapper.setProps({
      mastery: true,
      limit: 1
    });
    wrapper.find('input').simulate('change', {target: {name: '', value: 'test'}});
    expect(wrapper.state().custom).to.equal('test');
  });

  it('calls the editCharacter prop with the correct args for the custom value button', () => {
    const edit = spy();
    const wrapper = mount(<SourceMarks editCharacter={edit} />);
    wrapper.setProps({
      mastery: true,
      limit: 2
    });
    wrapper.setState({
      custom: 'test'
    });
    wrapper.find('button').simulate('click');
    expect(edit.callCount).to.equal(1);
    expect(edit.firstCall.args[0]).to.deep.equal({
      type: 'SOURCE MARK',
      data: ['test']
    });
    wrapper.setProps({
      known: ['test']
    });
    wrapper.setState({
      custom: 'testing'
    });
    wrapper.find('button').simulate('click');
    expect(edit.callCount).to.equal(2);
    expect(edit.getCall(1).args[0]).to.deep.equal({
      type: 'SOURCE MARK',
      data: ['test', 'testing']
    });
  });

  it('renders a list item for each string of the granted prop array', () => {
    const edit = spy();
    const wrapper = shallow(<SourceMarks editCharacter={edit} />);
    expect(wrapper.find('li.granted')).to.have.length(0);
    wrapper.setProps({
      granted: [
        'test1'
      ]
    });
    expect(wrapper.find('li.granted')).to.have.length(1);
    wrapper.setProps({
      granted: [
        'test1',
        'test2'
      ]
    });
    expect(wrapper.find('li.granted')).to.have.length(2);
    expect(wrapper.find('li.granted').at(0).childAt(0).type()).to.equal('label');
    expect(wrapper.find('li.granted').at(0).text()).to.equal('test1');
    expect(wrapper.find('li.granted').at(1).childAt(0).type()).to.equal('label');
    expect(wrapper.find('li.granted').at(1).text()).to.equal('test2');
  });

  it('renders a list item for each string of the known prop array', () => {
    const edit = spy();
    const wrapper = shallow(<SourceMarks editCharacter={edit} />);
    expect(wrapper.find('li.known')).to.have.length(0);
    wrapper.setProps({
      known: [
        'test1'
      ]
    });
    expect(wrapper.find('li.known')).to.have.length(1);
    wrapper.setProps({
      known: [
        'test1',
        'test2'
      ]
    });
    expect(wrapper.find('li.known')).to.have.length(2);
    expect(wrapper.find('li.known').at(0).childAt(0).type()).to.equal('select');
    expect(wrapper.find('li.known').at(1).childAt(0).type()).to.equal('select');
  });

  it('renders a select input for each rendered known list item', () => {
    const edit = spy();
    const wrapper = shallow(<SourceMarks editCharacter={edit} />);
    expect(wrapper.find('select')).to.have.length(0);
    wrapper.setProps({
      known: [
        'test1'
      ]
    });
    expect(wrapper.find('select')).to.have.length(1);
    wrapper.setProps({
      known: [
        'test1',
        'test2'
      ]
    });
    expect(wrapper.find('select')).to.have.length(2);
  });

  it('adds empty strings to the list to cover the difference between limit and known length', () => {
    const edit = spy();
    const wrapper = shallow(<SourceMarks editCharacter={edit} />);
    expect(wrapper.find('select')).to.have.length(0);
    wrapper.setProps({
      limit: 3
    });
    expect(wrapper.find('select')).to.have.length(3);
    wrapper.setProps({
      known: [
        'test1',
        'test2'
      ]
    });
    expect(wrapper.find('select')).to.have.length(3);
    wrapper.setProps({
      known: [
        'test1',
        'test2',
        'test3',
        'test4'
      ]
    });
    expect(wrapper.find('select')).to.have.length(4);
  });

  it('renders the proper options for each select', () => {
    const edit = spy();
    const wrapper = shallow(<SourceMarks editCharacter={edit} />);

    wrapper.setProps({limit: 2});

    expect(wrapper.find('select').at(0).find('option')).to.have.length(1 + SourceMarks.defaultProps.elements.filter(e => e.basic).length);
    wrapper.find('select').at(0).find('option').forEach((node, index) => {
      if(index == 0){
        expect(node.prop('value')).to.equal('');
        expect(node.text()).to.equal('');
      } else {
        expect(node.prop('value')).to.equal(SourceMarks.defaultProps.elements.filter(e => e.basic)[index-1].mark);
        expect(node.text()).to.equal(SourceMarks.defaultProps.elements.filter(e => e.basic)[index-1].mark);
      }
    });

    expect(wrapper.find('select').at(1).find('option')).to.have.length(1 + SourceMarks.defaultProps.elements.filter(e => e.basic).length);
    wrapper.find('select').at(1).find('option').forEach((node, index) => {
      if(index == 0){
        expect(node.prop('value')).to.equal('');
        expect(node.text()).to.equal('');
      } else {
        expect(node.prop('value')).to.equal(SourceMarks.defaultProps.elements.filter(e => e.basic)[index-1].mark);
        expect(node.text()).to.equal(SourceMarks.defaultProps.elements.filter(e => e.basic)[index-1].mark);
      }
    });

    let known = ['custom'];

    wrapper.setProps({
      limit: 3,
      mastery: true,
      known: known
    });

    expect(wrapper.find('select').at(0).find('option')).to.have.length(1 + SourceMarks.defaultProps.elements.filter(e => e.basic).length);
    wrapper.find('select').at(0).find('option').forEach((node, index) => {
      if(index == 0){
        expect(node.prop('value')).to.equal('');
        expect(node.text()).to.equal('');
      } else {
        expect(node.prop('value')).to.equal(SourceMarks.defaultProps.elements.filter(e => e.basic)[index-1].mark);
        expect(node.text()).to.equal(SourceMarks.defaultProps.elements.filter(e => e.basic)[index-1].mark);
      }
    });

    expect(wrapper.find('select').at(1).find('option')).to.have.length(1 + SourceMarks.defaultProps.elements.length + known.length);
    wrapper.find('select').at(1).find('option').forEach((node, index) => {
      if(index == 0){
        expect(node.prop('value')).to.equal('');
        expect(node.text()).to.equal('');
      } else {
        expect(node.prop('value')).to.equal(SourceMarks.defaultProps.elements.concat(known.map(k => ({mark: k})))[index-1].mark);
        expect(node.text()).to.equal(SourceMarks.defaultProps.elements.concat(known.map(k => ({mark: k})))[index-1].mark);
      }
    });

    expect(wrapper.find('select').at(2).find('option')).to.have.length(1 + SourceMarks.defaultProps.elements.length + known.length);
    wrapper.find('select').at(2).find('option').forEach((node, index) => {
      if(index == 0){
        expect(node.prop('value')).to.equal('');
        expect(node.text()).to.equal('');
      } else {
        expect(node.prop('value')).to.equal(SourceMarks.defaultProps.elements.concat(known.map(k => ({mark: k})))[index-1].mark);
        expect(node.text()).to.equal(SourceMarks.defaultProps.elements.concat(known.map(k => ({mark: k})))[index-1].mark);
      }
    });

    let elements = [{
      basic: true,
      mark: 'trial1'
    }, {
      basic: true,
      mark: 'trial2'
    }, {
      basic: false,
      mark: 'trial3'
    }];

    wrapper.setProps({elements: elements});

    expect(wrapper.find('select').at(0).find('option')).to.have.length(1 + elements.filter(e => e.basic).length);
    wrapper.find('select').at(0).find('option').forEach((node, index) => {
      if(index == 0){
        expect(node.prop('value')).to.equal('');
        expect(node.text()).to.equal('');
      } else {
        expect(node.prop('value')).to.equal(elements.filter(e => e.basic)[index-1].mark);
        expect(node.text()).to.equal(elements.filter(e => e.basic)[index-1].mark);
      }
    });

    expect(wrapper.find('select').at(1).find('option')).to.have.length(1 + elements.length + known.length);
    wrapper.find('select').at(1).find('option').forEach((node, index) => {
      if(index == 0){
        expect(node.prop('value')).to.equal('');
        expect(node.text()).to.equal('');
      } else {
        expect(node.prop('value')).to.equal(elements.concat(known.map(k => ({mark: k})))[index-1].mark);
        expect(node.text()).to.equal(elements.concat(known.map(k => ({mark: k})))[index-1].mark);
      }
    });

    expect(wrapper.find('select').at(2).find('option')).to.have.length(1 + elements.length + known.length);
    wrapper.find('select').at(2).find('option').forEach((node, index) => {
      if(index == 0){
        expect(node.prop('value')).to.equal('');
        expect(node.text()).to.equal('');
      } else {
        expect(node.prop('value')).to.equal(elements.concat(known.map(k => ({mark: k})))[index-1].mark);
        expect(node.text()).to.equal(elements.concat(known.map(k => ({mark: k})))[index-1].mark);
      }
    });

    wrapper.setProps({mastery: false});

    expect(wrapper.find('select').at(0).find('option')).to.have.length(1 + elements.filter(e => e.basic).length);
    wrapper.find('select').at(0).find('option').forEach((node, index) => {
      if(index == 0){
        expect(node.prop('value')).to.equal('');
        expect(node.text()).to.equal('');
      } else {
        expect(node.prop('value')).to.equal(elements.filter(e => e.basic)[index-1].mark);
        expect(node.text()).to.equal(elements.filter(e => e.basic)[index-1].mark);
      }
    });

    expect(wrapper.find('select').at(1).find('option')).to.have.length(1 + elements.length);
    wrapper.find('select').at(1).find('option').forEach((node, index) => {
      if(index == 0){
        expect(node.prop('value')).to.equal('');
        expect(node.text()).to.equal('');
      } else {console.log(index, elements.filter(e => e.basic)[index-1])
        expect(node.prop('value')).to.equal(elements.filter(e => e.basic).concat(known.map(k => ({mark: k})))[index-1].mark);
        expect(node.text()).to.equal(elements.filter(e => e.basic).concat(known.map(k => ({mark: k})))[index-1].mark);
      }
    });

    expect(wrapper.find('select').at(2).find('option')).to.have.length(1 + elements.length);
    wrapper.find('select').at(2).find('option').forEach((node, index) => {
      if(index == 0){
        expect(node.prop('value')).to.equal('');
        expect(node.text()).to.equal('');
      } else {
        expect(node.prop('value')).to.equal(elements.filter(e => e.basic).concat(known.map(k => ({mark: k})))[index-1].mark);
        expect(node.text()).to.equal(elements.filter(e => e.basic).concat(known.map(k => ({mark: k})))[index-1].mark);
      }
    });
  });

  it('calls the editCharacter prop with the correct args when a selected value is changed', () => {
    const edit = spy();
    const wrapper = mount(<SourceMarks editCharacter={edit} />);
    wrapper.setProps({
      elements: [{
        basic: true,
        mark: 'trial1'
      }, {
        basic: true,
        mark: 'trial2'
      }, {
        basic: false,
        mark: 'trial3'
      }],
      limit: 2
    });
    expect(wrapper.find('select').at(0).prop('name')).to.equal('');
    expect(wrapper.find('select').at(0).prop('value')).to.equal('');
    expect(wrapper.find('select').at(1).prop('name')).to.equal('');
    expect(wrapper.find('select').at(1).prop('value')).to.equal('');
    wrapper.find('select').at(0).simulate('change', {target: {name: '', value: 'trial1'}});
    expect(edit.callCount).to.equal(1);
    expect(edit.firstCall.args[0]).to.deep.equal({
      type: 'SOURCE MARK',
      data: ['trial1']
    });
    wrapper.setProps({
      known: ['trial1']
    });
    expect(wrapper.find('select').at(0).prop('name')).to.equal('trial1');
    expect(wrapper.find('select').at(0).prop('value')).to.equal('trial1');
    expect(wrapper.find('select').at(1).prop('name')).to.equal('');
    expect(wrapper.find('select').at(1).prop('value')).to.equal('');
    wrapper.find('select').at(0).simulate('change', {target: {name: '', value: 'trial3'}});
    expect(edit.callCount).to.equal(2);
    expect(edit.getCall(1).args[0]).to.deep.equal({
      type: 'SOURCE MARK',
      data: ['trial1', 'trial3']
    });
    wrapper.setProps({
      known: ['trial1', 'trial3']
    });
    expect(wrapper.find('select').at(0).prop('name')).to.equal('trial1');
    expect(wrapper.find('select').at(0).prop('value')).to.equal('trial1');
    expect(wrapper.find('select').at(1).prop('name')).to.equal('trial3');
    expect(wrapper.find('select').at(1).prop('value')).to.equal('trial3');
    wrapper.find('select').at(0).simulate('change', {target: {name: 'trial1', value: 'trial2'}});
    expect(edit.callCount).to.equal(3);
    expect(edit.getCall(2).args[0]).to.deep.equal({
      type: 'SOURCE MARK',
      data: ['trial2', 'trial3']
    });
    wrapper.setProps({
      known: ['trial2', 'trial3']
    });
    expect(wrapper.find('select').at(0).prop('name')).to.equal('trial2');
    expect(wrapper.find('select').at(0).prop('value')).to.equal('trial2');
    expect(wrapper.find('select').at(1).prop('name')).to.equal('trial3');
    expect(wrapper.find('select').at(1).prop('value')).to.equal('trial3');
    wrapper.find('select').at(1).simulate('change', {target: {name: 'trial2', value: ''}});
    expect(edit.callCount).to.equal(4);
    expect(edit.getCall(3).args[0]).to.deep.equal({
      type: 'SOURCE MARK',
      data: ['trial3']
    });
    wrapper.setProps({
      known: ['trial3']
    });
    expect(wrapper.find('select').at(0).prop('name')).to.equal('trial3');
    expect(wrapper.find('select').at(0).prop('value')).to.equal('trial3');
    expect(wrapper.find('select').at(1).prop('name')).to.equal('');
    expect(wrapper.find('select').at(1).prop('value')).to.equal('');
  });
});
