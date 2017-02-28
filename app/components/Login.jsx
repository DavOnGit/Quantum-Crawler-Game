import React from 'react'
const {connect} = require('react-redux');
//import * as Redux from 'react-redux'

import * as actions from 'actions'
import ModalError from 'ModalError'

export var Login = React.createClass({
  onLogin(authProvider){
    var {dispatch} = this.props
    
    return () => dispatch(actions.startLogin(authProvider))
  },
  
  render() {
    let {error} = this.props
    let renderModalError = () => {
      if (typeof error.message === 'string') {
        return <ModalError message={error.message} title={error.title}/>
      }
    };
    return(
      <div>
        <h1 className='page-title'>Your Todos App :)</h1>
        <div className='row'>
          <div className='columns small-centered small-10 medium-6 large-4'>
            <div className='callout callout-auth'>
              <h3>Welcome!</h3>
              <p>Login with Google below.</p>
              <button className='button' onClick={this.onLogin('google')}>Login with Google</button>
              <p>Login with GitHub below.</p>
              <button className='button' onClick={this.onLogin('github')}>Login with GitHub</button>
              <p>Login with Facebook below.</p>
              <button className='button' onClick={this.onLogin('facebook')}>Login with Facebook</button>
            </div>
          </div>
        </div>
        {renderModalError()}
      </div>
    )
  }
})

export default connect(
  (state) => {
    return state
  }
)(Login);
