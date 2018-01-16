import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import Modal from '../../../src/components/util/Modal';

describe('<Modal />', () => {
  it('renders a div with the modal hide prop on click', () => {
    const fn = spy();
    const wrapper = shallow(<Modal close={fn} />);
    expect(wrapper.find('div')).to.have.length(1);

    wrapper.find('div').simulate('click', {target: 'this element', currentTarget: 'another element', stopPropagation: () => null});
    expect(fn.callCount).to.equal(0);

    wrapper.find('div').simulate('click', {target: 'this element', currentTarget: 'this element', stopPropagation: () => null});
    expect(fn.callCount).to.equal(1);
    expect(fn.firstCall.args[0]).to.equal(undefined);

    wrapper.setProps({
      closeOnClickAway: false
    });
    wrapper.find('div').simulate('click', {target: 'this element', currentTarget: 'this element', stopPropagation: () => null});
    expect(fn.callCount).to.equal(1);

    wrapper.setProps({
      visible: false
    });
    expect(wrapper.find('div')).to.have.length(0);
  });

  it('renders children', () => {
    const fn = spy();
    const wrapper = shallow(<Modal close={fn}><span>test</span><div>test2</div></Modal>);
    expect(wrapper.find('div').at(0).childAt(0).html()).to.equal('<span>test</span>');
    expect(wrapper.find('div').at(0).childAt(1).html()).to.equal('<div>test2</div>');
  });
});
