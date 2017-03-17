import _ from 'underscore'

import {_compose, _drawRect, random} from 'helpers'
import {mapSettings, WALL, FLOOR, DOOR, FOE, HEART, WEAPON, BOSS, LVL_DOOR, ITEMS_N} from 'settings'

// This exports the dungeon Map array
export default (settings = mapSettings) => {
  const {level, finalLvl, width, height, rooms, minRsize, maxRsize, gap} = settings
  let makeRoomCounter = 0

  const arr2D = _.range(height).map((row, j) => _.range(width).map((el, i) => {
    return {
      type: WALL,
      coords: {x: i, y: j},
      isVisible: true
    }
  }))

  const firstRoom = makeFirstRoom(arr2D, width, height, minRsize, maxRsize, gap)  // draw first room

  const roomWplayer = drawItem({map: firstRoom.map, loc: firstRoom.loc, type: {name: 'player'}}) // place player

  const mapWrooms = _compose(makeNewRoom, rooms - 1)(roomWplayer.map)  // draw all other rooms and objects

  const wallLess = _.flatten(mapWrooms).filter(el => (el.type.name === 'floor'))

  const randPosWeapon = random(wallLess.length)
  const weaponLoc = wallLess[randPosWeapon].coords
  const mapWeapon = _drawRect(mapWrooms, weaponLoc, WEAPON(level))   // place weapon

  const weaponLess = wallLess.filter(el => (el.type.name === 'floor'))

  if (level === finalLvl) {
    const randBoss = random(weaponLess.length)
    const bossLoc = weaponLess[randBoss].coords

    return _drawRect(mapWeapon, bossLoc, BOSS)  // place next Boss
  } else {
    const lvlDoor = random(weaponLess.length)
    const lvlDoorLoc = weaponLess[lvlDoor].coords

    return _drawRect(mapWeapon, lvlDoorLoc, LVL_DOOR)      // place next level Door
  }

  /* Recursively make new rooms and place objects */
  function makeNewRoom (map) {
    let whileCounter = 0
    makeRoomCounter += 1

    while (true) {
      whileCounter += 1

      const wall = findOpenWall(map, gap)          // find wall tile that is near a floor tyle
      const loc = setRoomCoord(wall, minRsize, maxRsize)  // make room
      const roomFits = checkDim(map, loc, gap)     // check if the room is inside the map
      if (!roomFits) continue

      const notOverlap = checkOverlap(map, loc, gap)  // check if it overlaps with other rooms
      if (notOverlap) {
        const addDoor = _drawRect(map, wall, DOOR)        // place door

        const mapWroom = _drawRect(addDoor, loc, FLOOR)   // place room

        const foeNum = ITEMS_N(level, 'FOE')      // down here we place all the enemies
        const mapWfoeObj = foeNum ? _compose(drawItem, foeNum)({map: mapWroom, loc, type: FOE(level)})
          : {map: mapWroom}
        const mapWfoe = mapWfoeObj.map

        const heartNum = ITEMS_N(level, 'HEART')  // down here we place all the hearts
        const mapWheart = heartNum ? _compose(drawItem, heartNum)({map: mapWfoe, loc, type: HEART(level)})
          : {map: mapWfoe}

        return mapWheart.map
      }
      if (whileCounter >= 1000) {     // skip after 1000 runs, room not placed
        makeRoomCounter -= 1

        console.log(
          `{\n WARNING: too mutch recursion\n` +
          `\tRooms expected: ${rooms} \n\tDrawed: ${makeRoomCounter}\n}`
        )
        return map
      }
    }
  }
}

// object placer
function drawItem (map) {
  const mapArr = map.map
  const {x, y, spanX, spanY} = map.loc
  const gap = 1
  let randX = null
  let randY = null

  do {
    randX = random(x + gap, x + spanX - gap)
    randY = random(y + gap, y + spanY - gap)
  } while (mapArr[randY][randX].type.name !== 'floor')

  const newLoc = {x: randX, y: randY}

  if (mapArr[randY][randX].type.name !== 'floor') console.log(`sovrascritto: ${mapArr[randY][randX].type.name} con ${map.type.name}`)
  const wItem = _drawRect(map.map, newLoc, map.type)

  return {...map, map: wItem}
}

/* Place the first random room */
function makeFirstRoom (arr2D, width, height, minRsize, maxRsize, gap) {
  const spanX = _.random(minRsize, maxRsize)
  const spanY = _.random(minRsize, maxRsize)
  const x = _.random(gap, width - spanX - gap)
  const y = _.random(gap, height - spanY - gap)
  const loc = {x, y, spanX, spanY}

  return {map: _drawRect(arr2D, loc, FLOOR), loc}
}

// openWall is a wall tile near an open one
function findOpenWall (map, gap) {
  let openWall = {}
  do {
    const y = random(gap, map.length - gap)
    const x = random(gap, map[0].length - gap)

    if (map[y][x].type.name === 'wall') {
      if (map[y][x - 1].type.name === 'floor') set('left', x, y)
      else
      if (map[y][x + 1].type.name === 'floor') set('right', x, y)
      else
      if (map[y - 1][x].type.name === 'floor') set('up', x, y)
      else
      if (map[y + 1][x].type.name === 'floor') set('down', x, y)
    }
  } while (openWall.dir === undefined)

  function set (dir, x, y) {
    openWall = {dir, x, y}
  }
  return openWall
}

// Adjust new room coordinates
function setRoomCoord (tile, minRsize, maxRsize) {
  const {x, y, dir} = tile
  const spanX = _.random(minRsize, maxRsize)
  const spanY = _.random(minRsize, maxRsize)
  let x1 = null
  let y1 = null

  if (dir === 'left') {
    x1 = x + 1
    y1 = y - random(spanY)
  } else if (dir === 'right') {
    x1 = x - spanX
    y1 = y - random(spanY)
  } else if (dir === 'up') {
    x1 = x - random(spanX)
    y1 = y + 1
  } else if (dir === 'down') {
    x1 = x - random(spanX)
    y1 = y - spanY
  }
  return {x: x1, y: y1, spanX, spanY}
}

// Chech if newRoom doesn't exceed arr dimensions
function checkDim (map, loc, gap) {
  const {x, y, spanX, spanY} = loc
  const roomDimOk =
    (y < gap) ? false : (y > map.length - 1 - gap) ? false
  : (x < gap) ? false : (x > map[0].length - 1 - gap) ? false
  : (y + spanY > map.length - 1 - gap) ? false
  : !(x + spanX > map[0].length - 1 - gap)
  return roomDimOk
}

// Check if new room overlaps with other rooms
function checkOverlap (map, loc, gap) {
  const {x, y, spanX, spanY} = loc

  return !map.some((row, i) => {
    if (i >= y - gap && i < y + spanY + gap) {
      return row.some((el, j) => {
        if (j >= x - gap && j < x + spanX + gap) {
          if (el.type.name === 'floor') return true
          else return false
        }
      })
    }
  })
}
