import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'

import { default as configureStore } from 'configureStore'
import mapGenerator from 'mapGen'
import { PLAYER } from 'settings'
import 'applicationStyles'                      // Import styles

const rootEl = document.getElementById('app')

const map = mapGenerator()
const playerPos = _.flatten(map).filter(el => el.type.name === 'player')[0].coords
const windowDim = {x: window.innerWidth, y: window.innerHeight}
const offsetX = ((playerPos.x + 0.5) * 20) + 1 - (windowDim.x / 2)
const offsetY = ((playerPos.y + 0.5) * 20) + 1 - (windowDim.y / 2)

const initialState = {
  gameLvl: 1,
  map: map,
  player: {
    ...PLAYER(),
    position: {...playerPos}
  },
  darkness: true,
  screen: {
    dim: windowDim,
    scroll: {x: offsetX, y: offsetY}
  }
}
const store = configureStore(initialState)

// hot reloading
let render = () => {
  const Root = require('Root')
  ReactDOM.render(
    <Root store={ store } />,
    rootEl
  )
}

if (module.hot) {
  const renderApp = render

  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    )
  }
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept('Root', () => {
    render()
  })
}
console.log('No HMR')
render()
