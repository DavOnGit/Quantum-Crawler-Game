import _ from 'underscore'
import {batchActions} from 'redux-batched-actions'

import mapGenerator from 'mapGen'
import { mapSettings, cellDim, PLAYER } from 'settings'

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

export function setPlayerMaxLife (maxLife) {
  return {
    type: 'SET_PLAYER_MAX_LIFE',
    maxLife
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

export function openModal (title, message) {
  return {
    type: 'OPEN_MODAL',
    title,
    message
  }
}

export function closeModal () {
  return {
    type: 'CLOSE_MODAL'
  }
}

export function preMove (dest, dir) {
  return (dispatch, getState) => {
    const { gameLvl, map, player, screen } = getState()
    const canIgo = checkMove(gameLvl, map, player, dest, screen, dispatch)

    if (canIgo) {
      const scrollBy = handleViewport(dest, screen, dir)
      dispatch(batchActions([move(player.position, dest), wScroll(scrollBy)]))
    }
  }
}

function handleViewport (dest, screen, dir) {
  const offsetX = ((dest.x + 1) * cellDim) - ~~(screen.dim.x / 2)
  const offsetY = ((dest.y + 1) * cellDim) - ~~(screen.dim.y / 2)

  window.scrollTo(offsetX, offsetY)
  return {x: offsetX, y: offsetY}
}

function checkMove (gameLvl, map, player, dest, screen, dispatch) {
  const x = dest.x
  const y = dest.y
  const cellName = map[y][x].type.name

  if (cellName === 'floor' || cellName === 'door') return true
  if (cellName === 'heart') {
    const healSum = map[y][x].type.heal + player.life
    const heal = healSum >= player.maxLife ? player.maxLife : healSum
    dispatch(setPlayerLife(heal))
    return true
  }
  if (cellName === 'weapon') {
    const wName = map[y][x].type.wName
    const dmg = map[y][x].type.dmg + player.dmg
    dispatch(getWeapon(wName, dmg))
    return true
  }
  if (cellName === 'lvl-door') {
    const data = makeNewMap(gameLvl + 1, screen)
    const {map, playerPos, offset} = data
    const _actions = [
      setMap(map),
      setPlayerPos(playerPos),
      setGameLvl(gameLvl + 1),
      wScroll(offset)
    ]
    dispatch(batchActions(_actions))
    return false
  }
  if (cellName === 'foe' || cellName === 'boss') {
    const foeDmg = map[y][x].type.dmg
    const foeLife = map[y][x].type.life
    const playerLife = player.life - foeDmg

    if (playerLife <= 0) {
      const data = makeNewMap(1, screen)
      const {map, playerPos, offset} = data
      const modTitle = 'Game Over :('
      const modMsg = 'Enemy defeted you!\n Try again...'
      const _actions = [
        openModal(modTitle, modMsg),
        setMap(map),
        setPlayerPos(playerPos),
        setGameLvl(1), wScroll(offset),
        resetPlayer(PLAYER())
      ]
      dispatch(batchActions(_actions))
      return false
    }
    const foeNewLife = foeLife - player.dmg
    if (cellName === 'boss' && foeNewLife <= 0) {
      const data = makeNewMap(1, screen)
      const {map, playerPos, offset} = data
      const modTitle = 'A winner is You!'
      const modMsg = 'Hope you enjoyed this little game.\nAd majora!'
      const _actions = [
        openModal(modTitle, modMsg),
        setMap(map),
        setPlayerPos(playerPos),
        setGameLvl(1), wScroll(offset),
        resetPlayer(PLAYER())
      ]
      dispatch(batchActions(_actions))
      return true
    }

    if (foeNewLife <= 0) {
      const exp = map[y][x].type.exp
      const toNextLvl = player.nextLvl - exp

      if (toNextLvl > 0) return dispatch(setPlayerExp(toNextLvl, player.exp + exp))

      const maxLife = ((player.lvl + 1) * 30) + 70
      const maxExp = ((player.lvl + 1) * 20) + 80
      dispatch(batchActions([setPlayerLvl(player.lvl + 1), setPlayerExp(maxExp, -toNextLvl),
        setPlayerMaxLife(maxLife), setPlayerLife(maxLife)]))

      return true
    }
    dispatch(batchActions([setPlayerLife(playerLife), setFoe({...map[y][x].type, life: foeNewLife}, {x, y})]))
    return false
  }
  return false
}

function makeNewMap (level, screen) {
  const settings = {...mapSettings, level: level}
  const map = mapGenerator(settings)
  const playerPos = _.flatten(map).filter(el => el.type.name === 'player')[0].coords
  console.log(playerPos, screen)
  const offsetX = ((playerPos.x + 1) * cellDim) - (screen.dim.x / 2)
  const offsetY = ((playerPos.y + 1) * cellDim) - (screen.dim.y / 2)
  window.scroll(offsetX, offsetY)
  return {map, playerPos, offset: {x: offsetX, y: offsetY}}
}
