const React = require('react');
const {connect} = require('react-redux');
const moment = require('moment');
const actions = require('actions');

export var Todo = React.createClass({
  
  onToggle: function (id) {
    return () => {
      //this.props.onToggle(id)
      this.props.dispatch(actions.toggleTodo(id))
    }
  },
  
  render: function(){
    var {id, text, completed, createdAt, completedAt} = this.props
    
    var todoClassName = completed ? 'todo todo-completed' : 'todo'
    
    var renderDate = () => {
      var message = 'Created '
      var timestamp = createdAt
      
      if(completed) {
        message = 'Completed '
        timestamp = completedAt
      }
      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a')
    }
    
    return(
      <div className={todoClassName} onClick={this.onToggle(id)}>
        <div>
          <input type='checkbox' checked={completed} />
        </div>
        <div>
          <p>{text}</p>
          <p className='todo__subtext'>{renderDate()}</p>
        </div>
      </div>
    )
  }
})

export default connect()(Todo)
