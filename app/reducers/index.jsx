/* RouteReducer captures routes as state */
import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import undoable from 'redux-undo'

import {gameLvlReducer, mapReducer, playerReducer, darknessReducer, screenReducer} from './mapReducer'

const rootReducer = combineReducers({
  gameLvl: gameLvlReducer,
  map: mapReducer,
  player: playerReducer,
  darkness: darknessReducer,
  screen: screenReducer,
  routing: routeReducer // add routeReducer as a prop on state
  // counter: undoable(counter, {limit: 50}),
})

export default rootReducer
