import _ from 'underscore'

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

export function setPlayerLife (life) {
  return {
    type: 'SET_PLAYER_LIFE',
    life
  }
}

export function setPlayerExp (exp) {
  return {
    type: 'SET_PLAYER_EXP',
    exp
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

export function gameOver () {
  return {
    type: 'GAME_OVER'
  }
}

// export function setWindowDim (dim) {
//   return {
//     type: 'SET_WINDOW_DIM',
//     dim
//   }
// }

export function wScroll (pos) {
  return {
    type: 'SCROLL',
    pos
  }
}

export function preMove (dest, dir) {
  return (dispatch, getState) => {
    const { gameLvl, map, player, screen } = getState()
    const canIgo = checkMove(gameLvl, map, player, dest, dispatch)

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

function checkMove (gameLvl, map, player, dest, dispatch) {
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
    const settings = {...mapSettings, level: gameLvl + 1}
    const map = mapGenerator(settings)
    const playerPos = _.flatten(map).filter(el => el.type.name === 'player')[0].coords
    dispatch(nextLvlMap(map))
    dispatch(setPlayerPos(playerPos))
    dispatch(setGameLvl(gameLvl + 1))
    return false
  }
  if (cellName === 'foe') {
    const foeDmg = map[y][x].type.dmg
    const foeLife = map[y][x].type.life
    const playerLife = player.life - foeDmg
    if (playerLife <= 0) {
      dispatch(gameOver())
      return false
    }
    dispatch(setPlayerLife(playerLife))
    const foeNewLife = foeLife - player.dmg
    if (foeNewLife <= 0) {
      const playerExp = player.exp + map[y][x].type.exp
      dispatch(setPlayerExp(playerExp))
      return true
    }
    dispatch(setFoe({...map[y][x].type, life: foeNewLife}, {x, y}))
    return false
  }
  return false
}
