/* RouteReducer captures routes as state */
import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import undoable from 'redux-undo'

import {mapReducer} from './mapReducer'

const rootReducer = combineReducers({
  map: mapReducer,
  
  routing: routeReducer // add routeReducer as a prop on state
  //counter: undoable(counter, {limit: 50}),
});

export default rootReducer
