var React = require('react')
var ReactDOM = require('react-dom')
var {Provider} = require('react-redux')
var {Route, Router, IndexRoute, hashHistory} = require('react-router')

const actions = require('actions')
const store = require('configureStore').configure()
var TodoAPI = require('TodoAPI')
import Login from 'Login'
import TodoApp from 'TodoApp'

console.log('Start State', store.getState());
store.subscribe( () => {
  var state = store.getState()
  console.log('New State', state);
})

// Fetch todos from firebase
store.dispatch(actions.startAddTodos())

//load foundation
$(document).foundation()

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/'>
        <Route path='todos' component={TodoApp}/>
        <IndexRoute component={Login}/>
      </Route>

    </Router>
  </Provider>,
  document.getElementById('app')
)
