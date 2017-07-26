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
  it('renders a div', () => {
    const wrapper = shallow(<Stone />);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('renders a div with className prop of "{color prop value} stone"', () => {
    expect(shallow(<Stone />).find('div').prop('className')).to.equal('stone');
    expect(shallow(<Stone color='test' />).find('div').prop('className')).to.equal('test stone');
  });

  it('adds "disabled" to the className prop if the disabled prop is true', () => {
    expect(shallow(<Stone />).find('div').prop('className')).to.equal('stone');
    expect(shallow(<Stone disabled={true} />).find('div').prop('className')).to.equal('stone disabled');
  });

  it('has a text value based on the color and colorLetters props', () => {
    expect(shallow(<Stone />).text()).to.equal('');
    expect(shallow(<Stone color='black' />).text()).to.equal('B');
    expect(shallow(<Stone color='blue' />).text()).to.equal('U');
    expect(shallow(<Stone color='red' />).text()).to.equal('R');
    expect(shallow(<Stone color='white' />).text()).to.equal('W');
    expect(shallow(<Stone color='rainbow' />).text()).to.equal('');
    expect(shallow(<Stone color='rainbow' colorLetters={{rainbow: 'unicorn'}} />).text()).to.equal('unicorn');
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
    wrapper.find('div').simulate('click');
    expect(stoneClick.firstCall.args.length).to.equal(1);
    expect(stoneClick.firstCall.args[0]).to.deep.equal({type: 'DISABLE STONE', data: undefined});
    wrapper.setProps({
      color: 'blue',
      disabled: true
    });
    wrapper.find('div').simulate('click');
    expect(stoneClick.secondCall.args[0]).to.deep.equal({type: 'ENABLE STONE', data: 'blue'});
  });
});
