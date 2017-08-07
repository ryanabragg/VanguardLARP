import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import FormField from './FormField';

class RuleForm extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToForm = this.scrollToForm.bind(this);
  }

  componentDidMount() {
    this.scrollToForm();
  }

  scrollToForm() {
    if(!this.form)
      return;
    var element = ReactDOM.findDOMNode(this.form);
    if(!!element)
      element.scrollIntoView();
  }

  render() {
    return (
      <form id={this.props.id}
        name='rule'
        ref={form => {this.form = form;}}
      >
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
          <FormField type='text'
            name='delivery'
            label='Delivery'
            value={this.props.delivery}
            onChange={this.props.onChange}
          />
          <FormField type='number'
            name='tags'
            label='Tags'
            value={this.props.tags}
            onChange={this.props.onChange}
          />
        </fieldset>
        <fieldset>
          <FormField type='text'
            name='category'
            label='Category'
            value={this.props.category}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='group'
            label='Group'
            value={this.props.group}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='tier'
            label='Tier'
            value={this.props.tier}
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
        </fieldset>
        <fieldset className='description'>
          <FormField type='textarea'
            rows={10} cols={50}
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
            name='extraUses'
            label='Extra Uses From'
            value={this.props.extraUses}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='replaces'
            label='Replaces'
            value={this.props.replaces}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='grants'
            label='Grants'
            value={this.props.grants}
            onChange={this.props.onChange}
          />
        </fieldset>
        <button type='button' value="submit" onClick={this.props.onSubmit}>Submit</button>
        <button type='button' value="cancel" onClick={this.props.onCancel}>Cancel</button>
        {this.props.id != 'new' ? <button type='button' value="delete" onClick={this.props.onDelete}>Delete</button> : null}
      </form>
    );
  }
}

RuleForm.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  build: PropTypes.number,
  delivery: PropTypes.string,
  tags: PropTypes.number,
  category: PropTypes.string,
  group: PropTypes.string,
  tier: PropTypes.string,
  race: PropTypes.string,
  culture: PropTypes.string,
  description: PropTypes.string,
  max: PropTypes.number,
  extraUses: PropTypes.string,
  requires: PropTypes.string,
  requeresAny: PropTypes.string,
  conflicts: PropTypes.string,
  replaces: PropTypes.string,
  grants: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  scrollToForm: PropTypes.bool
};

export default RuleForm;
