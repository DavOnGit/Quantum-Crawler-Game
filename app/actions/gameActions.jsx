import _ from 'underscore'

import { INCREMENT_COUNTER, DECREMENT_COUNTER } from 'ActionTypes'
import mapGenerator from 'mapGen'
import { mapSettings } from 'settings'

export function move (playerPos, dest) {
  return {
    type: 'MOVE',
    playerPos,
    dest
  }
}

export function moveLeft (playerPos, dest) {
  return {
    type: 'LEFT',
    playerPos,
    dest
  }
}

export function moveRight (playerPos, dest) {
  return {
    type: 'RIGHT',
    playerPos,
    dest
  }
}

export function moveUp (playerPos, dest) {
  return {
    type: 'UP',
    playerPos,
    dest
  }
}

export function moveDown (playerPos, dest) {
  return {
    type: 'DOWN',
    playerPos,
    dest
  }
}

export function setLife (life) {
  return {
    type: 'SET_LIFE',
    life
  }
}

export function getWeapon (wName, dmg) {
  return {
    type: 'GET_WEAPON',
    wName,
    dmg
  }
}

export function nextLvlMap (map) {
  return {
    type: 'MAP_NEXT_LVL',
    map
  }
}

export function setPlayerPos (position) {
  return {
    type: 'SET_PLAYER_POS',
    position
  }
}

export function setGameLvl (level) {
  return {
    type: 'SET_GAME_LVL',
    level
  }
}

export function keyLeft () {
  return (dispatch, getState) => {
    const { gameLvl, map, player } = getState()
    const dest = {                      // dest stays for destination
      x: player.position.x - 1,
      y: player.position.y
    }
    const canIgo = checkMove(gameLvl, map, player, dest, dispatch)

    return canIgo ? (dispatch(moveLeft(player.position, dest)), dispatch(move(player.position, dest)))
      : null
  }
}

function checkMove (gameLvl, map, player, dest, dispatch) {
  const noFight = ['floor', 'door', 'heart', 'weapon', 'lvl-door']
  const x = dest.x
  const y = dest.y
  const cellName = map[y][x].type.name

  if (noFight.indexOf(cellName) > -1) {
    if (cellName === 'floor' || cellName === 'door') return true
    if (cellName === 'heart') {
      const healSum = map[y][x].type.heal + player.life
      const heal = healSum >= player.maxLife ? player.maxLife : healSum
      return dispatch(setLife(heal))
    }
    if (cellName === 'weapon') {
      const wName = map[y][x].type.wName
      const dmg = map[y][x].type.dmg + player.dmg
      return dispatch(getWeapon(wName, dmg))
    }
    if (cellName === 'lvl-door') {
      const settings = {...mapSettings, level: gameLvl + 1}
      const map = mapGenerator(settings)
      const playerPos = _.flatten(map).filter(el => el.type.name === 'player')[0].coords
      dispatch(nextLvlMap(map))
      dispatch(setPlayerPos(playerPos))
      dispatch(setGameLvl(gameLvl + 1))
      return false
    }
    return true
  }
  return false
}

export function keyRight () {
  return (dispatch, getState) => {
    const { gameLvl, map, player } = getState()
    const dest = {
      x: player.position.x + 1,
      y: player.position.y
    }
    const canIgo = checkMove(gameLvl, map, player, dest, dispatch)

    return canIgo ? (dispatch(moveRight(player.position, dest)), dispatch(move(player.position, dest)))
      : null
  }
}

export function keyUp () {
  return (dispatch, getState) => {
    const { gameLvl, map, player } = getState()
    const dest = {
      x: player.position.x,
      y: player.position.y - 1
    }
    const canIgo = checkMove(gameLvl, map, player, dest, dispatch)

    return canIgo ? (dispatch(moveUp(player.position, dest)), dispatch(move(player.position, dest)))
      : null
  }
}

export function keyDown () {
  return (dispatch, getState) => {
    const { gameLvl, map, player } = getState()
    const dest = {
      x: player.position.x,
      y: player.position.y + 1
    }
    const canIgo = checkMove(gameLvl, map, player, dest, dispatch)

    return canIgo ? (dispatch(moveDown(player.position, dest)), dispatch(move(player.position, dest)))
      : null
  }
}

export function incrementIfOdd () {
  return (dispatch, getState) => {
    const { counter } = getState()

    if (counter % 2 === 0) {
      return
    }

    dispatch(increment())
  }
}

export function incrementAsync () {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, 1000)
  }
}
