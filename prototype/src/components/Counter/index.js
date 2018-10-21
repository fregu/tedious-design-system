import React, { Component } from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import './index.css'

class Counter extends Component<Props> {
  render () {
    const { className, counter = 0, increment, step } = this.props
    return (
      <div className={ classNames('Counter', className) } onClick={() => increment(step)}>
        {counter}
      </div>
    )
  }
}
export default connect(
  ({ counter }) => ({ counter }),
  dispatch => ({ increment(step = 1) { dispatch({ type: 'INCREMENT', step }) }})
)(Counter)
