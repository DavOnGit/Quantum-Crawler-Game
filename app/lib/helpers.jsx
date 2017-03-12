/* Helper or common functions */
export const _compose2 = (f, g) => (...args) => g(f(...args))

export const _compose = (f, i) => {
  let arry = []
  for (let j = 0; j < i; j++) arry.push(f)
  return arry.reduce(_compose2)
}

/* Draw rectangle */
export const _drawRect = (arr, loc, type) => {
  let {x, y, spanX = 1, spanY = 1} = loc
  return arr.map((row, i) => {
    if (i >= y && i < y + spanY) {
      return row.map((el, j) => {
        if (j >= x && j < x + spanX) {
          return {
            ...el,
            type
          }
        } else return el
      })
    } else return row
  })
}

export const random = (start, end) => {
  if (isNaN(end)) {
    end = start
    start = 0
  }
  return ~~((Math.random() * (end - start)) + start)
}
