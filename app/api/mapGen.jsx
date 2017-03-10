import _ from 'underscore'

import {_compose, _drawRect, random} from 'helpers'
import {mapSettings, WALL, FLOOR, DOOR, FOE, PLAYER, HEART, WEAPON, ITEMS_N} from 'settings'

// This exports the dungeon Map array
export default (settings = mapSettings) => {
  let {level, width, height, rooms, minRsize, maxRsize, gap} = settings
  let makeRoomCounter = 0

  const arr2D = _.range(height).map((row, j) => _.range(width).map((el, i) => {
    return {
      type: WALL,
      coords: {x: i, y: j},
      isVisible: true
    }
  }))

  const firstRoom = makeFirstRoom(arr2D)  // draw first room

  const roomWplayer = drawItem({map: firstRoom.map, loc: firstRoom.loc, type: PLAYER}) // place player

  const mapWrooms = _compose(makeNewRoom, rooms - 1)(roomWplayer.map)  // draw all other rooms and objects

  const wallLess = _.flatten(mapWrooms).filter(el => (el.type.name === 'floor' || el.type.name === 'door'))

  let weaponLoc = wallLess[random(wallLess.length)].coords

  return _drawRect(mapWrooms, weaponLoc, WEAPON(level))   // place weapon

  /* Make first random room */
  function makeFirstRoom (arr2D) {
    let spanX = _.random(minRsize, maxRsize)
    let spanY = _.random(minRsize, maxRsize)
    let x = _.random(gap, width - spanX - gap)
    let y = _.random(gap, height - spanY - gap)
    let loc = {x, y, spanX, spanY}

    return {map: _drawRect(arr2D, loc, FLOOR), loc}
  }

  // Adjust new room coordinates
  function setRoomCoord (tile) {
    let {x, y, dir} = tile
    let spanX = _.random(minRsize, maxRsize)
    let spanY = _.random(minRsize, maxRsize)
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

  /* Recursively make new rooms and place objects */
  function makeNewRoom (map) {
    let whileCounter = 0
    makeRoomCounter += 1   // console.log(makeRoomCounter);

    while (true) {
      whileCounter += 1

      const wall = findOpenWall(map, gap)
      const loc = setRoomCoord(wall)
      const roomFits = checkDim(map, loc, gap)
      if (!roomFits) continue

      const notOverlap = checkOverlap(map, loc, gap)// console.log('WHILECOUNTER -->', whileCounter);console.log('isOpenWall?', wall);console.log('roomDim OK? ', roomFits);console.log('overlap OK?', overlap)
      if (notOverlap) {
        const addDoor = _drawRect(map, wall, DOOR)

        const mapWroom = _drawRect(addDoor, loc, FLOOR)

        let foeByLvl = FOE(level)
        let foeNum = ITEMS_N(level, 'FOE')
        let mapWfoeObj = foeNum ? _compose(drawItem, foeNum)({map: mapWroom, loc, type: foeByLvl})
          : {map: mapWroom}
        let mapWfoe = mapWfoeObj.map

        let heartNum = ITEMS_N(level, 'HEART')
        let mapWheart = heartNum ? _compose(drawItem, heartNum)({map: mapWfoe, loc, type: HEART})
          : {map: mapWfoe}

        return mapWheart.map
      }
      if (whileCounter >= 1000) {
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

//

// object placer
function drawItem (map) {
  const {x, y, spanX, spanY} = map.loc
  let gap = 1
  let randX = random(x + gap, x + spanX - gap)
  let randY = random(y + gap, y + spanY - gap)
  let newLoc = {x: randX, y: randY}

  let wItem = _drawRect(map.map, newLoc, map.type)

  return {...map, map: wItem}
}

// openWall is a wall tile near an open one
function findOpenWall (map, gap) {
  let openWall = {}
  do {
    let y = random(gap, map.length - gap)
    let x = random(gap, map[0].length - gap)

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

// Chech if newRoom doesn't exceed arr dimensions - gap
function checkDim (map, loc, gap) {
  let {x, y, spanX, spanY} = loc
  let roomDimOk =
    (y < gap) ? false : (y > map.length - gap) ? false
  : (x < gap) ? false : (x > map[0].length - gap) ? false
  : (y + spanY > map[0].length - gap) ? false
  : !(x + spanX > map[0].length - gap)
  return roomDimOk
}

// Check if new room overlaps with other rooms
function checkOverlap (map, loc, gap) {
  let {x, y, spanX, spanY} = loc

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

// console.log(mapGenerator());
