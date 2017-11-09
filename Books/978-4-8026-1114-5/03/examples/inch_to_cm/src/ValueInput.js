import React, { Component } from 'react'

// 数値を入力するコンポーネント
export default class ValueInput extends Component {
  constructor (props) {
    super(props)
    // プロパティより初期値を設定
    this.state = {
      value: this.props.value
    }
  }
  
  // 値がユーザーにより変更されたとき
  handleChange (e) {
    const v = e.target.value 
    // 数値以外を除外
    const newValue = v.replace(/[^0-9]/g, '')
    // 状態に設定
    this.setState({
      value: newValue
    })
    // イベントを実行する
    if (this.props.onChange) {
      this.props.onChange({
        target: this,
        value: newValue
      })
    }
  }
  
  // プロパティが変更されたとき
  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value
    })
  }
  
  // 描画
  render () {
    return (
      <div>
        <label>
          {this.props.title}: <br>
          <input 
            type='text' 
            value={this.state.value} 
            onChange={e => this.handleChange(e)}/>
        </label>
      </div>
    )
  }
}
