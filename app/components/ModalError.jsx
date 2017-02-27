var React = require('react')
var ReactDOM = require('react-dom')
const {connect} = require('react-redux');
var ReactDOMServer = require('react-dom/server')
import * as actions from 'actions'


var ModalError = React.createClass({
  getDefaultProps: function(){
    return {
      title: 'Error:'
    }
  },
  propTypes: {
    title: React.PropTypes.string,
    message: React.PropTypes.string.isRequired
  },
  
  handleCancel() {//console.log(e, this.props.id, actions);
      this.props.dispatch(actions.closeModalError())
  },
  
  componentDidMount: function(){
    var {title, message} = this.props
    
    var modalMarkup = (
      <div id='error-modal' className='reveal small text-center' data-reveal=''>
        <h4>{title}</h4>
        <p>{message}</p>
        <button id='cancel-mod-err' className='button hollow' data-close=''>
          Got it!
        </button>
      </div>
    )
    
    var $modal = $(ReactDOMServer.renderToString(modalMarkup))
    $(ReactDOM.findDOMNode(this)).html($modal)
    
    var modal = new Foundation.Reveal($('#error-modal'))
    modal.open()
    
    $modal.find('#cancel-mod-err').on('click', this.handleCancel)
    $modal.closest('.reveal-overlay').on('click', this.handleCancel)
  },
  
  render(){
    return(
      <div></div>
    )
  }
})

export default connect()(ModalError)
