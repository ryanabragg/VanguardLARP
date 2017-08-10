import React from 'react';

import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';

import UUID from 'uuid/v1';

import Spinner from '../styled/Spinner';
import EventList from './styled/EventList';

// import the notifications component to access static methods (don't import styled version)
import NotificationList from '../NotificationList';

const socket = io('localhost:3030');
const app = feathers().configure(socketio(socket));

export default class Events extends React.Component {
  constructor (props) {
    super(props);

    this.emptyEvent = {
      _id: '',
      date: '',
      location: '',
      area: '',
    };

    this.syncData = {
      interval: 500, // ms
      paginate: 50,
      total: 0,
      progress: [],
      add: [],
      modify: [],
      remove:[]
    };

    this.state = {
      list: [],
      search: {
        modified: '',
        name: '',
        text: ''
      },
      selected: Object.assign({}, this.emptyEvent)
    };

    this.startSync = this.startSync.bind(this);
    this.sync = this.sync.bind(this);

    this.createEvent = this.createEvent.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);

    this.handleListClick = this.handleListClick.bind(this);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleFormDelete = this.handleFormDelete.bind(this);
    this.handleFormNew = this.handleFormNew.bind(this);
  }

  componentDidMount () {
    app.service('events').on('created', event => {
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(this.syncInProgress)
          this.syncData.add = this.syncData.add.concat(event);
        else
          nextState.list = prevState.list.concat(event);
        return nextState;
      });
    });

    app.service('events').on('patched', event => {
      let notification = undefined;
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(event._id === prevState.selected._id && event._id != this.update) {
          this.update = undefined;
          notification = {
            timeout: 0,
            type: 'warning',
            title: 'Updated',
            message: 'The event you are viewing has been modified. Clicking Submit without applying changes will override them.',
            action: 'APPLY CHANGES',
            actionFunction: (param) => this.selectEvent(param),
            actionParam: event._id
          };
        }
        if(this.syncInProgress)
          this.syncData.modify = this.syncData.modify.concat(event);
        else
          nextState.list[prevState.list.map(item => item._id).indexOf(event._id)] = Object.assign({}, event);
        return nextState;
      }, () => {
        if(notification)
          NotificationList.notify(notification);
      });
    });

    app.service('events').on('removed', event => {
      let notification = undefined;
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(event._id === prevState.selected._id && event._id != this.delete) {
          this.delete = undefined;
          notification = {
            timeout: 0,
            type: 'alert',
            title: 'Deleted',
            message: 'The event you are viewing has been deleted. Clicking Submit will recreate it.'
          };
        }
        if(this.syncInProgress)
          this.syncData.remove = this.syncData.remove.concat(event);
        else
          nextState.list = prevState.list.filter(listed => event._id != listed._id);
        return nextState;
      }, () => {
        if(notification)
          NotificationList.notify(notification);
      });
    });

    this.startSync();
  }

  componentWillUnmount () {
    app.service('events').removeListener('created');
    app.service('events').removeListener('patched');
    app.service('events').removeListener('removed');
  }

  startSync() {
    this.syncData = {
      interval: 500, // ms
      paginate: 50,
      total: 0,
      progress: [],
      add: [],
      modify: [],
      remove:[]
    };
    this.syncInProgress = setInterval(this.sync, this.syncData.interval);
  }

  sync() {
    app.service('events').find({
      query:{
        $sort:{
          date: 1
        },
        $limit: this.syncData.paginate,
        $skip: this.syncData.progress.length
      }
    }).then(page => {
      this.syncData.total = page.total;
      this.syncData.progress = this.syncData.progress.concat(page.data);
      if(this.syncData.total == this.syncData.progress.length + this.syncData.add.length - this.syncData.remove.length) {
        clearInterval(this.syncInProgress);
        this.syncInProgress = 0;
        let modifyIDs = this.syncData.modify.map(event => event._id);
        let removeIDs = this.syncData.remove.map(event => event._id);
        this.setState((prevState, props) => {
          let nextState = Object.assign({}, prevState);
          nextState.list = this.syncData.progress
            .filter(event => removeIDs.indexOf(event._id) === -1)
            .filter(event => modifyIDs.indexOf(event._id) === -1)
            .concat(this.syncData.modify)
            .concat(this.syncData.add);
          return nextState;
        });
      }
    });
  }

  createEvent(event) {
    app.service('events').create(
      event,
      (error, created) => {
        if(error)
          NotificationList.alert(error, 'Create Error');
        else {
          //nextState.selected = Object.assign({}, this.emptyEvent);
          NotificationList.notify({
            type: 'success',
            title: 'Created',
            message: created.category + ': ' + created.name,
            action: 'UNDO',
            actionFunction: (param) => this.deleteEvent(param),
            actionParam: event._id
          });
        }
      }
    );
  }

  selectEvent(id) {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected = Object.assign({}, prevState.list.filter(event => event._id == id)[0]);
      return nextState;
    });
  }

  updateEvent(event) {
    const preUpdate = Object.assign({}, this.state.list.filter(item => item._id == event._id)[0]);
    app.service('events').patch(
      event._id,
      event,
      (error, updated) => {
        if(error)
          NotificationList.alert(error, 'Update Error');
        else {
          this.update = updated._id;
          NotificationList.notify({
            type: 'success',
            title: 'Updated',
            message: updated.category + ': ' + updated.name,
            action: 'UNDO',
            actionFunction: (param) => {this.updateEvent(param); this.selectEvent(updated._id);},
            actionParam: preUpdate
          });
        }
      }
    );
  }

  deleteEvent(id) {
    if(!id)
      return;
    app.service('events').remove(
      id,
      (error, deleted) => {
        if(error)
          NotificationList.alert(error, 'Delete Error');
        else {
          this.setState((prevState, props) => {
            let nextState = Object.assign({}, prevState);
            nextState.selected = Object.assign({}, this.emptyEvent);
            return nextState;
          });
          this.delete = deleted._id;
          NotificationList.notify({
            type: 'success',
            title: 'Deleted',
            message: deleted.category + ': ' + deleted.name,
            action: 'UNDO',
            actionFunction: (param) => this.createEvent(param),
            actionParam: deleted
          });
        }
      }
    );
  }

  handleListClick (e) {
    e.preventDefault();
    this.selectEvent(e.target.id);
  }

  handleFormInputChange(e) {
    e.preventDefault();
    let target = e.target; // e not available during callback
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected[target.name] = target.type === 'checkbox' ? target.checked : target.value;
      return nextState;
    });
  }

  handleFormSubmit() {
    let event = Object.assign({}, this.state.selected);
    if(event._id == 'new') {
      delete event._id;
      this.createEvent(event);
    }
    else if(!this.state.list.filter(item => item._id == event._id))
      this.createEvent(event);
    else
      this.updateEvent(event);
  }

  handleFormCancel() {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected = Object.assign({}, this.emptyEvent);
      return nextState;
    });
  }

  handleFormDelete() {
    this.deleteEvent(this.state.selected._id);
  }

  handleFormNew() {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected = Object.assign({}, this.emptyEvent);
      nextState.selected._id = 'new';
      return nextState;
    });
  }

  render() {
    return (
      <div>
        <main>
          <div data-rules='manage'>
            <button type='button' value='refresh' onClick={this.startSync}>Refresh</button>
            <button type='button' value='new' onClick={this.handleFormNew}>Add Event</button>
            <div data-events='@todo search events'></div>
          </div>
          {this.state.selected._id != 'new'
          ? null
          : <EventList
              list={[this.state.selected]}
              selected={this.state.selected}
              onClick={this.handleListClick}
              onChange={this.handleFormInputChange}
              onSubmit={this.handleFormSubmit}
              onCancel={this.handleFormCancel}
              onDelete={this.handleFormDelete}
            />
          }
          {this.state.list.length == 0
          ? <Spinner />
          : <EventList
              list={this.state.list}
              selected={this.state.selected}
              onClick={this.handleListClick}
              onChange={this.handleFormInputChange}
              onSubmit={this.handleFormSubmit}
              onCancel={this.handleFormCancel}
              onDelete={this.handleFormDelete}
              scrollToForm={true}
            />
          }
        </main>
      </div>
    );
  }
}
