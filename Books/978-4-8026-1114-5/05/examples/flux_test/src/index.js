import React from 'react'
import ReactDOM from 'react-dom'
import {Actions} from './actions'
import {nameStore, messageStore} from './stores'

// View の定義
class AppView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {name: '', message: ''}
    // View と Store を結びつける
    nameStore.onChange = () => {
      this.setState({name: nameStore.name})
    }
    
    messageStore.onChange = () => {
      this.setState({message: messageStore.message})
    }
  }
  
  // View では Action を投げる
  render () {
    console.log('View.render')
    return (
      <div>
        <div>
          <input value={this.state.name}
            onChange={(e) => Actions.changeName(e.target.value)}/>
          <button onClick={(e) => Actions.submitName()}>
            登録
          </button>
        </div>
        <div>{this.state.message}</div>
      </div>
    )
  }
}

// DOMを書き換える
ReactDOM.render(
  <AppView/>,
  docuemnt.getElementById('root')
)
