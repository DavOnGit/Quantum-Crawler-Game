
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as gameActions from 'gameActions'

import MapRow from 'MapRow'

class Dungeon extends React.Component {
  static propTypes = {
    map: PropTypes.array.isRequired,
    game: PropTypes.object.isRequired
  }

  _handleKeyPress (e) {
    let game = this.props.game

    switch (e.keyCode) {
      case 37:
        console.log('left')
        return game.keyLeft()
      case 38:
        console.log('up')
        return game.keyUp()
      case 39:
        console.log('right')
        return game.keyRight()
      case 40:
        console.log('down')
        return game.keyDown()
    }
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    window.addEventListener('keydown', this._handleKeyPress.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this._handleKeypress)
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
    map: state.map
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
