var React = require('react')
var ReactDOM = require('react-dom')
var {Provider} = require('react-redux')
var {Route, Router, IndexRoute, hashHistory} = require('react-router')

const TodoApp = require('TodoApp');

const actions = require('actions')
const store = require('configureStore').configure()
var TodoAPI = require('TodoAPI')

store.subscribe( () => {
  var state = store.getState()
  console.log('New State', state);
  TodoAPI.setTodos(state.todos)
})

var initialTodos = TodoAPI.getTodos()
store.dispatch(actions.addTodos(initialTodos))

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
