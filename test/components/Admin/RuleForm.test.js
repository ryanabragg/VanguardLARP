import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import RuleForm from '../../../src/components/Admin/RuleForm';
import FormField from '../../../src/components/Admin/FormField';

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

describe('<RuleForm />', () => {
  it('renders a form with seven fieldsets holding eighteen FormField components and three buttons', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<RuleForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('form').prop('id')).to.equal('42');
    expect(wrapper.find('form').prop('name')).to.equal('rule');
    expect(wrapper.find('form').children()).to.have.length(10);
    expect(wrapper.find('fieldset')).to.have.length(7);
    expect(wrapper.find('button')).to.have.length(3);
    expect(wrapper.find(FormField)).to.have.length(18);
  });

  it('has a button for submit, cancel, and delete', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<RuleForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);
    expect(wrapper.find('button')).to.have.length(3);
    expect(wrapper.find('button').at(0).prop('type')).to.equal('button');
    expect(wrapper.find('button').at(0).prop('value')).to.equal('submit');
    expect(wrapper.find('button').at(0).prop('onClick')).to.equal(onSubmit);
    expect(wrapper.find('button').at(0).text()).to.equal('Update');
    expect(wrapper.find('button').at(1).prop('type')).to.equal('button');
    expect(wrapper.find('button').at(1).prop('value')).to.equal('cancel');
    expect(wrapper.find('button').at(1).prop('onClick')).to.equal(onCancel);
    expect(wrapper.find('button').at(1).text()).to.equal('Cancel');
    expect(wrapper.find('button').at(2).prop('type')).to.equal('button');
    expect(wrapper.find('button').at(2).prop('value')).to.equal('delete');
    expect(wrapper.find('button').at(2).prop('onClick')).to.equal(onDelete);
    expect(wrapper.find('button').at(2).text()).to.equal('Delete');
  });

  it('does not include the delete button if id="new"', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<RuleForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);
    expect(wrapper.find('button')).to.have.length(3);
    wrapper.setProps({
      id: 'new'
    });
    expect(wrapper.find('button')).to.have.length(2);
    expect(wrapper.find('button').at(0).prop('type')).to.equal('button');
    expect(wrapper.find('button').at(0).prop('value')).to.equal('submit');
    expect(wrapper.find('button').at(0).prop('onClick')).to.equal(onSubmit);
    expect(wrapper.find('button').at(0).text()).to.equal('Create');
    expect(wrapper.find('button').at(1).prop('type')).to.equal('button');
    expect(wrapper.find('button').at(1).prop('value')).to.equal('cancel');
    expect(wrapper.find('button').at(1).prop('onClick')).to.equal(onCancel);
    expect(wrapper.find('button').at(1).text()).to.equal('Cancel');
  });

  it('has one fieldset with className "description" having one FormField of type textarea', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<RuleForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);
    expect(wrapper.find('fieldset').find('.description')).to.have.length(1);
    expect(wrapper.find('fieldset').find('.description').find(FormField)).to.have.length(1);
    expect(wrapper.find('fieldset').find('.description').find(FormField).prop('type')).to.equal('textarea');
  });

  it('renders the FormField components with the propper props', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<RuleForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);

    wrapper.setProps({
      name: 'Dog',
      build: 5,
      delivery: 'pounce',
      tags: 2,
      category: 'pet',
      group: 'cat',
      tier: '3',
      race: 'feline',
      culture: 'hunter',
      prodigy: '1',
      description: 'lazy',
      max: 1,
      extraUses: 'entertainment',
      requires: 'food',
      requeresAny: 'attention',
      conflicts: 'laser pointer',
      replaces: 'master',
      grants: 'purring'
    });

    expect(wrapper.find(FormField).at(0).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(0).prop('name')).to.equal('name');
    expect(wrapper.find(FormField).at(0).prop('label')).to.equal('Name');
    expect(wrapper.find(FormField).at(0).prop('value')).to.equal('Dog');
    expect(wrapper.find(FormField).at(0).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(1).prop('type')).to.equal('number');
    expect(wrapper.find(FormField).at(1).prop('name')).to.equal('build');
    expect(wrapper.find(FormField).at(1).prop('label')).to.equal('Build');
    expect(wrapper.find(FormField).at(1).prop('value')).to.equal(5);
    expect(wrapper.find(FormField).at(1).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(2).prop('type')).to.equal('number');
    expect(wrapper.find(FormField).at(2).prop('name')).to.equal('max');
    expect(wrapper.find(FormField).at(2).prop('label')).to.equal('Max');
    expect(wrapper.find(FormField).at(2).prop('value')).to.equal(1);
    expect(wrapper.find(FormField).at(2).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(3).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(3).prop('name')).to.equal('delivery');
    expect(wrapper.find(FormField).at(3).prop('label')).to.equal('Delivery');
    expect(wrapper.find(FormField).at(3).prop('value')).to.equal('pounce');
    expect(wrapper.find(FormField).at(3).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(4).prop('type')).to.equal('number');
    expect(wrapper.find(FormField).at(4).prop('name')).to.equal('tags');
    expect(wrapper.find(FormField).at(4).prop('label')).to.equal('Tags');
    expect(wrapper.find(FormField).at(4).prop('value')).to.equal(2);
    expect(wrapper.find(FormField).at(4).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(5).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(5).prop('name')).to.equal('category');
    expect(wrapper.find(FormField).at(5).prop('label')).to.equal('Category');
    expect(wrapper.find(FormField).at(5).prop('value')).to.equal('pet');
    expect(wrapper.find(FormField).at(5).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(6).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(6).prop('name')).to.equal('group');
    expect(wrapper.find(FormField).at(6).prop('label')).to.equal('Group');
    expect(wrapper.find(FormField).at(6).prop('value')).to.equal('cat');
    expect(wrapper.find(FormField).at(6).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(7).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(7).prop('name')).to.equal('tier');
    expect(wrapper.find(FormField).at(7).prop('label')).to.equal('Tier');
    expect(wrapper.find(FormField).at(7).prop('value')).to.equal('3');
    expect(wrapper.find(FormField).at(7).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(8).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(8).prop('name')).to.equal('race');
    expect(wrapper.find(FormField).at(8).prop('label')).to.equal('Race');
    expect(wrapper.find(FormField).at(8).prop('value')).to.equal('feline');
    expect(wrapper.find(FormField).at(8).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(9).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(9).prop('name')).to.equal('culture');
    expect(wrapper.find(FormField).at(9).prop('label')).to.equal('Culture');
    expect(wrapper.find(FormField).at(9).prop('value')).to.equal('hunter');
    expect(wrapper.find(FormField).at(9).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(10).prop('type')).to.equal('checkbox');
    expect(wrapper.find(FormField).at(10).prop('name')).to.equal('prodigy');
    expect(wrapper.find(FormField).at(10).prop('label')).to.equal('Prodigy');
    expect(wrapper.find(FormField).at(10).prop('value')).to.equal('1');
    expect(wrapper.find(FormField).at(10).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(11).prop('type')).to.equal('textarea');
    expect(wrapper.find(FormField).at(11).prop('name')).to.equal('description');
    expect(wrapper.find(FormField).at(11).prop('label')).to.equal('Description');
    expect(wrapper.find(FormField).at(11).prop('value')).to.equal('lazy');
    expect(wrapper.find(FormField).at(11).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(12).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(12).prop('name')).to.equal('requires');
    expect(wrapper.find(FormField).at(12).prop('label')).to.equal('Requires');
    expect(wrapper.find(FormField).at(12).prop('value')).to.equal('food');
    expect(wrapper.find(FormField).at(12).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(13).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(13).prop('name')).to.equal('requeresAny');
    expect(wrapper.find(FormField).at(13).prop('label')).to.equal('Requires Any Of');
    expect(wrapper.find(FormField).at(13).prop('value')).to.equal('attention');
    expect(wrapper.find(FormField).at(13).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(14).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(14).prop('name')).to.equal('conflicts');
    expect(wrapper.find(FormField).at(14).prop('label')).to.equal('Conflicts With');
    expect(wrapper.find(FormField).at(14).prop('value')).to.equal('laser pointer');
    expect(wrapper.find(FormField).at(14).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(15).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(15).prop('name')).to.equal('extraUses');
    expect(wrapper.find(FormField).at(15).prop('label')).to.equal('Extra Uses From');
    expect(wrapper.find(FormField).at(15).prop('value')).to.equal('entertainment');
    expect(wrapper.find(FormField).at(15).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(16).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(16).prop('name')).to.equal('replaces');
    expect(wrapper.find(FormField).at(16).prop('label')).to.equal('Replaces');
    expect(wrapper.find(FormField).at(16).prop('value')).to.equal('master');
    expect(wrapper.find(FormField).at(16).prop('onChange')).to.equal(onChange);

    expect(wrapper.find(FormField).at(17).prop('type')).to.equal('text');
    expect(wrapper.find(FormField).at(17).prop('name')).to.equal('grants');
    expect(wrapper.find(FormField).at(17).prop('label')).to.equal('Grants');
    expect(wrapper.find(FormField).at(17).prop('value')).to.equal('purring');
    expect(wrapper.find(FormField).at(17).prop('onChange')).to.equal(onChange);
  });

  it('grabs the ref to the DOM form after mounting');
  it('scrolls the window to have the form\'s top at the top of the viewable area if scrollToForm is true');
});
