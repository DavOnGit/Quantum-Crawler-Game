var React = require('react')
var ReactDOM = require('react-dom')
var TestUtils = require('react-addons-test-utils')
var expect = require('expect')
var $ = require('jquery')

var TodoList = require('TodoList')
var Todo = require('Todo')

describe('TodoList', () => {
  
  it('should exist', () => {
    expect(TodoList).toExist()
  })
  
  it('should render one Todo component for each todo item', () => {
    var todos = [{
      id: 1,
      text: 'do some...'
    }, {
      id: 2,
      text: '...and do it again'
    }]
    
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />)
    
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo)

    expect(todosComponents.length).toBe(todos.length)
  })
  
  it('should render empty message if no todos', () => {
    var todos = []
    
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />)
    
    var $el = $(React.findDOMNode(todoList))
    
    expect($el.find('.container__message').length).toBe(1)
  })
})
