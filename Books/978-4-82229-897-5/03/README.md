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

``` json
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



