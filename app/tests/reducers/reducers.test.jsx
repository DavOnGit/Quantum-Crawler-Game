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
      
      expect(res).toEqual(action.searchText)
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
      var action = {
        type: 'ADD_TODO',
        text: 'Feed the cat'
      }
      var res = reducers.todosReducer(df([]), df(action))
      
      expect(res.length).toBe(1)
      expect(res[0].text).toBe(action.text)
    })
    
    it('should toggle todo', () => {
      var todos = [{
        id: '109',
        text: 'Hallo',
        completed: true,
        createdAt: 123,
        completedAt: 125
      }]
      var action = {
        type: 'TOGGLE_TODO',
        id: '109'
      }
      var res = reducers.todosReducer(df(todos), df(action))
      
      expect(res[0].completed).toEqual(false)
      expect(res[0].completedAt).toEqual(undefined)
    })
  })
})
