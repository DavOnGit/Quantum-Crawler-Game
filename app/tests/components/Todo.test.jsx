var React = require('react')
var ReactDOM = require('react-dom')
var expect = require('expect')
var TestUtils = require('react-addons-test-utils')
var $ = require('jquery')

import * as actions from 'actions'
import {Todo} from 'Todo'

describe('Todo', () => {
  
  it('should exist', () => {
    expect(Todo).toExist()
  })
  
  it('should dispatch UPDATE_TODO action on click', () => {
    var todoData = {
      id: 199,
      text: 'Write todo',
      completed: true
    }
    var action = actions.startToggleTodo(todoData.id, !todoData.completed)
    
    var spy = expect.createSpy()
    var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy} />)
    var $el = $(ReactDOM.findDOMNode(todo))
    
    TestUtils.Simulate.click($el[0])
    
    expect(spy).toHaveBeenCalledWith(action)
  })
})
