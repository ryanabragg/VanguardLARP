import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Button from '../../../src/components/util/Button';

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

describe('<Button />', () => {

  it('renders a div button', () => {
    const fn = spy();
    const wrapper = shallow(<Button callback={fn} />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').prop('role')).to.equal('button');
    expect(wrapper.find('div').prop('tabIndex')).to.equal('0');

    expect(wrapper.find('div').prop('aria-label')).to.equal('');
    expect(wrapper.find('div').children()).to.have.length(0);
    expect(wrapper.find('div').text()).to.equal('');

    wrapper.setProps({label: 'test'});
    expect(wrapper.find('div').prop('aria-label')).to.equal('test');
    expect(wrapper.find('div').children()).to.have.length(1);
    expect(wrapper.find('div').childAt(0).text()).to.equal('test');

    wrapper.find('div').simulate('click', {target: 'button', stopPropagation: () => null});
    expect(fn.callCount).to.equal(1);
    expect(fn.firstCall.args[0]).to.equal(undefined);
  });

  it('renders children', () => {
    const fn = spy();
    const wrapper = shallow(<Button callback={fn}><span>test</span></Button>);
    expect(wrapper.find('div').prop('aria-label')).to.equal('');
    expect(wrapper.find('div').childAt(0).html()).to.equal('<span>test</span>');

    wrapper.setProps({label: 'test'});
    expect(wrapper.find('div').prop('aria-label')).to.equal('test');
    expect(wrapper.find('div').childAt(0).html()).to.equal('<span>test</span>');
  });
});
