import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';

import Racials from '../../../src/components/Character/Racials';
import Ability from '../../../src/components/Character/styled/Ability';
import AbilityGroup from '../../../src/components/Character/styled/AbilityGroup';
import Field from '../../../src/components/util/styled/Field';

describe('<Racials />', () => {
  it('renders an Ability or AbilityGroup per item in racials', () => {
    const view = spy(), update = spy();
    let list = [{
      _id: 1,
      name: 'lucky',
      category: '',
      group: '',
      race: 'cat',
      culture: 'kitten',
      count: 9
    }, {
      _id: 2,
      name: 'tail',
      category: '',
      group: '',
      race: 'cat',
      culture: '',
      count: 0
    }, {
      _id: 3,
      name: 'first',
      category: 'Option',
      group: '',
      race: 'cat',
      culture: '',
      count: 0
    }, {
      _id: 4,
      name: 'pounce',
      category: 'Choice',
      group: 'first',
      race: 'cat',
      culture: '',
      count: 0
    }, {
      _id: 5,
      name: 'purr',
      category: 'Choice',
      group: 'first',
      race: 'cat',
      culture: '',
      count: 0
    }, {
      _id: 6,
      name: 'second',
      category: 'Option',
      group: '',
      race: 'cat',
      culture: 'kitten',
      count: 1
    }, {
      _id: 7,
      name: 'tooth',
      category: 'Choice',
      group: 'second',
      race: 'cat',
      culture: '',
      count: 0
    }, {
      _id: 8,
      name: 'claw',
      category: 'Choice',
      group: 'second',
      race: 'cat',
      culture: '',
      count: 0
    }];
    const wrapper = shallow(<Racials viewDescription={view} editCharacter={update}/>);
    wrapper.setProps({racials: list});
    expect(wrapper.find(Ability)).to.have.length(0);
    expect(wrapper.find('label')).to.have.length(0);
    expect(wrapper.find(AbilityGroup)).to.have.length(0);

    wrapper.setProps({race: 'cat'});
    expect(wrapper.find(Ability)).to.have.length(0);
    expect(wrapper.find('label')).to.have.length(0);
    expect(wrapper.find(AbilityGroup)).to.have.length(0);
    list[1].count = 1;
    wrapper.setProps({racials: list});
    expect(wrapper.find(Ability)).to.have.length(1);
    expect(wrapper.find(Ability).prop('source')).to.equal('race');
    expect(wrapper.find('label')).to.have.length(0);
    expect(wrapper.find(AbilityGroup)).to.have.length(0);
    list[2].count = 1;
    wrapper.setProps({racials: list});
    expect(wrapper.find(Ability)).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find(AbilityGroup)).to.have.length(1);
    expect(wrapper.find(AbilityGroup).prop('source')).to.equal('race');
    expect(wrapper.find(AbilityGroup).prop('abilities')).to.deep.equal(list.filter(l => l.group == 'first'));
    list[3].count = 1;
    wrapper.setProps({racials: list});
    expect(wrapper.find(Ability)).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find(AbilityGroup)).to.have.length(1);

    wrapper.setProps({culture: 'kitten'});
    expect(wrapper.find(Ability)).to.have.length(2);
    expect(wrapper.find(Ability).at(0).prop('source')).to.equal('race');
    expect(wrapper.find(Ability).at(1).prop('source')).to.equal('culture');
    expect(wrapper.find('label')).to.have.length(2);
    expect(wrapper.find(AbilityGroup)).to.have.length(2);
    expect(wrapper.find(AbilityGroup).at(0).prop('source')).to.equal('race');
    expect(wrapper.find(AbilityGroup).at(1).prop('source')).to.equal('culture');
    expect(wrapper.find(AbilityGroup).at(1).prop('abilities')).to.deep.equal(list.filter(l => l.group == 'second'));
    list[5].count = 0;
    wrapper.setProps({racials: list});
    expect(wrapper.find(Ability)).to.have.length(2);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find(AbilityGroup)).to.have.length(1);
  });

  it('renders a prodigy div if the prodigy prop is true', () => {
    const view = spy(), update = spy();
    const wrapper = shallow(<Racials viewDescription={view} editCharacter={update}/>);
    expect(wrapper.find('div.prodigy')).to.have.length(0);
    wrapper.setProps({prodigy: true});
    expect(wrapper.find('div.prodigy')).to.have.length(1);
  });
});
