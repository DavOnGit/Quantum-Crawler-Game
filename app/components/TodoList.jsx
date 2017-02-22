const React = require('react');
const {connect} = require('react-redux');
import Todo from 'Todo'
const TodoAPI = require('TodoAPI');

export var TodoList = React.createClass({
  
  render: function(){
    var {todos, showCompleted, searchText} = this.props;
    
    var renderTodos = () => {
      var noTodos = <p className='container__message'>Nothing To Do!</p>
      var showTodos = TodoAPI.filterTodos(todos, showCompleted, searchText).map( (todo) => {
        return (
          <Todo key={todo.id} {...todo}/>
        )
      })
      
      return showTodos.length === 0 ? noTodos : showTodos
    }
    return (
      <div>
        {renderTodos()}
      </div>
    )
  }
})

export default connect(
  (state) => {
    return state
  }
)(TodoList);
