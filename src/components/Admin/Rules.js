import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../styled/Spinner';
import RuleList from './styled/RuleList';

// import the notifications component to access static methods (don't import styled version)
import NotificationList from '../util/NotificationList';

class Rules extends React.Component {
  constructor (props) {
    super(props);

    this.emptyRule = {
      _id: '',
      name: '',
      build: '',
      delivery: '',
      tags: '',
      category: '', // constant, weapon, aptitude, source mark, craft, combat pool, domain, advanced art, racial, hidden
      group: '', // pool/domain name
      tier: '',
      race: '',
      culture: '',
      prodigy: '',
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
      list: [],
      search: {
        modified: '',
        name: '',
        text: ''
      },
      selected: Object.assign({}, this.emptyRule)
    };

    this.startSync = this.startSync.bind(this);
    this.sync = this.sync.bind(this);

    this.createRule = this.createRule.bind(this);
    this.selectRule = this.selectRule.bind(this);
    this.updateRule = this.updateRule.bind(this);
    this.deleteRule = this.deleteRule.bind(this);

    this.handleListClick = this.handleListClick.bind(this);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleFormDelete = this.handleFormDelete.bind(this);
    this.handleFormNew = this.handleFormNew.bind(this);
  }

  componentDidMount() {
    this.props.api.service('rules').on('created', rule => {
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(this.syncInProgress)
          this.syncData.add = this.syncData.add.concat(rule);
        else
          nextState.list = prevState.list.concat(rule);
        return nextState;
      });
    });

    this.props.api.service('rules').on('patched', rule => {
      let notification = undefined;
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(rule._id === prevState.selected._id && rule._id != this.update) {
          this.update = undefined;
          notification = {
            timeout: 0,
            type: 'warning',
            title: 'Updated',
            message: 'The rule you are viewing has been modified. Clicking Submit without applying changes will override them.',
            action: 'APPLY CHANGES',
            actionFunction: (param) => this.selectRule(param),
            actionParam: rule._id
          };
        }
        if(this.syncInProgress)
          this.syncData.modify = this.syncData.modify.concat(rule);
        else
          nextState.list[prevState.list.map(item => item._id).indexOf(rule._id)] = Object.assign({}, rule);
        return nextState;
      }, () => {
        if(notification)
          NotificationList.notify(notification);
      });
    });

    this.props.api.service('rules').on('removed', rule => {
      let notification = undefined;
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        if(rule._id === prevState.selected._id && rule._id != this.delete) {
          this.delete = undefined;
          notification = {
            timeout: 0,
            type: 'alert',
            title: 'Deleted',
            message: 'The rule you are viewing has been deleted. Clicking Submit will recreate it.'
          };
        }
        if(this.syncInProgress)
          this.syncData.remove = this.syncData.remove.concat(rule);
        else
          nextState.list = prevState.list.filter(listed => rule._id != listed._id);
        return nextState;
      }, () => {
        if(notification)
          NotificationList.notify(notification);
      });
    });

    this.startSync();
  }

  componentWillUnmount () {
    this.props.api.service('rules').removeListener('created');
    this.props.api.service('rules').removeListener('patched');
    this.props.api.service('rules').removeListener('removed');
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
    this.props.api.service('rules').find({
      query:{
        $sort:{
          race: 1,
          culture: 1,
          category: 1,
          group: 1,
          name: 1
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
        let modifyIDs = this.syncData.modify.map(rule => rule._id);
        let removeIDs = this.syncData.remove.map(rule => rule._id);
        this.setState((prevState, props) => {
          let nextState = Object.assign({}, prevState);
          nextState.list = this.syncData.progress
            .filter(rule => removeIDs.indexOf(rule._id) === -1)
            .filter(rule => modifyIDs.indexOf(rule._id) === -1)
            .concat(this.syncData.modify)
            .concat(this.syncData.add);
          return nextState;
        });
      }
    });
  }

  createRule(rule) {
    this.props.api.service('rules').create(
      rule,
      (error, created) => {
        if(error)
          NotificationList.alert(error.name, 'Create Error');
        else {
          //nextState.selected = Object.assign({}, this.emptyRule);
          NotificationList.notify({
            type: 'success',
            title: 'Created',
            message: created.category + ': ' + created.name,
            action: 'UNDO',
            actionFunction: (param) => this.deleteRule(param),
            actionParam: rule._id
          });
        }
      }
    );
  }

  selectRule(id) {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected = Object.assign({}, prevState.list.filter(rule => rule._id == id)[0]);
      return nextState;
    });
  }

  updateRule(rule) {
    const preUpdate = Object.assign({}, this.state.list.filter(item => item._id == rule._id)[0]);
    this.props.api.service('rules').patch(
      rule._id,
      rule,
      (error, updated) => {
        if(error)
          NotificationList.alert(error.name, 'Update Error');
        else {
          this.update = updated._id;
          NotificationList.notify({
            type: 'success',
            title: 'Updated',
            message: updated.category + ': ' + updated.name,
            action: 'UNDO',
            actionFunction: (param) => {this.updateRule(param); this.selectRule(updated._id)},
            actionParam: preUpdate
          });
        }
      }
    );
  }

  deleteRule(id) {
    if(!id)
      return;
    this.props.api.service('rules').remove(
      id,
      (error, deleted) => {
        if(error)
          NotificationList.alert(error.name, 'Delete Error');
        else {
          this.setState((prevState, props) => {
            let nextState = Object.assign({}, prevState);
            nextState.selected = Object.assign({}, this.emptyRule);
            return nextState;
          });
          this.delete = deleted._id;
          NotificationList.notify({
            type: 'success',
            title: 'Deleted',
            message: deleted.category + ': ' + deleted.name,
            action: 'UNDO',
            actionFunction: (param) => this.createRule(param),
            actionParam: deleted
          });
        }
      }
    );
  }

  handleListClick (e) {
    e.preventDefault();
    this.selectRule(e.target.id);
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
    let rule = Object.assign({}, this.state.selected);
    if(rule._id == 'new') {
      delete rule._id;
      this.createRule(rule);
    }
    else if(!this.state.list.filter(item => item._id == rule._id))
      this.createRule(rule);
    else
      this.updateRule(rule);
  }

  handleFormCancel() {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected = Object.assign({}, this.emptyRule);
      return nextState;
    });
  }

  handleFormDelete() {
    this.deleteRule(this.state.selected._id);
  }

  handleFormNew() {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected = Object.assign({}, this.emptyRule);
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
            <button type='button' value='new' onClick={this.handleFormNew}>Add Rule</button>
            <div data-rules='@todo search rules'></div>
          </div>
          {this.state.selected._id != 'new'
          ? null
          : <RuleList
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
          : <RuleList
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

Rules.propTypes = {
  api: PropTypes.object.isRequired
};

export default Rules;
