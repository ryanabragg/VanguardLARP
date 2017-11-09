import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import Levels from '../../../src/components/Character/Levels';

import IconMoreVertical from '../../../src/components/svg/IconMoreVertical';

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

describe('<Levels />', () => {
  it('shows a label with a warning for non-qualification based on props', () => {
    const edit = spy();
    const wrapper = shallow(<Levels editCharacter={edit} />);
    expect(wrapper.find('.T1')).to.have.length(1);
    expect(wrapper.find('.T1').text()).to.equal('Level 5 needed for tier one.');
    expect(wrapper.find('.T2')).to.have.length(1);
    expect(wrapper.find('.T2').text()).to.equal('Level 10 needed for tier two.');
    expect(wrapper.find('.T3')).to.have.length(1);
    expect(wrapper.find('.T3').text()).to.equal('Level 15 needed for tier three.');
    wrapper.setProps({ level: 42 });
    expect(wrapper.find('.T1')).to.have.length(1);
    expect(wrapper.find('.T1').text()).to.equal('Insufficient non-domain build for tier one.');
    expect(wrapper.find('.T2')).to.have.length(1);
    expect(wrapper.find('.T2').text()).to.equal('Insufficient non-domain build for tier two.');
    expect(wrapper.find('.T3')).to.have.length(1);
    expect(wrapper.find('.T3').text()).to.equal('Insufficient non-domain build for tier three.');
    wrapper.setProps({ T1: true });
    expect(wrapper.find('.T1')).to.have.length(0);
    expect(wrapper.find('.T2')).to.have.length(1);
    expect(wrapper.find('.T3')).to.have.length(1);
    wrapper.setProps({ T2: true });
    expect(wrapper.find('.T1')).to.have.length(0);
    expect(wrapper.find('.T2')).to.have.length(0);
    expect(wrapper.find('.T3')).to.have.length(1);
    wrapper.setProps({ T3: true });
    expect(wrapper.find('.T1')).to.have.length(0);
    expect(wrapper.find('.T2')).to.have.length(0);
    expect(wrapper.find('.T3')).to.have.length(0);
  });

  it('renders a label and select for each interval between 1 to level', () => {
    const edit = spy();
    const wrapper = shallow(<Levels editCharacter={edit} />);
    const list = [{
      _id: 42,
      name: 'test',
      tier: 2
    }, {
      _id: 7,
      name: 'lucky',
      tier: 1,
      display: 'checkbox',
      count: 11
    }, {
      _id: 0,
      name: 'choice',
      tier: 1,
      display: 'tiers',
      count: 1
    }, {
      _id: 0,
      name: 'angels',
      tier: 3,
      display: 'host',
      count: 1
    }, {
      _id: 0,
      name: 'demons',
      tier: 3,
      display: 'legion',
      count: 1
    }];
    let known = [{
      id: '42',
      level: 6,
      name: 'test'
    }];
    let props = {
      level: 10,
      interval: 3,
      domains: list,
      T1: true,
      T2: true,
      T3: true,
      known: known
    };
    wrapper.setProps(props);
    expect(wrapper.find('.level')).to.have.length(Math.floor(props.level / props.interval));
    wrapper.find('.level').forEach((node, i) => {
      expect(node.find('label').text()).to.equal(`Level ${props.interval * (i + 1)}`);
      if(known[0].level == props.interval * (i + 1))
        expect(node.find('select').prop('value')).to.equal(known[0].id);
    });
  });

  it('includes the domains by tier in each select based on T1, T2, and T3', () => {
    const edit = spy();
    const wrapper = shallow(<Levels editCharacter={edit} />);
    const list = [{
      _id: 42,
      name: 'test',
      tier: 2,
      group: 'one'
    }, {
      _id: 7,
      name: 'lucky',
      tier: 1,
      display: 'checkbox',
      count: 11,
      group: 'one'
    }, {
      _id: 10,
      name: 'choice',
      tier: 1,
      display: 'tiers',
      count: 1,
      group: 'one'
    }, {
      _id: 20,
      name: 'angels',
      tier: 3,
      display: 'host',
      count: 1,
      group: 'one'
    }, {
      _id: 30,
      name: 'demons',
      tier: 3,
      display: 'legion',
      count: 1,
      group: 'one'
    }];
    let known = [{
      id: '42',
      level: 6,
      name: 'test'
    }];
    let props = {
      level: 1,
      interval: 3,
      domains: list,
      known: known
    };
    wrapper.setProps(props);
    expect(wrapper.find('.level')).to.have.length(0);
    expect(wrapper.find('option')).to.have.length(0);
    wrapper.setProps({level: 3});
    expect(wrapper.find('.level')).to.have.length(1);
    wrapper.find('.level').forEach((node, i) => {
      expect(node.find('option')).to.have.length(4);
      expect(node.find('option').at(0).text()).to.equal('');
      expect(node.find('option').at(1).text()).to.equal('─ one Tier 1');
      expect(node.find('option').at(2).text()).to.equal('choice');
      expect(node.find('option').at(3).text()).to.equal('lucky');
    });
    wrapper.setProps({level: 7});
    expect(wrapper.find('.level')).to.have.length(2);
    wrapper.find('.level').forEach((node, i) => {
      if(i == 0) {
        expect(node.find('option')).to.have.length(4);
        expect(node.find('option').at(0).text()).to.equal('');
        expect(node.find('option').at(1).text()).to.equal('─ one Tier 1');
        expect(node.find('option').at(2).text()).to.equal('choice');
        expect(node.find('option').at(3).text()).to.equal('lucky');
      }
      if(i == 1) {
        expect(node.find('option')).to.have.length(6);
        expect(node.find('option').at(0).text()).to.equal('');
        expect(node.find('option').at(1).text()).to.equal('─ one Tier 1');
        expect(node.find('option').at(2).text()).to.equal('choice');
        expect(node.find('option').at(3).text()).to.equal('lucky');
        expect(node.find('option').at(4).text()).to.equal('─ one Tier 2');
        expect(node.find('option').at(5).text()).to.equal('test');
      }
    });
    wrapper.setProps({level: 10});
    expect(wrapper.find('.level')).to.have.length(3);
    wrapper.find('.level').forEach((node, i) => {
      if(i == 0) {
        expect(node.find('option')).to.have.length(4);
        expect(node.find('option').at(0).text()).to.equal('');
        expect(node.find('option').at(1).text()).to.equal('─ one Tier 1');
        expect(node.find('option').at(2).text()).to.equal('choice');
        expect(node.find('option').at(3).text()).to.equal('lucky');
      }
      if(i == 1) {
        expect(node.find('option')).to.have.length(6);
        expect(node.find('option').at(0).text()).to.equal('');
        expect(node.find('option').at(1).text()).to.equal('─ one Tier 1');
        expect(node.find('option').at(2).text()).to.equal('choice');
        expect(node.find('option').at(3).text()).to.equal('lucky');
        expect(node.find('option').at(4).text()).to.equal('─ one Tier 2');
        expect(node.find('option').at(5).text()).to.equal('test');
      }
      if(i == 2) {
        expect(node.find('option')).to.have.length(9);
        expect(node.find('option').at(0).text()).to.equal('');
        expect(node.find('option').at(1).text()).to.equal('─ one Tier 1');
        expect(node.find('option').at(2).text()).to.equal('choice');
        expect(node.find('option').at(3).text()).to.equal('lucky');
        expect(node.find('option').at(4).text()).to.equal('─ one Tier 2');
        expect(node.find('option').at(5).text()).to.equal('test');
        expect(node.find('option').at(6).text()).to.equal('─ one Tier 3');
        expect(node.find('option').at(7).text()).to.equal('angels');
        expect(node.find('option').at(8).text()).to.equal('demons');
      }
    });
  });

  it('performs the editCharacter method when a dropdown is changed', () => {
    const edit = spy();
    const wrapper = shallow(<Levels editCharacter={edit} />);
    const list = [{
      _id: 42,
      name: 'test',
      tier: 2,
      group: 'one'
    }, {
      _id: 7,
      name: 'lucky',
      tier: 1,
      display: 'checkbox',
      count: 11,
      group: 'one'
    }, {
      _id: 10,
      name: 'choice',
      tier: 1,
      display: 'tiers',
      count: 1,
      group: 'one'
    }, {
      _id: 20,
      name: 'angels',
      tier: 3,
      display: 'host',
      count: 1,
      group: 'one'
    }, {
      _id: 30,
      name: 'demons',
      tier: 3,
      display: 'legion',
      count: 1,
      group: 'one'
    }];
    let known = [{
      id: '42',
      level: 6,
      name: 'test'
    }];
    let props = {
      level: 10,
      interval: 3,
      domains: list,
      known: known
    };
    wrapper.setProps(props);
    wrapper.find('.level').at(2).find('select').simulate('change', {target: {name: '9', value: '20'}, preventDefault: () => {}});
    expect(edit.firstCall.args[0]).to.deep.equal({type: 'SKILL', data: { id: '20', count: 1, source: 9 }});
    known = [{
      id: '42',
      level: 6,
      name: 'test'
    }, {
      id: '20',
      level: 9,
      name: 'angels'
    }];
    wrapper.setProps({known: known});
    edit.reset();
    wrapper.find('.level').at(2).find('select').simulate('change', {target: {name: '9', value: '10'}, preventDefault: () => {}});
    expect(edit.firstCall.args[0]).to.deep.equal({type: 'SKILL', data: { id: '20', count: 0, source: 9 }});
    expect(edit.secondCall.args[0]).to.deep.equal({type: 'SKILL', data: { id: '10', count: 1, source: 9 }});
  });
});
