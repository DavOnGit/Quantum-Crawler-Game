import React from 'react';
import ReactDOM from 'react-dom';

import { configureStore } from 'configureStore';

const store = configureStore();
const rootEl = document.getElementById('app')

// necessary for hot reloading
let render = () => {
  const Root = require('Root').default
  ReactDOM.render(
    <Root store={ store } />,
    rootEl
  )
}

if(module.hot) {
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
