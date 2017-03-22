
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IndexLink } from 'react-router'

import * as gameActions from 'gameActions'
import MapRow from 'MapRow'
import Icon from 'Icon'
import Modal from 'Modal'
import { cellDim } from 'settings'

class Dungeon extends React.Component {
  static propTypes = {
    gameLvl: PropTypes.number.isRequired,
    map: PropTypes.array.isRequired,
    game: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    screen: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired
  }

  _handleKeyPress = (e) => {
    e.preventDefault()
    const game = this.props.game
    const pos = this.props.player.position

    switch (e.keyCode) {
      case 37:console.log('left')
        game.preMove({...pos, x: pos.x - 1}, 'left')
        break
      case 38:console.log('up')
        game.preMove({...pos, y: pos.y - 1}, 'up')
        break
      case 39:console.log('right')
        game.preMove({...pos, x: pos.x + 1}, 'right')
        break
      case 40:console.log('down')
        game.preMove({...pos, y: pos.y + 1}, 'down')
        break
    }
  }

  _onNextFrame = () => {
    console.log('onNextFrame!')
    const scroll = this.props.screen.scroll
    window.requestAnimationFrame(() => window.scrollTo(scroll.x, scroll.y))
  }

  componentWillMount () {
    let bodyClass = document.body.className
    if (window.innerWidth <= 2002) {
      bodyClass += ' no-justify'
      document.body.className = bodyClass
    }
    if (window.innerHeight >= 2002) {
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
    const {map, modal} = this.props
    const renderMapRows = map.map((el, i) => <MapRow row={el} key={i}/>)
    const renderModal = () => {
      if (modal.message) return <Modal title={modal.title} message={modal.message} modCloseAction={this.props.game.closeModal}/>
    }
    return (
      <div className='dungeon'>
        <div className='info-bar'>
          <div className='container'>
            <div className='tab' title='Dungeon Level'>
              <p><Icon icon='game-lvl' width={cellDim}/></p>
              <p>{this.props.gameLvl}</p>
            </div>
            <div className='tab' title='Level'>
              <p><Icon icon='player-lvl' width={cellDim}/></p>
              <p>{this.props.player.lvl}</p>
            </div>
            <div className='tab' title='Life'>
              <p><Icon icon='life' width={cellDim}/></p>
              <p>{this.props.player.life}/{this.props.player.maxLife}</p>
            </div>
            <div className='tab' title='Experience'>
              <p><Icon icon='experience' width={cellDim}/></p>
              <p>{this.props.player.exp}</p>
            </div>
            <div className='tab' title='Weapon'>
              <p><Icon icon='weapon' width={cellDim}/></p>
              <p>{this.props.player.wName}</p>
            </div>
            <div className='tab' title='Damage'>
              <p><Icon icon='damage' width={cellDim}/></p>
              <p>{this.props.player.dmg}</p>
            </div>
            <div className='tab' title='Pause/Exit'>
              <IndexLink to='/' activeClassName="active">
                <p><Icon icon='lvl-door' width={cellDim}/></p>
                <p>exit</p>
              </IndexLink>
            </div>
          </div>
        </div>
        {renderMapRows}
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
    modal: state.modal
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
