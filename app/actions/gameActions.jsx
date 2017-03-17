import _ from 'underscore'

import mapGenerator from 'mapGen'
import { mapSettings, PLAYER } from 'settings'

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

export function setPlayerLife (life) {
  return {
    type: 'SET_PLAYER_LIFE',
    life
  }
}

export function setPlayerExp (nextLvl, exp) {
  return {
    type: 'SET_PLAYER_EXP',
    nextLvl,
    exp
  }
}

export function setPlayerPos (position) {
  return {
    type: 'SET_PLAYER_POS',
    position
  }
}

export function setPlayerLvl (level) {
  return {
    type: 'SET_PLAYER_LVL',
    level
  }
}

export function resetPlayer (player) {
  return {
    type: 'RESET_PLAYER',
    player
  }
}

export function getWeapon (wName, dmg) {
  return {
    type: 'GET_WEAPON',
    wName,
    dmg
  }
}

export function setFoe (foe, loc) {
  return {
    type: 'SET_FOE',
    foe,
    loc
  }
}

export function setMap (map) {
  return {
    type: 'MAP_NEXT_LVL',
    map
  }
}

export function setGameLvl (level) {
  return {
    type: 'SET_GAME_LVL',
    level
  }
}

export function gameOver () {
  return {
    type: 'GAME_OVER'
  }
}

export function wScroll (pos) {
  return {
    type: 'SCROLL',
    pos
  }
}

export function preMove (dest, dir) {
  return (dispatch, getState) => {
    const { gameLvl, map, player, screen } = getState()
    const canIgo = checkMove(gameLvl, map, player, dest, screen, dispatch)

    const go = canIgo ? dispatch(move(player.position, dest))
      : null

    return go ? handleViewport(dest, screen, dir, dispatch)
    : null
  }
}

function handleViewport (dest, screen, dir, dispatch) {
  const offsetX = ((dest.x) * 20) - (screen.dim.x / 2)
  const offsetY = ((dest.y) * 20) - (screen.dim.y / 2)

  switch (dir) {
    case 'left':
      if ((dest.x + 1) * 20 <= (100 * 20) - (screen.dim.x / 2)) {
        window.scrollBy(-20, 0)
        dispatch(wScroll({x: offsetX, y: offsetY}))
      }
      break
    case 'right':
      if ((dest.x + 1) * 20 >= screen.dim.x / 2) {
        window.scrollBy(20, 0)
        dispatch(wScroll({x: offsetX, y: offsetY}))
      }
      break
    case 'up':
      if ((dest.y + 1) * 20 >= screen.dim.y / 2) {
        window.scrollBy(0, -20)
        dispatch(wScroll({x: offsetX, y: offsetY}))
      }
      break
    case 'down':
      if ((dest.y + 1) * 20 >= screen.dim.y / 2) {
        window.scrollBy(0, 20)
        dispatch(wScroll({x: offsetX, y: offsetY}))
      }
      break
  }
}

function checkMove (gameLvl, map, player, dest, screen, dispatch) {
  const x = dest.x
  const y = dest.y
  const cellName = map[y][x].type.name

  if (cellName === 'floor' || cellName === 'door') return true
  if (cellName === 'heart') {
    const healSum = map[y][x].type.heal + player.life
    const heal = healSum >= player.maxLife ? player.maxLife : healSum
    return dispatch(setPlayerLife(heal))
  }
  if (cellName === 'weapon') {
    const wName = map[y][x].type.wName
    const dmg = map[y][x].type.dmg + player.dmg
    return dispatch(getWeapon(wName, dmg))
  }
  if (cellName === 'lvl-door') {
    makeNewMap(gameLvl + 1, screen, dispatch)
    return false
  }
  if (cellName === 'foe' || cellName === 'boss') {
    const foeDmg = map[y][x].type.dmg
    const foeLife = map[y][x].type.life
    const playerLife = player.life - foeDmg
    if (playerLife <= 0) {
      window.alert('U loose :(')
      makeNewMap(1, screen, dispatch)
      dispatch(resetPlayer(PLAYER()))
      return false
    }
    dispatch(setPlayerLife(playerLife))
    const foeNewLife = foeLife - player.dmg
    if (cellName === 'boss' && foeNewLife <= 0) return dispatch(youWin())
    if (foeNewLife <= 0) {
      const exp = map[y][x].type.exp
      const nextLvl = player.nextLvl - exp
      if (nextLvl > 0) return dispatch(setPlayerExp(nextLvl, player.exp + exp))
      const newNextLvl = ((player.lvl + 1) * 30) + 70
      dispatch(setPlayerLvl(player.lvl + 1))
      dispatch(setPlayerExp(newNextLvl + nextLvl, -nextLvl))
      return true
    }
    dispatch(setFoe({...map[y][x].type, life: foeNewLife}, {x, y}))
    return false
  }
  return false
}

function makeNewMap (level, screen, dispatch) {
  const settings = {...mapSettings, level: level}
  const map = mapGenerator(settings)
  const playerPos = _.flatten(map).filter(el => el.type.name === 'player')[0].coords
  console.log(playerPos, screen)
  const offsetX = ((playerPos.x + 1) * 20) - (screen.dim.x / 2)
  const offsetY = ((playerPos.y + 1) * 20) - (screen.dim.y / 2)
  window.scroll(offsetX, offsetY)
  dispatch(setMap(map))
  dispatch(setPlayerPos(playerPos))
  dispatch(setGameLvl(level))
  dispatch(wScroll({x: offsetX, y: offsetY}))
}
