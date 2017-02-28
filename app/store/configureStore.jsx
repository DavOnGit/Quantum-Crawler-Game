import * as redux from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import {searchTextReducer, showCompletedReducer, todosReducer, authReducer, confirmReducer, errorReducer} from 'reducers'
import DevTools from 'DevTools';

const logger = createLogger({diff: true});

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
    auth: authReducer,
    confirm: confirmReducer,
    error: errorReducer
  })
  
  var store = redux.createStore(reducer, initialState,
    redux.compose(
      redux.applyMiddleware(thunk, logger),
      DevTools.instrument()
      //window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  
  if (module.hot) {
    module.hot.accept('reducers', () =>
      store.replaceReducer(require('reducers'))
    );
  }
  
  return store
}
