import _ from 'underscore'
import {batchActions} from 'redux-batched-actions'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications'
const { notifSend, notifClear } = notifActions

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

export function toggleDarkness () {
  return {
    type: 'TOGGLE_DARKNESS'
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

export function gameEnd () {
  return (dispatch, getState) => {
    const { screen } = getState()
    const data = makeNewMap(1, screen)
    const {map, playerPos, offset} = data

    const _actions = [
      setGameLvl(1),
      setMap(map),
      resetPlayer(PLAYER()),
      setPlayerPos(playerPos),
      wScroll(offset),
      closeModal()
    ]
    dispatch(batchActions(_actions))
  }
}

export function preMove (dest, dir) {
  return (dispatch, getState) => {
    const { gameLvl, map, player, screen } = getState()
    const canIgo = checkMove(gameLvl, map, player, dest, screen, dispatch)

    if (canIgo) {
      const scrollTo = handleViewport(dest, screen, dir)
      dispatch(batchActions([move(player.position, dest), wScroll(scrollTo)]))
    }
  }
}

function handleViewport (dest, screen, dir) {
  const offsetX = ((dest.x + 0.5) * cellDim) + 1 - ~~(screen.dim.x / 2)
  const offsetY = ((dest.y + 0.5) * cellDim) + 1 - ~~(screen.dim.y / 2)
  window.scrollTo(offsetX, offsetY)
  return {x: offsetX, y: offsetY}
}

function checkMove (gameLvl, map, player, dest, screen, dispatch) {
  const x = dest.x
  const y = dest.y
  const cellName = map[y][x].type.name

  if (cellName === 'floor' || cellName === 'door') return true
  if (cellName === 'heart') {
    const data = map[y][x].type.heal
    const playerLife = data + player.life
    const heal = playerLife >= player.maxLife ? player.maxLife : playerLife
    dispatch(setPlayerLife(heal))
    dispatch(notifClear())
    dispatch(notifSend({
      message: `You found ${data} life`,
      kind: 'info',
      dismissAfter: 5000
    }))
    return true
  }
  if (cellName === 'weapon') {
    const wName = map[y][x].type.wName
    const dmg = map[y][x].type.dmg
    const addToPlayer = dmg + player.dmg
    dispatch(getWeapon(wName, addToPlayer))
    dispatch(notifClear())
    dispatch(notifSend({
      message: `New weapon: ${wName} - dmg ${dmg}`,
      kind: 'info',
      dismissAfter: 5000
    }))
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
    const foeDmg = ~~_.random(map[y][x].type.dmg * 0.5, map[y][x].type.dmg * 1.5)
    const foeLife = map[y][x].type.life
    const playerLife = player.life - foeDmg

    if (playerLife <= 0) {
      const modTitle = 'Game Over :('
      const modMsg = 'Enemy defeted you! Try again...'

      dispatch(openModal(modTitle, modMsg))
      return false
    }

    const foeNewLife = foeLife - ~~_.random(player.dmg * 0.5, player.dmg * 1.5)

    if (cellName === 'boss' && foeNewLife <= 0) {
      const modTitle = 'A winner is You!'
      const modMsg = 'Hope you enjoyed this little game. Thanks for playing!'

      dispatch(openModal(modTitle, modMsg))
      return false
    }

    if (foeNewLife <= 0) {
      const exp = map[y][x].type.exp
      const toNextLvl = player.nextLvl - exp

      dispatch(notifClear())
      dispatch(notifSend({
        message: 'You got it!',
        kind: 'success',
        dismissAfter: 3000
      }))
      if (toNextLvl > 0) {
        return dispatch(batchActions([
          setPlayerLife(playerLife),
          setPlayerExp(toNextLvl, player.exp + exp)
        ]))
      }

      const maxLife = ((player.lvl + 1) * 30) + 70
      const maxExp = ((player.lvl + 1) * 20) + 80
      dispatch(batchActions([setPlayerLvl(player.lvl + 1), setPlayerExp(maxExp, -toNextLvl),
        setPlayerMaxLife(maxLife), setPlayerLife(maxLife)]))

      return true
    }
    dispatch(batchActions([
      setPlayerLife(playerLife),
      setFoe({...map[y][x].type, life: foeNewLife}, {x, y})
    ]))
    dispatch(notifClear())
    dispatch(notifSend({
      message: `Foe lvl ${gameLvl} - life ${foeNewLife} - dmg ${foeDmg}`,
      kind: 'warning',
      dismissAfter: 5000
    }))
    return false
  }
  return false
}

function makeNewMap (level, screen) {
  const settings = {...mapSettings, level: level}
  const map = mapGenerator(settings)
  const playerPos = _.flatten(map).filter(el => el.type.name === 'player')[0].coords
  console.log(playerPos, screen)
  const offsetX = ((playerPos.x + 0.5) * cellDim) + 1 - (screen.dim.x / 2)
  const offsetY = ((playerPos.y + 0.5) * cellDim) + 1 - (screen.dim.y / 2)
  window.scroll(offsetX, offsetY)
  return {map, playerPos, offset: {x: offsetX, y: offsetY}}
}
