import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import PropTypes from 'prop-types';

import App from './components/App';

function HotLoader(props) {
  return (
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
      <AppContainer>
        {props.children}
      </AppContainer>
    </BrowserRouter>
  );
}

HotLoader.propTypes = {
  children: PropTypes.node.isRequired
};

window.onload = () => {
  ReactDOM.render(
      <HotLoader>
        <App/>
      </HotLoader>,
    document.getElementById('react-app')
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
