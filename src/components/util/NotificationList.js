import React from 'react';

import UUID from 'uuid/v1';

import Notification from './Notification';

import createStore from '../../util/createStore';

const NotificationListReducerInsert = (state = [], action) => {
  return [...state, action.data];
};

const NotificationListReducerRemove = (state = [], action) => {
  let elemToRemoveArray = state.slice().filter(item => item.id === action.data);
  if (Array.isArray(elemToRemoveArray)) {
    let elemToRemoveIndex = state.indexOf(elemToRemoveArray[0]);
    return [
      ...state.slice(0, elemToRemoveIndex),
      ...state.slice(elemToRemoveIndex + 1)
    ];
  }
  return state;
};

const NotificationListReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD':
    return NotificationListReducerInsert(state, action);
  case 'REMOVE':
    return NotificationListReducerRemove(state, action);
  case 'REMOVEALL':
    return [];
  default:
    return state;
  }
};

const NotificationListStore = createStore(NotificationListReducer);

const NotificationListAdd = (notification) => {
  const id = UUID();
  const data = Object.assign({}, notification, { id: id });
  NotificationListStore.dispatch({
    type: 'ADD',
    data: data
  });
  return id;
};

const NotificationListRemove = (id) => {
  NotificationListStore.dispatch({
    type: 'REMOVE',
    data: id
  });
};

const NotificationListRemoveAll = () => {
  NotificationListStore.dispatch({
    type: 'REMOVEALL'
  });
};

class NotificationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  componentDidMount() {
    this.unsubscribeStore = NotificationListStore.subscribe(() => {
      this.setState({
        list: (NotificationListStore.view()).slice()
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  render() {
    return (
      <div {...this.props}>
        {this.state.list.map(notice => (
          <Notification
            key={notice.id}
            id={notice.id}
            type={notice.type}
            title={notice.title}
            message={notice.message}
            action={notice.action}
            actionFunction={notice.actionFunction}
            actionParam={notice.actionParam}
            timeoutDuration={notice.timeoutDuration}
            timeoutFunction={notice.timeoutFunction}
            dismiss={NotificationListRemove}
            showDismiss={notice.showDismiss}
          />
        ))}
      </div>
    );
  }
}

NotificationList.notify = (notification) => {
  if(!notification.message)
    return undefined;
  return NotificationListAdd(notification);
};

NotificationList.info = (message, title = '') => {
  return NotificationListAdd({
    type: 'info',
    title: title,
    message: message
  });
};

NotificationList.success = (message, title = '') => {
  return NotificationListAdd({
    type: 'success',
    title: title,
    message: message
  });
};

NotificationList.warning = (message, title = '') => {
  return NotificationListAdd({
    type: 'warning',
    title: title,
    message: message
  });
};

NotificationList.alert = (message, title = '') => {
  return NotificationListAdd({
    type: 'alert',
    title: title,
    message: message
  });
};

NotificationList.clear = () => {
  return NotificationListRemoveAll();
};

export default NotificationList;
