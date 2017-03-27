/* RouteReducer captures routes as state */
import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import { reducer as notifReducer } from 'redux-notifications'
// import undoable from 'redux-undo'

import { gameLvlReducer, mapReducer, playerReducer,
  darknessReducer, screenReducer, modalReducer } from './mapReducer'

const rootReducer = combineReducers({
  gameLvl: gameLvlReducer,
  map: mapReducer,
  player: playerReducer,
  darkness: darknessReducer,
  screen: screenReducer,
  modal: modalReducer,
  routing: routeReducer,
  notifs: notifReducer
  // counter: undoable(counter, {limit: 50}),
})

export default rootReducer
