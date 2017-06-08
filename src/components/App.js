import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import AdminDashboard from './AdminDashboard';
import AdminEvents from './AdminEvents';
import Homepage from './Homepage';
import PageNotFound from './PageNotFound';

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

// check against ../routes.js
export default class App extends React.Component {
  render() {
    return (
      <div>
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