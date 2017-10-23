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
      block: '',
      category: '',
      group: '',
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

    this.state = {
      search: {
        modified: '',
        name: '',
        text: ''
      },
      selected: Object.assign({}, this.emptyRule)
    };

    this.ruleObserver = this.ruleObserver.bind(this);
    this.reloadService = this.reloadService.bind(this);

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
    this.unsubscribe = this.props.subscribeService('rules', this.ruleObserver);
    this.props.loadService('rules');
    if(this.props.match.params.hasOwnProperty('id'))
      this.selectRule(this.props.match.params.id);
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  ruleObserver(payload) {
    let notification = undefined;
    switch(payload.type) {
    case 'created':
      if(payload.data._createdBy == this.props.user._id)
        notification = {
          type: 'success',
          title: 'Created',
          message: payload.data.category + ': ' + payload.data.name,
          action: 'UNDO',
          actionFunction: (param) => this.deleteRule(param),
          actionParam: payload.data._id
        };
      break;
    case 'updated':
      if(payload.data._id == this.state.selected._id && payload.data._modifiedBy != this.props.user._id)
        notification = {
          timeoutDuration: 0,
          type: 'warning',
          title: 'Updated',
          message: 'The rule you are viewing has been modified. Apply changes to view the new values.',
          action: 'APPLY',
          actionFunction: (param) => this.selectRule(param),
          actionParam: payload.data._id
        };
      else if(payload.data._id == this.state.selected._id)
        notification = {
          type: 'success',
          title: 'Updated',
          message: payload.data.category + ': ' + payload.data.name,
          action: 'UNDO',
          actionFunction: (param) => {this.updateRule(param); this.selectRule(payload.data._id);},
          actionParam: payload.previous
        };
      break;
    case 'removed':
      if(payload.data._id == this.state.selected._id && payload.data._modifiedBy != this.props.user._id)
        notification = {
          timeoutDuration: 0,
          type: 'alert',
          title: 'Deleted',
          message: 'The rule you were viewing has been deleted.',
          action: 'UNDO',
          actionFunction: (param) => this.createRule(param),
          actionParam: payload.data
        };
      else if(payload.data._id == this.state.selected._id) {
        notification = {
          type: 'success',
          title: 'Deleted',
          message: payload.data.category + ': ' + payload.data.name,
          action: 'UNDO',
          actionFunction: (param) => this.createRule(param),
          actionParam: payload.data
        };
        this.setState((prevState, props) => {
          let nextState = Object.assign({}, prevState);
          nextState.selected = Object.assign({}, this.emptyRule);
          return nextState;
        });
      }
      break;
    }
    if(notification)
      NotificationList.notify(notification);
  }

  reloadService() {
    this.props.loadService('rules', true);
  }

  createRule(rule) {
    this.props.create('rules', rule, (error, record) => {
      if(error)
        NotificationList.alert(error.name, 'Failed to create rule.');
    });
  }

  selectRule(id) {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected = Object.assign({}, this.props.rules.filter(rule => rule._id == id)[0]);
      return nextState;
    });
  }

  updateRule(rule) {
    this.props.update('rules', rule, (error, record) => {
      if(error)
        NotificationList.alert(error.name, 'Failed to update rule.');
    });
  }

  deleteRule(id) {
    if(!id)
      return;
    this.props.remove('rules', id, (error, record) => {
      if(error)
        NotificationList.alert(error.name, 'Failed to delete rule.');
    });
  }

  handleListClick (e) {
    e.preventDefault();
    this.selectRule(e.target.id);
  }

  handleFormInputChange(e) {
    e.stopPropagation();
    let target = e.target; // e not available during callback
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected[target.name] = target.type === 'checkbox' ? target.checked : target.value;
      return nextState;
    });
  }

  handleFormSubmit() {
    let rule = Object.assign({}, this.state.selected);
    rule.build = Number(rule.build);
    rule.tags = Number(rule.tags);
    rule.block = Number(rule.block);
    rule.prodigy = Number(rule.prodigy);
    rule.max = Number(rule.max);
    
    if(rule._id == 'new') {
      delete rule._id;
      this.createRule(rule);
    }
    else if(!this.props.rules.filter(item => item._id == rule._id).length)
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
            <button type='button' value='refresh' onClick={this.reloadService}>
              Reload
            </button>
            <button type='button' value='new' onClick={this.handleFormNew}>
              Add Rule
            </button>
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
          {this.props.rules.length == 0
          ? <Spinner />
          : <RuleList
              list={this.props.rules.sort((a, b) => {
                return a.race > b.race ? 1
                  : b.race > a.race ? -1
                  : a.culture > b.culture ? 1
                  : b.culture > a.culture ? -1
                  : a.category > b.category ? 1
                  : b.category > a.category ? -1
                  : a.group > b.group ? 1
                  : b.group > a.group ? -1
                  : a.tier > b.tier ? 1
                  : b.tier > a.tier ? -1
                  : a.name > b.name ? 1
                  : b.name > a.name ? -1
                  : 0;
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

Rules.defaultProps = {
  user: {},
  rules: []
};

/* match prop added by Route
 */
Rules.propTypes = {
  user: PropTypes.object,
  rules: PropTypes.array,
  subscribeService: PropTypes.func.isRequired,
  loadService: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  patch: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default Rules;
