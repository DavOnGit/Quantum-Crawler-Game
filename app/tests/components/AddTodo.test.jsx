var expect = require('expect')
var React = require('react')
var ReactDOM = require('react-dom')
var TestUtils = require('react-addons-test-utils')
var $ = require('jQuery')

var AddTodo = require('AddTodo')

describe('AddTodoForm', () => {
  it('should exist', () => {
    expect(AddTodo).toExist()
  })
  
  it('should call onAddTodo if non empty string is entered', () =>{
    var spy = expect.createSpy()
    var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy} />)
    var $el = $(ReactDOM.findDOMNode(addTodo))
    
    addTodo.refs.todoText.value = 'Feed fish'
    TestUtils.Simulate.submit($el.find('form')[0])
    
    expect(spy).toHaveBeenCalledWith('Feed fish')
  })
  
  it('should not call onAddTodo if empty string is entered', () =>{
    var spy = expect.createSpy()
    var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy} />)
    var $el = $(ReactDOM.findDOMNode(addTodo))
  
    addTodo.refs.todoText.value = ''
    TestUtils.Simulate.submit($el.find('form')[0])
  
    expect(spy).toNotHaveBeenCalled()
  })
})
