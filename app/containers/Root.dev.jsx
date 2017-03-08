//# sourceURL=source.Rootdev

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import Router from 'app/router/'
import DevTools from 'DevTools';

require('style!css!sass!applicationStyles')     // Import styles

const App = (props) => (
  <Provider store={props.store}>
    <div>
      <Router />
      <DevTools />
    </div>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
