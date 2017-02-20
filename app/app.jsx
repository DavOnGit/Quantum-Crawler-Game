var React = require('react')
var ReactDOM = require('react-dom')
var {Provider} = require('react-redux')
var {Route, Router, IndexRoute, hashHistory} = require('react-router')

const TodoApp = require('TodoApp');

const actions = require('actions')
const store = require('configureStore').configure()

store.subscribe( () => {
  console.log('New State', store.getState());
})

// store.dispatch(actions.addTodo('Clean the yard'))
// store.dispatch(actions.setSearcText('yard'))
// store.dispatch(actions.toggleShowCompleted())

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
