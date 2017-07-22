import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Field from '../../../src/components/Admin/Field';

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
  it('renders a div with props and text', () => {
    const onClick = spy();
    const wrapper = shallow(<Field name='test' />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').prop('name')).to.equal('test');
    expect(wrapper.find('div').text()).to.equal('test');
    wrapper.setProps({name: 'testing', id: 42, text: 'meaning', onClick: onClick});
    expect(wrapper.find('div').prop('name')).to.equal('testing');
    expect(wrapper.find('div').prop('id')).to.equal(42);
    expect(wrapper.find('div').text()).to.equal('meaning');
    expect(wrapper.find('div').prop('onClick')).to.equal(onClick);
  });
});
