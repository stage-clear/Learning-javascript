# TypeScript: 全体像
## 2.1 コンパイラー
1. プログラムがASTへと解析される
2. ASTがバイトコードにコンパイルされる
3. バイトコードがランタイムによって評価される

> 型チェッカー（typechecker）<br>
> コードが型安全であることを検証する特別なプログラム

## 2.2 型システム
> 型システム（type system）<br>
> プログラマーが作成したプログラムに肩を割り当てるために型チェッカーが使用するルールの集まり

```typescript
let a: number = 1
let b: string = 'hello'
let c: boolean[] = [true, false]
```
TypeScriptに型を推論させたければ、単に型を省略し、TypeScriptに仕事をさせます。
```typescript
let a = 1
let b = 'hello'
let c = [true, false]
```

## 2.3 コードエディターのセットアップ
[VSCode](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)

```sh
# 新しいフォルダーを作ります
mkdir chapter-2
cd chapter-2

# 新しいpmプロジェクトを初期化します（表示されるプロンプトに従います）
npm init

# TSC, TSLint、およびNode.js用の型宣言をインストールします
npm install --save-dev typescript tslint @types/node
```

### 2.3.1 tsconfig.json
```js
{
  "compilerOptions": {
    "lib": ["es2015"],
    "module": "commonjs",
    "outDIr": "dist",
    "sourceMap": true,
    "strict": true,
    "target": "es2015"
  },
  "include": [
    "src" 
  ]
}
```
