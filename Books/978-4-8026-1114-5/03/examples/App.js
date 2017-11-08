import React, { Component } from from 'react'

class App extends Component {
  // マウント
  constructor (props) {
    super(props)
    console.log('constructor')
  }
  componentWillMount () {
    console.log('componentDidMount')
  }
  componentDidMount () {
    console.log('componentDidMount')
  }
  // 更新
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps')
  }
  shouldComponentUpdate (nextProps, nextState) {
    console.log('shouldComponentUpdate')
    return false
  }
  componentWillUpdate () {
    console.log('componentWillUpdate') 
  }
  componentDidUpdate () {
    console.log('componentDidUpdate')
  }
  // アンマウント
  componentWillUnmount () {
    console.log('componentWillUnmount')
  }
  render () {
    console.log('render')
    const setStateHander = (e) => {
      console.log('* call setState()')
      this.setState({r: Math.random()})
    }
    return (
      <div>
        <button onClick={setStateHandler}>
          setState
        </button>
      </div>
    )
  }
}

export default App
