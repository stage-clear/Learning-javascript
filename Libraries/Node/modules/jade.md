Jade
====

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
