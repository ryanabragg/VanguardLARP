import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Box from '../../../src/components/Character/Box';

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

describe('<Box />', () => {

  it('renders a label and children', () => {
    const wrapper = shallow(<Box label='boxed'><span>testing</span></Box>);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('label').prop('className')).to.equal('floating');
    expect(wrapper.find('label').text()).to.equal('boxed');
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('span').text()).to.equal('testing');
  });
});
