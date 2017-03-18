import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'

import { configureStore } from 'configureStore'
import mapGenerator from 'mapGen'
import { PLAYER } from 'settings'

const rootEl = document.getElementById('app')

const map = mapGenerator()
const playerPos = _.flatten(map).filter(el => el.type.name === 'player')[0].coords
const windowDim = {x: window.innerWidth, y: window.innerHeight}
const offsetX = ((playerPos.x + 1) * 20) - (windowDim.x / 2)
const offsetY = ((playerPos.y + 1) * 20) - (windowDim.y / 2)

const initialState = {
  gameLvl: 1,
  map: map,
  player: {
    ...PLAYER(),
    position: {...playerPos}
  },
  darkness: false,
  screen: {
    dim: windowDim,
    scroll: {x: offsetX, y: offsetY}
  }
}
const store = configureStore(initialState)

// hot reloading
let render = () => {
  const Root = require('Root').default
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
      renderError()
    }
  }
  module.hot.accept('Root', () => {
    setTimeout(render)
  })
}

render()
