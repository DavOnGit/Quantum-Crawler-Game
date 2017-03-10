import { INCREMENT_COUNTER, DECREMENT_COUNTER } from 'ActionTypes';

export var mapReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1
    
    default:
      return state
  }
}
export var playerReducer = (state = 0, action) => {
  switch (action.type) {
    
    default:
      return state
  }
}
export var darknessReducer = (state = 0, action) => {
  switch (action.type) {
    
    default:
      return state
  }
}
