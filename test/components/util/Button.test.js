import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import Button from '../../../src/components/util/Button';

import { Link } from 'react-router-dom';
import Icon from '../../../src/components/svg/icon/X';

describe('<Button />', () => {
  it('renders a button', () => {
    const fn = spy();
    const wrapper = shallow(<Button callback={fn} />);
    expect(wrapper.find('button')).to.have.length(1);

    expect(wrapper.find('button').prop('aria-label')).to.equal('');
    expect(wrapper.find('button').children()).to.have.length(0);
    expect(wrapper.find('button').text()).to.equal('');

    wrapper.setProps({label: 'test'});
    expect(wrapper.find('button').prop('aria-label')).to.equal('test');

    wrapper.find('button').simulate('click', {target: 'button', stopPropagation: () => null});
    expect(fn.callCount).to.equal(1);
    expect(fn.firstCall.args[0]).to.equal(undefined);
  });

  it('renders an icon', () => {
    const fn = spy();
    const wrapper = shallow(<Button icon={<Icon />} />);
    expect(wrapper.find('button').find('span[data-button="icon"]').find(Icon)).to.have.length(1);

    wrapper.setProps({link: '/test'});
    expect(wrapper.find('button').find('span[data-button="icon"]').find(Link)).to.have.length(1);
    expect(wrapper.find(Link).props().to).to.equal('/test');
  });

  it('renders children', () => {
    const fn = spy();
    const wrapper = shallow(<Button><span>test</span></Button>);
    expect(wrapper.find('button').childAt(0).html()).to.equal('<span data-button="content"><span>test</span></span>');

    wrapper.setProps({link: '/test'});
    expect(wrapper.find('button').find('span[data-button="content"]').find(Link)).to.have.length(1);
    expect(wrapper.find(Link).props().to).to.equal('/test');
  });
});
