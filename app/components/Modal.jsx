import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import ReactDOMServer from 'react-dom/server'

import { gameEnd } from 'gameActions'

class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  _handleClose = (e) => { console.log(e)
    if (e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40) {
      console.log('prevent?')
      e.preventDefault()
    } else if (e.type === 'click' || e.key === 'Enter' || e.key === 'Escape') {
      this.modal.close()
      this.props.dispatch(gameEnd())
    }
  }

  componentDidMount () {
    var {title, message} = this.props

    var modalMarkup = (
      <div id='modal' className='reveal small text-center' data-reveal=''>
        <h4>{title}</h4>
        <p>{message}</p>
        <button className='close-modal button hollow' data-close=''>
          Got it!
        </button>
        <button className="close-modal close-button" data-close='' aria-label="Close reveal" type="button">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
    const $modal = $(ReactDOMServer.renderToString(modalMarkup))  // eslint-disable-line
    $(ReactDOM.findDOMNode(this)).html($modal)                    // eslint-disable-line

    this.modal = new Foundation.Reveal($('#modal'))               // eslint-disable-line
    this.modal.open()

    $modal.find('.close-modal').on('click', this._handleClose)
    $modal.closest('.reveal-overlay')
      .on('click', this._handleClose)
      .on('keydown', this._handleClose)
  }

  componentWillUnmount () {
    $('.close-modal').off                                         // eslint-disable-line
    $('.reveal-overlay').off                                      // eslint-disable-line
  }

  render () {
    return <div></div>
  }
}

export default connect()(Modal)
