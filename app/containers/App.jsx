import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'

import Footer from 'Footer'
import Icon from 'Icon'

const App = (props) => (
  <div className="main-app-container">
    <div className="main-app-nav">
      <div className="main-app-title">
        <h1>Dunge<span><Icon icon='player'/></span>n Crawler</h1>
      </div>
      <div>
        <span><IndexLink to="/" activeClassName="active">Home</IndexLink></span>
        <span><IndexLink to="/page2" activeClassName="active">About</IndexLink></span>
      </div>
    </div>
    <div>
      {props.children}
      {/* {React.Children.map(props.children, (child) =>   // This is for clone each element with new props:
          React.cloneElement(child, {
            doSomething: this.doSomething
          })
      )} */}
    </div>
    <Footer />
  </div>
)

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App
