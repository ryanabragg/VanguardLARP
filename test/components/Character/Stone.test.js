import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Stone from '../../../src/components/Character/Stone';

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

describe('<Stone />', () => {
  it('renders a div containing a span', () => {
    const wrapper = shallow(<Stone />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').find('span')).to.have.length(1);
  });

  it('renders a div with data-stone prop of "{color prop value}stone"', () => {
    expect(shallow(<Stone />).find('div').prop('data-stone')).to.equal('stone');
    expect(shallow(<Stone color='test' />).find('div').prop('data-stone')).to.equal('teststone');
  });

  it('renders a span with data-stone-disable prop with the value of the disable prop', () => {
    expect(shallow(<Stone />).find('span').prop('data-stone-disable')).to.equal(false);
    expect(shallow(<Stone disable={true} />).find('span').prop('data-stone-disable')).to.equal(true);
  });

  it('has a text value based on the color and colorLetters props', () => {
    expect(shallow(<Stone />).find('span').text()).to.equal('');
    expect(shallow(<Stone color='black' />).find('span').text()).to.equal('B');
    expect(shallow(<Stone color='blue' />).find('span').text()).to.equal('U');
    expect(shallow(<Stone color='red' />).find('span').text()).to.equal('R');
    expect(shallow(<Stone color='white' />).find('span').text()).to.equal('W');
    expect(shallow(<Stone color='lost' />).find('span').text()).to.equal('W');
    expect(shallow(<Stone color='rainbow' />).find('span').text()).to.equal('');
    expect(shallow(<Stone color='rainbow' colorLetters={{rainbow: 'unicorn'}} />).find('span').text()).to.equal('unicorn');
  });

  it('calls the stoneClick prop when the div is clicked', () => {
    const stoneClick = spy();
    const wrapper = mount(<Stone stoneClick={stoneClick} />);
    wrapper.find('div').simulate('click');
    expect(stoneClick.calledOnce).to.equal(true);
  });

  it('calls the stoneClick prop with the correct args', () => {
    const stoneClick = spy();
    const wrapper = mount(<Stone stoneClick={stoneClick} />);
    wrapper.find('div').simulate('click')
    expect(stoneClick.firstCall.args.length).to.equal(0);
    wrapper.setProps({color: 'blue'});
    wrapper.find('div').simulate('click')
    expect(stoneClick.secondCall.args[0]).to.equal('blue');
  });
});
