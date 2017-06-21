import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';

import Home from './Home/Home';

import AdminMenu from './Admin/Menu';
import AdminDashboard from './Admin/Dashboard';
import AdminEvents from './Admin/Events';

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
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Route exact path='/' component={Home}/>
          <Route path='/admin' component={AdminMenu} />
          <Switch>
            <Route exact path='/admin' component={AdminDashboard} />
            <Route exact path='/admin/events' component={AdminEvents} />
            <Route path='/admin/events/:id' component={AdminEvents} />
            <Route exact path='/admin/rules' component={PageNotFound} />
            <Route path='/admin/rules/:id' component={PageNotFound} />
            <Route exact path='/admin/characters' component={PageNotFound} />
            <Route path='/admin/characters/:id' component={PageNotFound} />
          </Switch>
          <Route exact path='/character' component={PageNotFound} />
          <Route exact path='/character/:id' component={PageNotFound} />
        </div>
      </ThemeProvider>
    );
  }
}