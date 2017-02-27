var React = require('react')
var ReactDOM = require('react-dom')
const {connect} = require('react-redux');
var ReactDOMServer = require('react-dom/server')
import * as actions from 'actions'

var ModalConfirm = React.createClass({
  getDefaultProps: function(){
    return {
      title: 'Are you sure?'
    }
  },
  propTypes: {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    message: React.PropTypes.string.isRequired
  },
  
  handleConfirm(e) {console.log(e, this.props.id, actions);
      this.props.dispatch(actions.startDeleteTodo(this.props.id))
      this.props.dispatch(actions.closeModalConfirm())
  },
  
  handleCancel(e) {console.log(e, this.props.id, actions);
      this.props.dispatch(actions.closeModalConfirm())
  },
  
  componentDidMount: function(){
    var {id, title, message} = this.props
    
    var modalMarkup = (
      <div id='confirm-modal' className='reveal small text-center' data-reveal=''>
        <h4>{title}</h4>
        <p>{message}</p>
        <div className='expanded button-group'>
          <button id='confirm-mod-conf' className='warning button' data-close=''>
            Delete
          </button>
          <button id='cancel-mod-conf' className='secondary button' data-close=''>
            Keep it
          </button>
        </div>
      </div>
    )
    
    var $modal = $(ReactDOMServer.renderToString(modalMarkup))
    $(ReactDOM.findDOMNode(this)).html($modal)
    
    var modal = new Foundation.Reveal($('#confirm-modal'))
    modal.open()
    
    $modal.find('#confirm-mod-conf').on('click', this.handleConfirm)
    $modal.find('#cancel-mod-conf').on('click', this.handleCancel)
    $modal.closest('.reveal-overlay').on('click', this.handleCancel)
  },
  
  render(){
    return(
      <div></div>
    )
  }
})

export default connect()(ModalConfirm)
