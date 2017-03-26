import { Component, PropTypes, default as React } from 'react'

import { cellDim } from 'settings'

class Darkness extends Component {
  static propTypes = {
    position: PropTypes.object.isRequired,
    screen: PropTypes.object.isRequired,
    _handleClick: PropTypes.func.isRequired
  }

  _handleClick = (e) => {
    e.stopPropagation()
    this.props._handleClick(e)
  }

  render () {
    const {position} = this.props
    const circleDim = ~~cellDim * 2 * 15    // visual distance
    const offsetX = ((position.x + 0.5) * cellDim) - ~~(circleDim / 2)
    const offsetY = ((position.y + 0.5) * cellDim) - ~~(circleDim / 2)
    const styles = {
      left: offsetX + 'px',
      top: offsetY + 'px',
      width: circleDim + 'px',
      height: circleDim + 'px'
    }
    return (
      <div className='darkness' onClick={this._handleClick}>
        <div className='see-through' style={styles}></div>
      </div>
    )
  }
}

export default Darkness
