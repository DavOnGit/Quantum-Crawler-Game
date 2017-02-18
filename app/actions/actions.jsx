
export var setSearcText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  }
}

export var addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text
  }
}

export var toggleShowCompleted = (showCompleted) => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED',
    showCompleted
  }
}

export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
