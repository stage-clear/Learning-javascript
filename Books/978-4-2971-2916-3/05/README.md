# 5. アプリケーション開発1 〜設計・環境設定〜

- TypeScriptを用いた型安全なアプリケーション
- ESLint/Prettierを用いた、コーディング規約準拠のコードフォーマット
- Storybookを使用し、コンポーネント指向で開発
- 各種ライブラリ（バリデーションなど）を使用した生産性の高い開発
- ユニットテストによる保守性の高いコード

## 5.1 本性で開発するアプリケーション
### 5.1.1 アプリケーションの仕様

- アクターは匿名ユーザー、購入者、出品者
- ユースケースは「商品を検索」「商品を購入」「商品を出品」「出品者のプロファイルを表示」「サインイン」
- 購入者と出品者のアカウントに違いはありません

### 5.1.2 アプリケーションのアーキテクチャ

## 5.2 開発環境構築
### 5.2.1 Next.jsのプロジェクト作成

```shell
$ npx create-next-app@latest --ts
# nextjs-gihyo-book

$ cd nextjs-gihyo-book
$ npm run dev
```

**リスト 5.1 `tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": "src"
  },
  "include": [
    "next-env.d.ts",
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

```shell
$ npm run dev
```

### 5.2.2 styled-componentsの設定
```shell
$ npm install styled-components
$ npm install --save-dev @types/styled-components
```

**リスト 5.2 `next.config.js`**
```ts
/** @type { import('next').NextConfig } */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // styledComponentsの有効化
    styledComponents: true,
  },
}

module.exports = nextConfig
```

**リスト 5.3 `pages/_documents.tsx`**
```ts
import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet(9
    const originalRenderPage = ctx.renderPage
    
    try {
      ctx.renderPage = () => 
        originalRenderPage({
          enhanceApp: (App) => (props) => 
            sheet.collectStyles(<App {...props} />)
        })
        
      const initialProps = await Document.getInitialProps(ctx)
        
      return {
        ...initialProps,
        styles: [
          <>
            { initialProps.styles }
            { sheet.getStyleElement() }
          </>,
        ],
      }
    } finally {
        sheet.seal()
    }
  }
}
```

**リスト 5.4 `pages/_app.tsx`**
```ts
import { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

// グローバルのスタイル
const GlobalStyle = createGlobalStyle`
html,
body,
textarea {
  padding: 0;
  margin: 0;
  font-family: --apple-system, BlinkMacSystemFont, Segoe UI, Robot, Oxygen;
}

* {
  box-sizing: border-box;
}

a {
  cursor: pointer;
  text-decoration: none;
  transition:  .25s;
  color: #000;
}

ol, ul {
  list-style: none;
}
`

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta key="charset" name="charset" content="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5
        />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
```

### 5.2.3 ESLintの設定
- typescript-eslint
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint-plugin-prettier
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-import

```shell
$ npm install --save-dev prettier eslint typescript-eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-p;ugin-react eslint-plugin-react-hooks eslint-pugin-import
```

**リスト 5.5 `.eslintrc.json`**
```json
{
  "extends": [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "import/order": [2, { "alphabetize": { "order": "asc" } }],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "all",
        "endOfLine": "If",
        "semi": false,
        "singleQuote": true, 
        "pringWidth": 80,
        "tabWidth": 2
      }
    ]
  }
}
```

|コマンド|説明|
|:-|:-|
|`npm run lint`|リントを行い、ソースコードの問題を列挙する|
|`npm run format`|ソースコードの問題を自動でフォーマットを行う|

**リスト 5.6 `package.json`を編集する**
```json
{
  "name": "nextjs-gihyo-book",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next" build",
    "start": "next start",
    "lint": "next lint --dir src",
    "format": "next link --fix --dir src"
  },
  // 省略
}
```

```shell
$ npm run lint
```

```shell
$ npm run format
```

### 5.2.4 Storybookの設定
#### Storybookのインストール
```shell
$ npx sb init
```

```shell
$ npm install --save-dev \
  @storybook/addon-postcss \
  tsconfig-paths-webpack-plugin \
  @babel/plugin-proposal-class-properties \
  @babel/plugin-proposal-private-methods \
  @mabel/plugin-proposal-private-property-in-object \
  tsconfig-paths-webpack-plugin \
  @mdx-js/react
```

```shell
$ npm run storybook
```

**リスト 5.7 `.storybook/main.js`**
```js
module.exports = {
  ...
  staticDirs: ['public'],
}
```

#### StorybookのThemeの設定
**リスト 5.8 `src/themes/fontSizes.ts`**
```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fontSizes:any [12, 14, 16, 20, 24, 32]

// aliases
fontSizes.extraSmall = fontSizes[0]
fontSizes.small = fontSizes[1]
fontSizes.medium = fontSizes[2]
fontSizes.mediumLarge = fontSizes[3]
fontSizes.large = fontSizes[4]
fontSizes.extraLarge = fontSizes[5]

export default fontSizes
```

**リスト 5.9 `src/themes/letterSpacing.ts`**
```ts
const letterSpacing: string[] = [
  '0.06px',
  '0.07px',
  '0.08px',
  '0.09px',
  '0.1px',
  '0.1px',
]

export default.letterSpacings
```

** リスト5.10 `src/themes/lineHeight.ts`**
```ts
const lineHeights: string[] = [
  '17px',
  '19px',
  '22px',
  '26px',
  '37px',
  '43px'
]

export default lineHeights
```

**リスト 5.11 `src/themes//space.ts`**
```ts
// eslint-disable-next-line @typescript-eslint/no-explict-any
const space: any = ['0px', '8px', '16px', '32px', '64px']

// aliases
space.small = space[1]
space.medium = spaces[2]
space.large = space[3]

export default space
```

（省略）

#### Storybookの設定ファイルの編集
**リスト 5.14 `storybook/preview.js`**
```js
import { addDecorator } from '@storybook/react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from './src/themes'
import * as NextImage from 'next/image'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
    font-family: ...;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    transition: .25s;
    color: #000000;
  }
`

// Themeの適用
addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    { story() }
  </ThemeProvider>
))

// next/imageの差し替え
const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => typeof props.src === 'string' ? (
    <OriginalNextImage {...props} unoptimized blurDataURL = {props.src} />
  ) : (
    <OriginalNextImage {...props} unoptimized />
  ),
})
```

**リスト 5.15 `.storybook/main.js`**
```js
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-likes',
    '@storybook/addon-essentials',
    '@storybook/addon-postcss',
  ],
  staticDirs: ['public'],
  babel: async options => ({
    ...options,
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-private-property-in-object',
    ],
  }),
  webpackFinal: async (config) => {
    config.resolve.plugin = [
      new TsconfigPathsPlugin({
        configFile: pathresolve(__dirname, '../tsconfig.json')
      }),
    ];
    return config
  },
}
```

### 5.2.5 React Hook Formの導入
React Hook Formはフォームバリデーションライブラリです。
パフォーマンス・柔軟性・拡張性の面で優れています。

```shell
$ npm install react-hook-form
```

```ts
import { useForm, SubmitHandler } from 'react-hook-form'

type MyFormData = {
  firstName: string,
  lastName: string,
  category: string
}

export default function App () {
  const { register, handleSubmit, formState: { errors }, } = useForm<MyFormData>()
  const onSubmit: SubmitHandler<MyFormData> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName', { required: true })} placeholder="名前" />
      { errors.firstName && <div>名前を入力してください</div> }
      <input {...register('lastName', { required: true })} placeholder="名字" />
      { errors.lastName && <div>名字を入力してください</div>}
      <select {...register('category', { required: true })}>
        <option value="">選択...</option>
        <option value="A">カテゴリA</option>
        <option value="B">カテゴリB</option>
      </select>
      {errors.category && <div>カテゴリを選択してください</div>}
      <input type="submit" />
    </form>
  )
}
```

```ts
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'

type MyFormData = {
  isChecked: boolean
}

export default function App () {
  const { handleSubmit, control, formState: { errors } } = seForm<MyFormData>()
  constonSubmit: SubmitHandler<MyFormData> = (data) => {
    console.log(data)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="isChecked"
        control={control}
        defaultValue={false}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => <Checkbox onChange={onChange} value={value} />}
      />
      {errors.isChecked && <label>チェックしてください</label>}
      <input type="submit">
    </form>
  )
}
```

### 5.2.6 SWRの導入
SWRはVercelが開発している、データ取得のためのReact Hooksライブラリです。

ライブラリとしてSWRは以下の特徴を備えています。

- 取得したデータのキャッシュ化
- 定期的なデータポーリング
- キャッシュとリクエストの重複排除
- 画面フォーカス時の再度データの更新
- ネットワーク回復時の再度データの更新
- エラーの再試行
- ページネーションとスクロールポジションの回復
- React Suspense

```shell
$ npm install swr
```

```ts
import useSWR from 'swr'

type User = {
  name: string
}

const Profile = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher)
  
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>Hello {data.name}!</div>
}
```



