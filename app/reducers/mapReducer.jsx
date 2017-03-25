import { FLOOR } from 'settings'
import {_drawRect} from 'helpers'

export const screenReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WINDOW_DIM':
      return {
        ...state,
        dim: action.dim
      }
    case 'SCROLL':
      return {
        ...state,
        scroll: action.pos
      }
    default:
      return state
  }
}

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
    case 'SET_FOE':
      return _drawRect(state, action.loc, action.foe)
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
    case 'SET_PLAYER_LIFE':
      return {
        ...state,
        life: action.life
      }
    case 'SET_PLAYER_MAX_LIFE':
      return {
        ...state,
        maxLife: action.maxLife
      }
    case 'SET_PLAYER_LVL':
      return {
        ...state,
        lvl: action.level
      }
    case 'SET_PLAYER_EXP':
      return {
        ...state,
        nextLvl: action.nextLvl,
        exp: action.exp
      }
    case 'RESET_PLAYER':
      return {
        ...state,
        name: action.player.name,
        lvl: action.player.lvl,
        wName: action.player.wName,
        maxLife: action.player.maxLife,
        life: action.player.life,
        dmg: action.player.dmg,
        exp: action.player.exp,
        nextLvl: action.player.nextLvl
      }
    case 'MOVE':
      return {
        ...state,
        position: {
          x: action.dest.x,
          y: action.dest.y
        }
      }
    default:
      return state
  }
}

export var darknessReducer = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_DARKNESS':
      return !state
    default:
      return state
  }
}

export var modalReducer = (state = {}, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        title: action.title,
        message: action.message
      }
    case 'CLOSE_MODAL':
      return {}
    default:
      return state
  }
}
