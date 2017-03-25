
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as gameActions from 'gameActions'
import MapRow from 'MapRow'
import Display from 'Display'
import Modal from 'Modal'
import Darkness from 'Darkness'
import { cellDim, mapSettings } from 'settings'

class Dungeon extends React.Component {
  static propTypes = {
    gameLvl: PropTypes.number.isRequired,
    map: PropTypes.array.isRequired,
    game: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    screen: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    darkness: PropTypes.bool.isRequired
  }

  _handleKeyPress = (e) => {
    e.preventDefault()
    const game = this.props.game
    const pos = this.props.player.position

    switch (e.key) {
      case 'ArrowLeft':console.log('left')
        game.preMove({...pos, x: pos.x - 1}, 'left')
        break
      case 'ArrowUp':console.log('up')
        game.preMove({...pos, y: pos.y - 1}, 'up')
        break
      case 'ArrowRight':console.log('right')
        game.preMove({...pos, x: pos.x + 1}, 'right')
        break
      case 'ArrowDown':console.log('down')
        game.preMove({...pos, y: pos.y + 1}, 'down')
        break
    }
  }

  _handleClickDark = (e) => {
    e.stopPropagation()
    this.props.game.toggleDarkness()
  }

  _onNextFrame = () => {
    console.log('onNextFrame!')
    const scroll = this.props.screen.scroll
    window.requestAnimationFrame(() => window.scrollTo(scroll.x, scroll.y))
  }

  componentWillMount () {
    const {dim} = this.props.screen
    const mapSize = (mapSettings.width * cellDim) + 2       // this magic number is to account the border
    let bodyClass = document.body.className
    if (dim.x <= mapSize) {
      bodyClass += ' no-justify'
      document.body.className = bodyClass
    }
    if (dim.x >= mapSize) {
      bodyClass += ' align'
      document.body.className = bodyClass
    }
  }

  componentDidMount () {
    this._onNextFrame()
    const addKeyEvL = document.body.addEventListener || document.body.attachEvent
    addKeyEvL('keydown', this._handleKeyPress, false)
  }

  componentWillUnmount () {
    document.body.className = ''
    const removeKeyEvL = document.body.removeEventListener || document.body.detachEvent
    removeKeyEvL('keydown', this._handleKeyPress)
  }

  render () {
    const {map, player, screen, modal, darkness} = this.props
    const renderMapRows = map.map((el, i) => <MapRow row={el} key={i}/>)
    const renderModal = () => {
      if (modal.message) return <Modal title={modal.title} message={modal.message}/>
    }
    const renderDarkness = () => {
      if (darkness) return <Darkness _handleClick={this._handleClickDark} position={player.position} screen={screen.dim}/>
    }
    return (
      <div className='dungeon' onClick={this._handleClickDark}>
        {renderDarkness()}
        {renderMapRows}
        <Display/>
        {renderModal()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    gameLvl: state.gameLvl,
    map: state.map,
    player: state.player,
    screen: state.screen,
    modal: state.modal,
    darkness: state.darkness
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    game: bindActionCreators(gameActions, dispatch)
    // undoActs: bindActionCreators(ActionCreators, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dungeon)
