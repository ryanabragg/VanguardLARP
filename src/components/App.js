import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';

import api from '../util/api';

import Home from './Home/Home';

import AdminMenu from './Admin/Menu';
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
export default class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      user: {}
    };

    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({user: user});
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Route exact path='/' render={props => <Home {...props} api={api} />} />
          <Route path='/admin' render={props => <AdminMenu {...props} api={api} user={this.state.user} setUser={this.setUser} />} />
          <Switch>
            <Route exact path='/admin' component={AdminDashboard} />
            <Route exact path='/admin/events' render={props => <AdminEvents {...props} api={api} />} />
            <Route path='/admin/events/:id' render={props => <AdminEvents {...props} api={api} />} />
            <Route exact path='/admin/rules' render={props => <AdminRules {...props} api={api} />} />
            <Route path='/admin/rules/:id' render={props => <AdminRules {...props} api={api} />} />
            <Route exact path='/admin/characters' component={PageNotFound} />
            <Route path='/admin/characters/:id' component={PageNotFound} />
          </Switch>
          <Switch>
            <Route exact path='/character' render={props => <Character {...props} api={api} />} />
            <Route path='/character/:id' render={props => <Character {...props} api={api} />} />
          </Switch>
          <NotificationList />
        </div>
      </ThemeProvider>
    );
  }
}