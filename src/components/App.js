import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';

import api from '../util/api';

import User from './User/styled/User';
import Login from './User/styled/Login';

import Home from './Home/Home';

import AdminNavigation from './Admin/styled/Navigation';
import AdminDashboard from './Admin/Dashboard';
import AdminEvents from './Admin/Events';
import AdminRules from './Admin/Rules';

import Character from './Character/Character';

import NotificationList from './util/styled/NotificationList';

import PageNotFound from './PageNotFound';

import theme from './theme';

// changes to this CSS aren't reflected by HMR due to being set during SSR
injectGlobal`
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: white;
}
`;

// update ../routes.js to include possible routes
class App extends React.Component {
  constructor (props) {
    super(props);

    this.listeners = [];
    this.observers = [];

    this.state = {
      user: {},
      events: props.events,
      rules: props.rules,
      characters: props.characters
    };

    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);

    this.subscribeService = this.subscribeService.bind(this);
    this.loadService = this.loadService.bind(this);

    this.recordCreate = this.recordCreate.bind(this);
    this.recordUpdate = this.recordUpdate.bind(this);
    this.recordPatch = this.recordPatch.bind(this);
    this.recordDelete = this.recordDelete.bind(this);

    this.renderHome = this.renderHome.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.renderCharacter = this.renderCharacter.bind(this);
    this.renderAdminEvents = this.renderAdminEvents.bind(this);
    this.renderAdminRules = this.renderAdminRules.bind(this);
  }

  componentDidMount() {
    api.getUser().then((user) => {
      this.setState({user: user});
    });
  }

  componentWillUnmount() {
    this.listeners.forEach(service => {
      api.service(service).removeListener('created');
      api.service(service).removeListener('updated');
      api.service(service).removeListener('removed');
    });
    this.listeners = [];
    this.observers = [];
  }

  setUser(user) {
    return new Promise(resolve => this.setState({user: user}, resolve));
  }

  logout() {
    api.logout();
    return new Promise(resolve => this.setState({user: {}}, resolve));
  }

  subscribeService(service, observer = () => null) {
    this.observers.push({service: service, func: observer});
    return () => this.observers = this.observers.filter(item => (
      !(item.service == service && item.func == observer)
    ));
  }

  loadService(service, reload = false) {
    if(-1 == this.listeners.indexOf(service)) {
      this.listeners.push(service);
      api.service(service).on('created', record => {
        this.setState((prevState, props) => {
          let nextState = Object.assign({}, prevState);
          nextState[service] = prevState[service].concat(record);
          return nextState;
        }, () => {
          api.setServiceData(service, this.state[service]);
          this.observers.filter(observer => observer.service == service)
            .forEach(observer => observer.func({type: 'created', data: record}));
        });
      });
      api.service(service).on('updated', record => {
        const previous = Object.assign({}, this.state.rules.filter(rule => rule._id == record._id)[0]);
        this.setState((prevState, props) => {
          let nextState = Object.assign({}, prevState);
          let index = prevState[service].map(item => item._id).indexOf(record._id);
          nextState[service][index] = Object.assign({}, record);
          return nextState;
        }, () => {
          api.setServiceData(service, this.state[service]);
          this.observers.filter(observer => observer.service == service)
            .forEach(observer => observer.func({type: 'updated', data: record, previous: previous}));
        });
      });
      api.service(service).on('removed', record => {
        this.setState((prevState, props) => {
          let nextState = Object.assign({}, prevState);
          nextState[service] = prevState[service].filter(item => item._id != record._id);
          return nextState;
        }, () => {
          api.setServiceData(service, this.state[service]);
          this.observers.filter(observer => observer.service == service)
            .forEach(observer => observer.func({type: 'removed', data: record}));
        });
      });
    }
    return api.getServiceData(service, reload).then(data => {
      this.setState((prevState, props) => {
        let nextState = Object.assign({}, prevState);
        nextState[service] = data;
        return nextState;
      });
    }).catch(error => {
      NotificationList.alert(error.message, error.name);
    });
  }

  recordCreate(service, record, callback) {
    return api.service(service).create(record, callback);
  }

  recordUpdate(service, record, callback) {
    return api.service(service).update(record._id, record, callback);
  }

  recordPatch(service, id = null, data, query = {}, callback) {
    return api.service(service).patch(id, data, {query: query}, callback);
  }

  recordDelete(service, id = null, query = {}, callback) {
    return api.service(service).remove(id, {query: query}, callback);
  }

  renderHome(props) {
    return <Home {...props}
      events={this.state.events}
      loadService={this.loadService} />;
  }

  renderLogin(props) {
    return <Login {...props}
      api={api}
      user={this.state.user}
      setUser={this.setUser} />;
  }

  renderUser(props) {
    return <User {...props}
      api={api}
      user={this.state.user}
      setUser={this.setUser}
      logout={this.logout}
      characters={this.state.characters.filter(c => c._player == this.state.user._id)}
      subscribeService={this.subscribeService}
      loadService={this.loadService} />;
  }

  renderCharacter(props) {
    return <Character {...props}
      user={this.state.user}
      logout={this.logout}
      rules={this.state.rules}
      characters={this.state.characters}
      subscribeService={this.subscribeService}
      loadService={this.loadService}
      create={this.recordCreate}
      update={this.recordUpdate}
      patch={this.recordPatch}
      remove={this.recordDelete} />;
  }

  renderAdminEvents(props) {
    return <AdminEvents {...props}
      user={this.state.user}
      logout={this.logout}
      events={this.state.events}
      subscribeService={this.subscribeService}
      loadService={this.loadService}
      create={this.recordCreate}
      update={this.recordUpdate}
      patch={this.recordPatch}
      remove={this.recordDelete} />;
  }

  renderAdminRules(props) {
    return <AdminRules {...props}
      user={this.state.user}
      logout={this.logout}
      rules={this.state.rules}
      subscribeService={this.subscribeService}
      loadService={this.loadService}
      create={this.recordCreate}
      update={this.recordUpdate}
      patch={this.recordPatch}
      remove={this.recordDelete} />;
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Route path='/admin' component={AdminNavigation} />
          <Switch>
            <Route exact path='/' render={this.renderHome} />
            <Route path='/register' render={this.renderLogin} />
            <Route exact path='/login' render={this.renderLogin} />
            <Route path='/login/reset/:token' render={this.renderLogin} />
            <Route exact path='/account' render={this.renderUser} />
            <Route path='/account/verify/:token' render={this.renderUser} />
            <Route exact path='/character' render={this.renderCharacter} />
            <Route exact path='/character/:id' render={this.renderCharacter} />
            <Route path='/character/link/:link' render={this.renderCharacter} />
            <Route exact path='/admin' component={AdminDashboard} />
            <Route exact path='/admin/events' render={this.renderAdminEvents} />
            <Route path='/admin/events/:id' render={this.renderAdminEvents} />
            <Route exact path='/admin/rules' render={this.renderAdminRules} />
            <Route path='/admin/rules/:id' render={this.renderAdminRules} />
            <Route exact path='/admin/characters' component={PageNotFound} />
            <Route path='/admin/characters/:id' component={PageNotFound} />
          </Switch>
          <NotificationList />
        </div>
      </ThemeProvider>
    );
  }
}

App.defaultProps = {
  events: [],
  rules: [],
  characters: []
};

App.propTypes = {
  events: PropTypes.array,
  rules: PropTypes.array,
  characters: PropTypes.array
};

export default App;
