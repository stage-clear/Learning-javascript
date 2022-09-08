# 3 React/Next.jsの基礎
## 3.1 React入門
### 3.1.1 Reactの始め方

```shell
$ npx create-react-app@latest react-sample --template typescript

$ cd react-sample
$ npm run start
```

### 3.1.2 Reactの基本

**リスト 3.1 `src/index.tsx` を一部省略しコメントを追加**
```ts
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    {/* App は src/App.tsx からインポートしたものを使用している */}
    <App />
  </React.StrictMode>
)
```

**リスト 3.2 `src/App.tsx`を一部省略しコメントを追加**
```ts
import React from 'react'
import logo from './logo.svg'
import './App.css'

// 関数で App というコンポーネントを定義している
function App () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  )
}

export default App
```

#### Reactの基本のキーワード
```ts
let MyReactComponent = <div id='myreact'></div>
```

```ts
const root = ReactDOM.createRoot(コンテナ)

root.render(要素)
```

**リスト 3.3 `src/index.tsx`のReactDOM.renderの編集例**
```ts
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <h1>見出し</h1>
)
```

### 3.1.3 Reactのコンポーネントを作成する

**リスト 3.4 `src/components/Hello.tsx`**
```ts
const Hello = () => {
  // クリック時に呼ばれる関数
  const onClick = () => {
    alert('hello')
  }
  const text = 'Hello, React'
  
  return (
    <div onClick={onClick}>
      {text}
    </div>
  )
}

export default Hello
```

**リスト 3.5 `src/index.tsx`**
```ts
import ReactDOM from 'react-dom'
import './index.css'
import Hello from './components/Hello'

ReactDOM.render(
  <React.StrictMode>
    <Hello />
  </React.StrictMode>,
  document.getElementById('root')
)
```

## 3.2 Reactにおけるコンポーネント
### 3.2.1 React要素

**リスト 3.6 `src/components/Name.tsx`**
```ts
import React from 'react'

const Name = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  
  return (
    <div style={{padding: '16px'; backgroundColor: 'gray'}}>
      <label htmlFor="name">名前</label>
      <input id="name" className="input-name" type="text" onChange={onChange} />
    </div>
  )
}

export default Name
```

### 3.2.2 コンポーネント（Reactコンポーネント）

- 関数コンポーネント（デファクト）
- クラスコンポーネント

**リスト 3.8 `src/components/Message.tsx`**
```ts
const Text = (props: {content: string}) => {
  const { content } = props
  return <p className="text">{content}</p>
)

const Message = (props: {}) => {
  const content1 = 'This is parent component'
  const content2 = 'Message uses Text component'
  
  return (
    <div>
      <Text content={content1}>
      <Text content={content2}>
    </div>
  )
}

export default Message
```

**リスト 3.8 `src/components/ContainerSample.tsx`**
```ts
const container = (props: { title: string; children: React.ReactElement }) => {
  const { title, children } = props
  
  return (
    <div style={{ background: 'red' }}>
      <span>{title}</span>
      <div>{children}</div>
    </div>
  )
}

const Parent = () => {
  return (
    <Container title="Hello">
      <p>このの部分が背景色で囲まれます</p>
    </Container>
  )
}

export default Parent
```

`関数コンポーネント+フック`と比べたとき、`クラスコンポーネント`には以下のような問題点があります。

- コールバック関数で`props`や`state`に参照するためには、事前に`this`コンテキストをバインドする必要がある
- ライフサイクルを扱うためのメソッドが多くて複雑である
- 状態をセットにして、振る舞いをほかのコンポーネントと共通化するのが困難

## 3.3 Reactにおける型
**リスト 3.9 `src/components/ContainerSample.tsx`**
```ts
import React from 'react'

type ContainerProps = {
  title: string
  children: React.ReactNode
}

const Container = (props: ContainerProps): JSX.Element => {
  const { title, chidren } = props
  
  return (
    <div style={{ background: 'red' }}>
      <span>{title}</span>
      <div>{children</div>
    </div>
  )
}
const Parent = (): JSX.Element => {
  return (
    <Container title="Hello">
      <p>ここの部分が背景色で囲まれます</p>
    </Container>
  )
}

export default Parent
```

**リスト 3.10 `src/components/ContainerSample.tsx`**
```
// エラー: title="" が必要
const Parent = () => {
  return (
    <Container>
      <p>ここの部分は背景色で囲まれています</p>
    </Container>
  )
}
```

## 3.4 コンテキスト
Contextを使用することで、データを親から直接渡さなくてもコンポーネントが必要なデータを参照できます。
Contextでは `Privider`と`Consumer`という2つのコンポーネントを使用します。
`Privider`にデータを渡し、`Consumer`がデータを受け取ります。

**リスト 3.13 `src/components/ContextSample.tsx`**

```ts
import React from 'react'

const TitleContext = React.createContext('')

const Title = () => {
  return (
    <TitleContext.Consumer>
      {/* Consumer直下に関数を置いて、Contextの値を参照します */}
      {(title) => {
        return <h1>{title}</h1>
      }}
    </TitleContext.Consumer>
  )
}

const Header = () => {
  return (
    <div>
      {/* HeaderからTitleへは何もデータを渡しません*/}
      <Title />
    </div>
  )
}

// Page コンポーネントの中でContextに値を渡します。
const Page = () => {
  const title = 'React Book'
  
  // Providerを使い Context に値をセットします
  // Provider以下のコンポーネントから値を参照できます
  return (
    <TitleContext.Provider value={title}>
      <Header />
    </TitleContext.Provider>
  )
}

export default Page
```








