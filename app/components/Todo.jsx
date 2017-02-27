const React = require('react');
const {connect} = require('react-redux');
const moment = require('moment');
const actions = require('actions');

export var Todo = React.createClass({
  
  onToggle(id, completed) {
    return () => {console.log('Todo actions:', actions);
      this.props.dispatch(actions.startToggleTodo(id, !completed))
    }
  },
  
  onWipe(id) {
    return () => {
      this.props.dispatch(actions.openModalConfirm(id, 'Delete Todo requested', 'Are you sure?'))
    }
  },
  
  render: function() {
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
      <div className={todoClassName}>
        <div onClick={this.onToggle(id, completed)}>
          <input type='checkbox' checked={completed} />
        </div>
        <div onClick={this.onToggle(id, completed)}>
          <p className='todo__text'>{text}</p>
          <p className='todo__subtext'>{renderDate()}</p>
        </div>
        <div>
          <button class="close-button" onClick={this.onWipe(id)} aria-label="Delete todo" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
          {/* <p className='wipeTodo' onClick={this.onWipe(id)}>&#215;</p> */}
        </div>
      </div>
    )
  }
})

export default connect()(Todo)
