import React from 'react'
import {Route, Router, IndexRoute, hashHistory} from 'react-router'

import firebase from 'app/firebase/'
import Login from 'Login'
import TodoApp from 'TodoApp'

var requireLogin = (nextState, replace, next) => {
  if(!firebase.auth().currentUser) {
    replace('/')
  }
  next()
}

var ifLoggedIn = (nextState, replace, next) => {
  if(firebase.auth().currentUser) {
    replace('/todos')
  }
  next()
}

export default (
  <Router history={hashHistory}>
    <Route path='/'>
      <Route path='todos' component={TodoApp} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={ifLoggedIn}/>
    </Route>
  </Router>
)
