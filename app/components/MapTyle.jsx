import React, {PropTypes} from 'react'

class MapTyle extends React.Component {
  static propTypes = {type: PropTypes.string.isRequired}

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.type === this.props.type) return false
    else return true
  }
  render () {
    return (
      <div className={`map-tile ${this.props.type}`}>
        <div className={`map-tile-inner ${this.props.type}`}></div>
      </div>
    )
  }
}

export default MapTyle
