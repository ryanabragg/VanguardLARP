import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

import { Link } from 'react-router-dom';

import RuleForm from '../../../src/components/Admin/RuleForm';
import Field from '../../../src/components/util/Field';
import IconLink from '../../../src/components/svg/icon/Link';

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
  it('renders a form with fieldsets holding Field components and buttons', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<RuleForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);
    expect(wrapper.find('form')).to.have.length(1);
    expect(wrapper.find('form').prop('id')).to.equal('42');
    expect(wrapper.find('form').prop('name')).to.equal('rule');
    expect(wrapper.find('fieldset')).to.have.length(10);
    expect(wrapper.find('button')).to.have.length(3);
    expect(wrapper.find('label')).to.have.length(25);
    expect(wrapper.find(Field)).to.have.length(25);
  });

  it('has a div containing the id prop and a Link icon if id is not "new"', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<RuleForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);
    expect(wrapper.find('div').at(0).prop('className')).to.equal('record-id');
    expect(wrapper.find('span')).to.have.length(1);
    expect(wrapper.find('span').text()).to.equal('42');
    expect(wrapper.find(Link)).to.have.length(1);
    expect(wrapper.find(IconLink)).to.have.length(1);
    wrapper.setProps({id: 'new'});
    expect(wrapper.find('div').at(0).prop('className')).to.equal(undefined);
    expect(wrapper.find('span')).to.have.length(0);
    expect(wrapper.find(Link)).to.have.length(0);
    expect(wrapper.find(IconLink)).to.have.length(0);
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

  it('does not include the delete button if id is "new"', () => {
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

  it('has one fieldset with className "description" having one Field of type textarea', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<RuleForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);
    expect(wrapper.find('fieldset').find('.description')).to.have.length(1);
    expect(wrapper.find('fieldset').find('.description').find('label')).to.have.length(1);
    expect(wrapper.find('fieldset').find('.description').find(Field)).to.have.length(1);
    expect(wrapper.find('fieldset').find('.description').find(Field).prop('type')).to.equal('textarea');
    expect(wrapper.find('fieldset').find('.description').find(Field).prop('rows')).to.equal(10);
    expect(wrapper.find('fieldset').find('.description').find(Field).prop('cols')).to.equal(50);
  });

  it('renders the Field components with the propper props', () => {
    const onChange = spy(),
      onSubmit = spy(),
      onCancel = spy(),
      onDelete = spy();
    const wrapper = shallow(<RuleForm id='42' onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />);

    wrapper.setProps({
      name: 'Dog',
      build: 5,
      max: 1,
      category: 'pet',
      group: 'cat',
      tier: '3',
      level: 7,
      effect: 'entertainment',
      race: 'feline',
      culture: 'hunter',
      delivery: 'pounce',
      verbal: 'meow',
      uses: 9,
      usesPerAptitude: 0,
      usesType: 'per Event',
      description: 'lazy',
      requires: 'food',
      requeresAny: 'attention',
      conflicts: 'laser pointer',
      removes: 'master',
      grants: 'purring',
      grantsUseOf: '',
      increaseMax: 'litter',
      disable: 1,
      prodigy: false,
      hidden: true
    });

    expect(wrapper.find('label').at(0).text()).to.equal('Name');
    expect(wrapper.find(Field).at(0).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(0).prop('name')).to.equal('name');
    expect(wrapper.find(Field).at(0).prop('value')).to.equal('Dog');
    expect(wrapper.find(Field).at(0).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(1).text()).to.equal('Build');
    expect(wrapper.find(Field).at(1).prop('type')).to.equal('number');
    expect(wrapper.find(Field).at(1).prop('name')).to.equal('build');
    expect(wrapper.find(Field).at(1).prop('value')).to.equal(5);
    expect(wrapper.find(Field).at(1).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(2).text()).to.equal('Max');
    expect(wrapper.find(Field).at(2).prop('type')).to.equal('number');
    expect(wrapper.find(Field).at(2).prop('name')).to.equal('max');
    expect(wrapper.find(Field).at(2).prop('value')).to.equal(1);
    expect(wrapper.find(Field).at(2).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(3).text()).to.equal('Category');
    expect(wrapper.find(Field).at(3).prop('type')).to.equal('select');
    expect(wrapper.find(Field).at(3).prop('name')).to.equal('category');
    expect(wrapper.find(Field).at(3).prop('value')).to.equal('pet');
    expect(wrapper.find(Field).at(3).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(4).text()).to.equal('Group');
    expect(wrapper.find(Field).at(4).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(4).prop('name')).to.equal('group');
    expect(wrapper.find(Field).at(4).prop('value')).to.equal('cat');
    expect(wrapper.find(Field).at(4).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(5).text()).to.equal('Domain Tier');
    expect(wrapper.find(Field).at(5).prop('type')).to.equal('select');
    expect(wrapper.find(Field).at(5).prop('name')).to.equal('tier');
    expect(wrapper.find(Field).at(5).prop('value')).to.equal('3');
    expect(wrapper.find(Field).at(5).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(6).text()).to.equal('Effect Type');
    expect(wrapper.find(Field).at(6).prop('type')).to.equal('select');
    expect(wrapper.find(Field).at(6).prop('name')).to.equal('effect');
    expect(wrapper.find(Field).at(6).prop('value')).to.equal('entertainment');
    expect(wrapper.find(Field).at(6).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(7).text()).to.equal('Not Able to Purchase');
    expect(wrapper.find(Field).at(7).prop('type')).to.equal('checkbox');
    expect(wrapper.find(Field).at(7).prop('name')).to.equal('disable');
    expect(wrapper.find(Field).at(7).prop('value')).to.equal(1);
    expect(wrapper.find(Field).at(7).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(8).text()).to.equal('Hidden');
    expect(wrapper.find(Field).at(8).prop('type')).to.equal('checkbox');
    expect(wrapper.find(Field).at(8).prop('name')).to.equal('hidden');
    expect(wrapper.find(Field).at(8).prop('value')).to.equal(true);
    expect(wrapper.find(Field).at(8).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(9).text()).to.equal('Race');
    expect(wrapper.find(Field).at(9).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(9).prop('name')).to.equal('race');
    expect(wrapper.find(Field).at(9).prop('value')).to.equal('feline');
    expect(wrapper.find(Field).at(9).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(10).text()).to.equal('Culture');
    expect(wrapper.find(Field).at(10).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(10).prop('name')).to.equal('culture');
    expect(wrapper.find(Field).at(10).prop('value')).to.equal('hunter');
    expect(wrapper.find(Field).at(10).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(11).text()).to.equal('Delivery');
    expect(wrapper.find(Field).at(11).prop('type')).to.equal('select');
    expect(wrapper.find(Field).at(11).prop('name')).to.equal('delivery');
    expect(wrapper.find(Field).at(11).prop('value')).to.equal('pounce');
    expect(wrapper.find(Field).at(11).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(12).text()).to.equal('Verbal');
    expect(wrapper.find(Field).at(12).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(12).prop('name')).to.equal('verbal');
    expect(wrapper.find(Field).at(12).prop('value')).to.equal('meow');
    expect(wrapper.find(Field).at(12).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(13).text()).to.equal('Uses');
    expect(wrapper.find(Field).at(13).prop('type')).to.equal('number');
    expect(wrapper.find(Field).at(13).prop('name')).to.equal('uses');
    expect(wrapper.find(Field).at(13).prop('value')).to.equal(9);
    expect(wrapper.find(Field).at(13).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(14).text()).to.equal('Uses Per X Aptitudes');
    expect(wrapper.find(Field).at(14).prop('type')).to.equal('number');
    expect(wrapper.find(Field).at(14).prop('name')).to.equal('usesPerAptitude');
    expect(wrapper.find(Field).at(14).prop('value')).to.equal(0);
    expect(wrapper.find(Field).at(14).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(15).text()).to.equal('Uses By');
    expect(wrapper.find(Field).at(15).prop('type')).to.equal('select');
    expect(wrapper.find(Field).at(15).prop('name')).to.equal('usesType');
    expect(wrapper.find(Field).at(15).prop('value')).to.equal('per Event');
    expect(wrapper.find(Field).at(15).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(16).text()).to.equal('Minimum Level');
    expect(wrapper.find(Field).at(16).prop('type')).to.equal('number');
    expect(wrapper.find(Field).at(16).prop('name')).to.equal('level');
    expect(wrapper.find(Field).at(16).prop('value')).to.equal(7);
    expect(wrapper.find(Field).at(16).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(17).text()).to.equal('Extra Purchase Of');
    expect(wrapper.find(Field).at(17).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(17).prop('name')).to.equal('increaseMax');
    expect(wrapper.find(Field).at(17).prop('value')).to.equal('litter');
    expect(wrapper.find(Field).at(17).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(18).text()).to.equal('Grants Use Of');
    expect(wrapper.find(Field).at(18).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(18).prop('name')).to.equal('grantsUseOf');
    expect(wrapper.find(Field).at(18).prop('value')).to.equal('');
    expect(wrapper.find(Field).at(18).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(19).text()).to.equal('Description');
    expect(wrapper.find(Field).at(19).prop('type')).to.equal('textarea');
    expect(wrapper.find(Field).at(19).prop('name')).to.equal('description');
    expect(wrapper.find(Field).at(19).prop('value')).to.equal('lazy');
    expect(wrapper.find(Field).at(19).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(20).text()).to.equal('Requires');
    expect(wrapper.find(Field).at(20).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(20).prop('name')).to.equal('requires');
    expect(wrapper.find(Field).at(20).prop('value')).to.equal('food');
    expect(wrapper.find(Field).at(20).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(21).text()).to.equal('Requires Any Of');
    expect(wrapper.find(Field).at(21).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(21).prop('name')).to.equal('requeresAny');
    expect(wrapper.find(Field).at(21).prop('value')).to.equal('attention');
    expect(wrapper.find(Field).at(21).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(22).text()).to.equal('Conflicts With');
    expect(wrapper.find(Field).at(22).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(22).prop('name')).to.equal('conflicts');
    expect(wrapper.find(Field).at(22).prop('value')).to.equal('laser pointer');
    expect(wrapper.find(Field).at(22).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(23).text()).to.equal('Removes and Refunds');
    expect(wrapper.find(Field).at(23).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(23).prop('name')).to.equal('removes');
    expect(wrapper.find(Field).at(23).prop('value')).to.equal('master');
    expect(wrapper.find(Field).at(23).prop('onChange')).to.equal(onChange);

    expect(wrapper.find('label').at(24).text()).to.equal('Grants');
    expect(wrapper.find(Field).at(24).prop('type')).to.equal('text');
    expect(wrapper.find(Field).at(24).prop('name')).to.equal('grants');
    expect(wrapper.find(Field).at(24).prop('value')).to.equal('purring');
    expect(wrapper.find(Field).at(24).prop('onChange')).to.equal(onChange);
  });

  it('grabs the ref to the DOM form after mounting');
  it('scrolls the window to have the form\'s top at the top of the viewable area if scrollToForm is true');
});
