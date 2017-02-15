const React = require('react');

var Todo = React.createClass({
  
  onToggle: function (id) {
    return () => {
      this.props.onToggle(id)
    }
  },
  
  render: function(){
    var {id, text, completed} = this.props
    return(
      <div onClick={this.onToggle(id)}>
        <input type='checkbox' checked={completed} />
        {text}
      </div>
    )
  }
})

module.exports = Todo;
