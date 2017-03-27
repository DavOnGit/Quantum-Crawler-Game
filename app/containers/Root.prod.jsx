import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Notifs } from 'redux-notifications'

import Router from 'app/router/'

const Root = (props) => (
  <Provider store={props.store}>
    <div>
      <Router />
      <Notifs/>
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
