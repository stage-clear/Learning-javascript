Hogan.js
========

- Hogan.js は、Twitter社が twitter のテンプレートのために開発した
- Hogan は、テンプレート言語として人気の高い、Mustache(マスタシュ) のコンパイラ
- 最小限のテンプレーティングで、ロジックレス


### テンプレートの作成

__インストール__

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
