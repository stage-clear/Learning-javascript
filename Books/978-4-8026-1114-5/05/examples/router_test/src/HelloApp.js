import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// React router を使ったコンポーネントの定義
const HelloApp = () => {
  <Router>
    <div style={{margin: 20}}>
      <Route exact path='/' component={Home}/>
      <Route path='/ja' component={HelloJapanese}/>
      <Route path='/en' component={HelloEnglish}/>
      <Route path='/cn' component={HelloChinese}/>
    </div>
  </Router>
}

// ホーム画面を表すコンポーネントを定義
const Home = () => {
  <div>
    <h1>Hello App</h1>
    <ul>
      <li><a href='/ja'>日本語</a></li>
      <li><a href='/en'>英語</a></li>
      <li><a href='/cn'>中国語</a></li>
    </ul>
  </div>
}

const HelloJapanese = () => (
  <div>
    <h1>こんにちは</h1>
    <p><a href='/'>戻る</a></p>
  </div>
)

const HelloEnglish = () => (
  ...
)

const HelloChinese = () => (
  ...
)

export default HelloApp
