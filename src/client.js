import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//import routes from '../routes';

import App from './components/App';

window.onload = () => {
  ReactDOM.render(
    (
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <App/>
    </Router>
    ),
    document.getElementById('react-app'),
    () => {
      // We don't need the static css once we have launched the application.
      const ssStyles = document.getElementById('server-side-styles')
      ssStyles.parentNode.removeChild(ssStyles)
    }
    );
};