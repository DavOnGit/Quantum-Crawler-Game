const expect = require('expect');
const df = require('deep-freeze-strict');   // Test our func to be pure

const reducers = require('reducers');

describe('Reducers', () => {
  describe('SearchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'dog'
      }
      var res = reducers.searchTextReducer(df(''), df(action))
      
      expect(res).toBe(action.searchText)
    })
  })
  
  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      }
      var res = reducers.showCompletedReducer(df(false), df(action))
      
      expect(res).toBe(true)
    })
  })
  
  describe('todosReducer', () => {
    it('should add new todo', () => {
      var todo = {
        id: 'anh3242h34',
        text: 'any',
        completed: false,
        createdAt: 432542
      }
      var action = {
        type: 'ADD_TODO',
        todo
      }
      var res = reducers.todosReducer(df([]), df(action))
      
      expect(res.length).toBe(1)
      expect(res[0]).toEqual(todo)
    })
    
    it('should add existing todos', () => {
      var todos = [{
        id: '111',
        text: 'any',
        complete: false,
        completedAt: undefined,
        createdAt: 33000
      }]
      var action = {
        type: 'ADD_TODOS',
        todos
      }
      var res = reducers.todosReducer(df([]), df(action))
      
      expect(res.length).toBe(1)
      expect(res[0]).toEqual(todos[0])
    })
    
    it('should update todo', () => {
      var todos = [{
        id: '109',
        text: 'Hallo',
        completed: true,
        createdAt: 123,
        completedAt: 125
      }]
      var updates = {
        completed: false,
        completedAt: null
      }
      var action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        updates
      }
      var res = reducers.todosReducer(df(todos), df(action))
      
      expect(res[0].completed).toEqual(updates.completed)
      expect(res[0].completedAt).toEqual(updates.completedAt)
      expect(res[0].text).toEqual(todos[0].text)
    })
    
    it('should remove all todos on LOGOUT', () => {
      var todo = {
        id: 'anh3242h34',
        text: 'any',
        completed: undefined,
        createdAt: 432542
      }
      var action = {
        type: 'LOGOUT'
      }
      var res = reducers.todosReducer(df([todo]), df(action))
      
      expect(res.length).toBe(0)
    })
  })
  
  describe('authReducer', () => {
    it('should store uid on login', () => {
      var action = {
        type: 'LOGIN',
        uid: 'd5y56HTG64Drt'
      }
      var res = reducers.authReducer(undefined, df(action))
      
      expect(res).toEqual({
        uid: action.uid
      })
    })
    
    it('should unset uid to state.auth', () => {
      const auth = {uid: 'd5y56HTG64Drt'}
      var action = {
        type: 'LOGOUT'
      }
      var res = reducers.authReducer(df(auth), df(action))
      
      expect(res).toEqual({})
    })
  })
})
