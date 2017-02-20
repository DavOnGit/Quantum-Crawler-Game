const expect= require('expect');
const actions = require('actions');

describe('Actions', () => {
  
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    }
    var res = actions.setSearcText(action.searchText)
    
    expect(res).toEqual(action)
  })
  
  it('should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      text: 'Thing to do'
    }
    var res = actions.addTodo(action.text)
    
    expect(res).toEqual(action)
  })
  
  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED',
    }
    var res = actions.toggleShowCompleted(action.showCompleted)
    
    expect(res).toEqual(action)
  })
  
  it('should generate toggle todo action', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: 123
    }
    var res = actions.toggleTodo(action.id)
    
    expect(res).toEqual(action)
  })
})
