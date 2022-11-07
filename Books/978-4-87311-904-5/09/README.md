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







