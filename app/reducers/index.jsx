/* RouteReducer captures routes as state */
import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import undoable from 'redux-undo'

import {mapReducer, playerReducer, darknessReducer} from './mapReducer'

const rootReducer = combineReducers({
  map: mapReducer,
  player: playerReducer,
  darkness: darknessReducer,
  routing: routeReducer // add routeReducer as a prop on state
  // counter: undoable(counter, {limit: 50}),
})

export default rootReducer
