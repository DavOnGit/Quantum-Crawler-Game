import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'
import Footer from 'Footer'

const App = (props) => (
  <div className="main-app-container">
    <div className="main-app-nav">
      <div id="main-app-title">Dungeon Crawler</div>
      <div>
        <span><IndexLink to="/" activeClassName="active">Home</IndexLink></span>
        <span><IndexLink to="/page2" activeClassName="active">Page2</IndexLink></span>
        <span><IndexLink to="game" activeClassName="active">Game</IndexLink></span>
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
