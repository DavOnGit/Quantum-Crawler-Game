
import React, {PropTypes} from 'react'
import { connect } from 'react-redux'

import MapRow from 'MapRow'

class Dungeon extends React.Component {
  static propTypes = {
    map: PropTypes.array.isRequired
  }

  componentWilMount () {

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

export default connect(
  mapStateToProps
)(Dungeon)
