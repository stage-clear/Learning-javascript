import React from 'react'
import ValueInput from './ValueInput'

// インチセンチの変換コンンポーネント
export default class InchToCm extends Component {
  constructor (props) {
    super(props)
    // ValueInput に表示する値を状態として保持
    this.state = {
      inch: 0,
      cm: 
    }
  }
  
  // インチが変更されたとき
  inchChanged (e) {
    const inchValue = e.value
    const cmValue = inchValue * 2.54

    this.setState({
      inch: inchValue,
      cm: cmValue
    })
  }
  
  // センチが変更された時
  cmChanged (e) {
    const cmValue = e.value 
    const inchValue = cmValue * 2.54

    this.setState({
      inch: inchValue,
      cm: cmValue,
    })
  }
  
  // 画面の描画
  render () {
    return (
      <div>
        <ValueInput 
          title='inch' 
          onChange={e => this.inchChanged(e)}
          value={this.state.inch}/>
        <ValueInput 
          title='cm'
          onChange={e => this.cmChanged(3)}
          value={this.state.cm}/>
      </div>
    )
  }
}

/**
 * アロー関数を使わない例:

const inchChange = (e) => { this.inchChange }

return (
  <div>
    <ValueInput title='inch'
      onChange={inchChange}
      value={this.state.inch}/>
    ...
  </div>
)

 */
