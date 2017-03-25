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
    const styles = {
      width: `${cellDim}px`,
      height: `${cellDim}px`
    }
    const _render = () => {
      switch (this.props.type) {
        case 'player':
          return (
            <div className={`map-tile-inner ${this.props.type}`} style={styles}>
              <Icon icon={this.props.type} width={cellDim} viewBox='0 0 1024 1024'/>
            </div>
          )
        case 'foe':
          return (
            <div className={`map-tile-inner ${this.props.type}`} style={styles}>
              <Icon icon={this.props.type} width={cellDim} viewBox='0 0 1024 1024'/>
            </div>
          )
        case 'heart':
          return (
            <div className={`map-tile-inner ${this.props.type}`} style={styles}>
              <Icon icon={this.props.type} width={cellDim} viewBox='0 0 1024 1024'/>
            </div>
          )
        case 'lvl-door':
          return (
            <div className={`map-tile-inner ${this.props.type}`} style={styles}>
              <Icon icon={this.props.type} width={cellDim} viewBox='0 0 1024 1024'/>
            </div>
          )
        case 'weapon':
          return (
            <div className={`map-tile-inner ${this.props.type}`} style={styles}>
              <Icon icon={this.props.type} width={cellDim} viewBox='0 0 1024 1024'/>
            </div>
          )
        case 'boss':
          return (
            <div className={`map-tile-inner ${this.props.type}`} style={styles}>
              <Icon icon='player' width={cellDim} viewBox='0 0 1024 1024'/>
            </div>
          )
        default:
          return <div className={`map-tile-inner ${this.props.type}`} style={styles}></div>
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
