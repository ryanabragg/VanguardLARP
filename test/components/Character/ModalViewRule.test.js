import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import ModalViewRule from '../../../src/components/Character/ModalViewRule';

import Modal from '../../../src/components/util/styled/Modal';
import Button from '../../../src/components/util/styled/Button';
import X from '../../../src/components/svg/icon/X';

describe('<ModalViewRule />', () => {
  it('renders Modal containing the rule information', () => {
    const fn = spy();
    const wrapper = shallow(<ModalViewRule close={fn} />);
    expect(wrapper.find(Modal)).to.have.length(1);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal('default');
    expect(wrapper.find('article').find('p').text()).to.equal('default');
    expect(wrapper.find('main').text()).to.equal('default');
    expect(wrapper.find(Button)).to.have.length(1);
    expect(wrapper.find(Button).prop('callback')).to.equal(fn);
    expect(wrapper.find(Button).find(X)).to.have.length(1);

    let rule = {
      name: '1',
      category: '2',
      group: '3',
      tier: '4',
      race: '5',
      culture: '6',
      effect: '7',
      delivery: '8',
      verbal: '9',
      uses: '10',
      usesExtra: '11',
      usesPerXAptitudes: '12',
      usesType: '13',
      description: '14\n15'
    };
    wrapper.setProps({
      rule: rule
    });
    expect(wrapper.find('h1').text()).to.equal('1');
    expect(wrapper.find('.category').text()).to.equal('2: 3 (Tier 4)');
    expect(wrapper.find('.race').text()).to.equal('Race: 5 (6)');
    expect(wrapper.find('.effect').text()).to.equal('7');
    expect(wrapper.find('.delivery').text()).to.equal('Delivery: 8');
    expect(wrapper.find('.verbal').text()).to.equal('Verbal: "9"');
    expect(wrapper.find('.uses').text()).to.equal('Uses: 10 + 11 per 12 Combat Aptitudes 13');
    expect(wrapper.find('main').html()).to.equal('<main class="description"><p>14</p><p>15</p></main>');

    rule.group = 'Burn';
    wrapper.setProps({
      rule: rule
    });
    expect(wrapper.find('.category').text()).to.equal('2: Burn (Tier 4)');
    expect(wrapper.find('.uses').text()).to.equal('Uses: 10 + 11 per 12 Aptitudes 13');

    rule.build = 5;
    rule.buildBase = 10;
    wrapper.setProps({
      rule: rule
    });
    expect(wrapper.find('h1').text()).to.equal('1 (5 Build)');
    rule.count = 5;
    wrapper.setProps({
      rule: rule
    });
    expect(wrapper.find('h1').text()).to.equal('1 (5 Build)');
    rule.category = 'Craft'
    wrapper.setProps({
      rule: rule
    });
    expect(wrapper.find('h1').text()).to.equal('1 (10 Build)');
    rule.count = 4;
    wrapper.setProps({
      rule: rule
    });
    expect(wrapper.find('h1').text()).to.equal('1 (10 Build)');
    rule.count = 3;
    wrapper.setProps({
      rule: rule
    });
    expect(wrapper.find('h1').text()).to.equal('1 (5 Build)');
  });
});
