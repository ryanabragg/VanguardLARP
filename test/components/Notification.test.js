import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Notification from '../../src/components/Notification';

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

describe('<Notification />', () => {

  it('renders a div containing the message prop', () => {
    const dismiss = spy();
    const wrapper = shallow(<Notification id='42' message='meaning' dismiss={dismiss} />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').text()).to.equal('meaning');
  });

  it('passes the type prop to the div className', () => {
    const dismiss = spy();
    const wrapper = shallow(<Notification id='42' message='meaning' dismiss={dismiss} />);
    expect(wrapper.find('div').prop('className')).to.equal('info');
    wrapper.setProps({
      type: 'success'
    });
    expect(wrapper.find('div').prop('className')).to.equal('success');
  });

  it('includes a span for the title prop', () => {
    const dismiss = spy();
    const wrapper = shallow(<Notification id='42' message='meaning' dismiss={dismiss} />);
    expect(wrapper.find('span')).to.have.length(0);
    wrapper.setProps({
      title: 'success'
    });
    expect(wrapper.find('span').prop('className')).to.equal('title');
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('span').text()).to.equal('success');
  });

  it('includes a span for the action prop', () => {
    const dismiss = spy(), action = spy();
    const wrapper = shallow(<Notification id='42' message='meaning' dismiss={dismiss} />);
    expect(wrapper.find('span')).to.have.length(0);
    wrapper.setProps({
      action: 'do',
      actionFunction: (param) => action(param)
    });
    expect(wrapper.find('span').prop('className')).to.equal('action');
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('span').text()).to.equal('do');
  });

  it('calls the actionFunction callback with actionParam as a parameter when the action span is clicked', () => {
    const dismiss = spy(), action = spy();
    const wrapper = shallow(<Notification id='42' message='meaning' dismiss={dismiss} />);
    wrapper.setProps({
      action: 'do',
      actionFunction: (param) => action(param),
      actionParam: 42
    });
    expect(action.callCount).to.equal(0);
    wrapper.find('span').forEach((node) => node.simulate('click'));
    expect(action.callCount).to.equal(1);
    expect(action.calledWith(42)).to.equal(true);
  });

  it('calls the dismiss callback after the action callback', () => {
    const dismiss = spy(), action = spy();
    const wrapper = shallow(<Notification id='42' message='meaning' dismiss={dismiss} />);
    wrapper.setProps({
      action: 'do',
      actionFunction: (param) => action(param),
      actionParam: 42
    });
    expect(dismiss.callCount).to.equal(0);
    wrapper.find('span').forEach((node) => node.simulate('click'));
    expect(dismiss.callCount).to.equal(1);
  });

  it('does not call the timeoutFunction callback when the action span is clicked', () => {
    const dismiss = spy(), action = spy(), timeout = spy();
    const wrapper = shallow(<Notification id='42' message='meaning' dismiss={dismiss} />);
    wrapper.setProps({
      action: 'do',
      actionFunction: (param) => action(param),
      actionParam: 42,
      timeoutFunction: () => timeout()
    });
    expect(timeout.callCount).to.equal(0);
    wrapper.find('span').forEach((node) => node.simulate('click'));
    expect(timeout.callCount).to.equal(0);
  });

  it('includes a span for the dismiss button if the showDismiss prop is true', () => {
    const dismiss = spy();
    const wrapper = shallow(<Notification id='42' message='meaning' dismiss={dismiss} />);
    expect(wrapper.find('span')).to.have.length(0);
    wrapper.setProps({
      showDismiss: true
    });
    expect(wrapper.find('span').prop('className')).to.equal('dismiss');
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('span').text()).to.equal('DISMISS');
  });

  it('customizes the dismiss button text if the showDismiss prop is a string', () => {
    const dismiss = spy();
    const wrapper = shallow(<Notification id='42' message='meaning' dismiss={dismiss} />);
    expect(wrapper.find('span')).to.have.length(0);
    wrapper.setProps({
      showDismiss: 'true'
    });
    expect(wrapper.find('span').prop('className')).to.equal('dismiss');
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('span').text()).to.equal('true');
  });

  it('includes the dismiss button if the showDismiss prop is false but timeoutDuration is <= 0', () => {
    const dismiss = spy();
    const wrapper = shallow(<Notification id='42' message='meaning' dismiss={dismiss} />);
    expect(wrapper.find('span')).to.have.length(0);
    wrapper.setProps({
      showDismiss: false,
      timeoutDuration: 0
    });
    expect(wrapper.find('span').prop('className')).to.equal('dismiss');
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('span').text()).to.equal('DISMISS');
    wrapper.setProps({
      showDismiss: false,
      timeoutDuration: -42
    });
    expect(wrapper.find('span').prop('className')).to.equal('dismiss');
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('span').text()).to.equal('DISMISS');
  });

  it('sets a timeout calling the dismiss callback after timeoutDuration miliseconds');

  it('does not set a timeout if the timeoutDuration is 0 or negative');

  it('calls the timeoutFunction when the timeout expires');
});
