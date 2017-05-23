import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import Color from 'color';

import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';

import RxJS from 'rxjs';
import reactive from 'feathers-reactive';

import AdminDashboard from './AdminDashboard';

const socket = io('192.168.1.171:3030');
const app = feathers()
  .configure(socketio(socket))
  .configure(reactive(RxJS)); // turns service methods into streams, so .subscribe instead of .then

const eventService = app.service('events');

export default class AdminEvents extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      events: [],
      id: '',
      date: '',
      location: ''
    };
    this.newEvent = this.newEvent.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.events = eventService.find({
      query: {
        $sort: {
          date: -1
        },
/*        date: {
          $gte: new Date(Date.now() - 2 * 24*60*60*1000).toJSON() // >= two days ago
        }*/ // can't get this part to work
      }
    }).subscribe(
      events => this.setState({ events: events.data })
    );
  }

  componentWillUnmount () {
    this.events.unsubscribe();
  }

  newEvent () {
    this.setState({
      id: '',
      date: '',
      location: ''
    });
  }

  selectEvent (id) {
    this.setState({
      id: id,
      date: this.state.events.find(event => event._id == id).date,
      location: this.state.events.find(event => event._id == id).location
    });
  }

  updateEvent (event) {
    if (this.state.id) {
      eventService.patch(
        this.state.id,
        {
          date: new Date(event.date),
          location: event.location
        },
        (error, event) => {
          // todo: show error
        }
      );
    } else {
      eventService.create(
        {
          date: new Date(event.date),
          location: event.location
        },
        (err, event) => {
          // todo: show error
          this.setState({
            id: event._id
          })
        }
      );
    }
    // todo: event list post-action fix
  }

  deleteEvent () {
    if (this.state.id) {
      eventService.remove(
        this.state.id,
        (err, event) => {
          // todo
          this.setState({
            id: '',
            date: '',
            location: ''
          })
        }
      );
    }
    // todo: event list post-remove fix
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    var event = {
      id: this.state.id,
      date : this.state.date,
      location : this.state.location
    };
    this.updateEvent(event);
  };

  render () {
    return (
      <AdminDashboard>
        <article>
          <ol>
            {
              this.state.events.map((event, i) => {
                return (
                  <li key={i}>
                    <p>{event.date}</p>
                    <p>{event.location}</p>
                    <button type='button' onClick={this.selectEvent.bind(this, event._id)}>Edit</button>
                  </li>
                );
              })
            }
          </ol>
        </article>
        <main>
          <button type='button' onClick={this.newEvent}>New Event</button>
          <form name={'event:' + (this.state.id) ? this.state.id : 'new'} onSubmit={this.handleSubmit}>
            <label name='date'>Date</label>
            <input type="date" name='date' onChange={this.handleInputChange} value={this.state.date.toString()} />
            <label name='location'>Location</label>
            <input type="text" name='location' onChange={this.handleInputChange} value={this.state.location} />
            <button type='submit' onClick={this.handleSubmit}>Submit</button>
            <button type='button' onClick={this.selectEvent.bind(this, this.state.id)}>Reset</button>
            <button type='button' onClick={this.deleteEvent.bind(this, this.state.id)}>Delete</button>
          </form>
        </main>
      </AdminDashboard>
    );
  }
}
