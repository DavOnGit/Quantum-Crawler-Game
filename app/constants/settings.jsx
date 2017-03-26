import { random } from 'helpers'

/* Map Geenerator */
export const mapSettings = {
  level: 1,
  finalLvl: 4,
  width: 60,       // Map col number
  height: 60,      // Map row number
  rooms: 12,
  minRsize: 6,   // Room dimensions in cellSize
  maxRsize: 16,
  gap: 1        // Used as spacer, margin, in cellSize
}

export const cellDim = 30

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
export const PLAYER = (playerLevel = 1, weapon = 'fists') => {
  return {
    name: 'player',
    lvl: playerLevel,
    wName: weapon,
    maxLife: 70 + (playerLevel * 30),
    life: 100,
    dmg: 10,
    exp: 0,
    nextLvl: 70 + (playerLevel * 30)
  }
}
export const HEART = (gameLevel) => {
  return {
    name: 'heart',
    life: 0,
    lvl: gameLevel,
    heal: 30 + (gameLevel * 10),
    drop: 'heal'
  }
}
export const FOE = (gameLevel) => {
  return {
    name: 'foe',
    lvl: gameLevel,
    life: 20 + (40 * gameLevel),
    dmg: 15 * gameLevel,
    exp: gameLevel * 10
  }
}
export const WEAPON = (gameLevel) => {
  const wName = ['fists', 'stick', 'knife', 'sword', 'axe']
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
      throw new Error("ITEMS_N doesn't match")
  }
}
