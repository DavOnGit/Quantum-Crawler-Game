import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'
import {enableBatching} from 'redux-batched-actions'

import rootReducer from 'app/reducers'

const reduxRouterMiddleware = syncHistory(browserHistory)

const composeStore = compose(
  applyMiddleware(thunk, reduxRouterMiddleware)
)(createStore)

export default (initialState = {}) => {
  const store = composeStore(enableBatching(rootReducer), initialState)
  reduxRouterMiddleware.listenForReplays(store)

  return store
}
