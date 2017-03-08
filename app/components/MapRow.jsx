import React, {PropTypes} from 'react'

import MapTyle from 'MapTyle'

class MapRow extends React.Component {
  static propTypes = {row: PropTypes.array.isRequired}
  render () {
    let row = this.props.row
    let tyles = row.map((el, i) => <MapTyle type={el} key={i}/>)
    return (
      <div className='map-row'>
        {tyles}
      </div>
    )
  }
}

export default MapRow
