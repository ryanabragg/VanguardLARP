import React from 'react';

import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';

import UUID from 'uuid/v1';

import Spinner from '../styled/Spinner';
import Form from '../styled/Form';
import Modal from '../styled/Modal';
import List from '../styled/List';
import Pagination from '../styled/Pagination';

import NotificationList from './styled/NotificationList';
import Notification from '../Notification';

const socket = io('localhost:3030');
const app = feathers().configure(socketio(socket));

export default class AdminEvents extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      paginate: 10,
      events: {
        total: 0, // total number of records
        limit: 0, // max number of items per page
        skip: 0, // number of skipped items (offset)
        data: []
      },
      isFormVisible: false,
      id: '',
      date: '',
      location: '',
      area: '',
      alerts: []
    };
    this.getEvents = this.getEvents.bind(this);
    this.newEvent = this.newEvent.bind(this);
    this.deselectEvent = this.deselectEvent.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pageClick = this.pageClick.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
  }

  componentDidMount () {
    app.service('events').on('created', event => {
      this.setState({
        alerts: this.state.alerts.concat({
          key: UUID(),
          added: Date.now(),
          type: 'success',
          message: 'New event created for ' + event.date + ' at ' + event.location + ' (' + event.area + ')'
        })
      });
      this.getEvents(this.state.events.skip);
    });
    app.service('events').on('patched', event => {
      this.setState({
        alerts: this.state.alerts.concat({
          key: UUID(),
          added: Date.now(),
          type: 'success',
          message: 'Event updated. ' + event.date + ' at ' + event.location + ' (' + event.area + ')'
        })
      });
      this.getEvents(this.state.events.skip);
    });
    app.service('events').on('removed', event => {
      this.setState({
        alerts: this.state.alerts.concat({
          key: UUID(),
          added: Date.now(),
          type: 'success',
          message: 'Event deleted. ' + event.date + ' at ' + event.location + ' (' + event.area + ')',
          action: 'UNDO',
          actionType: 'create',
          data: event
        })
      });
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
    app.service('events').find({query:{$sort:{date:-1},$limit:this.state.paginate,$skip:skip}}).then(events => {
      this.setState({
        events: events
      });
    });
  }

  newEvent () {
    this.setState({
      isFormVisible: true,
      id: '',
      date: '',
      location: '',
      area: ''
    });
  }

  deselectEvent() {
    this.setState({
      isFormVisible: false,
      id: '',
      date: '',
      location: '',
      area: ''
    });
  }

  selectEvent (id) {
    this.setState({
      isFormVisible: true,
      id: id,
      date: this.state.events.data.find(event => event._id == id).date,
      location: this.state.events.data.find(event => event._id == id).location,
      area: this.state.events.data.find(event => event._id == id).area
    });
  }

  createEvent (event) {
    app.service('events').create(
      {
        _id: event._id,
        created: event.created || (new Date()).toJSON(),
        modified: event.modified || (new Date()).toJSON(),
        date: event.date,
        location: event.location,
        area: event.area
      },
      (error, event) => {
        if (error) {
          this.setState({
            alerts: this.state.alerts.concat({
              key: UUID(),
              added: Date.now(),
              type: 'alert',
              message: error
            })
          });
        }
      }
    );
  }

  updateEvent (event) {
    app.service('events').patch(
      event.id,
      {
        modified: (new Date()).toJSON(),
        date: event.date,
        location: event.location,
        area: event.area
      },
      (error, event) => {
        if (error) {
          this.setState({
            alerts: this.state.alerts.concat({
              key: UUID(),
              added: Date.now(),
              type: 'alert',
              message: error
            })
          });
        }
      }
    );
  }

  deleteEvent (id) {
    if (id) {
      app.service('events').remove(
        id,
        (error, event) => {
          if (error) {
            this.setState({
              alerts: this.state.alerts.concat({
                key: UUID(),
                added: Date.now(),
                type: 'alert',
                message: error
              })
            });
          } else {
            this.setState({
              isFormVisible: false,
              id: '',
              date: '',
              location: '',
              area: ''
            });
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
    //todo errors check on field values
    if(this.state.id){
      this.updateEvent({
        id: this.state.id,
        date : this.state.date,
        location : this.state.location,
        area: this.state.area
      });
    } else {
      this.createEvent({
        date : this.state.date,
        location : this.state.location,
        area: this.state.area
      });
    }
  };

  pageClick(e) {
    e.preventDefault();
    let skip = (e.target.id - 1) * this.state.paginate;
    this.getEvents(skip);
  }

  removeAlert(key) {
    this.setState({
      alerts: this.state.alerts.filter(alert => alert.key != key)
    })
  }

  render () {
    return (
      <div>
        <main>
          <button type='button' onClick={this.newEvent}>Add Event</button>
          {this.state.events.limit === 0 ? <Spinner /> : null}
          <List>
            {this.state.events.data.sort(function(a,b) {return (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0);}).map((event) => {
              return (
                <li key={event._id} onClick={this.selectEvent.bind(null, event._id)}>
                  {`${event.date} at ${ event.location } (${ event.area })`}
                  <button type='button'>Edit</button>
                </li>
              );
            })}
          </List>
          <Pagination
            onClick={this.pageClick}
            current={1 + Math.floor(this.state.events.skip / this.state.paginate)}
            total={Math.ceil(this.state.events.total / this.state.paginate)}
          />
        </main>
        <Modal visible={this.state.isFormVisible != false} closeOnClickOutside={true} closeModal={this.deselectEvent.bind(this)}>
          <Form name={'event-' + (this.state.id)} onSubmit={this.handleSubmit}>
            <label name='date'>Date</label>
            <input type='date' name='date' onChange={this.handleInputChange} value={this.state.date} placeholder='YYYY-MM-DD' />
            <label name='location'>Location</label>
            <input type='text' name='location' onChange={this.handleInputChange} value={this.state.location} />
            <label name='area'>Area</label>
            <input type='text' name='area' onChange={this.handleInputChange} value={this.state.area} />
            <button type='submit' value="submit" onClick={this.handleSubmit}>Submit</button>
            <button type='button' value="reset" onClick={this.selectEvent.bind(this, this.state.id)}>Reset</button>
            <button type='button' value="delete" onClick={this.deleteEvent.bind(this, this.state.id)}>Delete</button>
            <button type='button' value="cancel" onClick={this.deselectEvent.bind(this)}>Cancel</button>
          </Form>
        </Modal>
        {!this.state.alerts.length ? null :
          <NotificationList>
            {this.state.alerts.map((alert, index) => {
              let actionClick = null;
              if (alert.actionType == 'create') {
                actionClick = () => {
                  this.createEvent(alert.data);
                  this.removeAlert(alert.key);
                }
              }
              return (
                <Notification
                  key={alert.key}
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  action={alert.action}
                  actionClick={actionClick}
                  timeoutDuration={Math.max(0, alert.added - Date.now() + 3000 + index * 1000)}
                  timeoutFunction={this.removeAlert.bind(this, alert.key)}
                  showDismiss={!alert.action}
                />
              );
            })}
          </NotificationList>
        }
      </div>
    );
  }
}
