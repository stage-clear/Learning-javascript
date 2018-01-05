# はじめての TypeScript コーディング
## はじめての TypeScript ファイル作成とコンパイル
[sample1/app.ts](examples/sample1/app.ts)

```bash
$ tsc app.ts
```

## Visual Studio Code の TypeScript ビルドの構成
### サンプル2

### TypeScript プロジェクトの構成（tsconfig.json ファイルの作成）

```bash
tsc --init
```

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": false
    }
}
```

### ビルドタスクの構成（task.json ファイルの作成）
Vsisual Studio Code の[ビルド]を実行したときに, TypeScript がコンパイルされるようにビルドタスクを構成します.

1. tsconfig.json を作成した後で, コマンドパレットを表示します `Shift` + `Command` + `P`
2. `task` と入力して表示される [タスク: 規定のビルドタスクを構成する] を選択します
3. プロジェクトフォルダに tsconfig.json があると, [tsc: build tsconfig.json] が表示されます. これを選択
4. 新しく task.json が作成されます

```js
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "type": "typescript",
      "tsconfig": "sample2/tsconfig.json",
      "problemMatcher": [
        "$tsc"
      ],
      "group": {
        "kind": "test",
        "isDefault": true
      }
    }
  ]
}
```

### Visual Studio Code でビルド（タスクの実行）
ビルドの構成が完了したら, Visual Studio Code `Ctrl` + `Shift` + `B` を押すか,
[タスク] メニューから [ビルドタスクの実行] を選択して, ビルドを実行します.

## Visual Studio の TypeScript ビルド構成
### サンプル3
### TypeScript プロジェクトテンプレートから新規作成（ビルド構成済み）
### Visual Studio 2017 でビルド（タスクの実行）

## プロジェクトとファイルの扱い
### Visual Studio Code と Visual Studio のプロジェクトの違い
## Visual Studio Code で機能開発・単体テスト・デバッグ（Node.js）
### サンプル4

### 作成した JavaScript を Node.js で実行

```bash
$ node app.js
```

### Visual Studio Code で Node.js のデバッグ構成（launch.json作成・tsconfig.json変更）

launch.json に `sourceMap: true` を追加します.
tsconfig.json の `sourceMap` も `true` に設定します。
これによって, まるで TypeScript のファイルがそのまま実行されているかのように, デバッグで動作を確認できるようになります.

ソースコードの行番号の左の空白の部分をクリックしてブレークポイントを追加しましょう.<br>
JavaScript ファイルではなく, TypeScript ファイルにブレークポイントを設定することに注意してください.

もし, 赤色の丸ではなくグレーの丸が表示された場合には, `sourceMap` が正しく設定されていないかもしれません.

### Visual Studio Code で単体テスト（Mocha）フレームワークのインストール

```bash
# npm パッケージを管理するファイル package.json を作成するコマンド
$ npm init
```

```bash
# package.json の内容を基に npm パッケージを再インストールするコマンド
$ npm update
```

```bash
# 単体テストフレームワーク Mocha をインストールするコマンド
$ npm install --save mocha
```
このままでは TypeScript のコンパイラ（tsc コマンド）は Mocha の定義を認識できないので,
TypeScript 用の型定義ファイルを追加して, TypeScript で Mocha を扱えるようにします

```bash
# TypeScript 定義を検索する typings をインストールするコマンド
$ npm install -g typings
```

```bash
# typings を使って node の型定義ファイルをインストールするコマンド
$ typings search node
$ typings install dt~node --save --global
```

```bash
# typings を使って mocha の型定義ファイルをインストールするコマンド
$ typings search mocha
$ typings install dt~mocha --save --global
```

### Visual Studio Code で単体テスト（Mocha）のデバッグ構成（launch.json 変更）

### Visual Studio Code で機能と単体テスト

```js
// TypeScript への新しい機能の追加（ファイル名: app-talk.ts）
export namespace App{
  export class Talk {
    public static GetGreeting(now: Date) : string {
      return 'Hello!'
    }
  }
}
```

```js
import assert = require('assert')
import appTalk = require('../app-talk')

describe('App.Talk', () => {
  it('GetGreeting Test', () => {
    assert.equal(appTalk.App.Talk.GetGreeting(new Date(2018, 1, 1, 1, 0, 0, 0)), 'Hello!')
    assert.equal(appTalk.App.talk.GetGreeting(new Date(2018, 1, 1, 13, 0, 0, 0)), 'Good evening!')
  })
})
```
