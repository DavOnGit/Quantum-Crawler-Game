const React = require('react');
const {connect} = require('react-redux');

import Todo from 'Todo'
const TodoAPI = require('TodoAPI');
import ModalConfirm from 'ModalConfirm'

export var TodoList = React.createClass({
  render(){
    var {todos, showCompleted, searchText, confirm} = this.props;
    
    var renderTodos = () => {
      var noTodos = <p className='container__message'>Nothing To Do!</p>
      var showTodos = TodoAPI.filterTodos(todos, showCompleted, searchText).map( (todo) => {
        return (
          <Todo key={todo.id} {...todo}/>
        )
      })
      return showTodos.length === 0 ? noTodos : showTodos
    }
    
    let renderModalConfirm = () => {
      if (typeof confirm.id === 'string') {
        return <ModalConfirm id={confirm.id} message={confirm.message} title={confirm.title}/>
      }
    }
    
    return (
      <div>
        {renderTodos()}
        {renderModalConfirm()}
      </div>
    )
  }
})

export default connect(
  (state) => {
    return state
  }
)(TodoList);
