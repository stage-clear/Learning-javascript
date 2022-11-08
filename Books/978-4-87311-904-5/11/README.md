# 11章 JavaScriptとの相互運用

## 11.4 サードパーティJavaScriptの使用

### 11.4.1 型宣言を備えているJavaScript
`{"noImplicitAny": true}`と設定して import する場合に、TypeScriptが赤い波線を表示しなければ、そのパッケージが型宣言を備えていることを意味します。

```sh
npm install rxjs
npm install ava
npm install @angular/cli
```

### 11.4.2 DefinetelyTypedに型宣言を持つJavaScript
インポートしているサードパーティコードが型宣言を備えていなかったとしても、それについての宣言は、おそらく[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)で入手可能です。

```sh
npm install lodash --save
npm install @types/lodash --save-dev
```

### 11.4.3 DefinitelyTyped に型宣言を持たないJavaScript

#### 1. 型付けされていないインポートの上に、「`// @ts-ignore`」ディレクティブを追加することで、特定のインポートを「ホワイトリスト化」します。モジュールとそのすべての内容は `any` と型付けされます。

```ts
// @ts-ignore
import Unsafe from 'untyped-module'

Unsafe // any
```

#### 2. 空の型付け宣言ファイルを作成し、モジュールに対する型チェックをもみ消すことで、そのモジュールのすべての使用をホワイトリスト化します。

```ts
// types.d.ts
declare module 'nearby-ferret-alerter'
```

#### 3. アンビエントモジュール宣言を作成します。

```ts
// types.d.ts
declare module 'nearby-ferret-alerter' {
  export default function alert(loudness: 'soft' | 'loud'): Promise<void>
  export function getFerretCount(): Promise<number>
}
```

#### 4. 型宣言を作成し、それをnpmに公開します。

## 11.5　まとめ

|アプローチ|tsconfig.jsonのフラグ|型安全性|
|:-|:-|:-|
|型付けされていないJavaScriptをインポートする|`{"allowJS": true}`|貧弱|
|JavaScriptをインポートし、チェックする|`{"allowJs": true, "checkJs": true}`|まあまあ|
|JSDocを使ってあのテートされたJavaScriptをインポートし、チェックする|`{"allowJs": true, "checkJs": true, "strict": true}`|非常に良い|
|型宣言を持つJavaScriptをインポートする|`{"allowJs": false, "strict": true}`|非常に良い|
|TypeScriptをインポートする|`{"allowJs": false, "strict": true}`|非常に良い|



