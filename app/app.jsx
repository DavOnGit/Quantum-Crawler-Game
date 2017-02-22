var React = require('react')
var ReactDOM = require('react-dom')
var {Provider} = require('react-redux')
var {Route, Router, IndexRoute, hashHistory} = require('react-router')

const TodoApp = require('TodoApp');

const actions = require('actions')
const store = require('configureStore').configure()
var TodoAPI = require('TodoAPI')
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
    <TodoApp />
  </Provider>,
  document.getElementById('app')
)
