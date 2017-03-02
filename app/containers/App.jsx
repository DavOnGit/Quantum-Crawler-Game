import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import Footer from 'Footer';

const App = (props) => (
  <div className="main-app-container">
    <div className="main-app-nav">
      <div id="main-app-title">Simple Vanilla-HMR Boilerplate</div>
      <div>
        <span><IndexLink to="/" activeClassName="active">Home</IndexLink></span>
        <span><IndexLink to="/page2" activeClassName="active">Page2</IndexLink></span>
        <span><IndexLink to="/page3" activeClassName="active">Page3</IndexLink></span>
      </div>
    </div>
    <div>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child)
      )}
    </div>
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
