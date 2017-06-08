import React from 'react';

import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';

import RxJS from 'rxjs';
import reactive from 'feathers-reactive';

import EventsList from './styled/EventsList';

const socket = io('192.168.1.171:3030');
const app = feathers()
  .configure(socketio(socket))
  .configure(reactive(RxJS),{
    idField: '_id'
  });

const eventService = app.service('events');

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      next: ''
    };
  }

  componentDidMount () {
    this.events = eventService.find({
      query: {
/*        date: {
          $gte: new Date().getFullYear() - 1 + '-01-01'
        }
        date: {
          $gte: new Date(Date.now() - 2 * 24*60*60*1000).toJSON() // >= two days ago
        }*/
      }
    }).subscribe(events =>
      this.setState({
        events: this.state.events.filter(event => !events.data.map(event => event._id).includes(event._id)).concat(events.data)
      })
    );
  }

  componentWillUnmount () {
    this.events.unsubscribe();
  }

  render() {
    return (
      <EventsList>
        {this.state.events.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);}).map((event) => {
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