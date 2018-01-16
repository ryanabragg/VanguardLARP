import React from 'react';
import { ThemeProvider } from 'styled-components';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';

import Ability from '../../../src/components/Character/Ability';
import Button from '../../../src/components/util/styled/Button';
import ChevronUp from '../../../src/components/svg/icon/Chevron-Up';
import ChevronDown from '../../../src/components/svg/icon/Chevron-Down';
import CheckboxChecked from '../../../src/components/svg/icon/Checkbox-Checked';
import CheckboxUnchecked from '../../../src/components/svg/icon/Checkbox-Unchecked';

/* When using mount(), the ThemeProvider component
 * needs to be wrapped around Ability due to using styled Button.
 * However, this means setProps can't be used on the Ability component.
*/
import theme from '../../../src/components/theme';

describe('<Ability />', () => {
  it('renders labels for the count, uses, and name', () => {
    const view = spy(), edit = spy();
    const wrapper = shallow(<Ability id={42} viewDescription={view} editCharacter={edit} />);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('label').text()).to.equal('Ability Template');
    wrapper.setProps({count: 2, uses: 4, name: 'test'});
    expect(wrapper.find('label')).to.have.length(2);
    expect(wrapper.find('label').at(0).text()).to.equal('4');
    expect(wrapper.find('label').at(1).text()).to.equal('test');
    wrapper.setProps({max: 7});
    expect(wrapper.find('label')).to.have.length(3);
    expect(wrapper.find('label').at(0).text()).to.equal('2');
    expect(wrapper.find('label').at(1).text()).to.equal('4');
    expect(wrapper.find('label').at(2).text()).to.equal('test');
  });

  it('renders a span for the usesPer prop', () => {
    const view = spy(), edit = spy();
    const wrapper = shallow(<Ability id={42} viewDescription={view} editCharacter={edit} />);
    expect(wrapper.find('span')).to.have.length(0);
    wrapper.setProps({usesPer: 'test'});
    expect(wrapper.find('span')).to.have.length(0);
    wrapper.setProps({uses: 4});
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('span').text()).to.equal('test');
  });

  it('renders just a label with the name if display is false', () => {
    const view = spy(), edit = spy();
    const wrapper = shallow(<Ability id={42} display={false} viewDescription={view} editCharacter={edit} />);
    expect(wrapper.find('div.checkbox')).to.have.length(0);
    expect(wrapper.find('div.count')).to.have.length(0);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('label').text()).to.equal('Ability Template');
    expect(wrapper.text()).to.equal('Ability Template');
  });

  it('renders a checkbox button instead of a label for the count if max is 1', () => {
    const view = spy(), edit = spy();
    const wrapper = shallow(<Ability id={42} viewDescription={view} editCharacter={edit} />);
    expect(wrapper.find('div.checkbox')).to.have.length(1);
    expect(wrapper.find('div.count')).to.have.length(0);
    expect(wrapper.find('div.checkbox').find(CheckboxUnchecked)).to.have.length(1);
    expect(wrapper.find('div.checkbox').find(CheckboxChecked)).to.have.length(0);
    wrapper.setProps({count: 3});
    expect(wrapper.find('div.checkbox').find(CheckboxUnchecked)).to.have.length(0);
    expect(wrapper.find('div.checkbox').find(CheckboxChecked)).to.have.length(1);
    wrapper.setProps({max: 7});
    expect(wrapper.find('div.checkbox')).to.have.length(0);
    expect(wrapper.find('div.count')).to.have.length(1);
    expect(wrapper.find('div.count').find('label')).to.have.length(1);
    expect(wrapper.find('div.count').find('label').text()).to.equal('3');
  });

  it('displays letters for the count instead of a number for Craft skills', () => {
    const tiers = [
      {value: 0, label: '', short: '-'},
      {value: 1, label: 'Apprentice', short: 'A'},
      {value: 2, label: 'Journeyman', short: 'J'},
      {value: 3, label: 'Craftsman', short: 'C'},
      {value: 4, label: 'Master', short: 'M'},
      {value: 5, label: 'Grandmaster', short: 'G'},
    ];
    const view = spy(), edit = spy();
    const wrapper = shallow(<Ability id={42} category='Craft' max={5} viewDescription={view} editCharacter={edit} />);
    expect(wrapper.find('div.count').find('label').text()).to.equal(tiers[0].short);
    wrapper.setProps({count: 1});
    expect(wrapper.find('div.count').find('label').text()).to.equal(tiers[1].short);
    wrapper.setProps({count: 2});
    expect(wrapper.find('div.count').find('label').text()).to.equal(tiers[2].short);
    wrapper.setProps({count: 3});
    expect(wrapper.find('div.count').find('label').text()).to.equal(tiers[3].short);
    wrapper.setProps({count: 4});
    expect(wrapper.find('div.count').find('label').text()).to.equal(tiers[4].short);
    wrapper.setProps({count: 5});
    expect(wrapper.find('div.count').find('label').text()).to.equal(tiers[5].short);
  });

  it('renders controls for increment and decrement of the count', () => {
    const view = spy(), edit = spy();
    let wrapper = mount(
      <ThemeProvider theme={theme}>
        <Ability id={42} viewDescription={view} editCharacter={edit}/>
      </ThemeProvider>
    );
    expect(wrapper.find('div.controls')).to.have.length(1);
    expect(wrapper.find(Button)).to.have.length(2);
    expect(wrapper.find(Button).at(0).children()).to.have.length(1);
    expect(wrapper.find(Button).at(0).find(ChevronUp)).to.have.length(1);
    expect(wrapper.find(Button).at(1).children()).to.have.length(1);
    expect(wrapper.find(Button).at(1).find(ChevronDown)).to.have.length(1);
    expect(wrapper.find('div.show')).to.have.length(0);
    expect(wrapper.find('div.click-overlay')).to.have.length(0);

    //checkbox mode
    wrapper.find('div.checkbox').simulate('click');
    expect(edit.getCall(0).args[0]).to.deep.equal({type: 'SKILL', data: { id: 42, count: 1, source: 'build' }});
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <Ability id={42} count={1} viewDescription={view} editCharacter={edit}/>
      </ThemeProvider>
    );
    wrapper.find('div.checkbox').simulate('click');
    expect(edit.getCall(1).args[0]).to.deep.equal({type: 'SKILL', data: { id: 42, count: 0, source: 'build' }});

    wrapper = mount(
      <ThemeProvider theme={theme}>
        <Ability id={42} max={2} count={0} viewDescription={view} editCharacter={edit}/>
      </ThemeProvider>
    );
    //count mode
    expect(wrapper.find(Button).at(0).prop('disabled')).to.equal(false);
    expect(wrapper.find(Button).at(1).prop('disabled')).to.equal(true);
    wrapper.find(Button).at(0).simulate('click');
    expect(edit.getCall(2).args[0]).to.deep.equal({type: 'SKILL INCREMENT', data: { id: 42, source: 'build' }});
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <Ability id={42} max={2} count={1} source='test' viewDescription={view} editCharacter={edit}/>
      </ThemeProvider>
    );
    expect(wrapper.find(Button).at(0).prop('disabled')).to.equal(false);
    expect(wrapper.find(Button).at(1).prop('disabled')).to.equal(false);
    wrapper.find(Button).at(0).simulate('click');
    expect(edit.getCall(3).args[0]).to.deep.equal({type: 'SKILL INCREMENT', data: { id: 42, source: 'test' }});
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <Ability id={42} max={2} min={1} count={1} source='test' viewDescription={view} editCharacter={edit}/>
      </ThemeProvider>
    );
    expect(wrapper.find(Button).at(0).prop('disabled')).to.equal(false);
    expect(wrapper.find(Button).at(1).prop('disabled')).to.equal(true);
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <Ability id={42} max={2} count={2} source='test' viewDescription={view} editCharacter={edit}/>
      </ThemeProvider>
    );
    expect(wrapper.find(Button).at(0).prop('disabled')).to.equal(true);
    expect(wrapper.find(Button).at(1).prop('disabled')).to.equal(false);
    wrapper.find(Button).at(1).simulate('click');
    expect(edit.getCall(4).args[0]).to.deep.equal({type: 'SKILL DECREMENT', data: { id: 42, source: 'test' }});
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <Ability id={42} max={2} count={1} viewDescription={view} editCharacter={edit}/>
      </ThemeProvider>
    );
    expect(wrapper.find(Button).at(0).prop('disabled')).to.equal(false);
    expect(wrapper.find(Button).at(1).prop('disabled')).to.equal(false);
    wrapper.find(Button).at(1).simulate('click');
    expect(edit.getCall(5).args[0]).to.deep.equal({type: 'SKILL DECREMENT', data: { id: 42, source: 'build' }});
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <Ability id={42} max={2} count={0} source='test' viewDescription={view} editCharacter={edit}/>
      </ThemeProvider>
    );
    expect(wrapper.find(Button).at(0).prop('disabled')).to.equal(false);
    expect(wrapper.find(Button).at(1).prop('disabled')).to.equal(true);
  });

  it('calls the viewDescription prop when the name is clicked', () => {
    const view = spy(), edit = spy();
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Ability id={42} viewDescription={view} editCharacter={edit}/>
      </ThemeProvider>
    );
    wrapper.find('label').simulate('click');
    expect(view.calledOnce).to.equal(true);
    expect(view.getCall(0).args[0]).to.equal(42);
  });
});
