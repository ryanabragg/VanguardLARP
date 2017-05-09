import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';

function HotLoader(props) {
  return (
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
      <AppContainer>
        {props.children}
      </AppContainer>
    </BrowserRouter>
  )
}

window.onload = () => {
  ReactDOM.render(
      <HotLoader>
        <App/>
      </HotLoader>,
    document.getElementById('react-app'),
    () => {
      // We don't need the static css once we have launched the application.
      const ssStyles = document.getElementById('server-side-styles')
      ssStyles.parentNode.removeChild(ssStyles)
    }
  );
};

if(module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default;
    ReactDOM.render(
      <HotLoader>
        <NewApp/>
      </HotLoader>,
      document.getElementById('react-app')
    );
  });
}
