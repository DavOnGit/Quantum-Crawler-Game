import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from 'CounterActions'
import { ActionCreators } from 'redux-undo'

const Counter = (props) => (
  <div className="counter-container">
    <div className="counter-num-label">{props.counter}</div>
    <div className="counter-even-label">{props.counter % 2 === 0 ? 'even' : 'odd'}</div>
    <br />
    <div className="counter-buttons">
      <button onClick={() => { props.counterActs.decrement(); }}>-</button>
      <span className='counter-even-label'>&nbsp;&nbsp;COUNTER&nbsp;&nbsp;</span>
      <button onClick={() => { props.counterActs.increment(); }}>+</button>
    </div>
    <div className="counter-buttons">
      <button onClick={() => { props.undoActs.undo(); }}>-</button>
      <span className='counter-even-label'>TIME TRAVEL</span>
      <button onClick={() => { props.undoActs.jump(1); }}>+</button>
    </div>
  </div>
);

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  counterActs: PropTypes.object.isRequired,
  undoActs: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    counter: state.counter.present
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    counterActs: bindActionCreators(CounterActions, dispatch),
    undoActs: bindActionCreators(ActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
