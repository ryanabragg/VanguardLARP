import React from 'react';

import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';

import UUID from 'uuid/v1';

import RuleList from './styled/RuleList';
import Spinner from '../styled/Spinner';

import NotificationList from './styled/NotificationList';
import Notification from '../Notification';

const socket = io('localhost:3030');
const app = feathers().configure(socketio(socket));

export default class Rules extends React.Component {
  constructor (props) {
    super(props);

    this.blankObj = {
      _id: '',
      name: '',
      build: '',
      delivery: '',
      category: '', // constant, weapon, aptitude, source mark, craft, combat pool, domain, advanced art, racial, hidden
      group: '', // pool/domain name
      tier: '',
      race: '',
      culture: '',
      description: '',
      max: '', // @todo the complex components for editing the props after this
      extraUses: '', // extra uses based on +((count of key) / value) where key can be _id, category, or group (for pools, will add to tags)
      requires: '', // list of value purchases of key needed to add to a character where key can be _id, category, group, or type
      requeresAny: '', // like requires, but allows for adding to a character if any key-value pair matches
      conflicts: '', // can't add to character if any value matches
      replaces: '', // adding this to a character will remove the listed values, and increment count for each removed
      grants: '' // adding this to a character will add each value as well
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
      alerts: [],
      list: [],
      search: {
        modified: '',
        name: '',
        text: ''
      },
      selected: Object.assign({}, this.blankObj)
    };

    this.startSync = this.startSync.bind(this);
    this.sync = this.sync.bind(this);

    this.createObj = this.createObj.bind(this);
    this.selectObj = this.selectObj.bind(this);
    this.updateObj = this.updateObj.bind(this);
    this.deleteObj = this.deleteObj.bind(this);

    this.handleListClick = this.handleListClick.bind(this);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleFormDelete = this.handleFormDelete.bind(this);
    this.handleFormNew = this.handleFormNew.bind(this);

    this.removeAlert = this.removeAlert.bind(this);

    this.renderObj = this.renderObj.bind(this);
    this.renderObjForm = this.renderObjForm.bind(this);
  }

  componentDidMount() {
    app.service('rules').on('created', obj => {
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(this.syncInProgress)
          this.syncData.add = this.syncData.add.concat(obj);
        else
          nextState.list = prevState.list.concat(obj);
        return nextState;
      });
    });

    app.service('rules').on('patched', obj => {
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(obj._id === prevState.selected._id) {
          nextState.alerts = prevState.alerts.concat({
            key: UUID(),
            added: Date.now(),
            timeout: 7000,
            type: 'alert',
            title: 'Updated',
            message: 'The rule you are viewing has been modified.',
            action: 'APPLY',
            actionType: 'select',
            data: obj
          });
        }
        if(this.syncInProgress)
          this.syncData.modify = this.syncData.modify.concat(obj);
        else
          nextState.list[prevState.list.map(item => item._id).indexOf(obj._id)] = Object.assign({}, obj);
        return nextState;
      });
    });

    app.service('rules').on('removed', obj => {
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(obj._id === prevState.selected._id) {
          nextState.alerts = prevState.alerts.concat({
            key: UUID(),
            added: Date.now(),
            timeout: 7000,
            type: 'alert',
            title: 'Deleted',
            message: 'The rule you are viewing has been deleted.',
            action: 'UNDO',
            actionType: 'create',
            data: obj
          });
        }
        else {
          nextState.list = !this.syncInProgress ? prevState.list.filter(old => obj._id != old._id) : prevState.list;
          this.syncData.remove = this.syncInProgress ? this.syncData.remove.concat(obj) : this.syncData.remove;
        }
        return nextState;
      });
    });

    this.startSync();
  }

  componentWillUnmount () {
    app.service('rules').removeListener('created');
    app.service('rules').removeListener('patched');
    app.service('rules').removeListener('removed');
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
    app.service('rules').find({query:{$sort:{category: 1, group: 1, name: 1},$limit:this.syncData.paginate,$skip:this.syncData.progress.length}}).then(page => {
      this.syncData.total = page.total;
      this.syncData.progress = this.syncData.progress.concat(page.data);
      if(this.syncData.total == this.syncData.progress.length + this.syncData.add.length - this.syncData.remove.length) {
        clearInterval(this.syncInProgress);
        this.syncInProgress = 0;
        let modifyIDs = this.syncData.modify.map(obj => obj._id);
        let removeIDs = this.syncData.remove.map(obj => obj._id);
        this.setState((prevState, props) => {
          let nextState = Object.assign({}, prevState);
          nextState.list = this.syncData.progress
            .filter(obj => removeIDs.indexOf(obj._id) === -1)
            .filter(obj => modifyIDs.indexOf(obj._id) === -1)
            .concat(this.syncData.modify)
            .concat(this.syncData.add);
          return nextState;
        });
      }
    });
  }

  createObj(obj) {
    app.service('rules').create(
      obj,
      (error, created) => {
        this.setState((prevState, props) => {
          let nextState = Object.assign({}, prevState);
          if(error) {
            nextState.alerts = prevState.alerts.concat({
              key: UUID(),
              added: Date.now(),
              type: 'alert',
              title: 'Create',
              message: error
            });
          }
          else {
            //nextState.selected = Object.assign({}, this.blankObj);
            nextState.alerts = prevState.alerts.concat({
              key: UUID(),
              added: Date.now(),
              timeout: 2000,
              type: 'success',
              title: 'Created',
              message: created.category + ': ' + created.name,
              action: 'UNDO',
              service: 'rules',
              actionType: 'delete',
              data: created
            });
          }
          return nextState;
        });
      }
    );
  }

  selectObj(id) {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected = prevState.list.filter(obj => obj._id == id)[0];
      return nextState;
    });
  }

  updateObj(obj) {
    const old = Object.assign({}, this.state.list.filter(item => item._id == obj._id)[0]);
    app.service('rules').patch(
      obj._id,
      obj,
      (error, updated) => {
        this.setState((prevState, props) => {
          let nextState = Object.assign({}, prevState);
          if(error) {
            nextState.alerts = prevState.alerts.concat({
              key: UUID(),
              added: Date.now(),
              type: 'alert',
              title: 'Update',
              message: error
            });
          }
          else {
            nextState.selected = Object.assign({}, this.blankObj);
            nextState.alerts = prevState.alerts.concat({
              key: UUID(),
              added: Date.now(),
              timeout: 2000,
              type: 'success',
              title: 'Updated',
              message: updated.category + ': ' + updated.name,
              action: 'UNDO',
              service: 'rules',
              actionType: 'update',
              data: old
            });
          }
          return nextState;
        });
      }
    );
  }

  deleteObj(id) {
    if(!id)
      return;
    app.service('rules').remove(
      id,
      (error, deleted) => {
        this.setState((prevState, props) => {
          let nextState = Object.assign({}, prevState);
          if(error) {
            nextState.alerts = prevState.alerts.concat({
              key: UUID(),
              added: Date.now(),
              type: 'alert',
              title: 'Delete',
              message: error
            });
          }
          else {
            nextState.selected = Object.assign({}, this.blankObj);
            nextState.alerts = prevState.alerts.concat({
              key: UUID(),
              added: Date.now(),
              timeout: 7000,
              type: 'success',
              title: 'Deleted',
              message: deleted.category + ': ' + deleted.name,
              action: 'UNDO',
              service: 'rules',
              actionType: 'create',
              data: deleted
            });
          }
          return nextState;
        });
      }
    );
  }

  handleListClick (e) {
    e.preventDefault();
    this.selectObj(e.target.id);
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
    let obj = Object.assign({}, this.state.selected);
    if(obj._id == 'new') {
      delete obj._id;
      this.createObj(obj);
    }
    else
      this.updateObj(obj);
  }

  handleFormCancel() {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected = Object.assign({}, this.blankObj);
      return nextState;
    });
  }

  handleFormDelete() {
    this.deleteObj(this.state.selected._id);
  }

  handleFormNew() {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected = Object.assign({}, this.blankObj);
      nextState.selected._id = 'new';
      return nextState;
    });
  }

  removeAlert(key) {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.alerts = prevState.alerts.filter(alert => alert.key != key);
      return nextState;
    });
  }

  renderObj(obj) {
    return (
      <div key={obj._id} name='rule' onClick={this.handleListClick}>
        <div id={obj._id} name='name'>
          {obj.name || <span data-rule='placeholder' id={obj._id}>name</span>}
        </div>
        <div id={obj._id} name='category'>
          {obj.category || <span data-rule='placeholder' id={obj._id}>category</span>}
        </div>
        <div id={obj._id} name='group'>
          {obj.group || <span data-rule='placeholder' id={obj._id}>group</span>}
        </div>
        <div id={obj._id} name='tier'>
          {obj.tier || <span data-rule='placeholder' id={obj._id}>tier</span>}
        </div>
        <div id={obj._id} name='race'>
          {obj.race || <span data-rule='placeholder' id={obj._id}>race</span>}
        </div>
        <div id={obj._id} name='culture'>
          {obj.culture || <span data-rule='placeholder' id={obj._id}>culture</span>}
        </div>
      </div>
    );
  }

  renderObjForm(rule) {
    return (
      <form key={rule._id} name='rule' onSubmit={rule.handleFormSubmit}>
        <fieldset>
          <label>Name</label>
          <input type='text'
            name='name'
            onChange={this.handleFormInputChange}
            value={rule.name}
          />
          <label>Build</label>
          <input type='number'
            name='build'
            onChange={this.handleFormInputChange}
            value={rule.build}
          />
          <label>Delivery</label>
          <input type='text'
            name='delivery'
            onChange={this.handleFormInputChange}
            value={rule.delivery}
          />
        </fieldset>
        <fieldset>
          <label>Category</label>
          <input type='text'
            name='category'
            onChange={this.handleFormInputChange}
            value={rule.category}
          />
          <label>Group</label>
          <input type='text'
            name='group'
            onChange={this.handleFormInputChange}
            value={rule.group}
          />
          <label>Tier</label>
          <input type='text'
            name='tier'
            onChange={this.handleFormInputChange}
            value={rule.tier}
          />
        </fieldset>
        <fieldset>
          <label>Race</label>
          <input type='text'
            name='race'
            onChange={this.handleFormInputChange}
            value={rule.race}
          />
          <label>Culture</label>
          <input type='text'
            name='culture'
            onChange={this.handleFormInputChange}
            value={rule.culture}
          />
        </fieldset>
        <fieldset data-rule='description'>
          <label>Description</label>
          <textarea rows="10" cols="50"
            name='description'
            onChange={this.handleFormInputChange}
            value={rule.description}
          />
        </fieldset>
        <fieldset>
          <label>Max</label>
          <input type='number'
            name='max'
            onChange={this.handleFormInputChange}
            value={rule.max}
          />
        </fieldset>
        <fieldset>
          <label>Extra Uses</label>
          <input type='text'
            name='extraUses'
            onChange={this.handleFormInputChange}
            value={rule.extraUses}
          />
        </fieldset>
        <fieldset>
          <label>Requires</label>
          <input type='text'
            name='requires'
            onChange={this.handleFormInputChange}
            value={rule.requires}
          />
          <label>Requires Any Of</label>
          <input type='text'
            name='requeresAny'
            onChange={this.handleFormInputChange}
            value={rule.requeresAny}
          />
          <label>Conflicts With</label>
          <input type='text'
            name='conflicts'
            onChange={this.handleFormInputChange}
            value={rule.conflicts}
          />
        </fieldset>
        <fieldset>
          <label>Replaces</label>
          <input type='text'
            name='replaces'
            onChange={this.handleFormInputChange}
            value={rule.replaces}
          />
          <label>Grants</label>
          <input type='text'
            name='grants'
            onChange={this.handleFormInputChange}
            value={rule.grants}
          />
        </fieldset>
        <button type='button' value="submit" onClick={this.handleFormSubmit}>Submit</button>
        <button type='button' value="cancel" onClick={this.handleFormCancel}>Cancel</button>
        <button type='button' value="delete" onClick={this.handleFormDelete}>Delete</button>
      </form>
    );
  }

  render() {
    return (
      <div>
        <main>
          <div data-rules='manage'>
            <button type='button' value='refresh' onClick={this.startSync}>Refresh</button>
            <button type='button' value='new' onClick={this.handleFormNew}>Add Rule</button>
            <div data-rules='@todo search rules'></div>
          </div>
          <RuleList {...this.props} data-rules='new'>
            {this.state.selected._id == 'new' ? this.renderObjForm(this.state.selected) : null}
          </RuleList>
          <RuleList {...this.props} data-rules='list'>
            {this.syncData.progress.length > 0 ? Spinner : null}
            {this.state.list.length == 0 ? null : this.state.list.map(obj => {
              return obj._id == this.state.selected._id ? this.renderObjForm(obj) : this.renderObj(obj);
            })}
          </RuleList>
          {!this.state.alerts.length ? null :
            <NotificationList>
              {this.state.alerts.map((alert, index) => {
                let actionClick = null;
                switch(alert.actionType) {
                  case 'create':
                    actionClick = () => {
                      this.createObj(alert.data);
                      this.removeAlert(alert.key);
                    };
                    break;
                  case 'select':
                    actionClick = () => {
                      this.selectObj(alert.data);
                      this.removeAlert(alert.key);
                    };
                    break;
                  case 'update':
                    actionClick = () => {
                      this.updateObj(alert.data);
                      this.removeAlert(alert.key);
                    };
                    break;
                  case 'delete':
                    actionClick = () => {
                      this.deleteObj(alert.data._id);
                      this.removeAlert(alert.key);
                    };
                    break;
                  case 'dismiss':
                    actionClick = () => {
                      this.removeAlert(alert.key);
                    };
                    break;
                }
                return (
                  <Notification
                    key={alert.key}
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    action={alert.action}
                    actionClick={actionClick}
                    timeoutDuration={Math.max(0, alert.added - Date.now() + (alert.timeout || 3000) + index * 1000)}
                    timeoutFunction={this.removeAlert.bind(this, alert.key)}
                    showDismiss={!alert.action}
                  />
                );
              })}
            </NotificationList>
          }
        </main>
      </div>
    );
  }
}
