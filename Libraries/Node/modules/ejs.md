EJS
====

- Embedded JavaScript
- EJSは、JavaのJSP、PHPのSmartyのRubyのERBなどの経験者にとって親しみ深い環境
- EJS は、HTML内にプレースホルダーとして、EJSタグを埋め込む
- EJS は、JavaScript のロジックをテンプレートに直接埋め込む

### テンプレートの作成

```javascript
// 最小限のサンプル
var ejs = require('ejs');
var template = '<%= message %>';
var context = { message: 'Hello template!' };
console.log(ejs.render(template, {locals: contenxt }));
// console.log(ejs.render(template, context));
// context の値に使えない予約語
// [cache|client|close|compileDebug|debug|filename|open|scope]
```

__文字のエスケープ__

```javascript
// 特殊文字をエスケープする
// <%= message %>

// 特殊文字をエスケープしない
// <%- message %>
```

__デリミタの変更__

```javascript
var ejs = require('ejs');
ejs.open = '{{:'; // タグを開く
ejs.close = '}}:' // タグを閉じる

var template = '{{= message }}';
var context = {message: 'Hello template!'};
console.log(ejs.render(template, context));
```

### EJSフィルタを使って、テンプレートのデータを操作する

- フィルタを使う「エスケープ付き EJS 出力」には、`<%=:` を使う
- フィルタを使う「エスケープなし EJS 出力」には、`<%-:` を使う

__選択を行うためのフィルタ__

```javascript
// first | last | get
var ejs = require('ejs');
var template = '<%=: movies | last %>';
var context = { 'movies': [
  'Bambi', 'Babe: Pig in the city', 'Enter the Void'
]};

console.log(ejs.render(template, context));
```

__大文字/小文字を操作するフィルタ__

```javascript
// capitalize | upcase | downcase
var ejs = require('ejs');
var template = '<%=: name | capitalize %>';
var context = {name: 'bob'};

console.log(ejs.render(template, context));
```

__テキストを操作するフィルタ__

```javascript
// truncate | truncate_words | prepend | append | replace
var ejs = require('ejs');
var template = '<%=: title | truncate:20 %>';
var context = { title: 'the hills are alive with the sound of critters'};
console.log(ejs.render(template, context));
```

```javascript
var ejs = require('ejs');
var template = '<%=: weight | replace: 'kilogram', 'kg' %>';
var context = {weight: '40 kilogram'};
console.log(ejs.render(template, context));
```

__ソートを行うフィルタ__

```javascript
var ejs = require('ejs');
var template = '<%=: movies | sort | first %>';
var context = { 'movies': [
  'Bumbi', 'Babe: Pig in the city', 'Enter the void'
]};
console.log(ejs.render(template, context));
```

```javascript
// 名前でフィルタ
var ejs = require('ejs');
var template = '<%=: movies | sort_by:'name' | first | get:'name' %>';
var context = { 'moveis': [
  {name: 'Babe: pig in the city'},
  {name: 'Bambi'},
  {name: 'Enter the void'}
]};
console.log(ejs.render(template, context));
```

__mapフィルタ__

```javascript
// <%=: movies | map:'name' | sort | first %>
```

__カスタムフィルタ__

```javascript
var ejs = require('ejs');
var template = '<%=: price * 1.145 | round:2 %>';
var context = {price: 21};

// ejs.fitlers オブジェクトに round 関数を定義
ejs.filters.round = function(number, decimalPlace) {
  // 第1引数は、入力値か、コンテクストか、1つ前のフィルタの結果
  number = isNaN(number) ? 0 : number;
  decimalPlaces = !decimalPlaces ? 0 : decimalPlace;
  var multiple = Math.pow(10, decimalPlaces);
  return Math.round(number * multiple) / multiple;
};

console.log(ejs.render(template, context));
```

### あなたのアプリケーションにEJSを統合する

```javascript
// app.js
var ejs = require('ejs');
var fs = reqiure('fs');
var http = require('http');
var filename = './template/students.ejs';// テンプレートファイルの置き場所

var students = [
  {name: 'Rick LaRue', age: 23},
  {name: 'Sarah Cathands', age: 25},
  {name: 'Bob Dabbs', age: 37}
];

// HTTPサーバーを作成
var server = http.createServer(function(req, res) {
  if (req.url == '/') {
    // ファイルからテンプレートを読む
    fs.readFile(filename, function(err, data) {
      var template = data.toString();
      var context = { students: students };
      var output = ejs.render(template, context); // テンプレートのレンダリング
      res.setHeader('Content-type', 'text/html');
      res.end(output);// HTTP応答を送信
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(8000);
```

```html
// template/students.ejs
<% if (students.length) { %>
  <ul>
    <% students.forEach(function(student) { %>
    <li><%= student.name %> (<%= student.age %>)</li>
    <% }) %>
  </ul>
<% } %>
```

__EJSテンプレートをキャッシュする__

EJSには、オプションとしてテンプレート関数をメモリ内にキャッシングするサポート機能がある。

```javascript
var cache = process.env.NODE_ENV === 'production';
var output = ejs.render(
  template,
  {student : student, cache : cache, filename: filename}
);
```

### クライアントサイドアプリケーションでEJSを使う

__EJSエンジンをダウンロード__

```bash
$ cd /your/working/directory
$ curl https://raw.github.com/visionmedia/ejs/master/ejs.js -o ejs.js
```

```html
<html>
  <head>
    <title>EJS example</title>
    <script src="ejs.js"></script>
    <script src="jquery.js"></script>
  </head>
  <body>
    <div id="output"></div>
    <!-- // レンダリングしたテンプレートを出力するプレースホルダー -->

    <script>
      var template = '<%= message %>';
      var context = {message: 'Hello templete'};

      $(document).ready(function() {
        $('#output').html(
          ejs.render(template, context)
        );
      });
    </script>
  </body>
</html>
```
