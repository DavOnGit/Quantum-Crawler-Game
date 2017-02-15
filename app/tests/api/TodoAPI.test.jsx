const expect = require('expect')
const TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
  
  beforeEach( () => {
    localStorage.removeItem('todos')
  })
  
  it('should exist', () => {
    expect(TodoAPI).toExist()
  })
  
  describe('setTododos', () =>{
    
    it('should set valid todos array', () => {
      var todos = [{
        id: 23,
        text: 'test all',
        completed: false
      }]
      TodoAPI.setTodos(todos)
      
      var actualTodos = JSON.parse(localStorage.getItem('todos'))
      
      expect(actualTodos).toEqual(todos)
    })
    
    it('should not set invalid todos array', () => {
      var badTodos = {a: 23}
      TodoAPI.setTodos(badTodos)
      
      expect(localStorage.getItem('todos')).toEqual(null)
    })
  })
  
  describe('getTododos', () =>{
    
    it('should return empty array for bad localStorage data', () => {
      var actualTodos = TodoAPI.getTodos()
      
      expect(actualTodos).toEqual([])
    })
    
    it('should return todos if valid array in localStorage', () => {
      var todos = [{
        id: 23,
        text: 'test all',
        completed: false
      }]
      localStorage.setItem('todos', JSON.stringify(todos))
      var actualTodos = TodoAPI.getTodos()
      expect(actualTodos).toEqual(todos)
    })
  })
})
