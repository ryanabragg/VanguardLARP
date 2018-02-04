import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import Spinner from '../styled/Spinner';
import EventList from './styled/EventList';
import RecordMenu from './styled/RecordMenu';

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
      if(payload.data._createdBy == this.props.user._id)
        notification = {
          type: 'success',
          title: 'Created',
          message: payload.data.date + ': ' + payload.data.location,
          action: 'UNDO',
          actionFunction: (param) => this.deleteEvent(param),
          actionParam: payload.data._id
        };
      break;
    case 'updated':
      if(payload.data._id == this.state.selected._id && payload.data._modifiedBy != this.props.user._id)
        notification = {
          timeoutDuration: 0,
          type: 'warning',
          title: 'Updated',
          message: 'The event you are viewing has been modified. Apply changes to view the new values.',
          action: 'APPLY',
          actionFunction: (param) => this.selectEvent(param),
          actionParam: payload.data._id
        };
      else if(payload.data._id == this.state.selected._id)
        notification = {
          type: 'success',
          title: 'Updated',
          message: payload.data.date + ': ' + payload.data.location,
          action: 'UNDO',
          actionFunction: (param) => {this.updateEvent(param); this.selectEvent(payload.data._id);},
          actionParam: payload.previous
        };
      break;
    case 'removed':
      if(payload.data._id == this.state.selected._id && payload.data._modifiedBy != this.props.user._id)
        notification = {
          timeoutDuration: 0,
          type: 'alert',
          title: 'Deleted',
          message: 'The event you were viewing has been deleted.',
          action: 'UNDO',
          actionFunction: (param) => this.createEvent(param),
          actionParam: payload.data
        };
      else if(payload.data._id == this.state.selected._id) {
        notification = {
          type: 'success',
          title: 'Deleted',
          message: payload.data.date + ': ' + payload.data.location,
          action: 'UNDO',
          actionFunction: (param) => this.createEvent(param),
          actionParam: payload.data
        };
        this.setState((prevState, props) => {
          let nextState = Object.assign({}, prevState);
          nextState.selected = Object.assign({}, this.emptyEvent);
          return nextState;
        });
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
    this.props.create('events', event, (error, record) => {
      if(error)
        NotificationList.alert(error.name, 'Failed to create event.');
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
    this.props.update('events', event, (error, record) => {
      if(error)
        NotificationList.alert(error.name, 'Failed to update event.');
    });
  }

  deleteEvent(id) {
    if(!id)
      return;
    this.props.remove('events', id, (error, record) => {
      if(error)
        NotificationList.alert(error.name, 'Failed to delete event.');
    });
  }

  handleListClick (e) {
    e.preventDefault();
    this.selectEvent(e.target.id);
  }

  handleFormInputChange(payload) {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected[payload.type] = payload.data;
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
    const list = (
      <EventList
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
    );

    const selected = (
      <EventList
        list={[this.state.selected]}
        selected={this.state.selected}
        onClick={this.handleListClick}
        onChange={this.handleFormInputChange}
        onSubmit={this.handleFormSubmit}
        onCancel={this.handleFormCancel}
        onDelete={this.handleFormDelete}
      />
    );

    return (
      <div>
        <Helmet>
            <title>Events Admin | Vanguard LARP</title>
        </Helmet>
        <main>
          <RecordMenu direction='vertical'
            user={this.props.user}
            logout={this.props.logout}
            reload={this.reloadService}
            new={this.handleFormNew}
            submit={this.state.selected._id ? this.handleFormSubmit : undefined}
            cancel={this.state.selected._id ? this.handleFormCancel : undefined}
            delete={this.state.selected._id ? this.handleFormDelete : undefined}
          />
          {this.state.selected._id != 'new' ? null : selected}
          {this.props.events.length == 0 ? <Spinner /> : list}
        </main>
      </div>
    );
  }
}

Events.defaultProps = {
  user: {},
  events: []
};

Events.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  events: PropTypes.array,
  subscribeService: PropTypes.func.isRequired,
  loadService: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  patch: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Events;
