import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import Router from 'app/router/'

require('style!css!sass!applicationStyles')

const App = (props) => (
  <Provider store={props.store}>
    <Router history={props.history} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default App;
