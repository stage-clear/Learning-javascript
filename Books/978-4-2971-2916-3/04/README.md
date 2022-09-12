# 4. コンポーネント開発
## 4.1 Atomic Designによるコンポーネント設計
### 4.1.1 Presentational Component と Container Component
#### Presentational Component

**リスト 4.1 Presentational Component**
```ts
import './styles.css'

type ButtonProps = {
  label: string
  text: string
  disabled: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

// ラベルとボタンを表示するコンポーネント
export const Button = (props: ButtonProps) => {
  const { label, text, disabled, onClick } = props
  
  // propsで渡されたデータを元に見た目を実装する
  return (
    <div className="button-container">
      <span>{label}</span>
      <button disabled={disabled} onClick={onClick}>
        {text}
      </button>
    </div>
  )
}
```

#### Container Component

**リスト 4.2 Container Component**
```ts
import { useState, useCallback } from 'react'
import { Button } from './button'

// ポップアップを表示するためのフック
const usePopup = () => {
  // 与えられたテキストを表示するポップアップを出現させる関数
  const cb = useCallback((text: string) => {
    prompt(text)
  }, [])

  return cb
}

type CountButtonProps = {
  label: string
  maximum: number
}

// クリックされた回数を表示するボタンを表示するコンポーネント
export const CountButton = (props: CountButtonProps) => {
  const { labe, maximum } = props
  
  // アラートを表示させるためのフックを使う
  const displayPopup = usePopup()
  // カウントを保持する状態を定義する
  const @count, setCount] = useState(0)
  
  // ボタンが押された時の挙動を定義する
  const onClick = useCallback(() => {
    // カウントを更新する
    const newCount = count + 1
    setCount(newCount)
    
    if (newCount >= maximum) {
      // アラートを出す
      displayPopup(`You've clicked ${newCount} times`)
    }
  }, [count, maximum])
  
  // 状態を元に表示に必要なデータを求める
  const disabled = count >= maximum
  const text = disabled
    ? 'Can\'t click any more'
    : `You've clicked ${count} times`
  
  // Presentational Component を返す
  return (
    <Button disabled={disabled} onClick={onClick} label={label} text={text} />
  )
}
```

Container Componentが親としてビジネスロジックを担い、子のPresentational Componentは親から渡されたpropsをもとに表示のみを担います。

### 4.1.2 Atomic Design
|階層名|説明|例|
|:-|:-|:-|
|Atoms|最小の要素。これ以上分解できない|ボタン、テキスト|
|Molecules|複数のAtomsを組み合わせて構築|ラベル付きのテキストボックス|
|Organisms|Moleculesよりもより具体的な要素|入力フォーム|
|Templates|ページ全体のレイアウト|ページのレイアウト|
|Pages|ページそのもの|ぺーじそのもの|

### 4.1.3 Atoms

### 4.1.4 Molecules

### 4.1.5 Organisms

### 4.1.6 Templates

### 4.1.7 Pages
レイアウトは Templates で実装しているので、ここでは状態の管理、router関係の管理、APIコールなどの副作用の実行、Contextに値を渡すなど振る舞いに関するものを実装します。

## 4.2 Styled-componentsによるスタイル実装
styled-componentsは CSS in JSと呼ばれるライブラリの1つで、名前の通り JavaScript 内に CSS を効率よく書くためのものです。

### 4.2.1 styled-components を Next.js に導入
```shell
$ npm install --save styled-components
$ npm install --save-dev @types/styled-components
```

**リスト 4.3 next.config.js**
```ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
```

**リスト 4.4 `src/pages/_document.tsx`**
```ts
import Document, { DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

// デフォルトのDocumentをMyDocumentで上書き
export default class MyDocument extends Document {
  static async getInitialProps (ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      // 初期値を流用
      const initialProps = await Document.getInitialProps(ctx)
      
      // initialPropsに加えて、styleを追加して返す
      return {
        ...initialProps,
        styles: [
          // もともとのstyle
          initialProps.styles,
          // styled-components の style
          sheet.getStyleElement()
        ],
      }
    } finally {
      sheet.seal()
    }
  }
}
```

**リスト 4.5 `pages/index.tsx`**
```ts
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'

const H1 = styled.h1`
  color: red;
`

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        ...
        <H1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </H1>
      </main>
    </div>
  )
}

export default Home
```

### 4.2.2 styled-components を用いたコンポーネント実装
```
styled.要素` スタイル `
```

**リスト 4.6 span要素にスタイルを適用**
```ts
import { NextPage } from 'next'
import styled from 'styled-components'

// span 要素にスタイルを適用したコンポーネント
const Badge = styled.span`
  padding: 8px 16px;
  font-weight: bold;
  text-align: center;
  color: white;
  background: red;
  border-radius: 16px;
`

const Page: Nextpage = () => {
  return <Badge>Hello World!</Badge>
}

export default Page
```

#### props を使う
親のコンポーネントに応じてCSSの内容を変えたいときには、`props`を利用して、外部からスタイルを制御できます。

**リスト 4.7 `props`を使用してスタイルを制御**
```ts
import {NextPage } from 'next'
import styled from 'styled-components'

type ButtonProps = {
  color: string
  backgroundColor: string
}

// 文字色と背景色が props から変更可能なボタンコンポーネント
// 型引数に props の型を渡す
const Button = styled.button<ButtonProps>`
  /* color, background, border-color は props から渡す */
  color: ${(props) => props.color};
  background: ${(props) => props.backgroundColor};
  border: 2px solid ${(props) => props.color};
  
  font-size: 2em;
  margin: 1em;
  padding: 0.25em;
  border-radius: 8px;
  cursor: pointer;
`

const Page: NextPage = () => {
  return (
    <div>
      {/* 赤色の文字で透明な背景のボタンを表示 */}
      <Button backgroundColor="transparent" color="#ff0000">
        Hello
      </Button>
      {/* 白色の文字で青色の背景のボタンを表示 */}
      <Button backgroundColor="#1e90ff" color="white">
        World
      </Button>
    </div>
  )
}

export default Page
```

#### `mixin`を使う

**リスト 4.8 `mixin`を使いスタイルを再利用**
```ts
import { NextPage } from 'next'
import styled, { css } from 'styled-components'

// 赤色のボーダーを表示するスタイル
const redBox = css `
  padding: 0.25em 1em;
  border: 3px solid #ff0000;
  border-radius: 10px;
`

// 青色文字を表示するスタイル
const font = css`
  color: #1e90ff;
  font-size: 2em;
`

// 赤色ボーダーと青色文字のスタイルをそれぞれ適用し、背景が透明なボタンコンポーネント
const Button = styled.button`
  background: transparent;
  margin: 1em;
  cursor: pointer;
  
  ${redBox}
  ${font}
`
// 青色文字のスタイルを継承し、ボールドでテキストを表示するコンポーネント
const Text = styled.p`
  font-weight: bold;
  
  ${font}
`

const Page: NextPage = () => {
  return (
    <div>
      {/* 青色文字で赤色ボーダーのボタンを表示 */}
      <Button>Hello</Button>
      {/* 青色文字のテキストを表示 */}
      <Text>World</Text>
    </div>
  )
}

export default Page
```

#### スタイルを継承する

**リスト 4.9 コンポーネントを継承してスタイルを継承**
```ts
import { NextPage } from 'next'
import styled from 'styled-components'

// 青いボールド文字を表示するコンポーネント
const Text = styled.p`
  color: blue;
  font-weight: bold;
`

// Textを継承し、ボーダーのスタイルを加えたコンポーネント
const BorderdText ~ styled(Text)`
  padding: 8px 16px;
  border: 3px solid blue;
  border-radius: 8px;
`

const Page: NextPage = () => {
  return (
    <div>
      <Text>Hello</Text>
      <BorderedText>World</BorderedText>
    </div>
  )
}

export default Page
```

#### スタイルを別のコンポーネントで使用する

**リスト 4.10 `as`を使用して別の要素として使用する**
```ts
import { NextPage } from 'next'
import styled from 'styled-compornents'

// 青色のテキストを表示するコンポーネント
const Text = styled.p`
  color: #1e90ff;
  font-size: 2em;
`

const Page: NextPage = () => {
  return (
    <div>
      {/* 青色のテキストを表示 */}
      <Text>World</Text>
      {/* 青色のリンクを表示 */}
      <Text as="a" href="/">
        Go to index
      </Text>
    </div>
  )
}

export default Page
```

#### Next.jsのコンポーネントにスタイルを使用する
デフォルトでは、styled-componentsで定義したスタイルは描画時にスタイルを作成し、`className`をコンポーネントに渡します。
コンポーネント内の特定のコンポーネントにスタイルを適用したい場合は、class属性、つまり `props` に渡される `className`属性をニニのコンポーネントに渡します。

**リスト 4.11 特定のコンポーネントにスタイルを適用**
```ts
import { NextPage } from 'next'
import Link, { LinkProps } from 'next/link'
import styled from 'styled-components'

type BaseLinkProps = React.PropsWithChildren<LinkProps> & {
  className?: string
  children: React.ReactNode
}

// Next.js のリンクにスタイルを適用するためのヘルパーコンポーネント
// このコンポーネントを styled-components で使用すると、
// 定義したスタイルに対応する className が　props として渡される
// この className を a要素に渡す
const BaseLink = (props: BaseLinkProps) => {
  const { className, children, ...rest } = props
  return (
    <Link {...rest}>
      <a className={className}>{children}</a>
    </Link>
  )
}

const StyledLink = styled(BaseLink)`
  color: #1e90ff;
  font-size: 2em;
`

const Page: NextPage = () => {
  return (
    <div>
      {/* 青色のリンクを表示する */}
      <StyledLink href="/">Go to Index</StyledLink>
    </div>
  )
}

export default Page
```

#### Theme（テーマ）
**リスト 4.12 `theme.ts`**
```ts
export const theme = {
  space: ['0px', '4px', '8px', '16px', '24px', '32px'],
  colors: {
    white: '#ffffff',
    black: '#000000',
    red: '#ff0000'
  },
  fontSizes: ['12px', '14px', '16px', '18px', '20px', '23px'], 
  fonts: {
    primary: `arial, sans-serif`,
  },
}
```

**リスト 4.13 `pages/_app.tsx`**
```ts
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme'

const MyApp = ({ Component, pageProps }: AppProps) => {
  // styled-componentsでテーマを使用するために、ThemeProviderを置く
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
```

**リスト 4.14 `theme`で定義した値を使用**
```ts
import { NextPage } from 'next'
import styled from 'styled-components'

const Text = styled.span`
  /* theme から値を参照してスタイルを適用 */
  color: ${(props) => props.theme.colors.red};
  font-size: ${(props) => props.theme.fontSizes[3]};
  margin: ${(props) => props.theme.space[2]};
`

const Page: NextPage = () => {
  return (
    <div>
      <Text>Themeから参照した色を使用しています。</Text>
    </div>
  )
}

export default Page
```

## 4.3 Storybookを使ったコンポーネント管理

### 4.3.1 Storybookの基本的な使い方
```shell
$ npx sb@latest init
$ npm run storybook
```

**リスト 4.15 `components/StyledButton/index.tsx`**
```ts
import styled, { css } from 'styled-components'

const variants = {
  primary: {
    color: '#ffffff',
    backgroundColor: '#1D3461',
    border: 'none'
  },
  success: {
    color: '#ffffff',
    backgroundColor: '#5ab203',
    border: 'none',
  },
  transparent: {
    color: '#111111',
    backgroundColor: 'transparent',
    border: '1px solid black',
  },
} as const

type styledButtonProps = {
  variant: keyof typeof variants
}

export const styledButton = styled.button<StyledButtonProps>`
  #{({variant}) => {
    // vaariantに与えられたキーを元に、対応するスタイルを取得する
    const style = variants[variant]
    
    // cssを使い、複数のスタイルを返す
    return css`
      color: ${style.color};
      background-color: ${style.backgroundColor};
      border: ${style.border};
    `;
  }}
  
  border: 12px;
  font-size: 14px;
  height: 38px;
  line-height: 22px;
  letter-spacing: 0;
  cursor: pointer;
  
  &:fucus {
    outline: none;
  }
`

```

**リスト 4.16 `stories/StyledButton.stories.tsx`**
```ts
import { ComponentMeta } from '@storybook/react'
import { styledButton } from '../components/StyledButton'

// ファイル内のStoryの設定（メタデータオブジェクト）
exprot default {
  // グループ名
  title: 'StyledButton',
  // 使用するコンポーネント
  component: StyledButton,
} as ComponentMeta<typeof StyledButton>

export const Primary = (props) => {
  return (
    <StyledButton {...props} variant="primary">
      Primary
    </StyledButton>
  )
}

export const Success = (props) => {
  return (
    <StyledButton {...props} variant="success">
      Success
    </StyledButton>
  )
}

export const Transparent = (props) => {
  return (
    <StyledButton {...props} variant="transparent">
      Transparent
    </StyledButton>
  )
}
```

### 4.3.2 Actionを使用したコールバックのハンドリング
```ts
export default {
  title: 'StyledButton',
  component: StyledButton,
  // 以下の行を追加
  // onClickが呼ばれたときに clicked というアクションを出力する
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof StyledButton>
```

**リスト 4.17 カスタム Action を使用するストーリー**
```ts
import { useState } from 'react'
import { ComponentMeta } from '@storybook/react'
import { StyledButton } from '../components/StyledButton'
// 新しいactionをインポート
import { action } from '@storybook/addon-actions/'

export default {
  title: 'StyledButton',
  component: StyledButton,
} as ComponentMeta<typed StyledButton>

// increment という名前で action を出力するための関数をつくる
const incrementAction = action('increment')

export const Primary = (props) => {
  const [count, setCount] = useState(0)
  const onClick = (e: React.MouseEvent) => {
    // 現在のカウントを渡して, Actionを呼ぶ
    incrementAction(e, count)
    setCount((c) => c + 1)
  }
  
  return (
    <StyledButton {...props} variant="primary" onClick={onClick}>
      Count: {count}
    </StyledButton>
  )
}
```

### 4.3.3 Controls タブを使った props の制御
**リスト 4.18 `argTypes`を使用してUIから`props`を制御するストーリー
```ts
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { StyledButton } from '../components/StyledButton'

export default {
  title: 'StyledButton',
  component: StyledButton,
  argTypes: {
    // propsに渡す variant を Storybook から変更できるように追加
    variant: {
      // ラジオボタンで設定できるように指定
      control: { type: 'radio' },
      options: ['primary', 'success', 'transparent'],
    },
    // propsに渡す childrenをStorybookから変更できるように追加
    children: {
      // テキストボックスで入力できるように指定
      controle: { type: 'text' },
    },
  },
} as ComponentMeta<typeof StyledButton>

// テンプレートコンポーネントを実装
// Storybook から渡された props をそのまま Button に渡す
const Template: ComponentStory<typeof StyledButton> = (args) => <StyledButton {...args} />

// bind を呼び出し Story を作成
exprot const TemplateText = Template.bind({})

// デフォルトの props を設定する
TemplateTest.args = {
  variant: 'primary',
  children: 'Primary',
}
```

### 4.3.4 アドオン
ControlsやActionsは`@storybook/addon-essentials`に含まれているアドオンです。

`npx sb init`で初期化した場合、`@storybook/addon-essentials`はすでにインストールされている。

```shell
$ npm install --save-dev @storybook/addon-essentials
```

```ts
module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    // 必要に応じてインストールしたアドオンを追加する
    '@storybox/addon-links',
    '@storybook/addon-essentials',
  ],
}
```

```ts
import MDXDocument from './styledButton.mdx'

export default {
  title: 'StyledButton',
  component: StyledButton,
  ...
  parameters: {
    docs: {
      // ドキュメント用のmdxコンポーネントを指定
      page: MDXDocument,
    },
  },
} as ComponentMeta<typeof StyledButton>
```


```ts
// .storybook/preview.js

export const parameters = {
  ...
  viewport: {
    viewports: {
      iphonex: {
        name: 'iPhone X',
        styles: {
          width: '375px',
          height: '812px',
        },
      },
    },
  },
  backgrounds: {
    values: [
      {
        name: 'grey',
        value: '#808080',
      },
    ],
  },
}
```

**リスト 4.19 `linkTo`を使用したストーリー間遷移**
```ts
import { ComponentMeta } from '@storybook/react'
import { StyledButton } from '../components/StyledButton'
import { linkTo } from '@storybook/addon-links'

export default {
  title: 'StyledButton',
  component: StyledButton,
} as ComponentMeta<typeof StyledButton>

export const Primary = (props) => {
  // クリックしたら StyledButton/Success のストーリーへの遷移する
  return (
    <StyledButton {...props} variant="primary" onClick={linkTo('StyledButton', 'Success')}>
      Primary
    </StyledButton>
  )
}

export const Success = (props) => {
  // クリックしたら StyledButton/Transparent のストーリーへの遷移する
  return (
    <StyledButton {...props} variant="success" onClick={linkTo('StyledButton', 'Transparent')}?
      Success
    </StyledButton>
  )
}

export const Transprent = (props) => {
  // クリックしたらStyledButton/Primaryのストーリーへ遷移する
  return (
    <StyledButton {...props} varant="transparent" onClick="{linkTo('StyledButton', 'Primary')}>
      Transparent
    </StyledButton>
  )
}
```

## 4.4 コンポーネントのユニットテスト
Reactの公式が推奨しているReact Testing Libraryを使ったコンポーネントのユニットテストについて

### 4.4.1 Reactにおけるユニットテスト
執筆現在はReact Testing LibraryがReact公式が推奨されており、主流のツールとなっています。

### 4.4.2 テスト環境構築
```shell
$ npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

**リスト 4.20 `jest.setup.js`**
```ts
import '@testing-library/jest-dom/extend-expect'
```

**リスト 4.21 `jest.config.js`**
```js
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })
const customJestConfig = 
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
}

module.exports = createJestConfig(customJestConfig)
```
**リスト 4.22 `package.json`に追記する**
```js
{
  ...
  "scripts": {
    "test": "jest"
  },
}
```

`npm run test`を実行してjestが起動すれば、環境構築は終わりです。

### 4.4.3 Reeact Testin Library によるコンポーネントのユニットテスト**
**リスト 4.23 `components/Input/index.tsx`**
```ts
import { useState } from 'react'

type InputProps ~ JSX.IntrinsicElements['input'] & {
  label: string
}

export const Input = (props: InputProps) => {
  const { label, ...rest } = props
  
  const [text, setText] = useState('')
  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  
  const resetInputField = () => {
    setText('')
  }
  
  return (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <input {...rest} type="text" value={text} onChange={onInputChange} />
      <button onClick={resetInputField}>Reset</button>
    </div>
  )
}
```

**リスト　4.24 `component/Input/index.spec.tsx`**
```ts
import { render, screen, RenderResult } from '@testing-library/react'
import { Input } from './index'

// describeで処理をまとめる
describe('input', () => {
  let renderResult:RenderResult
  
  // それぞれのテストケース前にコンポーネントを描画し、renderResultにセットする
  beforeEach(() => {
    renderResult = render(<Input id="username" label="Username" />)
  })
  
  // テストケース実行後に描画していたコンポーネントを解放する
  afterEach(() => {
    renderResult.unmount()
  })
  
  // 初期描画時に input 要素が空であることをテスト
  it('should empty in input on initial render', () => {
    // label が Username であるコンポーネントに対応する input の要素を取得する
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement
    
    // input 要素の表示が空か確認する
    expect(inputNode).toHaveValue('')
  })
})
```

```shell
$ npm run test
```

```ts
export const Input = (props: InputProps) => {
  ...
  
  return (
    <div>
      <input {...rest} type="text" value={text} onChange={onInputChange} aria-label={label} />
      <button onClick={resetInputField}>Reset</button>
    </div>
  )
}
```

**リスト 4.25 `input.spec.tsx`にテキスト入力のテストを追記**
```
import {
  ...
  fireEvent
} from '@testing-library/react'

describe('input', () => {
  ...
  
  // 文字を入力したら、入植した内容が表示されるかをテスト
  it('should show input text', () => {
    const inputText = 'Text Input Text'
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement
    
    // fireEventを使って、input要素のonChangeイベントを発火する
    fireEvent.change(inputNode, { target: { value: inputText } })
    
    // input要素に入力したテキストが表示されているか確認する
    expect(inputNode).toHaveValue(inputText)
  })
})
```

**リスト 4.26 `input.spec.tsx`にクリアボタンのテストを追記
```ts
import {
  ...
  getByRole
} from '@texting-library/react'

describe('Input' => {
  ...
  
  // ボタンが押されたら、入力テキストがクリアするかチェック
  it('should reset when user clicks button', () => {
    // 最初に input にテキストを入力する
    const inputText = 'Test Input Text'
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement
    
    fireEvent.change(inputNode, { target: inputText } })
    
    // ボタンを取得する
    const buttonNode = screen.getByRole('button', {
      name: 'Reset',
    }) as HTMLButtonElement

    // ボタンをクリックする
    fireEvent.click(inputNode).toHaveValue('')
  })
})
```

**リスト 4.27 `components/DelayInput/index.tsx`**
```ts
import React, { useState, useCallback, useRef } from 'react'

type DelayButtonProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const DelayInput = (props: DelayButtonProps) => {
  const { onChange } = props
  
  // 入力中かどうかを保持する状態
  const [isTyping, setlsTypeing] = useState(false)
  // inputに表示するテキストを保持する状態
  cosnt [inputValue, setInputValue] = useState('')
  // spanに表示するテキストを保持する状態
  const :viewValue, setViewValue] = useState('')
  // タイマーを保持する Ref
  const timerRef = useRef<ReternType<typeof setTimeout> | null>(null)
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // 入力中のフラグをセットする
    setlsTyping(true)
    // inputに表示するテキストを更新する
    setInputValue(e.target.value)
    
    // もし timerRef に以前設定したタイマーがある場合は先に解除する
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
    }
    
    // 1秒後に実行するタイマーをセットする
    timerRef.current = setTimeout(() => {
      timerRef.current = null
      
      // 入力中のフラグを解除する
      setlsTyping(false)
      // spanに表示するテキストを更新する
      setViewValue(e.target.value)
      // onChangeコールバックを呼ぶ
      onChange(e)
    }, 1000)
  }, [onChange])
  
  // span に表示するテキスト
  const text = isTyping ? '入力中...' : `入力したテキスト: ${viewValue}`
  
  return (
    <div>
      {/* data-testid はテスト中だけ使用するID */ }
      <input data-testid="input-text" value={inputValue} onChange={handleChange} />
      <span data-testid="display-text">{text}</div>
    </div>
  )
}
```

**リスト 4.28 `components/DelayInput/index.spec.tsx`**
```ts
import { render, screen, RenderResult } from '@testing-library/react'
import { DelayInput } from './index'

// DelayInput コンポーネントに関するテスト
describe('DelayInput', () => {
  let renderResult: RenderResult
  let handleChange: jest.Mock
  
  beforeEach(() => {
    // モック関数を作成する
    handleChange = jest.fn()
    
    // モック関数を DelayButton に渡して描画
    renderResult = render(<DelayInput onChange={handleChange} />
  })
  
  afterEach(() => {
    renderResult.unmount()
  })
  
  // span要素のテキストが空であることをテスト
  it('should display empty in span on initial render', () => {
    const spanNode = screen.getByTextId('display-text') as HTMLSpanElement
    // 初期表示は空
    expect(spanNode).toHaveTextContent('入力したテキスト :')
  })
})
```

**リスト 4.29 `input.spec.tsx`に入力中のテストを追記**
```ts
import { render, screen, RenderResult, fireEvent } from '@testing-library/react'
import { DelayInput } from './index'

// DelayInputコンポーネントに関するテスト
describe('DelayInput', () => {
  ...
  
  // 入力直後は span 要素が「入力中...」と表示するかテスト
  it('should display「入力中...」 immediately after onChange event occurs', () => {
    const inputText = 'Test Input Text'
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement
    
    // input の onChange イベントを呼び出す
    fireEvent.change(inputNode, { target: { value: inputText } })
    
    const spanode = screen.getByTestId('display-text') as HTMLSpanElement
    
    // 入力中と表示するか確認
    expect(spanNode).toHaveTextContent('入力中...')
  })
})
```

**リスト 4.30 `index.spec.tsx`にテキストの反映テストを追記
```ts
import { render, screen, RenderResult, fireEvent, act } from '@testing-library/react'
import { DelayInput * from './index'

describe('DelayInput', () => {
  beforeEach(() => {
    // タイマーを jest のものに置き換える
    jest.useFakeTimers()
    ...
  })
  
  afterEach(() => {
    ...
    
    // タイマーを元に戻す
    jest.useFakeTimers()
  })
  
  ...
  
  // 入力して1秒後にテキストが表示されるかテスト
  it('should display input text 1 second after on Change event occurs', async () => {
    const inputText = 'Test Input Text'
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement
    
    // inputのonChangeイベントを呼び出す
    fireEvent.change(inputNode, { target: { value: inputText } })
    
    // act関数内で実行することにより、タイマーのコールバック中で起きる状態変更が反映されることを保証する
    await act(() => `
      // タイマーにセットされた timeout をすべて実行する
      jest.runAllTimers()
    })
    
    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement
    
    // 入力したテキストが表示されるか確認
    expect(spanNode).toHaveTextContent(` 入力したテキスト: ${inputText}`)
  })
})
```

**リスト 4.31 `index.spec.tsx`に`onChange`呼び出しのテストを追記**
```ts
import { render, screen, renderResult, fireEvent, act } from '@testing-library/react'
import { DelayInput } from './index'

describe('DelayInput', () => {
  ...
  
  // 入力して1秒後に onChange が呼ばれるかテスト
  it('should call onChange 1 second after onChange event occurs', async () => {
    const inputText = 'Test Input Text'
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement
    
    // input の onChange イベントを呼び出す
    fireEvent.change(inputNode, { target: { value: inputText } })
    
    // タイマーの実行
    await act(() => {
      jest.runAllTimers()
    })
    
    // モック関数を渡し、呼ばれたか確認する
    expect(handleChange).toHaveBeenCalled()
  })
})
```





    





















