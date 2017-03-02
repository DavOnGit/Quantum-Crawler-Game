import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from 'app/reducers'
import DevTools from 'DevTools';

const reduxRouterMiddleware = syncHistory(browserHistory);
const logger = createLogger({diff: true});

const partialCreateStore = compose(
  applyMiddleware(thunk, reduxRouterMiddleware, logger),
  DevTools.instrument()
)(createStore);

export default (initialState = {}) => {
  const store = partialCreateStore(rootReducer, initialState)
  reduxRouterMiddleware.listenForReplays(store);
  
  if (module.hot) {
    module.hot.accept('reducers', () =>
      store.replaceReducer(require('reducers'))
    );
  }
  
  return store
}
