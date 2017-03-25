import React from 'react'
import {Route, Router, IndexRoute, Redirect, browserHistory} from 'react-router'

import App from 'App'
import Home from 'Home'
import About from 'About'
import Dungeon from 'Dungeon'
import NotFoundPage from 'NotFoundPage'

export default function Routes () {
  return (
    <Router history={browserHistory}>
      <Route path="game" component={Dungeon}/>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="404" component={NotFoundPage}/>
      </Route>
      <Redirect from="*" to="404" />
    </Router>
  )
}
