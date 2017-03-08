import _ from 'underscore'

import {_compose, _drawRect, random} from 'helpers'
import {mapSettings, WALL, FLOOR} from 'settings'

// This exports the dungeon Map array
export default (settings = mapSettings) => {
  let {width, height, rooms, minRsize, maxRsize, gap} = settings
  let makeRoomCounter = 0

  const arr2D = _.range(height).map(() => {
    return _.range(width).map(() => 0)
  })

  const firstRoom = makeFirstRoom(arr2D)
  return _compose(makeNewRoom, rooms - 1)(firstRoom)

  /* Draw point */
  // function drawPoint (arr, x, y) {
  //   return arr.map((row, i) => {
  //     if (i === y) {
  //       return row.map((el, j) => {
  //         if (j === x) return 1
  //         else return el
  //       })
  //     } else return row
  //   })
  // }
  /* Make first random room */
  function makeFirstRoom (arr2D) {
    let spanX = _.random(minRsize, maxRsize)
    let spanY = _.random(minRsize, maxRsize)
    let x = _.random(gap, width - spanX - gap)
    let y = _.random(gap, height - spanY - gap)

    let loc = {x, y, spanX, spanY}
    return _drawRect(arr2D, loc)
  }

  // Adjust new room coordinates
  function setRoomCoord (tile) {
    let {x, y, dir} = tile
    let openTile = {x, y}
    let roomW = _.random(minRsize, maxRsize)
    let roomH = _.random(minRsize, maxRsize)
    if (dir === 'left') {
      x = x + 1
      y = y - random(roomH)
    } else if (dir === 'right') {
      x = x - roomW
      y = y - random(roomH)
    } else if (dir === 'up') {
      x = x - random(roomW)
      y = y + 1
    } else if (dir === 'down') {
      x = x - random(roomW)
      y = y - roomH
    }
    return {x, y, roomW, roomH, openTile}
  }

  /* Recursively make new rooms */
  function makeNewRoom (map) {
    let whileCounter = 0
    makeRoomCounter += 1   // console.log(makeRoomCounter);

    while (true) {
      whileCounter += 1

      const wall = findOpenWall(map, gap)
      const loc = setRoomCoord(wall)
      const roomFits = checkDim(map, loc, gap)
      if (!roomFits) continue

      const notOverlap = checkOverlap(map, loc, gap)   // console.log('WHILECOUNTER -->', whileCounter);console.log('isOpenWall?', wall);console.log('roomDim OK? ', roomFits);console.log('overlap OK?', overlap)
      if (notOverlap) {
        let addDoor = _drawRect(map, {
          x: wall.x,
          y: wall.y
        })
        return _drawRect(addDoor, {
          x: loc.x,
          y: loc.y,
          spanX: loc.roomW,
          spanY: loc.roomH
        })
      } else
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

// openWall is a wall tile near an open one
function findOpenWall (map, gap) {
  let openWall = {}
  do {
    let y = random(gap, map.length - gap)
    let x = random(gap, map[0].length - gap)

    if (map[y][x] === 0) {
      if (map[y][x - 1] === 1) set('left', x, y)
      else
      if (map[y][x + 1] === 1) set('right', x, y)
      else
      if (map[y - 1][x] === 1) set('up', x, y)
      else
      if (map[y + 1][x] === 1) set('down', x, y)
    }
  } while (openWall.dir === undefined)

  function set (dir, x, y) {
    openWall = {dir, x, y}
  }
  return openWall
}

// Chech if newRoom doesn't exceed arr dimensions - gap
function checkDim (map, loc, gap) {
  let {x, y, roomW, roomH} = loc
  let roomDimOk =
    (y < gap) ? false : (y > map.length - gap) ? false
  : (x < gap) ? false : (x > map[0].length - gap) ? false
  : (y + roomH > map[0].length - gap) ? false
  : !(x + roomW > map[0].length - gap)
  return roomDimOk
}

// Check if new room overlaps with other rooms
function checkOverlap (map, loc, gap) {
  let {x, y, roomW, roomH} = loc

  return !map.some((row, i) => {
    if (i >= y - gap && i < y + roomH + gap) {
      return row.some((el, j) => {
        if (j >= x - gap && j < x + roomW + gap) {
          if (el === 1) return true
          else return false
        }
      })
    }
  })
}

// console.log(mapGenerator());
