import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'
import { connect } from 'react-redux'

import Icon from 'Icon'

class Display extends React.Component {
  static propTypes = {
    gameLvl: PropTypes.number.isRequired,
    player: PropTypes.object.isRequired
  }
  _handleClick = (e) => {
    e.stopPropagation()
  }
  render () {
    const elDim = 28
    return (
      <div className='info-bar' onClick={this._handleClick}>
        <div className='container'>
          <div className='tab' title='Dungeon Level'>
            <p><Icon icon='game-lvl' width={elDim} viewBox='0 0 1024 1024'/></p>
            <p>{this.props.gameLvl}</p>
          </div>
          <div className='tab' title='Level'>
            <p><Icon icon='player-lvl' width={elDim} viewBox='0 0 1024 1024'/></p>
            <p>{this.props.player.lvl}</p>
          </div>
          <div className='tab' title='Life'>
            <p><Icon icon='life' width={elDim} viewBox='0 0 1024 1024'/></p>
            <p>{this.props.player.life}/{this.props.player.maxLife}</p>
          </div>
          <div className='tab' title='Exp to next lvl'>
            <p><Icon icon='experience' width={elDim} viewBox='0 0 1024 1024'/></p>
            <p>{this.props.player.nextLvl}</p>
          </div>
          <div className='tab' title='Weapon'>
            <p><Icon icon='weapon' width={elDim} viewBox='0 0 1024 1024'/></p>
            <p>{this.props.player.wName}</p>
          </div>
          <div className='tab' title='Damage'>
            <p><Icon icon='damage' width={elDim} viewBox='0 0 1024 1024'/></p>
            <p>{this.props.player.dmg}</p>
          </div>
          <div className='tab' title='Pause/Exit'>
            <IndexLink to='/' activeClassName="active">
              <p><Icon icon='lvl-door' width={elDim} viewBox='0 0 1024 1024'/></p>
              <p>exit</p>
            </IndexLink>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    gameLvl: state.gameLvl,
    player: state.player
  }
}

export default connect(
  mapStateToProps
)(Display)
