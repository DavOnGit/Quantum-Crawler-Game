import React from 'react'
import {Route, Router, IndexRoute, Redirect, browserHistory} from 'react-router'

import App from 'App'
import Home from 'Home'
import Page2 from 'Page2'
import Dungeon from 'Dungeon'
import NotFoundPage from 'NotFoundPage'

export default function Routes () {
  return (
    <Router history={browserHistory}>
      <Route path="game" component={Dungeon}/>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="page2" component={Page2}/>
        <Route path="404" component={NotFoundPage}/>
      </Route>
      <Redirect from="*" to="404" />
    </Router>
  )
}
