import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import FormField from './FormField';

class EventForm extends React.Component {
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
        name='event'
        ref={form => {this.form = form;}}
      >
        <fieldset>
          <FormField type='text'
            name='date'
            label='Date'
            value={this.props.date}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='location'
            label='Location'
            value={this.props.location}
            onChange={this.props.onChange}
          />
          <FormField type='text'
            name='area'
            label='Area'
            value={this.props.area}
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

EventForm.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.string,
  location: PropTypes.string,
  area: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  scrollToForm: PropTypes.bool
};

export default EventForm;
