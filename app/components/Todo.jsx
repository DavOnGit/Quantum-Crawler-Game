const React = require('react');
const moment = require('moment');

var Todo = React.createClass({
  
  onToggle: function (id) {
    return () => {
      this.props.onToggle(id)
    }
  },
  
  render: function(){
    var {id, text, completed, createdAt, completedAt} = this.props
    
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
      <div onClick={this.onToggle(id)}>
        <input type='checkbox' checked={completed} />
        <p>{text}</p>
        <p>{renderDate()}</p>
      </div>
    )
  }
})

module.exports = Todo;
