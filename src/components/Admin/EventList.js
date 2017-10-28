import React from 'react';
import PropTypes from 'prop-types';

import Event from './Event';
import EventForm from './EventForm';

class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rest = Object.assign({}, this.props);
    delete rest.list;
    delete rest.selected;
    delete rest.onClick;
    delete rest.onChange;
    delete rest.onSubmit;
    delete rest.onCancel;
    delete rest.onDelete;
    delete rest.scrollToForm;
    return (
      <article {...rest}>
        {this.props.list.length == 0 ? null :
          this.props.list.map(event => {
            if(this.props.selected &&
              event._id == this.props.selected._id)
              return (
                <EventForm
                  key={this.props.selected._id}
                  id={this.props.selected._id}
                  date={this.props.selected.date}
                  location={this.props.selected.location}
                  area={this.props.selected.area}
                  onChange={this.props.onChange}
                  onSubmit={this.props.onSubmit}
                  onCancel={this.props.onCancel}
                  onDelete={this.props.onDelete}
                  scrollToForm={this.props.scrollToForm}
                />);
            return (
              <Event
                key={event._id}
                id={event._id}
                date={event.date}
                location={event.location}
                area={event.area}
                onClick={this.props.onClick}
              />);
          })
        }
      </article>
    );
  }
}

EventList.defaultProps = {
  list: [],
  scrollToForm: false
};

EventList.propTypes = {
  list: PropTypes.array.isRequired,
  selected: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  scrollToForm: PropTypes.bool
};

export default EventList;
