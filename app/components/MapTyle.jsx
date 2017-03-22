import React, { PropTypes } from 'react'

import Icon from 'Icon'
import { cellDim } from 'settings'

class MapTyle extends React.Component {
  static propTypes = {type: PropTypes.string.isRequired}

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.type === this.props.type) return false
    else return true
  }
  render () {
    const _render = () => {
      switch (this.props.type) {
        case 'player':
          return (
            <div className={`map-tile-inner ${this.props.type}`}>
              <Icon icon={this.props.type} width={cellDim}/>
            </div>
          )
        case 'foe':
          return (
            <div className={`map-tile-inner ${this.props.type}`}>
              <Icon icon={this.props.type} width={cellDim}/>
            </div>
          )
        case 'heart':
          return (
            <div className={`map-tile-inner ${this.props.type}`}>
              <Icon icon={this.props.type} width={cellDim}/>
            </div>
          )
        case 'lvl-door':
          return (
            <div className={`map-tile-inner ${this.props.type}`}>
              <Icon icon={this.props.type} width={cellDim}/>
            </div>
          )
        case 'weapon':
          return (
            <div className={`map-tile-inner ${this.props.type}`}>
              <Icon icon={this.props.type} width={cellDim}/>
            </div>
          )
        case 'boss':
          return (
            <div className={`map-tile-inner ${this.props.type}`}>
              <Icon icon='player' width={cellDim}/>
            </div>
          )
        default:
          return <div className={`map-tile-inner ${this.props.type}`}></div>
      }
    }
    return (
      <div className={`map-tile ${this.props.type}`}>
        {_render()}
      </div>
    )
  }
}

export default MapTyle
