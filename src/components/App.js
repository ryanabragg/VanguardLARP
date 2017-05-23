import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminDashboard from './AdminDashboard';
import AdminEvents from './AdminEvents';
import Homepage from './Homepage';
import PageNotFound from './PageNotFound';

// check against ../routes.js
export default class App extends React.Component {
  render() {
    return (
      <div className="route-container">
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/admin' component={AdminDashboard} />
          <Route exact path='/admin/events/' component={AdminEvents} />
          <Route path='/admin/events/:id' component={AdminEvents} />
          <Route exactpath='/admin/rules/' component={PageNotFound} />
          <Route path='/admin/rules/:id' component={PageNotFound} />
          <Route path='/admin/characters/:id' component={PageNotFound} />
          <Route exact path='/character' component={PageNotFound} />
          <Route path='/character/:id' component={PageNotFound} />
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    );
  }
}