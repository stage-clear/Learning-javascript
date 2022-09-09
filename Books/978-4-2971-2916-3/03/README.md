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

## 3.5 React Hooks （フック）
React Hooksは、フック（Hook）によって関数コンポーネント中で状態やライフサイクルを扱うための機能です。

Reactが公式で提供しているフックは10種類あり、またフックを組み合わせてカスタムフックを実装できます。

### 3.5.1 `useState`と`useReducer` -- 状態のフック

#### `useState`
```ts
const [状態, 更新関数] = useState(初期状態)
```

```ts
import { useState } from 'react'

type = CounterProps = {
  initialValue: number
}

const Counter = (props: CounterProps) => {
  const { initialValue } = props
  
  const [count, setCount] = useState(initialValue)
  
  return (
    <div>
      <p>Count: {count}</p>
      {/* setCount を呼ぶことで状態を更新します */ }
      <button onClick={() => setCount(count - 1)}> - </button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}> + </button>
    </div>
  )
}

export default Counter
```

#### `useReducer`
`useReducer`を使うことで複雑な状態遷移をシンプルな記述にできます。

```ts
reducer(現在の状態, action) {
  return 次の状態
}

const [現在の状態, dispatch] = useReducer(reducer, reducerに渡される初期状態)
```

```ts
import { useReducer } from 'react'

// reducerが受け取る action の型を定義します
type Action = 'DECREMENT'|'INCREMENT'|'DOUBLE'|'RESET'

// 現在の状態と action にもとづいて次の状態を返します
const reducer = (currentCount: number, action: Action) => {
  switch (action) {
    case 'INCREMENT':
      return currentCount + 1
    case 'DECREMENT':
      return currentCount - 1
    case 'DOUBLE':
      return currentCount * 2
    case 'RESET':
      return 0
    default: 
      return currentCount
  }
}

type CounterProps = {
  initialValue: number
}

const Counter = (props: CounterProps) => {
  const { initialValue } = props
  const [count, dispatch] = useReducer(reducer, initialValue)
  
  return (
    <div>
      <p>Count: {count}</p>
      {/* dispatch関数にactionを渡して状態を更新します */}
      <button onClick={() => dispatch('DICREMENT')}>-</button>
      <button onClick={() => dispatch('INCREMENT')}>+</button>
      <button onClick={() => dispatch('DOUBLE')}>x2</button>
      <button onClick={() => dispatch('RESET')}>Reset</button>
    </div>
  )
}

export default Counter
```

ボタンが押されたら、`dispatch()`関数を使い `action`を発出します。
`setState()`のときと比べ、状態の更新を呼び出す方は、具体的な状態に依存していないためコードをシンプルに保つことができます。

### 3.5.2 `useCallback`と`useMemo` -- メモ化のフック

`useCallback`と`useMemo`はメモ化用のフックです。
値や関数を保持し、必要のない子要素のレンダリングや計算を抑制するために使用します。

Reactのコンポーネンは次のようなタイミングで再描画が発生します
- **`props`や内部状態が更新された時**
- **コンポーネントないで参照している Context の値が更新された時**
- **親コンポーネントが再描画された時**

メモ化コンポーネントは、関数コンポーネントを `memo()` 関数でラップすると作成できます。

**リスト 3.14 `src/components/Parent.tsx`**
```ts
import React, { memo, useState } from 'react'

type FizzProps = {
  isFizz: boolean
}

// Fizzは通常の関数コンポーネント
// isFizz が true の場合 Fizz と表示し、それ以外は何も表示しない
// isFizz の変化に関わらず、親が再描画されると Fizz も再描画される
const Fizz = (props: FizzProps) => {
  const { isFizz } = props
  console.log(`Fizzが再描画されました, isFizz=${isFizz}`)
  return <span>{isFizz ? 'Fizz' : ''}</span>
}

type BuzzProps = {
  isBuzz: boolean
}

// Buzz はメモ化した関数コンポーネント
// isBuzz が true の場合は、Buzzと表示し、それ以外は何も表示しない
// 親コンポーネントが再描画されても、isBuzzが変化しない限りはBuzzは再描画しない
const Buzz = memo<BuzzProps>((props) => {
  const {isBuzz} = props
  console.log(`Buzzが再描画されました, isBuzz=${isBuzz}`)
  return (
    <span>
      {isBuzz ? 'Buzz' : ''}
    </span>
  )
})

// この形式で export したときは import { Parent } from ... で読み込む
export const Parent = () => {
  const [count, setCount] = useState(1)
  const isFizz = count % 3 === 0
  const isBuzz = count % 5 === 0
  
  console.log(`Parentが再描画されました, count=${count}`)
  
  return (
    <div>
      <button onClick={() => setCount((c) => c+1)}>+1</button>
      <p>{`現在のカウント: ${count}`}</p>
      <p>
        <Fizz isFizz={isFizz} />
        <Buzz isBuzz={isBuzz} />
      </p>
    </div>
  )
}
```

```ts
// 先のコード例の type BuzzProps 以降を編集
type BuzzProps = {
  isBuzz: boolean
  // propsに onClick を追加
  onClick: () => void
}

const Buzz = memo<BuzzProps>((props) => {
  const { isBuzz, onClick } = props
  console.log(`Buzzが再描画されました, isBuzz=${isBuzz}`)
  
  return (
    <span onClick={onClick}>
      {isBuzz ? 'Buzz' : ''}
    </span>
  )
})

export const Parent = () => {
  const [count, setCount] = useState(1)
  const isFizz = count % 3 === 0
  const isBuzz = count % 5 === 0
  
  // この関数は Parent の再描画の度に作成される
  const onBuzzClick = () => {
    console.log(`Buzzがクリックされました isBuzz=${isBuzz}`)
  }
  console.log(`Parentが再描画されました, count=${count}`)
  
  return (
    <div>
      <button onClick={() => setCount((c) => c+1)}>+1</button>
      <p>
        <Fizz isFizz={isFizz} />
        <Buzz isBuzz={isBuzz} onClick={onBuzzClick} />
      </p>
    </div>
  )
}
```

#### `useCallback`
`useCallback`は関数をメモ化するためのフックです。

```ts
import React, { useState, useCallback } from 'react'

type ButtonProps = {
  onClick: () => void
}

// DecrementButtonは通常の関数コンポーネントでボタンを表示する
const DecrementButton = (props: ButtonProps) => {
  const { onClick } = props
  
  console.log('DecrementButtonが再描画されました')
  
  return <button onClick={onClick}>Decrement</button>
}

// IncrementButtonはメモ化した関数コンポーネントでボタンを表示する
const IncrementButton = React.memo((props: ButtonProps) => {
  const { onClick } = props
  
  console.log('IncrementButtonが再描画されました')
  
  return <button onClick={onClick}>Increment</button>
}

// DoubleButtonはメモ化した関数コンポーネントでボタンを表示する
const DoubleButton = React.memo((props: ButtonProps) => {
  const { onClick } = props
  
  console.log('DoubleButtonが再描画されました')
  
  return <button onClick={onClick}>Double</button>
}

export const Parent = () => `
  const [count, setCount] = useState(0)
  
  const decrement = () => {
    setCount((c) => c+1)
  }
  
  const increment = () => {
    setCount((c) => c-1)
  }
  
  // useCallbackを使って関数をメモ化する
  const double = useCallback(() => {
    setCount((c) => c * 2)
    // 第２引数は空配列なので、useCallbackは常に同じ関数を返す
  }, [])
  
  return (
    <div>
      <p>Count: {count}</p>
      {/* コンポーネントに関数を渡す */}
      <DecrementButton onClick={decrement} />
      {/* メモ化コンポーネントに関数を渡す */}
      <IncrementButton onClick={increment} />
      {/* メモ化コンポーネントにメモ化した関数を渡す */}
      <DoubleButton onClick={double} />
    </div>
  )
}
```

#### `useMemo`
`useMemo`では値のメモ化をします。<br>
第１引数は値を生成する関数を、第２引数には依存配列を渡します。

**3.15 `src/components/UseMemoSample.tsx`**
```ts
import React, { useState, useMemo } from 'react'

export const UseMemoSample = () => {
  // textは現在のテキストボックスの中身の値を保持する
  const [text, setText] = useState('')
  // itemsは文字列のリストを保持する
  const [items, setItems] = useState<string[]>([])
  
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  
  // ボタンをクリックした時に呼ばれる関数
  const onClickButton = () => {
    setItems((prevItems) => {
      // 現在の入力値をitemsに追加する
      // この時新しい配列を作成して保存する
      return [...prevItems, text]
    })
    
    // テキストボックスの中の値を空にする
    setText('')
  }
  
  // numberOfCharacters1 は再描画の度に items.reduce を実行して結果を得る
  const numberOfCharacters1 = items.reduce((sub, item) => sub + item.length, 0)
  
  // numberOfCharacters2 は useMemo を使い、itemsが更新されるタイミングで items.reduce を実行して結果を得る
  const numberOfCharacters2 = useMemo(() => {
    return items.reduce((sub, item) => sub + item.length, 0)
    // 第２引数の配列の中に items があるので、itemsが新しくなった時だけ関数を実行してメモを更新します
  }, [items])
  
  return (
    <div>
      <p>UseMemoSample</p>
      <div>
        <input value={text} onChange={onChangeInput} />
        <button onClick={onClickButton}>Add</button>
      </div>
      <div>
        {items.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div>
        <p>Total Number of Characters 1: {numberOfCharacters1}</p>
        <p>Total Number of Characters 2: {numberOfCharacters2}</p>
      </div>
    </div>
  )
}
```

### 3.5.3 `useEffect`と`useLayoutEffect` -- 副作用のフック

#### `useEffect`
`useEffect`は副作用を実行するために使用するフックです。

`useEffect`を使うと、`props`や`state`が更新され、再描画が終わった後に処理が実行されます。

**リスト 3.16 `src/components/Clock.tsx`**
```ts
import React, { useState, useEffect } from 'react'

// タイマーが呼び出される周期を1秒にする
const UPDATE_CYCLE = 1000

// localstorageで使用するキー
const KEY_LOCALE = 'KEY_LOCALE'

enum Locale {
  US = 'en-US',
  JP = 'ja-JP'
}

const getLocaleFromString = (text: string) => {
  switch (text) {
    case Locale.US:
      return Locale.US
    case Locale.JP:
      return Locale.JP
    defalut:
      return Locale.US
  }
}

export const Clock = () => {
  const [timestamp, setTimestamp] = useState(new Date())
  const [locale, setLocale] = useState(Locale.US)
  
  // タイマーのセットをするための副作用
  useEffect(() => {
    // タイマーのセット
    const timer = setInterval(() => {
      setTimestamp(new Date())
    }, UPDATE_CYCLE)

    // クリーンアップ関数
    return () => {
      clearInterval(timer)
    }
  }, [])

  // localstorageから値を読み込むための副作用
  useEffect(() => {
    const savedLocale = localStorage.getItem(KEY_LOCALE)
    if (savedLocale !== null) {
      setLocale(getLocaleFromString(savedLocale)
    }
  }, [])

  // localeが変化した時に、localstorageに値を保存するための副作用
  useEffect(() => {
    localStorage.setItem(KEY_LOCALE, locale)
    // 依存配列に locale を渡し、localeが変化する度に実行するようにする
  }, [locale])
  
  return (
    <div>
      <p>
        <span id="current-time-label">現在時刻</span>
        <span>:{timestamp.toLocaleString(locale)}</span>
        <select
          value={locale}
          onChange={(e) => setLocale(getLocaleFromString(e.target.value))}
          <option value="en-US">en-US</option>
          <option value="ja-JP">ja-JP</option>
        </select>
      </p>
    </div>
  )
}
```

`useEffect`の第2引数は依存配列で、`useCallback`/`useMemo`と同様に毎描画時に中身をチェックして、前回の描画時と異なる場合にのみ第1引数の関数が実行されます。
空の配列を渡した場合は、初期描画が終わった直後にのみ実行され、その後の再描画では実行されます。

#### `useLayoutEffect`
`useLayoutEffect`は、`useEffect`と同じように副作用を実行するためのフックですが、実行されるタイミングが違います。<br>
`useEffect`は描画関数が実行し、DOMが更新され、画面に描画された後で実行します。一方、`useLayoutEffect`はDOMが更新された後、画面に実際に描画される前に実行されます。

```ts
useLayoutEffect(() => {
  const savedLocale = localStorage.getItem(KEY_LOCALE)
  if (savedLocale !== null) {
    setLocale(getLocaleFromString(savedLocale))
  }
}, [])
```

⚠️ React18で`<React.StrictMode>`以下のコンポーネント内で宣言された `useEffect` `useLayoutEffect` は安全でない副作用を見つけるために、コンポーネントは2回描画されます。<br>
1回のみの実行を保証したい場合は、`useRef`などを使って前に実行されたかどうかを保持することで対処できます。

```ts
const mounted = React.useRef(false)

useEffect(() => {
  if (mounted.current) {
    // すでに実行済みの場合は何もしない
    return 
  }
  
  mounted.current = true
  
  // 1回だけ実行したい副作用の実行
  const data = fetch(...)
}, [])
```
















