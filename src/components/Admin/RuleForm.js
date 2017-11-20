import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Field from '../util/Field';
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
      'Race',
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
    if(element){
      element.scrollIntoView();
      window.scrollBy(0, -55);
    }
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
          <div>
            <label>Name</label>
            <Field type='text'
              name='name'
              value={this.props.name}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Build</label>
            <Field type='number'
              name='build'
              value={this.props.build}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Max</label>
          <Field type='number'
            name='max'
            value={this.props.max}
            onChange={this.props.onChange}
          />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label>Category</label>
            <Field type='select'
              name='category'
              value={this.props.category}
              options={this.categories}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Group</label>
            <Field type='text'
              name='group'
              value={this.props.group}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Domain Tier</label>
            <Field type='select'
              name='tier'
              value={this.props.tier}
              options={this.tiers}
              onChange={this.props.onChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label>Effect Type</label>
            <Field type='select'
              name='effect'
              value={this.props.effect}
              options={this.effects}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Not Able to Purchase</label>
            <Field type='checkbox'
              name='disable'
              value={this.props.disable}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Hidden</label>
            <Field type='checkbox'
              name='hidden'
              value={this.props.hidden}
              onChange={this.props.onChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label>Race</label>
            <Field type='text'
              name='race'
              value={this.props.race}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Culture</label>
            <Field type='text'
              name='culture'
              value={this.props.culture}
              onChange={this.props.onChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label>Delivery</label>
            <Field type='select'
              name='delivery'
              value={this.props.delivery}
              options={this.deliveries}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Verbal</label>
            <Field type='text'
              name='verbal'
              value={this.props.verbal}
              onChange={this.props.onChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label>Uses</label>
            <Field type='number'
              name='uses'
              value={this.props.uses}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Uses Per X Aptitudes</label>
            <Field type='number'
              name='usesPerAptitude'
              value={this.props.usesPerAptitude}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Uses By</label>
            <Field type='select'
              name='usesType'
              value={this.props.usesType}
              options={this.usesTypes}
              onChange={this.props.onChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label>Minimum Level</label>
            <Field type='number'
              name='level'
              value={this.props.level}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Role-Play Months</label>
            <Field type='number'
              name='roleplay'
              value={this.props.roleplay}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Grants Use Of</label>
            <Field type='text'
              name='grantsUseOf'
              value={this.props.grantsUseOf}
              onChange={this.props.onChange}
            />
          </div>
        </fieldset>
        <fieldset className='description'>
          <div>
            <label>Description</label>
            <Field type='textarea'
              rows={10} cols={50}
              name='description'
              value={this.props.description}
              onChange={this.props.onChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label>Requires</label>
            <Field type='text'
              name='requires'
              value={this.props.requires}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Requires Any Of</label>
            <Field type='text'
              name='requeresAny'
              value={this.props.requeresAny}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Conflicts With</label>
            <Field type='text'
              name='conflicts'
              value={this.props.conflicts}
              onChange={this.props.onChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div>
            <label>Removes and Refunds</label>
            <Field type='text'
              name='removes'
              value={this.props.removes}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Grants</label>
            <Field type='text'
              name='grants'
              value={this.props.grants}
              onChange={this.props.onChange}
            />
          </div>
          <div>
            <label>Extra Purchase Of</label>
            <Field type='text'
              name='increaseMax'
              value={this.props.increaseMax}
              onChange={this.props.onChange}
            />
          </div>
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
  roleplay: 0,
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
  roleplay: PropTypes.number,
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
