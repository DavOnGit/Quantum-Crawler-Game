import React, {PropTypes} from 'react'

const MapTyle = (props) => (
  <div className={`map-tyle type${props.type}`}></div>
)

MapTyle.propTypes = {
  type: PropTypes.number.isRequired
}

export default MapTyle
