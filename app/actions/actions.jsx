import firebase, {firebaseRef, githubProvider, facebookProvider, googleProvider} from 'app/firebase/'
import moment from 'moment'

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  }
}

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  }
}

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  }
}

export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    }
    var uid = getState().auth.uid
    var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo)
    
    return todoRef.then( () => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }))
    })
  }
}

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  }
}

export var startAddTodos = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid
    var todosRef = firebaseRef.child(`users/${uid}/todos`)
    
    return todosRef.once('value').then( todos => {
      var todosObj = todos.val() || {}
      
      var todosArr = Object.keys(todosObj).map( key => ({
        ...todosObj[key],
        id: key
      }))
      dispatch(addTodos(todosArr))
    })
  }
}

export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  }
}

export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid
    var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`)
    var updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    }
    
    return todoRef.update(updates)
    .then( () => dispatch(updateTodo(id, updates)))
    .catch((error) => console.log(`Toggle completed failed, please try again\nError: ${error.message}`))
  }
}

export var deleteTodo = (id) => {
  return {
    type: 'DELETE_TODO',
    id
  }
}

export var startDeleteTodo = (id) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid
    var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`)
    
    return todoRef.remove()
      .then(() => dispatch(deleteTodo(id)))
      .catch((error) => console.log(`Remove todo failed, please try again\nError: ${error.message}`))
  }
}

export var openModalConfirm = (id, title, message) => {
  return {
    type: 'OPEN_MODAL_CONFIRM',
    id,
    title,
    message
  }
}

export var closeModalConfirm = () => {
  return {
    type: 'CLOSE_MODAL_CONFIRM'
  }
}

export var openModalError = (title, message) => {
  return {
    type: 'OPEN_MODAL_ERROR',
    title,
    message
  }
}

export var closeModalError = () => {
  return {
    type: 'CLOSE_MODAL_ERROR'
  }
}

export var login = (uid) => {console.log('action login:', uid);
  return {
    type: 'LOGIN',
    uid
  }
}

export var startLogin = (provider) => {
  return(dispatch, getState) => {
    
    switch (provider) {
      case 'google':
        return (
          firebase.auth().signInWithPopup(googleProvider).then(
            (result) => console.log('Auth google ok!', result),
            (error) => {
              // TODO: set link when email is already present https://firebase.google.com/docs/auth/web/account-linking
              firebase.auth().fetchProvidersForEmail(error.email).then(result => {
                let message = 'User already exist!\nPlease try autenticate with your ' + result[0] + ' account'
                dispatch(openModalError('Login Erorr :(', message))
              })
            }
          )
        )
        
      case 'github':
        return (
          firebase.auth().signInWithPopup(githubProvider).then(
            (result) => console.log('Auth github ok!', result),
            (error) => {
              firebase.auth().fetchProvidersForEmail(error.email).then(result => {
                let message = 'User email already exist! Please try autenticate with your ' + result[0].toUpperCase() + ' account'
                dispatch(openModalError('Login Erorr :(', message))
              })
            }
          )
        )
      
      case 'facebook':
        return (
          firebase.auth().signInWithPopup(facebookProvider).then(
            (result) => console.log('Auth facebuk ok!', result),
            (error) => {
              firebase.auth().fetchProvidersForEmail(error.email).then(result => {
                let message = 'User email already exist!\nPlease try autenticate with your ' + result[0] + ' account'
                dispatch(openModalError('Login Erorr :(', message))
              })
            }
          )
        )
      default:
        throw(error)
    }
  }
}

export var logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export var startLogout = () => {
  return(dispatch, getState) => {
    return firebase.auth().signOut()
      .then(() => {/*console.log('Logged out!')*/})
      .catch((error) => console.log(`Logout todo failed, please try again\nError: ${error.message}`))
  }
}
