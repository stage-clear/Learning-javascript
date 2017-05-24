# 品質チェック, 型チェック, テスト, そして繰り返し
アプリケーションが進化そして大規模化してもコードの正しさを保つためのツールを3つ紹介します.
それは ESLint, Flow そして Jest です.

## package.json

```json
{
  "name": "Whinepad",
  "version": "2.0.0"
}
```
最低限必要なのはこれだけです.

### Babel の設定

```bash
$ babel --presets react,es2015 js/source -d js/build
```

このコマンドをもっとシンプルにしてみましょう.  
`presets` の部分は, package.json に移動できます.

```json
{
  ...
  "babel": {
    "presets": [
      "es2015",
      "react"
    ]
  }
}
```

こうすれば, コマンドを次のように短くできます.

```bash
$ babel js/source -d js/build
```

### スクリプト

```json
{
  ...
  "scripts": {
    "watch": "watch \"sh scripts/build.sh\" js/source css/"
  }
}
```

これからは, 以下のコマンドで開発と同時にビルドが可能になります.

```bash
# 従来のコマンド
$ sh ./scripts/watch.sh

# 新しいコマンド
$ npm run watch
```

## ESLint
- [ESLint](http://eslint.org/)

### セットアップ

```bash
$ npm i -save-dev eslint babel-eslint eslint-plugin-react eslint-plugin-babel
```

```json
{
  ...
  "eslintConfig": {
    "parser": "babel-eslint",
    "plugins": [
      "babel",
      "react"
    ]
  }
}
```

### 実行

```bash
$ eslint js/source/app.js
```

この状態では, チェックのためのルールが何も指定されていません
