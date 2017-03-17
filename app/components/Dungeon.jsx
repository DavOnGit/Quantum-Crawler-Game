
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IndexLink } from 'react-router'

import * as gameActions from 'gameActions'
import MapRow from 'MapRow'
import Icon from 'Icon'

class Dungeon extends React.Component {
  static propTypes = {
    gameLvl: PropTypes.number.isRequired,
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
      document.body.className = bodyClass
    }
    if (window.innerHeight >= 2002) {
      bodyClass += ' align'
      document.body.className = bodyClass
    }
  }

  componentDidMount () {
    const playerPos = this.props.player.position
    const windowDim = this.props.screen.dim
    let offsetX = ((playerPos.x + 1) * 20) - (windowDim.x / 2)
    let offsetY = ((playerPos.y + 1) * 20) - (windowDim.y / 2)
    this.scrollTO = setTimeout(() => window.scroll(offsetX, offsetY), 5000)
    this.props.game.wScroll({x: offsetX, y: offsetY})
    window.addEventListener('keydown', this._handleKeyPress)
  }

  componentWillUnmount () {
    document.body.className = ''
    window.removeEventListener('keydown', this._handleKeypress)
    clearTimeout(this.scrollTO)
  }

  render () {
    let map = this.props.map
    let renderMapRows = map.map((el, i) => <MapRow row={el} key={i}/>)

    return (
      <div className='dungeon'>
        <div className='info-bar'>
          <div className='container'>
            <div className='tab' title='Dungeon Level'>
              <p><Icon icon='game-lvl'/></p>
              <p>{this.props.gameLvl}</p>
            </div>
            <div className='tab' title='Level'>
              <p><Icon icon='player-lvl'/></p>
              <p>{this.props.player.lvl}</p>
            </div>
            <div className='tab' title='Life'>
              <p><Icon icon='life'/></p>
              <p>{this.props.player.life}/{this.props.player.maxLife}</p>
            </div>
            <div className='tab' title='Experience'>
              <p><Icon icon='experience'/></p>
              <p>{this.props.player.exp}</p>
            </div>
            <div className='tab' title='Weapon'>
              <p><Icon icon='weapon'/></p>
              <p>{this.props.player.wName}</p>
            </div>
            <div className='tab' title='Damage'>
              <p><Icon icon='damage'/></p>
              <p>{this.props.player.dmg}</p>
            </div>
            <div className='tab' title='Pause/Exit'>
              <IndexLink to='/' activeClassName="active">
                <p><Icon icon='lvl-door'/></p>
                <p>exit</p>
              </IndexLink>
            </div>
          </div>
        </div>
        {renderMapRows}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    gameLvl: state.gameLvl,
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
