# Express

## アプリケーションのスケルトンを生成する

__Expressのインストール__

```bash
$ npm install express
```

__Express による最小限のアプリケーション__

```javascirpt
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello');
});
```

### アプリケーションの生成

```bash
express -e photo
# photo ディレクトリに作成される
```

## Express とアプリケーションのコンフィギュレーション

__必要最小限の環境駆動コンフィギュレーション__

- app.configure()
- app.set()
- app.get()
- app.enable()
- app.disable()


### 環境に基づくコンフィギュレーション

development(開発時)、stage（発展段階）、test（テスト中）、および production または略して prod（製品版）

```javascript
// app.configure() を使って環境に固有のオプションを設定する
app.configure(function() {
  app.set('views', __dinarme + '/views'); // すべての環境で実行される
  app.set('view engine', 'ejs');
  //...
});

app.configure('development', function() {
  app.use(express.errorHandler()); // 開発のみ
});
```

```javascript
// 条件文で環境に固有のオプションを設定する
var env = process.env.NODE_ENV || 'development';
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

if ('development' == env) {
  app.use(express.errorHandler());
}
```

## ビューのレンダリング

```javascript
exports.index = function(req, res) {
  res.render('index', { title: 'Express' });
};
```

### ビューシステムのコンフィギュレーション

- ビューのルックアップを調整する
- デフォルトのテンプレートエンジンを設定する
- ビューをキャッシュしてファイル入出力を減らす

__ルックアップディレクトリを変更する__

```javascript
app.set('views', __dirname + '/views');
```

__デフォルトのテンプレートエンジン__

```javascript
app.set('view engine', 'jade');

app.get('/', function() {
  res.render('index');
  // Jade をビューエンジンとして設定したので拡張子は .jade とみなされる
});

app.get('/feed', function() {
  res.render('rss.ejs');
  // .ejs という拡張子をしていするのでEJSテンプレートエンジンが使われる
})
```

__ビューキャッシュ__

### ビューのルックアップ

ビューをルックアップする方法は、Node の `require()` の仕組みと同じである。

### データをビューに提示する
