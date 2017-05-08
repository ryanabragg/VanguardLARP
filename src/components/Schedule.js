/* eslint-disable node/no-unsupported-features */
/*
import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';

import RxJS from 'rxjs';
import reactive from 'feathers-reactive';
*/
import React, {Component} from 'react';
/*
const socket = io();
const app = feathers()
  .configure(socketio(socket))
  .configure(reactive(RxJS)); // turns service methods into streams, so .subscribe instead of .then

const serviceEvents = app.service('events');
*/
export default class Schedule extends Component {
/*  componentDidMount () {
    serviceEvents.find( {
      query: {
        $sort: {
          dateStart: -1
        }
      }
    }).subscribe(events => this.setState({events}));
  }*/

  render() {
    if(!this.state){
      return <div>Loading...</div>;
    }
    return (
      <ol className='schedule'>
        { this.state.events.data.map(event =>
          <li className='event' key={event.id}>
          {event.dateStart}
          <span className='location'>{event.location}</span>
          </li>
        ) }
        <li className='event'>
          Jan 20, 2017
          <span className='location'>Camp Ginger Cascades: Rainbow</span>
        </li>
        <li className='event'>
          Mar 3, 2017
          <span className='location'>Camp Ginger Cascades: Rainbow</span>
        </li>
        <li className='event'>
          Mar 31, 2017
          <span className='location'>Camp Ginger Cascades: Rainbow</span>
        </li>
        <li className='event'>
          April 28, 2017
          <span className='location'>Camp Ginger Cascades: Rainbow</span>
        </li>
        <li className='event'>
          May 26, 2017
          <span className='location'>Camp Ginger Cascades: Rainbow</span>
        </li>
        <li className='event'>
          Aug 11, 2017
          <span className='location'>Camp Ginger Cascades: Rainbow</span>
        </li>
        <li className='event'>
          Sep 8, 2017
          <span className='location'>Camp Ginger Cascades: Rainbow</span>
        </li>
        <li className='event'>
          Oct 13, 2017
          <span className='location'>Camp Ginger Cascades: Rainbow</span>
        </li>
        <li className='event'>
          Nov 10, 2017
          <span className='location'>Camp Ginger Cascades: Rainbow</span>
        </li>
        <li className='event'>
          Dec 8, 2017
          <span className='location'>Camp Ginger Cascades: Rainbow</span>
        </li>
      </ol>
    )
  }
}