# 9章　フロントエンドとバックエンドのフレームワーク

## 9.1 フロントエンドのフレームワーク

すべての組み込みDOM APIは型安全です。
```json
{
  "compilerOptions": {
    "lib": ["dom": "es2015"]
  }
}
```
これは、コードの型チェックを行うときに `lib.dom.ts` - TypeScritの組み込みのブラウザおよびDOMの型宣言 -- を含めるよう、TypeScriptに指示します。

```ts
// グローバルな window オブジェクトからプロパティを読み取ります。
let model = {
  url: window.location.href
}

// <input /> 要素を作成します
let input = document.createElement('input')

// それにCSSクラスを与えます
input.classList.add('Input', 'URLInput')

// <input /> をDOMに挿入します
document.body.appendChild(input)
```

### 9.1.1 React

#### 9.1.1.1 JSXの手引き

```json
{
  //...
  "compilerOptions": {
    "esModuleInterop": true
  }
}
```


#### 9.1.1.2 TSX = JSX + TypeScript

```json
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```

jsxディレクティブには３つのモードがあります
|名前|説明|
|:-|:=|
|react|JSXプラグ魔を使って、JSXを .js ファイルにコンパイルします|
|react-native|JSXを、コンパイルを行わずに保持しますが、.js拡張子を持つファイルを出力します|
|preserve|JSXの型チェックを行いますが、コンパイルを行わず、.jsx拡張子を持つファイルを出力します|


#### 9.1.1.3 TSXをReactとともに使用する

```ts
import React from 'react'

type Props = {
  isDisabled?: boolean
  size: 'Big' | 'Small'
  text string
  onClick(event: React.MouseEvent<HTMLButtonElement>): void
}

export function FancyButton (props: Props) {
  const [toggled, setToggled] = React.userState(false)
  return <button
    className={'Size-' + props.size}
    disabled={props.isDisabled || false}
    onClick={event => {
      setToggled(!toggled)
      props.onClick(event)
    }}
  >{props.text}</button>
}

let button = <FancyButton
  size='Big'
  text='Sign Up Now'
  onClick={() => console.log('Clicked')}
/>
```

クラスコンポーネントも同様です。
```ts
import React from 'react'
import {FuncyButton} from './FancyButton'

type Props = {
  firstName: string
  userId: string
}

type State = {
  isLoading: boolean
}

class SignupForm extends React.Component<Props, State> {
  state = {
    isLoading: false
  }
  
  render () {
    return <> // フラグメント
      <h2>Sign up for a 7-day supply of our tasty
        toothpaste now, {this.props.firstName}.</h2>
      <FancyButton
        isDisabled={this.state.isLoading}
        size='Big'
        text='Sign Up Now'
        onClick={this.signUp}
      />
    </>
  }
  
  private signUp = async = () => {
    this.setState({isLoading: true})
    try {
      await fetch('/api/signup?userId=' + this.props.userId)
    } finally {
      this.setState({isLoading: false})
    }
  }
}

let form = <SignupForm firstName='Albert' userId='l3ab9g3' />
```
ここでは、Reactの `PropTypes`機能を使いませんでした。
これは、`props`の型を実行時に宣言およびチェックするための方法です。TypeScriptは、コンパイル時にすでに型をチェックしているので同じことを再び行う必要はありません。

### 9.1.2 Angular 6/7
<sup>(Skipped)</sup>

## 9.2 型安全なAPI

```ts
type Request =
  | {entity: 'user', data: User}
  | {entity: 'location', data: Location}

// client.ts
async function get<R extends Request> (entity: R['entity']): Promise<R['data']> {
  let res = await fetch('/api/${entity}`)
  let json = await res.json()
  if (!json) {
    throw ReferenceError('Empty response')
  } 
  return json
}

// app.ts
async function startApp () {
  let user = await get('user') // User
}
```

- RESTful APIのための[Swagger Codegen](https://github.com/swagger-api/swagger-codegen)
- GraphQLのための[Apollo](https://www.npmjs.com/package/apollo)および[Relay](https://relay.dev/)
- RPCのための[gRPC](https://grpc.io/)および[Apache Thrift](https://thrift.apache.org/)

## 9.3 バックエンドのフレームワーク
<sup>(Skipped)</sup>

## 9.4 まとめ








