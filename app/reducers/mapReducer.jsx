import { INCREMENT_COUNTER } from 'ActionTypes'
import { FLOOR } from 'settings'
import {_drawRect} from 'helpers'

export var gameLvlReducer = (state = 1, action) => {
  switch (action.type) {
    case 'SET_GAME_LVL':
      return action.level
    case 'RESET_GAME_LVL':
    default:
      return state
  }
}

export var mapReducer = (state = [], action) => {
  switch (action.type) {
    case 'MOVE': {
      let oldPlayerPos = _drawRect(state, action.playerPos, FLOOR)
      let newPlayerPos = _drawRect(oldPlayerPos, action.dest, {name: 'player'})
      return newPlayerPos
    }
    case 'MAP_NEXT_LVL': {
      return action.map
    }
    default:
      return state
  }
}

export var playerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PLAYER_POS':
      return {
        ...state,
        position: action.position
      }
    case 'GET_WEAPON':
      return {
        ...state,
        wName: action.wName,
        dmg: action.dmg
      }
    case 'SET_LIFE':
      return {
        ...state,
        life: action.life
      }
    case 'LEFT':
      return {
        ...state,
        position: {
          x: action.dest.x,
          y: action.dest.y
        }
      }
    case 'RIGHT':
      return {
        ...state,
        position: {
          x: state.position.x + 1,
          y: state.position.y
        }
      }
    case 'UP':
      return {
        ...state,
        position: {
          x: state.position.x,
          y: state.position.y - 1
        }
      }
    case 'DOWN':
      return {
        ...state,
        position: {
          x: state.position.x,
          y: state.position.y + 1
        }
      }
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
