import React from 'react'
import ReactDOM from 'react-dom'

class TextForm extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      value: ''
    }
  }
  
  render () {
    // フォームにテキストボックスを指定
    return (
      <div>
        <form onSubmit={e => this.doSubmit(e)}>
          <input type='text'
            onChange={e => this.doChange(e)}
            value={this.state.value}/>
          <input type='submit'/>
        </form>
      </div>
    )
  }
  
  // テキストボックスを変更した時
  doChange (e) {
    this.setState({value: e.target.value})
  }
  
  // フォームを送信したとき
  doSubmit (e) {
    e.preventDefault()
  }
}

ReactDOM.render(
  <TextForm />,
  document.getElementById('root')
)
