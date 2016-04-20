# Webアプリケーションでテンプレートを使う

## EJS (Embedded JavaScript)

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


## Hogan

- Hogan.js は、Twitter社が twitter のテンプレートのために開発した
- Hogan は、テンプレート言語として人気の高い、Mustache(マスタシュ) のコンパイラ
- 最小限のテンプレーティングで、ロジックレス

### テンプレートの作成

Hoganのインストール
```bash
$ npm install hogan.js
```

### Mustache のタグ

__単純な値を表示する__

Mustache テンプレートの中でコンテクストの値を表示するには、値の名前をダブルブレース({{ と }})で囲む。

```
{{ name }}

// エスケープなしの場合
{{{ name }}} もしくは {{& name }}

// コメント
{{! This is Comment }}
```

__セクション: 複数の値をループ処理する__

```javascript
var context = {
  students: [
    {name: 'Jane Narwhal', age: 21 },
    {name: 'Rick LaRue', age: 26 }
  ]
};
```

```html
{{#students}}
  <p>Name: {{ name }}, Age: {{ age }} years old</p>
{{/students}}
```

__逆セクション: 値がないときに使うHTML__

```html
{{^students}}
  <p>No students found.</p>
{{/students}}
```

__セクションラムダ: セクションブロック内のカスタム関数__

```javascript
var hogan = require('hogan.js');
var md = require('github-flavored-markdown');

var template = '{{#markdown}}'
             + '**Name**: {{name}}'
             + '{{/markdown}}';

var context = {
  name: 'Rick LaRue' ,
  markdown: function() {
    return function(text) {
      return md.parse(text);
    };
  }
};

var template = hogan.compile(template);
console.log(template.render(context));
```

__パーシャル: テンプレートを他のテンプレートで再利用する__

```javascript
var hogan = require('hogan.js');

// パーシャルテンプレート
var studentTemplate = '<p>Name: {{name}}, '
                    + 'Age: {{age}} years old</p>';

// メインのテンプレート
var mainTemplate = '{{#students}}'
                 + '{{>student}}' // ここでパーシャルを展開
                 + '{{/students}}';

var context = {
  students: [{
    name: 'Jane Narwhal',
    age: 21
  }, {
    name: 'Rick Larue',
    age: 26
  }]
}

// メインテンプレートをコンパイル
var template = hogan.compile(mainTemplate);
// パーシャルテンプレートもコンパイル
var partial = hogan.compile(studentTemplate);

// メインとパーシャルのテンプレートをレンダリングする
var html = template.render(context, {student: partial});
console.log(html);
```

__Hogan を微調整する__

```javascript
// デリミタの変更
hogan.compile(text, {delimiters: '<% %>'});
```

```javascript
// Hogan でセクションタグをカスタマイズする
var template = hogan.compile(
  template,
  // カスタムタグのオープンとクローズを定義
  { sectionTag: [{o: '_markdown', c: 'markdown'}]}
);
```


## Jade

- Jade は、HTMLを指定する方法が独特
- Jade では、スペースに意味がある
- Jade はHTMLタグのネストを表現するのに、インデントを使う
- HTMLタグを明示的に閉じる必要がないので、タグの閉じ忘れや、間違った位置で閉じてしまうという問題が排除されるという利点がある
- インデントを使うことにより、見通しがよくなり、保守が容易になる


```bash
$ npm install jade

# cli を使う場合
$ npm install -g jade
```

### Jade の基本

```jade
# 1つのdiv要素に content クラスと sidebar クラスを割り当てる
div.content.sidebar

# IDを割り当てる
div.content.sidebar#featured_content

# div タグの略記法 (div は略すことができる)
.content.sidebar#featured_content
```

__タグ属性を設定する__

```jade
a(href="http://nodejs.org", target="_blank")

# 2行になってもよい
a(href="http://nodejs.org",
  target="_blank")

# 値を必要としない属性
strong Select your favorite food:
form
  select
    option(value="cheese") Cheese
    option(value="Tofu", selected) Tofu
```

__タグの内容を設定する__

```jade
# Jade ではタグ内容の継続を | 記号で指定できる
textarea
| This is some defalut text
| that the user should be
| provided with.
# これらの行は Jade によって連結される

# style タグや script タグのようにテキストだけを受け付けるタグであれば
# | 記号を省略できる
style
  h1 {
    font-size: 6em;
    color: #9dff0c;
  }
```

__ブロック拡張でテンプレートを拡張する__

```jade
# 通常
ul
  li
    a(href="http://nodejs.org") Node.js homepage
  li
    a(href="http://npmjs.org/") NPM homepage
  li
    a(href="http://nodebits.org") Nodebits blog


# ブロック拡張
# タグの後にコロン(:)を置いてネストを表現する
ul
  li: a(href="http://nodejs.org") Node.js Homepage
  li: a(href="http://npmjs.org") NPM Homepage
  li: a(href="http://nodebits.org") Nodebits blog
```

__Jadeテンプレートにデータを供給する__

```javascript
var jade = require('jade');
var template = 'strong #{message}';
var context = { message: 'Hello template!' };

var fn = jade.compile(template);
console.log(fn(context));
```

```javascript
// 属性値を渡す
// <a href="http://google.com"></a> とレンダリングする
var jade = require('jade');
var template = 'a(href = url)';
var context = {url: 'http://google.com'};

var fn = jade.compile(template);
console.log(fn(context));
```

### Jade テンプレート内のロジック

- Jade では、テンプレートに JavaScript のコード行を直接埋め込むことができる

```jade
# sample
h3.contact-header My Contacts

if contacts.length
  each contact in contacts
    - var fullName = contact.firstName + ' ' + contact.lastName
    .contact-blx
      p fullName
      if contact.isEdiatable
        p: a(href="/edit/+contact.id") Edit Record
      p
        case contact.status
          when 'Active'
            strong User is active in the system
          when 'Inactive'
            em User is inactive
          when 'Pending'
            | User has a pending invitation
eles
  p You currently do not have any contacts
```

__Jade テンプレートで JavaScript を使う__

jade に JavaScript を埋め込むのに使うプリフィックス

| pre | output     |
|:---:|:-----------|
|  =  | escape     |
| !=  | not escape |
|  -  | none       |

jade で使われるステートメント
if、else if、else、case、when、default、until、while、each、unless
これらはプリフィックスなしで書くことができる
(出力は持たない)

```jade
- var count = 0
count = 0
```

__オブジェクトと配列の反復処理__

```javascript
var jade = require('jade');
var fs = require('fs');
var template = fs.readFileSync('./template.jade');
var context = { messages: [ // message配列
  'You have logged in successfully.',
  'Welcome back!'
]};

var fn = jade.compile(template);
console.log(fn(context));
```

```jade
- message.forEach(function(message) {
  p= message
- })
```

```jade
# each を使った例
each message in messages
  div
    strong #{key}
    p value


# オブジェクトのプロパティをループする処理
each value, key in post
  div
    strong #{key}
    p value
```

__条件付きレンダリングを行うテンプレートコード__

```jade
- var n = Math.round(Math.random() * 1) + 1
- if (n == 1) {
    script
      alert('You win!');
- }

# もう1つの構文で条件文を書くこともできる
- var n = Math.round(Math.random() * 1) + 1
  if n == 1
    script
      alert('You win!');

# n != 1 のような条件を書くには unless を使える
- var n = Math.round(Math.random() * 1) + 1
  unless n == 1 // n == 1 でなければ実行
    script
      alert('You Win!');
```

__Jade の case 文を使う__

case 文は、switch に似たもの

```jade
# ブログをサーチした結果、
# 何もなければ、そのことを示すメッセージ
# 1つのポストが見つかったら、その詳細を表示
# 複数のポストが見つかったら、 each でループ処理

case results.length
  when 0
    p No results found.
  when 1
    p= results[0].content
  default
    each result in results
      p= result.title
```

### Jade テンプレートを組織化する

アプリケーションのロジックと同じく、テンプレートファイルも大きくしすぎてはいけない。
1つのテンプレートファイルは、1つの概念(ページや、サイドバーや、ブログのポストなど)を表現するビルディングブロック(構成部品)にすべき。

__テンプレート継承で複数のテンプレートを組織化する__

```jade
# layout.jade
html
  head
    block title
  body
    block content
```

```jade
# page.jade
extend layout // このテンプレートは layout テンプレートを拡張する

block title
  title Messages

block content
  each message in messages
    p= message
```

__ブロックの前置/後置を使ってレイアウトを実装する__

```jade
# layout.jade
html
  head
    block title
    block scripts
      script(src="jquery.js")
  body
    block content
```

```jade
# page.jade
extends layout

baseUrl = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/'

block title
  title Messages

block style
  link(rel="stylesheet", href= baseUrl + "themes/flic/jquery-ui.css")

block append scripts
  script(src= baseUrl + "jquery-ui.js")

block content
  count = 0
  each message in messages
    - count = count + 1
    script
      $(function() {
        $('#message_#{count}').dialog({
          height: 140,
          modal: true
        });
      });
    != '<div id="message_'+ count +'">' + message + '</div>'
```

__テンプレートをインクルードする__

```jade
html
  head
    block title
    block style
    block scripts
      script(src="jquery.js")
  body
    block content
    include footer
# 拡張子を指定すれば Jade 以外のファイルもインクルードできる
# 例) include twitter_widget.html
```

__ミックスインでテンプレートのロジックを再利用する__

```javascript
var students = [
  {name: 'Rick LaRue', age: 23},
  {name: 'Sarah Cathands', age: 25},
  {name: 'Bob Dobbs', age: 37}
];
```

```
# mixin
mixin list_object_property(objects, property)
  ul
    each object in objects
      li= object[property]
```

```jade
# layout.jade
mixin list_object_property(students, 'name')
```

### まとめ

- [その他のエンジンについて](https://npmjs.org/browse/keyword/template)
- [Handlebars.js](https://github.com/wycats/handlebars.js)
- [Dustjs](https://github.com/akdubya/dustjs)
- [consolidate.js](https://github.com/visionmedia/consolidate.js)
- [Plates](https://github.com/flatiron/plates)
- [Stylus](https://github.com/LearnBoost/stylus)
