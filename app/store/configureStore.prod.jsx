import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import rootReducer from 'app/reducers'

export default (initialState = {}) => {
  var store = createStore(rootReducer, initialState,
    compose(
      applyMiddleware(thunk)
    )
  )
  return store
}
