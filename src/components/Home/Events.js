import React from 'react';

import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';

import EventsList from './styled/EventsList';

const socket = io('localhost:3030');
const app = feathers()
  .configure(socketio(socket));

const eventService = app.service('events');

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paginate: 12,
      events: {
        total: 0, // total number of records
        limit: 0, // max number of items per page
        skip: 0, // number of skipped items (offset)
        data: []
      },
      next: ''
    };
  }

  componentDidMount () {
    app.service('events').on('created', event => {
      this.getEvents(this.state.events.skip);
    });
    app.service('events').on('patched', event => {
      this.getEvents(this.state.events.skip);
    });
    app.service('events').on('removed', event => {
      this.getEvents(this.state.events.skip);
    });
    this.getEvents();
  }

  componentWillUnmount () {
    app.service('events').removeListener('created');
    app.service('events').removeListener('patched');
    app.service('events').removeListener('removed');
  }

  getEvents (skip = 0) {
    let startDate = (new Date()).toJSON().slice(0, 9); // get the 'YYYY-MM-DD' from the JSON date string
    app.service('events').find({query:{date:{$gte:startDate},$sort:{date:1},$limit:this.state.paginate,$skip:skip}}).then(events => {
      this.setState({
        events: events
      });
    });
  }

  render() {
    return (
      <EventsList>
        {this.state.events.data.map((event) => {
          return(
            <li key={event._id}>
              {event.date}
              <span className='location'>{event.location}</span>
            </li>)
        })}
      </EventsList>
    );
  }
}

export default Events;