# Express の拡張とコンフィギュレーション

# Express を拡張する

### テンプレートエンジンの登録

```javascript
// 拡張子 `.md` を処理する
var express = require('express');
var http = require('http');

// マークダウンの実装を要請
var md = require('github-fravoerd-markdown').parse;
var fs = require('fs');

var app = express();

// このコールバックを .md ファイルにマップ
app.engine('md', function(path, options, fn) {
  // ファイルの内容を1個の文字列として読みだす
  fs.readFile(path, 'utf8', function(err, str) {
    // エラーは Express に委譲する
    if (err) return fn(err);
    try {
      // 波括弧の置き換えを実行
      html = html.replace(/\{([^]+)}/g, function(_, name) {
        //デフォルトでは空の文字列('')で置き換える
        return options[name] || '';
      });
      // レンダリングした HTML を Express に渡す
      fn(null, html);
    } catch (err) {
      // 送出されたエラーがあればキャッチ
      fn(err);
    }
  });
});
```


### consolidate.js によるテンプレート

- [consolidate.js](https://www.npmjs.com/package/consolidate)
- Express 3.x 専用に作られたプロジェクト
- Node の数多いテンプレートエンジンに対して、1個の統一された API を提供する


```javascript
var cons = require('consolidate');
app.engine('html', cons.swig);
// .html ファイルのレンダリングに swig を使うようになる

// 一部のテンプレートエンジンは、全く別種の構文を使うので、
// .html ファイルにマップしても意味がない
// jade の場合は、次の呼び出しでマップできる
app.engine('jade', cons.jade);
```

### Express の拡張とフレームワーク

- Ruby on Rails のように、もっと構造化されたフレームワークを好む開発者は、どのようなオプションを利用できるのか
- Express コミュニティには、Express をベースとして、その上に構築された、より高いレベルのフレームワークがある


__express-expose__

- サーバーサイドの JavaScript オブジェクトをクライアントサイドに提示する

```javascript
// たとえば認証済みユーザーの JSON 表現を提示したければ
res.expose(req.user, 'express.user');
```

__express-resource__

- 構造化されたルーティングに利用できるリソース経路のプラグイン

```javascript
// server.js
app.resource('user', require('./controllers/user'));
```

```javascript
// user.js
exports.new = function(req, res) {
  res.send('new user');
};

exports.create = function(req, res) {
  res.send('create user');
};

exports.show = function(req, res) {
  res.send('show user' + req.params.user);
};
```

各種のプラグイン、テンプレートエンジン、フレームワークの一覧

- [Express wiki](https://github.com/strongloop/express/wiki)


## 高度なコンフィギュレーション

- app.configure()
- デフォルトの振る舞いを変更し、追加機能を有効にするために利用できる、コンフィギュレーションオプション

| name           | summary |
|:---------------|:---|
| default engine | デフォルトで使われるテンプレートエンジン |
| views          | ビューのルックアップパス |
| json replacer  | JSON 応答を操作する関数 |
| json spaces    | JSON 応答の整形に使うスペースの個数 |
| jsonp callback | res.json() と res.send() で JSONP をサポートする |
| trust proxy    | 逆プロキシを信頼する |
| view cache     | テンプレートエンジン関数をキャッシュする |


### JSON 応答を操作する

- json replacer の話

```javascript
var express = require('express');
var app = express();

app.set('json replacer', function(key, value) {
  if ('_' == key[0]) return ;
  return value;
});

var user = { _id: 123, name: 'Tobi' };

app.get('/user', function(req, res) {
  res.send(user);
});

app.listen(3000);
```

### JSON 応答の整形

- json spaces の話
- Express における JSON.stringify() の呼び出しに影響を与える
- JSON を文字列として整形するときに使うスペースの個数を示す
- 製品環境(production)では自動的に0が設定され、開発環境(development)では2が設定される


### ヘッダフィールドの逆プロキシを信頼する

- デフォルトでは、Express の内部ではどの環境でも逆プロキシヘッダフィールドを信頼しない
