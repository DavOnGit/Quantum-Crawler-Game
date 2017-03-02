import React from 'react'
import {Route, Router, IndexRoute, browserHistory} from 'react-router'

import App from 'App'
import Home from 'Home';
import Page2 from 'Page2';
import Page3 from 'Page3';
import NotFoundPage from 'NotFoundPage';
//import {Home, Page2, Page3, NotFoundPage} from '../components/';

export default () => {
  return (
    <Router history={browserHistory}>
      {/* 'App' acts as a wrapper for the child components */}
      <Route path="/" component={App}>
        {/* IndexRoute is the initial component that is loaded,
          other routes are loaded according to the component
        property specified here */}
        <IndexRoute component={Home} />
        <Route path="page2" component={Page2} />
        <Route path="page3" component={Page3} />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  );
};
