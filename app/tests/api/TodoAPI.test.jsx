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
  
  describe('filterTododos', () =>{
    var todos = [{
      id: 1,
      text: 'Some text',
      completed: true
    },{
      id: 2,
      text: 'Other text here',
      completed: false
    },{
      id: 3,
      text: 'Some text2',
      completed: true
    }]
    
    it('should return all items if showCompleted is true', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '')
      
      expect(filteredTodos.length).toBe(3)
    })
    
    it('should hide completed todos if showCompleted is false', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, false, '')
      
      expect(filteredTodos.length).toBe(1)
    })
    
    it('should show all todos when searchText is empty', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '')
      
      expect(filteredTodos.length).toBe(3)
    })
    
    it('should filter todos that contain searchText', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, 'some')
      
      expect(filteredTodos.length).toBe(2)
    })
    
    it('should sort not completed todos before completed ones', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '')
      
      expect(filteredTodos[0].completed).toBe(false)
    })
  })
})
