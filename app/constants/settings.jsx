import {random} from 'helpers'

/* Map Geenerator */
export const mapSettings = {
  level: 1,
  finalLvl: 4,
  width: 30,      // Map dimensions
  height: 30,
  rooms: 8,
  minRsize: 5,   // Room dimensions
  maxRsize: 9,
  gap: 1        // Used as spacer, margin
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
export const BOSS = {
  name: 'boss',
  life: 400,
  dmg: 50
}
export const LVL_DOOR = {
  name: 'lvl-door',
  life: 0
}
export const PLAYER = (playerLevel = 1) => {
  return {
    name: 'player',
    lvl: playerLevel,
    wName: 'stick',
    maxLife: 60 + (playerLevel * 40),
    life: 100,
    dmg: -5 + (playerLevel + 10),
    exp: 0
  }
}
export const HEART = (gameLevel) => {
  return {
    name: 'heart',
    life: 0,
    lvl: gameLevel,
    heal: 40 + (gameLevel * 10),
    drop: 'heal'
  }
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
  const wName = ['Knife', 'Rusty Sword', 'Long Sword', 'War Axe']
  return {
    name: 'weapon',
    wName: wName[gameLevel],
    lvl: gameLevel,
    life: 0,
    dmg: gameLevel * 15,
    drop: 'dmg'
  }
}

export const ITEMS_N = (gameLevel, type) => {
  switch (type) {
    case 'FOE':
      return random(gameLevel + 1)
    case 'HEART':
      return random(3)
    default:
      throw ('error: Items not match')
  }
}
