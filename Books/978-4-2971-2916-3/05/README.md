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
  "name": "nextjs-gihyo-book"

}

