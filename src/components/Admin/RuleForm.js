import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FormField from './FormField';
import IconLink from '../svg/icon/Link';

class RuleForm extends React.Component {
  constructor(props) {
    super(props);

    this.categories = [
      'Utility',
      'Constant',
      'Craft',
      'Language',
      'Pool',
      'Pool Ability',
      'Domain',
      'Advanced Art',
      'Option',
      'Choice'
    ].map(v => {return {value: v, label: v};});

    this.tiers = [
      '1',
      '2',
      '3'
    ].map(v => {return {value: v, label: v};});

    this.effects = [
      'Passive',
      'Buff',
      'Mind Affecting',
      'Shield'
    ].map(v => {return {value: v, label: v};});

    this.deliveries = [
      'Verbal',
      'Gesture',
      'Touch',
      'Packet',
      'Packet / Verbal',
      'Ranged',
      'Melee'
    ].map(v => {return {value: v, label: v};});

    this.usesTypes = [
      'per Short Recovery',
      'per Long Recovery',
      'per Event'
    ].map(v => {return {value: v, label: v};});

    this.scrollToForm = this.scrollToForm.bind(this);
  }

  componentDidMount() {
    this.scrollToForm();
  }

  scrollToForm() {
    if(!this.form)
      return;
    var element = ReactDOM.findDOMNode(this.form);
    if(element)
      element.scrollIntoView();
  }

  render() {
    return (
      <form id={this.props.id}
        name='rule'
        ref={form => {this.form = form;}}
      >
        {this.props.id == 'new' ? null :
          <div className='record-id'>
            <span>{this.props.id}</span>
            <Link to={`/admin/rules/${this.props.id}`}>
              <IconLink color='inherit' />
            </Link>
          </div>
        }
        <fieldset>
          <FormField type='text'
            name='name'
            label='Name'
            value={this.props.name}
            onChange={this.props.onChange}
          />
          <FormField type='number'
            name='build'
            label='Build'
            value={this.props.build}
            onChange={this.props.onChange}
          />
          <FormField type='number'
            name='max'
            label='Max'
            value={this.props.max}
            onChange={this.props.onChange}
          />
        </fieldset>
        <fieldset>
          <FormField type='select'
            name='category'
            label='Category'
            value={this.props.category}
            options={this.categories}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='group'
            label='Group'
            value={this.props.group}
            onChange={this.props.onChange}
          />
          <FormField type='select'
            name='tier'
            label='Domain Tier'
            value={this.props.tier}
            options={this.tiers}
            onChange={this.props.onChange}
          />
        </fieldset>
        <fieldset>
          <FormField type='select'
            name='effect'
            label='Effect Type'
            value={this.props.effect}
            options={this.effects}
            onChange={this.props.onChange}
          />
          <FormField type='checkbox'
            name='disable'
            label='Not Able to Purchase'
            value={this.props.disable}
            onChange={this.props.onChange}
          />
          <FormField type='checkbox'
            name='hidden'
            label='Hidden'
            value={this.props.hidden}
            onChange={this.props.onChange}
          />
        </fieldset>
        <fieldset>
          <FormField type='text'
            name='race'
            label='Race'
            value={this.props.race}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='culture'
            label='Culture'
            value={this.props.culture}
            onChange={this.props.onChange}
          />
          <FormField type='checkbox'
            name='prodigy'
            label='Prodigy'
            value={this.props.prodigy}
            onChange={this.props.onChange}
          />
        </fieldset>
        <fieldset>
          <FormField type='select'
            name='delivery'
            label='Delivery'
            value={this.props.delivery}
            options={this.deliveries}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='verbal'
            label='Verbal'
            value={this.props.verbal}
            onChange={this.props.onChange}
          />
        </fieldset>
        <fieldset>
          <FormField type='number'
            name='uses'
            label='Uses'
            value={this.props.uses}
            onChange={this.props.onChange}
          />
          <FormField type='number'
            name='usesPerAptitude'
            label='Uses Per X Aptitudes'
            value={this.props.usesPerAptitude}
            onChange={this.props.onChange}
          />
          <FormField type='select'
            name='usesType'
            label='Uses By'
            value={this.props.usesType}
            options={this.usesTypes}
            onChange={this.props.onChange}
          />
        </fieldset>
        <fieldset>
          <FormField type='number'
            name='level'
            label='Minimum Level'
            value={this.props.level}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='increaseMax'
            label='Extra Purchase Of'
            value={this.props.increaseMax}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='grantsUseOf'
            label='Grants Use Of'
            value={this.props.grantsUseOf}
            onChange={this.props.onChange}
          />
        </fieldset>
        <fieldset className='description'>
          <FormField type='textarea'
            name='description'
            label='Description'
            value={this.props.description}
            onChange={this.props.onChange}
          />
        </fieldset>
        <fieldset>
          <FormField type='text'
            name='requires'
            label='Requires'
            value={this.props.requires}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='requeresAny'
            label='Requires Any Of'
            value={this.props.requeresAny}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='conflicts'
            label='Conflicts With'
            value={this.props.conflicts}
            onChange={this.props.onChange}
          />
        </fieldset>
        <fieldset>
          <FormField type='text'
            name='removes'
            label='Removes and Refunds'
            value={this.props.removes}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='grants'
            label='Grants'
            value={this.props.grants}
            onChange={this.props.onChange}
          />
        </fieldset>
        <button type='button' value='submit' onClick={this.props.onSubmit}>{this.props.id != 'new' ? 'Update' : 'Create'}</button>
        <button type='button' value='cancel' onClick={this.props.onCancel}>Cancel</button>
        {this.props.id == 'new' ? null : <button type='button' value='delete' onClick={this.props.onDelete}>Delete</button>}
      </form>
    );
  }
}

RuleForm.defaultProps = {
  build: 0,
  max: 1,
  level: 0,
  delivery: 'Packet',
  uses: 0,
  disable: false,
  prodigy: true,
  hidden: false,
  scrollToForm: false
};

RuleForm.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  build: PropTypes.number,
  max: PropTypes.number,
  category: PropTypes.string,
  group: PropTypes.string,
  tier: PropTypes.string,
  level: PropTypes.number,
  effect: PropTypes.string,
  race: PropTypes.string,
  culture: PropTypes.string,
  delivery: PropTypes.string,
  verbal: PropTypes.string,
  uses: PropTypes.number,
  usesPerAptitude: PropTypes.number,
  usesType: PropTypes.string,
  description: PropTypes.string,
  requires: PropTypes.string,
  requeresAny: PropTypes.string,
  conflicts: PropTypes.string,
  removes: PropTypes.string,
  grants: PropTypes.string,
  grantsUseOf: PropTypes.string,
  increaseMax: PropTypes.string,
  disable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  prodigy: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  hidden: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  scrollToForm: PropTypes.bool
};

export default RuleForm;
