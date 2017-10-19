import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../styled/Spinner';
import EventList from './styled/EventList';

// import the notifications component to access static methods (don't import styled version)
import NotificationList from '../util/NotificationList';

class Events extends React.Component {
  constructor (props) {
    super(props);

    this.emptyEvent = {
      _id: '',
      date: '',
      location: '',
      area: '',
    };

    this.state = {
      search: {
        modified: '',
        name: '',
        text: ''
      },
      selected: Object.assign({}, this.emptyEvent)
    };

    this.eventObserver = this.eventObserver.bind(this);
    this.reloadService = this.reloadService.bind(this);

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
    this.unsubscribe = this.props.subscribeService('events', this.eventObserver);
    this.props.loadService('events');
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  eventObserver(payload) {
    let notification = undefined;
    switch(payload.type) {
    case 'created':
      break;
    case 'updated':
      if(payload.data._id == this.state.selected._id && payload.data._id != this.update) {
        this.update = undefined;
        notification = {
          timeout: 0,
          type: 'warning',
          title: 'Updated',
          message: 'The event you are viewing has been modified. Clicking Submit without applying changes will override them.',
          action: 'APPLY CHANGES',
          actionFunction: (param) => this.selectEvent(param),
          actionParam: payload.data._id
        };
      }
      break;
    case 'removed':
      if(payload.data._id == this.state.selected._id && payload.data._id != this.delete) {
        this.delete = undefined;
        notification = {
          timeout: 0,
          type: 'alert',
          title: 'Deleted',
          message: 'The event you are viewing has been deleted. Clicking Submit will recreate it.'
        };
      }
      break;
    }
    if(notification)
      NotificationList.notify(notification);
  }

  reloadService() {
    this.props.loadService('events', true);
  }

  createEvent(event) {
    this.props.create('events', event, (error, created) => {
      if(error)
        NotificationList.alert(error.name, 'Create Error');
      else {
        NotificationList.notify({
          type: 'success',
          title: 'Created',
          message: created.date + ': ' + created.location,
          action: 'UNDO',
          actionFunction: (param) => this.deleteEvent(param),
          actionParam: event._id
        });
      }
    });
  }

  selectEvent(id) {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected = Object.assign({}, this.props.events.filter(event => event._id == id)[0]);
      return nextState;
    });
  }

  updateEvent(event) {
    const preUpdate = Object.assign({}, this.props.events.filter(item => item._id == event._id)[0]);
    this.props.update('events', event, (error, updated) => {
      if(error)
        NotificationList.alert(error.name, 'Update Error');
      else {
        this.update = updated._id;
        NotificationList.notify({
          type: 'success',
          title: 'Updated',
          message: updated.date + ': ' + updated.location,
          action: 'UNDO',
          actionFunction: (param) => {this.updateEvent(param); this.selectEvent(updated._id);},
          actionParam: preUpdate
        });
      }
    });
  }

  deleteEvent(id) {
    if(!id)
      return;
    this.props.remove('events', id, (error, deleted) => {
      if(error)
        NotificationList.alert(error.name, 'Delete Error');
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
          message: deleted.date + ': ' + deleted.location,
          action: 'UNDO',
          actionFunction: (param) => this.createEvent(param),
          actionParam: deleted
        });
      }
    });
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
    else if(!this.props.events.filter(item => item._id == event._id))
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
            <button type='button' value='reload' onClick={this.reloadService}>
              Reload
            </button>
            <button type='button' value='new' onClick={this.handleFormNew}>
              Add Event
            </button>
            <div data-events='@todo search events'>
            </div>
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
          {this.props.events.length == 0
          ? <Spinner />
          : <EventList
              list={this.props.events.sort((a, b) => {
                return a.date > b.date ? 1 : -1;
              })}
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

Events.defaultProps = {
  events: []
};

Events.propTypes = {
  events: PropTypes.array,
  subscribeService: PropTypes.func.isRequired,
  loadService: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  patch: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Events;
