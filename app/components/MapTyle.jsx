import React, {PropTypes} from 'react'

const MapTyle = (props) => (
  <div className={`map-tyle ${props.type}`}></div>
)

MapTyle.propTypes = {
  type: PropTypes.string.isRequired
}

export default MapTyle
