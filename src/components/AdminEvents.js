import React from 'react';
import { Link } from 'react-router-dom';

import styled, { injectGlobal } from 'styled-components';
import Color from 'color';

import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';

import AdminDashboard from './AdminDashboard';

const socket = io('192.168.1.171:3030');
const app = feathers().configure(socketio(socket));

export default class AdminEvents extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      events: [],
      id: '',
      date: '',
      location: '',
      area: '',
      newDate: '',
      newLocation: '',
      newArea: '',
      errors: ''
    };
    this.newEvent = this.newEvent.bind(this);
    this.deselectEvent = this.deselectEvent.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderViewOrEdit = this.renderViewOrEdit.bind(this);
  }

  componentDidMount () {
    this.getEvents();
  }

  componentWillUnmount () {
    
  }

  getEvents (skip = 0) {
    app.service('events').find({query:{$skip:skip}}).then(events => {
      this.setState({
        events: this.state.events.filter(event => !events.data.map(event => event._id).includes(event._id)).concat(events.data)
      })
      if(events.skip < events.total){
        this.getEvents(events.skip+events.limit);
      }
    });
  }

  newEvent () {
    app.service('events').create(
      {
        date: this.state.newDate,
        location: this.state.newLocation,
        area: this.state.newArea
      },
      (error, event) => {
        this.setState({
          events: this.state.events.concat(event),
          id: event._id,
          date: event.date,
          location: event.location,
          area: event.area,
          newDate: '',
          newLocation: '',
          newArea: '',
          errors: error
        })
      }
    );
  }

  deselectEvent() {
    this.setState({
      id: '',
      date: '',
      location: '',
      area: '',
      errors: ''
    });
  }

  selectEvent (id) {
    this.setState({
      id: id,
      date: this.state.events.find(event => event._id == id).date,
      location: this.state.events.find(event => event._id == id).location,
      area: this.state.events.find(event => event._id == id).area,
      errors: ''
    });
  }

  updateEvent (event) {
    app.service('events').patch(
      event.id,
      {
        date: event.date,
        location: event.location,
        area: event.area
      },
      (error, event) => {
        this.setState({
          errors: error
        })
      }
    );
  }

  deleteEvent (id) {
    if (id) {
      app.service('events').remove(
        id,
        (error, event) => {
          // todo
          if(!error){
            this.setState({
              events: this.state.events.filter(event => event._id != id),
              id: '',
              date: '',
              location: '',
              area: '',
              errors: ''
            })
          }
        }
      );
    }
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
      location : this.state.location,
      area: this.state.area
    };
    this.updateEvent(event);
  };

  renderViewOrEdit( event ) {
    if ( this.state.id === event._id ) {
      return (
        <li key={event._id}>
          <form name={'event-' + (this.state.id)} onSubmit={this.handleSubmit}>
            <label name='date'>Date</label>
            <input type='date' name='date' onChange={this.handleInputChange} value={this.state.date} />
            <label name='location'>Location</label>
            <input type='text' name='location' onChange={this.handleInputChange} value={this.state.location} />
            <label name='area'>Area</label>
            <input type='text' name='area' onChange={this.handleInputChange} value={this.state.area} />
            <button type='submit' onClick={this.handleSubmit}>Submit</button>
            <button type='button' onClick={this.selectEvent.bind(this, this.state.id)}>Reset</button>
            <button type='button' onClick={this.deleteEvent.bind(this, this.state.id)}>Delete</button>
            <button type='button' onClick={this.deselectEvent.bind(this)}>Cancel</button>
          </form>
          <div>
          {this.state.errors}
          </div>
        </li>);
    } else {
      return (
        <li key={event._id}>
          {`${event.date} at ${ event.location } (${ event.area })`}
          <button type='button' onClick={this.selectEvent.bind(null, event._id)}>Edit</button>
        </li>);
    }
  }

  render () {
    return (
      <AdminDashboard>
        <form name='event-new' onSubmit={this.newEvent}>
          <label name='date'>Date</label>
          <input type='date' name='newDate' onChange={this.handleInputChange} value={this.state.newDate} />
          <label name='location'>Location</label>
          <input type='text' name='newLocation' onChange={this.handleInputChange} value={this.state.newLocation} />
            <label name='area'>Area</label>
            <input type='text' name='newArea' onChange={this.handleInputChange} value={this.state.newArea} />
          <button type='button' onClick={this.newEvent}>Add Event</button>
        </form>
        <div>
        {this.state.errors}
        </div>
        <main>
          <ol>
            {this.state.events.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);}).map((event) => {
              return this.renderViewOrEdit(event);
            })}
          </ol>
        </main>
      </AdminDashboard>
    );
  }
}
