import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'

import Footer from 'Footer'
import Icon from 'Icon'

const App = (props) => (
  <div className="main-app-container">
    <div className="main-app-nav">
      <div className="main-app-title">
        <h1>Dunge<span><Icon icon='player' viewBox='0 0 1024 1024'/></span>n Crawler</h1>
      </div>
      <div>
        <h5>
          <span><IndexLink to="/" activeClassName="active">Home</IndexLink></span>
          <span><IndexLink to="/about" activeClassName="active">About</IndexLink></span>
        </h5>
      </div>
    </div>
    <div className='view-container'>
      {props.children}
    </div>
    <Footer />
  </div>
)

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App
