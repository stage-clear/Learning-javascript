テンプレートリテラル
====================

文字列を定義する新しいリテラルとしてテンプレートリテラルが導入された。

- テンプレートリテラルはバッククオート(`)で囲む
- テンプレートリテラルの中で ${} で囲んだ箇所には任意の式が書ける
- テンプレートリテラルでは、改行を含む複数行の文字列をそのまま記述できる
  (*インデントも含まれる)


変数埋め込み
------------

```javascript
let name = 'foo';
let myMsg = `Hello ${name}`;
console.log(myMsg);

let age = 10;
console.log(`I am ${age + 10} years old`);
```


複数行文字列
------------

```javascript
let myMsg = `In ES6 multi line
  is so easy to create.`

console.log(myMsg);
```


タグ付きテンプレート
--------------------
テンプレートタグとよばれる関数を使って、テンプレートリテラルを変換する

```javascript
var name = 'Bob <script>';
// タグ付きテンプレート
console.log(html`<p>Hello, ${name}</p>`);

// タグ関数
function html(templates, ...values) {
  var result = '';
  for (let i=0; i < templates.length; i++) {
    if (i < values.length) {
      // 変数をHTMLエスケープ
      result += escapeHtml(values[i]);
    }
  }
  return result;

  function escapeHtml(t) {
    return t.replace(/</g, '&lgt;').replace(/>/g,'&gt;');
  }
}
```

その他サンプル
--------------

__式の展開__

```js
let str = `今月: ${(new Date).getMonth() + 1 }月`
console.log(str);
```

__ブログ記事用のHTMLを展開する例__  

```js
let data = {
  title: '<探検>!ECMAScript',
  author: '佐藤鈴木&田中',
  tags: ['HTML', 'JavaScript', 'CSS'],
  links: [
    {
      title: 'Mozilla Developer Network',
      href: 'https://developer.mozilla.org/ja/'
    },
    {
      title: 'Web Hypertext Application Technology Working Group',
      href: 'https://whatwg.org/'
    }
  ],
  entryBody: '<p>This is a blog post!</p>'
};

// HTML の特殊文字を実態参照にするタグ
function htmlEscape(strings, ...values) {
  let handleString = (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/>/g, '&gt;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/`/g, '&#096;');
  };

  let res = '';

  for (let i = 0, l = strings.length; i < l; i+=1) {
    res += handleString(strings[i]);

    if (i < values.length) {
      res += handleString(values[i]);
    }
  }
  return res;
}

let html = `
  <section class="entry">
    <header>
      <h1>${htmlEscape`${data.title}`}</h1>
      <div class="author">
        Author: ${htmlEscape `${data.author}`}
      </div>
      <div class="tags">
        ${data.tags.map(tag => `<li>${tag}</li>`)}
      </div>
    </header>
    ${data.entryBody}
    <hr>
    <dl>
      ${data.links.map(link => `<dd><a href="${link.href}">${link.title}</a></dd>`)}
    </dl>
  </section>
`;

console.log(html);
```


参考
-----

- [JavaScriptで文字列処理を簡潔にするTemplate literal](https://html5experts.jp/takazudo/17396/)

