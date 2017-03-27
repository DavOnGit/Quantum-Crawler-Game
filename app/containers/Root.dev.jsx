import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Notifs } from 'redux-notifications'

import Router from 'app/router/'
import DevTools from 'DevTools'

// require('style!css!sass!applicationStyles')     // Import styles

const Root = (props) => (
  <Provider store={props.store}>
    <div>
      <Router />
      <Notifs/>
      {!window.devToolsExtension ? <DevTools /> : null}
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
