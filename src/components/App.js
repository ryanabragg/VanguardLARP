import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';

import api from '../util/api';

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
      characters: []
    };

    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);

    this.subscribeService = this.subscribeService.bind(this);
    this.loadService = this.loadService.bind(this);

    this.recordCreate = this.recordCreate.bind(this);
    this.recordUpdate = this.recordUpdate.bind(this);
    this.recordPatch = this.recordPatch.bind(this);
    this.recordDelete = this.recordDelete.bind(this);
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
    this.setState({user: user});
  }

  logout() {
    api.logout();
    this.setState({user: {}});
  }

  subscribeService(service, observer) {
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

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Route exact path='/' render={props => {
            return <Home {...props}
              events={this.state.events}
              loadService={this.loadService} />;
          }} />
          <Route path='/admin' component={AdminNavigation} />
          <Switch>
            <Route exact path='/admin' component={AdminDashboard} />
            <Route exact path='/admin/events' render={props => {
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
            }} />
            <Route exact path='/admin/events/:id' render={props => {
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
            }} />
            <Route exact path='/admin/rules' render={props => {
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
            }} />
            <Route exact path='/admin/rules/:id' render={props => {
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
            }} />
            <Route exact path='/admin/characters' component={PageNotFound} />
            <Route exact path='/admin/characters/:id' component={PageNotFound} />
          </Switch>
          <Switch>
            <Route exact path='/character' render={props => {
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
            }} />
            <Route exact path='/character/:id' render={props => {
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
            }} />
            <Route exact path='/character/link/:link' render={props => {
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
            }} />
          </Switch>
          <Route path='/login' render={props => {
            return <Login {...props}
              register={api.register}
              login={api.login}
              user={this.state.user}
              setUser={this.setUser} />;
          }} />
          <Route path='/register' render={props => {
            return <Login {...props}
              register={api.register}
              login={api.login}
              user={this.state.user}
              setUser={this.setUser} />;
          }} />
          <NotificationList />
        </div>
      </ThemeProvider>
    );
  }
}

App.defaultProps = {
  events: [],
  rules: []
};

App.propTypes = {
  events: PropTypes.array,
  rules: PropTypes.array
};

export default App;
