import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';



//const store = require('configureStore').configure()

import router from 'app/router/'
import DevTools from 'DevTools';



//console.log('Start State', store.getState());

// store.subscribe( () => {
//   var state = store.getState()
//   console.log('New State', state);
// })



$(document).foundation()                        //load foundation

require('style!css!sass!applicationStyles')     // Import styles

const App = (props) => (
  <Provider store={props.store}>
    <div>
      {router}
      <DevTools />
    </div>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;

// ReactDOM.render(
//   <Provider store={store}>
//     {router}
//   </Provider>,
//   document.getElementById('app')
// )
