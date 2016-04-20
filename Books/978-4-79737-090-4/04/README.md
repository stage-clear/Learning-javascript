NPM でモジュール管理する
===

### exports オブジェクトの実体 --- module オブジェクト

```javascript
// Bad
function greeting(something) {
  console.log('Hello, ' + something + '!');
}
exports = greeting;

// Good
function greeting(something) {
  console.log('Hello, ' + something + '!');
}
exports = module.exports = greeting;
```

| Name | Summary |
|:--|:--|
| module.exports     | require() の戻り値となるオブジェクト。exports 変数はこのオブジェクトを参照している |
| module.id          | モジュールのID (通常はそのモジュールのフルパス) |
| module.filename    | モジュールのファイル名 |
| module.loaded      | モジュールのロードが完了していれば「true」、そうでなければ「false」 |
| module.parent      | そのモジュールをロードしたモジュールの module オブジェクト |
| module.children    | そのモジュール内でロードしたモジュールの module オブジェクトが含まれた配列 |
| module.require(id) | そのモジュール内で require(ID) 関数を実行し、その結果を返す |


### モジュールの実行コンテキストを判断する --- require.main プロパティ

- require されたものなのか、 node コマンドで直接実行されたものなのかを判断

```javascript
// require.main === module

function greeting(something) {
  console.log('Hello, ' + something + '!');
}

exports = module.eports = greeting;

// node コマンドで実行された場合のみメッセージを表示
if (require.main === module) {
  greetiing('world');
}
```

### モジュールが存在するかどうかを実行前にチェックする --- require.resolove メソッド

```javascript
var path;
try {
  path = require('hoge');
} catch(e) {
  path = null;
}
// モジュールがあれば変数 path にフルパスが格納され、そうでなければ null が格納される
```


パッケージとパッケージマネージャー npm
---

### npm でサードパーティ製パッケージをインストールする --- npm install コマンド

```bash
# mysql パッケージのインストール
$ npm install mysql

$ ls node_madules
mysql/

# システム全体で利用したいとき
$ npm install -g mysql
```

### パッケージの依存関係

```bash
$ ls node_modules/mysql/node_modules
require-all/
```

### 実行可能なプログラムを含むパッケージ

```bash
$ npm install less
$ ls -l node_modules/less/bin/
total 16
-rwxr-xr-x 1 hylom hylom 4189 19 18 04:34 lessc*

# 実行
$ ./node_modules/.bin/lessc
lessc: no input files

usage: lessac [options] <source> [destination]
 :
 :
```

### パッケージをアンインストールする --- npm uninstall コマンド

```bash
$ npm uninstall mysql
# -g オプション付きで npm uninstall を実行すれば、グローバルパッケージとしてアンインストールできる
# インストールの場合と同様に root 権限が必要だ
```


パッケージの構造
---

```
async
 ├── index.js      | パッケージを require() でロードしたときに実行される JavaScript ファイル
 ├── package.json  | パッケージに関する情報を含む JSON 形式ファイル
 ├── README.md     | Markdown 形式で記述されたテキストファイル
 ├── LICENSE       | パッケージのライセンス情報が記述されたテキストファイル
 ├── Makefile      | パッケージのビルドやテストを実行するための Makefile
 └── lib/          | async.js async モジュールの本体
```

```javascript
var async = require('async');
```

C/C++ で作成されたモジュールを利用する
---

- C/C++ で記述されたモジュールは、専用のツールでコンパイルすることで .node という拡張子のバイナリファイルに変換される
- JavaScript で記述されたモジュールやパッケージと同様に `require()` で実行できる

### アドオンの作成に必要なツールを用意する --- node-gyp パッケージ

- GCCなどの C/C++ コンパイラや make などの基本的な開発環境が必要
- node-gyp は gyp (generate your project) というビルドツールを Node.js 向けにしたもの

```bash
$ npm install -g node-gyp
```

### アドオン用の C++ コードを作成する


(C++ は書けないのでスルー)

