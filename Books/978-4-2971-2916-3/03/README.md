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

### 3.5.4 `useContext` -- Contextのためのフック

`useContext`はContextから値を参照するためのフックです。<br>
`useContext`の引数にContextを渡すことで、そのContextの値を取得できます。

```ts
import React, { useContext } from 'react'

type User = {
  id: number
  name: string
}

// ユーザーデータを保持するContextを作成する
const UserContext = React.createContext<User | null>(null)

const GrandChild = () => {
  // useContextにContextを渡すことで、Contextから値を取得する
  const user = useContext(UserContext)
  
  return user !== null ? <p>Hello, {user.name}</p> : null
}

const Child = () => {
  const now = new Date()
  
  return (
    <div>
      <p>Current: {now.toLocaleString()}</p>
      <GrandChild />
    </div>
  )
}

const Parent = () => {
  const user: User = {
    id: 1,
    name: 'Alice'
  }
  return (
    // Contextに値を渡す
    <UserContext.Provider value={user}>
      <Child />
    </UserContext.Provider>
  )
}
```

### 3.5.5 `useRef`と`useImperativeHandle` -- refのフック
`useRef`は書き換え可能なrefオブジェクトを作成します。
refには大きく分けて次の2つの使い方があります。

- データの保持
- DOMの参照

`useState`や`useReducer`がありますが、これらは状態を更新する度に再描画されます。
refオブジェクトに保存された値は更新しても再描画されません。

```ts
import React, { useState, useRef } from 'react'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve), ms))

const UPLOAD_DELAY = 5000

const ImageUploader = () => {
  // 隠された input 要素にアクセスするためのref
  const inputImageRef = useRef<HTMLInputElement|null>(null)
  // 選択されたファイルデータを保持するref
  const fileRef = useRef<File|null>(null)
  const [message, setmessage] = useState<string|null>('')
  // 「画像をアップロード」というテキストがクリックされた時のコールバック
  const onClickText = () => {
    if (inputImageRef.current !== null) {
      // inputのDOMにアクセスして、クリックイベントを発火する
      inputImageRef.current.click()
    }
  }
  
  // ファイルが選択された後に呼ばれるコールバック
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files !== null && files.length > 0) {
      // fileRef.currentに値を保存する
      // fileRef.currentが変化しても再描画は発生しない
      fileRef.current = files[0] 
    }
  }
  
  // アップロードボタンがクリックされた時に呼ばれるコールバック
  const onClickUpload = async () => {
    if (fileRef.current !== null) {
      //　通常はここでAPIを読んで、ファイルをサーバーにアップロードする
      // ここでは疑似的に一定時間待つ
      await sleep(UPLOAD_DELAY)
      // アップロードが成功した旨を表示するために、メッセージを書き換える
      setMessage(`${fileRef.current.name} has been successfully uploaded`)
    }
  }
  
  return (
    <div>
      <p style={{ textDecoration: 'underline' }} onClick={onClickText}>
        画像をアップロード
      </p>
      <input
        ref={inputImageRef}
        type="file"
        accept="image/*",
        onChange={onChangeImage}
        style={{ visibility: 'hidden' }}
      />
      <br />
      <button onClick={onClickUpload}>アップロードする</button>
      {message != null && <p>{ message }</p>
    </div>
  )
}
```

`useImperativeHandle`はコンポーネントにrefが渡された時に、親のrefに代入される値を設定するのに使います。
`useImperativeHandle`を使うことで、子コンポーネントが持つデータを参照したり、子コンポーネントで定義されている関数を親から呼んだりできます。

```ts
import React, { useState, useRef, useImperativeHandle } from 'react'

const Child = React.forwardRef((props, ref) => {
  const [message, setMessage] = useState<string | null>(null)
  // useImperativeHandleで親のrefから参照できる値を指定
  useImperativeHandle(ref, () => ({
    showMessage: () => {
      const date = new Date()
      const message = `Hello, it's ${date.toLocaleString()} now`
      setMessage(message)
    },
  }))
  
  return <div>{message !== null ? <p>{message}</p>: null}</div>
})

const Parent = () => {
  const childRef = useRef<{ showMessage: () => void }>(null)
  const onClick = () => {
    if (childRef.current != null) {
      // 子のuseImperativeHandleで指定した値を参照
      childRef.current.showMessage()
    }
  }
  
  return (
    <div>
      <button onClick={onClick}>Show Message</button>
      <Child ref={childRef} />
    </div>
  )
}
```

### 3.5.6 カスタムフックと`useDebugValue`

```ts
import React, { useState, useCallback, useDebugValue } from 'react'

// input向けにコールバックと現在の入力内容をまとめたフック
const useInput = () => {
  // 現在の入力値を保持するフック
  cons [state, setState] = useState('')
  // Inputが変化したら、フック内の状態を更新する
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }, [])

  // デバッグ用に値を出力する
  // 値は開発者ツールの Componentsタブに表示される
  useDebugValue(`Input: ${state}`)
  
  // 現在の入力内容とコールバック関数だけ返す
  return [state, onChange] as const
}

export const Input = () => {
  const [text, onChangeText] = useInput()
  return (
    <div>
      <input type="text" value={text} onChange={onChangeText} />
      <p>Input: {text}</p>
    </div>
  )
}
```

## 3.6 Next.js 入門
### 3.6.1 プロジェクトのセットアップ

```shell
$ npx create-next-app@latest -ts next-sample
```

```shell
$ cd next-sample

# 開発用のサーバーを起動
$ npm run dev

# プロジェクトをビルドする
$ npm run build

# ビルドした成果物を元にサーバーを立ち上げる
$ npm run start
```

### 3.6.2 プロジェクトの基本的な構成
- `public`ディレクトリには画像などの静的ファイルを配置します
- `style`ディレクトリにはCSSファイルを配置します

## 3.7 Next.jsのレンダリング手法

- 静的サイト生成（SSG: Static Site Generation）
  - 本書では静的サイト（Static）もSSGに含む
- クライアントサイドレンダリング（CSR: Client Side Rendering）
- サーバーサイドレンダリング（SSR: Server Side Rendering）
- インクリメンタル静的再生成（ISR: Incremental Static Regeneration）

### 3.7.1 静的サイト生成（SSG）
### 3.7.2 クライアントサイドレンダリング（CSR）
### 3.7.3 サーバーサイドレンダリング（SSR）
### 3.7.4 インクリメンタル静的再生成（ISR）

## 3.8 ページとレンダリング手法
**リスト 3.17 `pages/sample.tsx`**
```ts
// 型注釈がなくてもビルドに通るため省略
function Sample () {
  return <span>サンプルのページです。</span>
}

export default Sample
```

### 3.8.1 Next.jsのページとデータ取得

|種別|データ取得に使う主な関数|データ取得タイミング|補足
|:-|:-|:-|:-
|SSG|`getStaticProps`|ビルド時(SSG)|データ取得を一切行わない場合もSSG相当|
|SSR|`getServerSideProps`|ユーザーのリクエスト時|`getInitialProps`を使ってもSSR|
|ISR|`revalidate`を返す`getStaticProps`|ビルド時(ISR)|ISRはデプロイ後もバックグラウンドビルドが実行される|
|CSR|上記以外の任意の関数|ユーザーのリクエスト時（ブラウザ）|CSRはSSG/SSR/ISRと同時に利用可能|

### 3.8.3 SSGによるページの実装
**リスト 3.18 `pages/ssg.tsx`**
```ts
// 型のために導入
import { NextPage } from 'next'
// Next.jsの組み込みのコンポーネント
import Head from 'next/head'

// ページコンポーネントのpropsの型定義（ここでは空）
type SSGProps = {}

// SSG向けのページを実装
// NextPageはNext.jsのPages向けの型
// NextPage<props>で props が入る Page であることを明示
const SSG: NextPage<SSGProps> = () => {
  return (
    <div>
      {/* Head コンポーネントで包むと、その要素は <head> タグに配置されます */}
      <Head>
        <title>Static Site Generation</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main>
        <p>
          このページは静的サイト生成によってビルド時に生成されたページです
        </p>
      </main>
    </div>
  )
}

// ページコンポーネントはexport default でエクスポートする
export default SSG
```
`NextPage`は`pages`のための型です。受け付ける props を決め、`NextPage<Props>`のように指定します。

### 3.8.3 `getStaticProps`を用いたSSGによるページの実装

```ts
import { getStaticProps, NextPage, NextPageContext } from 'next'
import Head from 'next/head'

// ページコンポーネントの props の型定義
type SSGProps = {
  message: string
}

// SSGは getStaticProps が返した props を受け取ることができる
// NextPage<SSGProps>は message: string のみを受け取って生成されるページの型
const SSG: NextPage<SSGProps> = (props) => {
  const { message } = props
  
  return (
    <div>
      <Head>
        <title>Static Site Generation</title>
        <link ref="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>
          このページは静的サイト生成によってビルドされたページです
        </p>
        <p>{message}</p>
      </main>
    </div>
  )
}

// getStaticProps はビルドに実行される
// GetStaticProps<SSGProps>は SSGProps を引数に取る getStaticProps の型
export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const timestamp = new Date().toLocaleString()
  const message = `${timestamp} に getStaticProps が実行されました`
  console.log(message)
  
  return {
    // ここで返した props を元にページコンポーネントを描画する
    props: {
      message,
    },
  }
}

export default SSG
```

`getStaticProps`はエクスポートする必要があり、非同期関数として `async` とともに定義する必要があります。
```ts
export async function getStaticProps (context) {
  return {
    props: {}
  }
}
```

### 3.8.4 `getStaticPaths`を使った複数ページのSSG

- \[パラメータ\].tsx のような `[]` で囲んだ特別なファイル名
- `getStaticProps`とあわせて `getStaticPaths` を利用する

`getStaticPaths`は `getStaticProps`実行前に呼ばれる関数で、生成したいページのパスパラメータの組み合わせとフォールバックを返します。

```ts
export async function getStaticPaths () {
  return {
    paths: [
      { params: [...] }
    ],
    fallback: false // true もしくは 'blocking' を指定可能
  }
}
```

**リスト 3.20 `pages/posts/[id].tsx`**
```ts
// 型を利用するためにインポート
import { GetStaticPaths, GetStaticProps, nextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router' // next/router から use Routerというフックを取り込む

type PostProps = {
  id: string
}

const Post: NextPage<PostProps> = (props) => {
  const { id } = props
  const rounter = useRouter()
  
  if (router.isFallback) {
    // フォールバックページ向けの表示を返す
    return <div<Loading...</div>
  }
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>このページは静的サイト生成によってビルド時に生成されたページです。</p>
        <p>{`/posts/${id}に対応するページです}</p>
      </main>
    </div>
  )
}

// getStaticPathsは生成したいページのパスパラメータの組み合わせを返す
// このファイルは pages/posts/[id].tsx なので、パスパラメータとして id の値を返す必要がある
export const getStaticPaths: GetStaticPaths = async () => {
  // それぞれのページのパスパラメータをまとめたもの
  const paths = [
    {
    params: {
      id: '1',
    },
  },
  {
    params: {
      id: '2',
    },
  },
  {
    params: {
      id: '3',
    },
  },
]

// fallback を false にすると、path実行後にそれぞれのパスに対して getStaticProps が実行される
export const getStaticProps: GetStaticProps<PostProps> = async () => {
  // context.params にパスパラメータの値が入っている
  // context.params['id'] は string | string[]型なので
  // 値が配列かどうかで場合分けをする
  const id = Array.isArray(context.params['id'])
    ? context.params['id'][0]
    : context.params['id']

  return {
    props: {
      id,
    },
  }
}

export default Post
```

#### `useRouter` -- ルーティングのためのフック
`useRouter`は関数コンポーネント内でルーティング情報にアクセスするためのフックです。

**リスト 3.21 `pages/page.tsx`**
```ts
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Page = () => {
  const router = useRouter()

  // 以下のコメント部分のコメントを解除すると /userouter に移動するようになる
  /*
  useEffect(() => {
    router.push('/userouter')
  })
  */
  
  return <span>{router.pathname}</span>
}

export default Page
```

### 3.8.5 SSRによるページの実装
SSRでは、アクセスする度にサーバーでページを描画して、その結果をクライアントで表示します。
SSRでは `getServerSideProps` を定義します。

**リスト 3.22 `pages/ssr.tsx`**
```ts
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

type SSRProps = {
  message: string
}

const SSR: Next<SSRProps> = (props) => {
  const { message } = props
  
  return (
    <div>
      <Head>
        <title>Create next App</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main>
        <p>
          このページはサーバーサイドレンダリングによってアクセス時にサーバーで描画されたページです
        </p>
        <p>{ message }</p>
      </main>
    </div>
  )
}

// getServerSideProps はページへのリクエストがある度に実行される
export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
  const timestamp = new Date().toLocaleString()
  const message = `${timestamp}にこのページの getServerSideProps が実行されました`
  console.log(message)
  
  return {
    props: {
      message,
    },
  }
}

export default SSR
```

|パラメータ|内容|
|:-|:-|
|`req`|`http.IncomiingMessage`のインスタンスでリクエストの情報やCookieを参照できます|
|`res`|`http.ServerResponse`のインスタンスでCookieをセットしたり、レスポンスヘッダーを書き換えたりに使えます|
|`resolvedUrl`|実際にアクセスがあったパス|
|`query`|そのクエリをオブジェクトにしたもの|

### 3.8.6 ISRによるページの実装
インクリメンタル静的再生成（ISR）はSSGの応用とも言えるレンダリング手法です。
特徴としてページの寿命を設定でき、寿命を過ぎたページについては最新の情報での再生成を試みて、静的ページを配信しつつ情報を更新できます。

**リスト 3.23 `pages/isr.tsx`**
```ts
import { GetStaticPaths, NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

type ISRProps = {
  message: string
}

// ISRProps を受け付ける NextPage（ページ）の型
const ISR: NextPage<ISRProps> = (props) => {
  const { message } = props
  
  const router = useRouter()
  
  if (router.isFallback) {
    // フォールバック用のページを返す
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>このページはISRによってビルド時に生成されたページです。</p>
        <p>{ message }</p>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps<ISRProps> = async = (context) => {
  const timestamp = new Date().toLocaleString()
  const message = `${timestamp} にこのページの getStaticProps が実行されました`
  
  return (
    props: {
      message,
    },
    // ページの有効期限を秒単位で指定
    revalidate: 60,
  }
}

export default ISR
```

## 3.9 Next.jsの機能
### 3.9.1 リンク
Linkコンポーネントを使用してページ遷移した場合は、通常のページ遷移のように遷移先のページのHTMLファイルなどを取得して描画するのではなく、
クライアントサイドで新しいページを描画します。

```ts
import Link from 'next/link'

...

{/* /ssr へ遷移するためのリンクを作成する */}
<Link href="/ssr">
  <a>Go TO SSR</a>
</Link>
```

```ts
<Link href="/ssg?keyword=next">
  <a>GO TO SSG</a>
</Link>

{/* hrefに文字列を指定する代わりにオブジェクトを指定できます */}
<Link
  href={{
    pathname: '/ssg',
    query: { keyword: 'hello' },
  }}>
  <a>GO TO SSG</a>
</Link>
```

```ts
<Link href="/ssg">
  {/* a の代わりに button を使うと、onClick が呼ばれたタイミングで遷移します */}
  <button>Jump to SSG page</buton>
</Link>
```

routerオブジェクトの`push()`メソッドを呼ぶことでも、ページ遷移できます。
```ts
import { useRouter } from 'next/router'

...

const router = useRouter()

const onSubmit = () => {
  // /ssr へ遷移します
  router.push('/ssr')

  // 文字列の代わりにオブジェクトで指定できます
  // /ssg?keyword=hello へ遷移します
  router.push({
    pathname: '/ssg',
    query: { keyword: 'hello' }
  }
}
```

そのほか、router オブジェクトには、リロードを行う `reload()` やページを戻るための `back()` などのメソッドや、
ページの遷移開始・完了などのイベントを購読するためのメソッドがあります。
```ts
const router = useRouter()

// ページがリロードされます
router.reload()

// 前のページに戻ります
router.back()

// 遷移開始時のイベントを購読します
router.events.on('routerChangeStart', (url, { shallow }) => {
  // url には遷移先のパスが与えられます
  // shallow はシャロールーティング（パスのみが置き換わる遷移）の場合は true になります
})

// 遷移完了時のイベントを購読
router.events.on('routeChangeComplete', (url, { shallow }) => {
  // url には遷移先んパスが与えられます
  // shallow はシャロールーティング（パスのみが置き換わる遷移）の場合は true になります
})
```

### 3.9.2 画像の表示
**リスト 3.24 `pages/images-sample.tsx`**
```ts
import { NextPage } from 'next'
import Image from 'next/image'

// 画像ファイルをインポートする
import BibleImage from '../public/images/bible.jpeg'

const imageSample: NextPage<void> = (props) => {
  return (
    <div>
      <h1>画像表示の比較</h1>
      <p>imgタグで表示した場合</p>
      {/* 通常のimgタグを使用して画像を表示 */}
      <img src="/images/bible.jpeg" />
      <p>Image コンポーネントで表示した場合</p>
      {/* Imageコンポーネントを使用して表示 */}
      {/* パスを指定する代わりに、インポートした画像を指定 */}
      <Image src={BibleImage} />
      <p>Imageで表示した場合は事前に描画エリアが確保されます</p>
    </div>
  )
}

export default ImageSample
```


```ts
// next.config.js
/** @type {import('next'0.NextConfig} */
const NextConfig = {
  reactStrictMode: true,
  images: {
    // example.com以下の画像を Image コンポーネントで表示するために追加する
    domains: ['example.com'],
  }
}

module.exports = nextConfig
```

### 3.9.3 APIルート

**リスト 3.25 `pages/api/hello.ts`**
```ts
import type { NextApiRequest, NextApiResponse } from 'next'

type HelloResponse = {
  name: string
}

// /api/hello で呼ばれた時のAPIの挙動を実装する
export default (req: NextApiRequest, res: NextApiResponse<HelloResponse>) => {
  // ステータス200で { "name": "John Doe" } を返す
  res.status(200).json({ name: 'John Doe' })
}
```

**リスト 3.26 `pages/sayhello.tsx`**
```ts
import { useState, useEffect } from 'react'

function sayHello () {
  // 内部で状態を持つため useState を利用
  const [data, setData] = useState({name: ''})
  // 外部のAPIにリクエストするのは副作用なので useEffect 内で処理
  useEffect(() => {
    // pages/api/hello.ts の内容にリクエスト
    fetch('api/hello')
      .then((res) => res.json())
      .then((profile) => {
        setData(profile)
      })
  }, [])
  
  return <div>hello {data.name}</div>
}

export default Sayhello
```

### 3.9.4 環境変数/コンフィグ
Next.jsはビルトインで環境変数のための `.env` ファイルを処理できます。

- `.env`
- `.env.local`
- `.env.${環境名}`
- `.env.${環境名}.local`

`.local`がついているものは `.gitignore` に追加されることを意図しており、APIキーなどの公開したくない値を保存するために使用します。

**リスト 3.27 `.env`**
クライアントサイドでもアクセスしたい値に関しては、環境変数の名前の頭に `NEXT_PUBLIC_` をつけます。
```
# サーバーサイドのみで参照可能な変数
TEST=test1

# サーバーサイド・クライアントサイドの両方で参照可能な変数
NEXT_PUBLIC_TEST=test2
```

**リスト 3.28 `pages/EnvSample.tsx`**
```ts
import { NextPage } from 'next'
import Head from 'next/head'

const EnvSample: NextPage = (props) => {
  // サーバーサイドで描画するときは 'test1' と表示され、クライアントで再描画するときは undefined と表示される
  console.log('process.env.TEST', process.env.TEST)
  
  return (
    <div>
      <Head>
        <title>Create next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* サーバーサイド描画時は 'test1' と表示され、クライアントサイドで再描画されると何も表示されない */}
        <p>{process.env.TEST}</p>
      </main>
    </div>
  )
}

// getStaticProps は常にサーバーサイドで実行されるので、すべての環境変数を参照できる
export const getStaticProps: GetStaticProps = async (context) => {
  // 'test1' が表示される
  console.log('process.env.TEST', process.env.TEST)
  // 'test2' が表示される
  console.log('process.env.NEXT_PUBLIC_TEST', process.env.NEXT_PUBLIC_TEST)
  
  return {
    props: {},
  }
}

export default EnvSample
```














