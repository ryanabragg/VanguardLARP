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
    wrapper.setProps({
      stones: [
        { color: 'blue', count: 1, disabled: 0 },
        { color: 'black', count: 1, disabled: 0 },
        { color: 'red', count: 2, disabled: 0 },
        { color: 'white', count: 9, disabled: 0 }
      ]
    });
    expect(wrapper.find(Stone)).to.have.length(13);
  });

  it('renders a Stone component with the props based on the passed stones prop', () => {
    const wrapper = shallow(<Stones stones={3}/>);
    expect(wrapper.find(Stone).find({color: undefined})).to.have.length(3);
    wrapper.setProps({
      stones: [
        { color: 'blue', count: 1, disabled: 0 },
        { color: 'black', count: 1, disabled: 1 },
        { color: 'red', count: 2, disabled: 1 },
        { color: 'white', count: 9, disabled: 3 }
      ]
    });
    expect(wrapper.find(Stone).find({color: 'blue'})).to.have.length(1);
    expect(wrapper.find(Stone).find({color: 'black'})).to.have.length(1);
    expect(wrapper.find(Stone).find({color: 'red'})).to.have.length(2);
    expect(wrapper.find(Stone).find({color: 'white'})).to.have.length(9);
    expect(wrapper.find(Stone).find({color: undefined})).to.have.length(0);
    expect(wrapper.find(Stone).find({disabled: true})).to.have.length(5);
    expect(wrapper.find(Stone).find({color: 'white', disabled: true})).to.have.length(3);
    expect(wrapper.find(Stone).find({color: 'white', disabled: false})).to.have.length(6);
  });

  it('passes the stoneClick prop to each child Stone', () => {
    const stoneClick = spy();
    const wrapper = mount(<Stones stones={3} stoneClick={stoneClick} />);
    wrapper.find(Stone).forEach((node) => {
      expect(node.prop('stoneClick')).to.equal(stoneClick);
    });
    wrapper.setProps({
      stones: [
        { color: 'blue', count: 1, disabled: 0 },
        { color: 'black', count: 1, disabled: 0 },
        { color: 'red', count: 2, disabled: 0 },
        { color: 'white', count: 9, disabled: 0 }
      ]
    });
    wrapper.find(Stone).forEach((node) => {
      expect(node.prop('stoneClick')).to.equal(stoneClick);
    });
  });
});
