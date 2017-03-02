/* RouteReducer captures routes as state */
import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import undoable from 'redux-undo'

import counter from './counter'

const rootReducer = combineReducers({
  counter: undoable(counter, {limit: 50}),
  routing: routeReducer // add routeReducer as a prop on state
});

export default rootReducer
