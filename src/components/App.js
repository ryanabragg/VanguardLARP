import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Homepage from './Homepage';
import PageNotFound from './PageNotFound';

export default class App extends React.Component {
  render() {
    return (
      <div className="route-container">
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/admin' component={PageNotFound}/>
          <Route path='*' component={PageNotFound}/>
        </Switch>
      </div>
    );
  }
}