import React from 'react';
import ReactDOM from 'react-dom';

const store = require('configureStore').configure()
const rootEl = document.getElementById('app')
const actions = require('actions')
import firebase from 'app/firebase/'
var {hashHistory} = require('react-router')

firebase.auth().onAuthStateChanged((user) => {
  if (user) {                                       console.log('uid:', user.uid);
    store.dispatch(actions.login(user.uid))
    store.dispatch(actions.startAddTodos())         // Fetch todos from firebase
    hashHistory.push('/todos')
  } else {                                          console.log('no uid', user);
    store.dispatch(actions.logout())
    hashHistory.push('/')
  }
})

// necessary for hot reloading
let render = () => {
  const App = require('./app.jsx').default
  ReactDOM.render(
    <App store={ store } />,
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
  
  module.hot.accept('./app.jsx', () => {
    setTimeout(render)
  })
}

render()
