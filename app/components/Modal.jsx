import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }

  handleClose = () => {
    this.props.modCloseAction()                                   // eslint-disable-line
  }

  componentDidMount = () => {
    var {title, message} = this.props

    var modalMarkup = (
      <div id='modal' className='reveal small text-center' data-reveal=''>
        <h4>{title}</h4>
        <p>{message}</p>
        <button id='close-modal' className='button hollow' data-close=''>
          Got it!
        </button>
      </div>
    )
    const $modal = $(ReactDOMServer.renderToString(modalMarkup))  // eslint-disable-line
    $(ReactDOM.findDOMNode(this)).html($modal)                    // eslint-disable-line

    const modal = new Foundation.Reveal($('#modal'))              // eslint-disable-line
    modal.open()

    $modal.find('#close-modal').on('click', this.handleClose)
    $modal.closest('.reveal-overlay').on('click', this.handleClose)
  }

  componentWillUnmount () {
    $('#close-modal').off                                         // eslint-disable-line
    $('.reveal-overlay').off                                      // eslint-disable-line
  }

  render () {
    return <div></div>
  }
}

export default Modal
