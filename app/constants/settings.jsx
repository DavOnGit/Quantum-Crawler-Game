import {random} from 'helpers'

/* Map Geenerator */
export const mapSettings = {
  level: 4,
  finalLvl: 4,
  width: 30,
  height: 30,
  rooms: 8,
  minRsize: 5,
  maxRsize: 9,
  gap: 1    // Used as spacer, margin
}

export const WALL = {
  name: 'wall',
  life: Infinity
}
export const FLOOR = {
  name: 'floor',
  life: 0
}
export const DOOR = {
  name: 'door',
  life: 0
}
export const HEART = {
  name: 'heart',
  life: 0,
  heal: 40
}
export const PLAYER = {
  name: 'player',
  life: 100,
  dmg: 5,
  exp: 0,
  lvl: 1
}
export const BOSS = {
  name: 'boss',
  life: 400,
  dmg: 50
}
export const LVL_DOOR = {
  name: 'lvl-door',
  life: 0
}
export const FOE = (gameLevel) => {
  return {
    name: 'foe',
    lvl: gameLevel,
    life: 20 + (20 * gameLevel),
    dmg: 5 + (15 * gameLevel)
  }
}
export const WEAPON = (gameLevel) => {
  return {
    name: 'weapon',
    lvl: gameLevel,
    life: 0,
    attack: gameLevel * 15
  }
}

export const ITEMS_N = (gameLevel, type) => {
  switch (type) {
    case 'FOE':
      return random(gameLevel + 1) + 1
    case 'HEART':
      return random(3)
    default:
      throw ('error: Items not match')
  }
}
