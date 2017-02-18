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
  
  describe('showCompleted', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      }
      var res = reducers.showCompletedReducer(df(false), df(action))
      
      expect(res).toBe(true)
    })
  })
})
