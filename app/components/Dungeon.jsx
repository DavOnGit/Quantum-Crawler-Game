
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as gameActions from 'gameActions'

import MapRow from 'MapRow'

const MAP_WIDTH = 1600
const MAP_HEIGHT = 600

class Dungeon extends React.Component {
  static propTypes = {
    map: PropTypes.array.isRequired,
    game: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    screen: PropTypes.object.isRequired
  }

  _handleKeyPress = (e) => {
    e.preventDefault()
    const game = this.props.game
    const pos = this.props.player.position

    switch (e.keyCode) {
      case 37:
        game.preMove({...pos, x: pos.x - 1}, 'left')
        break
      case 38:
        game.preMove({...pos, y: pos.y - 1}, 'up')
        break
      case 39:
        game.preMove({...pos, x: pos.x + 1}, 'right')
        break
      case 40:
        game.preMove({...pos, y: pos.y + 1}, 'down')
        break
    }
  }

  componentWillMount () {
    let bodyClass = document.body.className
    if (window.innerWidth <= 2002) {
      bodyClass += ' no-justify'
      document.getElementsByTagName('body')[0].className = bodyClass
    }
    if (window.innerHeight >= 2002) {
      bodyClass += ' align'
      document.getElementsByTagName('body')[0].className = bodyClass
    }
  }

  componentDidMount () {
    const playerPos = this.props.player.position
    const windowDim = this.props.screen.dim
    let offsetX = ((playerPos.x + 1) * 20) - (windowDim.x / 2)
    let offsetY = ((playerPos.y + 1) * 20) - (windowDim.y / 2)
    this.scrollTO = setTimeout(() => window.scroll(offsetX, offsetY))
    this.props.game.wScroll({x: offsetX, y: offsetY})
    window.addEventListener('keydown', this._handleKeyPress)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this._handleKeypress)
    clearTimeout(this.scrollTO)
  }

  render () {
    let map = this.props.map
    let renderMapRows = map.map((el, i) => <MapRow row={el} key={i}/>)

    return (
      <div className='dungeon'>
        {renderMapRows}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.map,
    player: state.player,
    screen: state.screen
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
