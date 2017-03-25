import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'
import {enableBatching} from 'redux-batched-actions'

import rootReducer from 'reducers'
import DevTools from 'DevTools'

const reduxRouterMiddleware = syncHistory(browserHistory)
const logger = createLogger({diff: true})

const composeStore = compose(
  applyMiddleware(thunk, reduxRouterMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
)(createStore)

export default (initialState = {}) => {
  const store = composeStore(enableBatching(rootReducer), initialState)
  reduxRouterMiddleware.listenForReplays(store)

  if (module.hot) {
    module.hot.accept('reducers', () =>
      store.replaceReducer(require('reducers').default)
    )
  }
  return store
}
