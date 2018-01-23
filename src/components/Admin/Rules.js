import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../styled/Spinner';
import RuleList from './styled/RuleList';
import RecordMenu from './styled/RecordMenu';

// import the notifications component to access static methods (don't import styled version)
import NotificationList from '../util/NotificationList';

class Rules extends React.Component {
  constructor (props) {
    super(props);

    this.emptyRule = {
      _id: '',
      name: '',
      build: 0,
      max: 0,
      category: '',
      group: '',
      tier: '',
      level: 0,
      roleplay: 0,
      effect: '',
      race: '',
      culture: '',
      delivery: '',
      verbal: '',
      uses: 0,
      usesExtra: 0,
      usesPerXAptitudes: 0,
      usesType: '',
      description: '',
      requires: '',
      requeresAny: '',
      conflicts: '',
      removes: '',
      grants: '',
      grantsUseOf: '',
      increaseMax: '',
      disable: false,
      hidden: false
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
        NotificationList.alert(error.errors[0], 'Failed to create rule.');
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
        NotificationList.alert(error.errors[0], 'Failed to update rule.');
    });
  }

  deleteRule(id) {
    if(!id)
      return;
    this.props.remove('rules', id, (error, record) => {
      if(error)
        NotificationList.alert(error.errors[0], 'Failed to delete rule.');
    });
  }

  handleListClick (e) {
    e.preventDefault();
    this.selectRule(e.target.id);
  }

  handleFormInputChange(payload) {
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);
      nextState.selected[payload.type] = payload.data;
      return nextState;
    });
  }

  handleFormSubmit() {
    let rule = Object.assign({}, this.state.selected);
    
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
    const stringSorter = (a, b) => {
      return a > b ? 1 : a < b ? -1 : 0;
    };

    const list = (
      <RuleList
        list={this.props.rules.sort((a, b) => {
          const race = stringSorter(a.race, b.race);
          const culture = stringSorter(a.culture, b.culture);
          const category = stringSorter(a.category, b.category);
          const group = stringSorter(a.group, b.group);
          const tier = stringSorter(a.tier, b.tier);
          const name = stringSorter(a.name, b.name);
          return race || culture || category || group || tier || name || 0;
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
      <RuleList
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
        <main>
          <RecordMenu
            user={this.props.user}
            logout={this.props.logout}
            reload={this.reloadService}
            new={this.handleFormNew}
            submit={this.state.selected._id ? this.handleFormSubmit : undefined}
            cancel={this.state.selected._id ? this.handleFormCancel : undefined}
            delete={this.state.selected._id ? this.handleFormDelete : undefined}
          />
          {this.state.selected._id != 'new' ? null : selected}
          {this.props.rules.length == 0 ? <Spinner /> : list}
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
  logout: PropTypes.func.isRequired,
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
