import React, {PropTypes} from 'react'

import Icon from 'Icon'

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
              <Icon icon={this.props.type}/>
            </div>
          )
        case 'foe':
          return (
            <div className={`map-tile-inner ${this.props.type}`}>
              <Icon icon={this.props.type}/>
            </div>
          )
        case 'heart':
          return (
            <div className={`map-tile-inner ${this.props.type}`}>
              <Icon icon={this.props.type}/>
            </div>
          )
        case 'lvl-door':
          return (
            <div className={`map-tile-inner ${this.props.type}`}>
              <Icon icon={this.props.type}/>
            </div>
          )
        case 'weapon':
          return (
            <div className={`map-tile-inner ${this.props.type}`}>
              <Icon icon={this.props.type}/>
            </div>
          )
        case 'boss':
          return (
            <div className={`map-tile-inner ${this.props.type}`}>
              <Icon icon='player'/>
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
