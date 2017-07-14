import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Stones from '../../../src/components/Character/Stones';
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

describe('<Stones />', () => {
  it('renders a div with the label prop as prop data-character', () => {
    const wrapper = shallow(<Stones stones={1}/>);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').prop('data-character')).to.equal('stones');
    wrapper.setProps({label: 'test'});
    expect(wrapper.find('div').prop('data-character')).to.equal('test');
  });

  it('renders a Stone component stone prop times', () => {
    const wrapper = shallow(<Stones stones={3}/>);
    expect(wrapper.find(Stone)).to.have.length(3);
    wrapper.setProps({stones: {blue: 1, black: 1, red: 2, white: 9, lost: 0}});
    expect(wrapper.find(Stone)).to.have.length(13);
  });

  it('renders a Stone component with the color prop based on the passed stones prop', () => {
    const wrapper = shallow(<Stones stones={{blue: 1, black: 1, red: 2, white: 9, lost: 0}}/>);
    expect(wrapper.find({color: 'blue'})).to.have.length(1);
    expect(wrapper.find({color: 'black'})).to.have.length(1);
    expect(wrapper.find({color: 'red'})).to.have.length(2);
    expect(wrapper.find({color: 'white'})).to.have.length(9);
    expect(wrapper.find({color: 'lost'})).to.have.length(0);
    expect(wrapper.find({color: null})).to.have.length(0);
    wrapper.setProps({stones: 7});
    expect(wrapper.find({color: null})).to.have.length(7);
  });

  it('calls the stoneClick prop when a Stone is clicked', () => {
    const stoneClick = spy();
    const wrapper = mount(<Stones stones={{blue: 1, black: 1, red: 2, white: 9, lost: 0}} stoneClick={stoneClick} />);
    wrapper.find(Stone).forEach((node) => node.simulate('click'));
    expect(stoneClick.callCount).to.equal(13);
    wrapper.setProps({stones: 7});
    wrapper.find(Stone).forEach((node) => node.simulate('click'));
    expect(stoneClick.callCount).to.equal(20);
  });
});
