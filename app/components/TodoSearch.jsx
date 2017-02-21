const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');

export var TodoSearch = React.createClass({
  
  // handleSearch: function(){
  //
  //
  //
  //   this.props.dispatch(actions.setSearcText(searchText))
  //   this.props.dispatch(actions.toggleShowCompleted(showCompleted))
  // },
  
  handleSearch: function(){
    var searchText = this.refs.searchText.value
    this.props.dispatch(actions.setSearchText(searchText))
  },
  handleToggleShow: function(){
    this.props.dispatch(actions.toggleShowCompleted())
  },
  
  render: function(){
    var {showCompleted, searchText} = this.props
    return(
      <div className='container__header'>
        <div>
          <input type='search' ref='searchText' placeholder='Search todos' value={searchText} onChange={this.handleSearch} />
        </div>
        <div>
          <label>
            <input type='checkbox' ref='showCompleted' checked={showCompleted} onChange={this.handleToggleShow} />
            Show completed todos
          </label>
        </div>
      </div>
    )
  }
})

export default connect(
  (state) => {
    return {
      showCompleted: state.showCompleted,
      searchText: state.searchText
    }
  }
)(TodoSearch);
