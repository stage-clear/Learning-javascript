# DOMとブラウザのパターン

## 8.1 関心の分離

- __コンテンツ__ - HTMLドキュメント
- __プレゼンテーション__ - ドキュメントの見え方を指定するCSSスタイル
- __振る舞い__ - ユーザ操作とドキュメントでの動的変更を処理する JavaScript

この3つの関心事をできるだけ分離しておけば、アプリケーションの配信先を、テキストのみのブラウザ、身体障害者のための支援技術、モバイルデバイスなど、多様なユーザエージェントに拡大できます。
__関心の分離__ (separation of concerns) は __段階的強化__ (progressive enhancement) とも密接な関係にあります。

関心の分離は実践的には以下の意味になります。

- CSSを無効にしてもページが使用できるか、コンテンツが読めるか、テストする
- JavaScript を無効にしてもページの目的が達成されるか、リンクが動作するか（`href="#"` が存在しないか）フォームが適切に送信されるか、テストする
- イベントハンドラ（`onclick` など）や style 属性はコンテンツの層にあるべきでないのでインラインで使わない
- ヘッダやリストなど意味的に正しい HTML 要素を使う

JavaScript の層は控えめであるべきです。ユーザを邪魔してはいけません。

__機能の検出__

```js
// アンチパターン
if (navigator.userAgent.indexOf('MSIE') !== -1) {
  document.attachEvent('onclick', console.log);
}

// より良いやり方
if (document.attachEvent) {
  document.attachEvent('onclick', console.log);
}

// より限定したやり方
if (typeof document.attachEvent !== 'function') {
  document.attachEvent('onclick', console.log);
}
```

## 8.2 DOMスクリプティング

### 8.2.1 DOMアクセス

DOMアクセスは必要最小限まで減らすべき、というのが結論です。これは以下のことを意味します。

- DOMアクセスのループを避ける
- DOM参照をローカル変数に代入し、そのローカル変数で作業する
- 可能ならばセレクタAPIを使う
- HTML コレクションをハンプス処理するときは `length` をキャッシュする

```js
// アンチパターン
for (var i = 0; i < 100; i += 1) {
  document.getElementById('result').innerHTML += i + ', ';
}

// より良いやり方: ローカル変数を更新する
var i, content = '';
for (i = 0; i < 100; i += 1) {
  content += i + ', ';
}
document.getElementById('result').innerHTML += content;
```

次のコードでは、2番目のやり方は、1行多く、変数も多いですが、こちらの方が優れています

```js
// アンチパターン
var padding = document.getElementById('result').style.padding,
    margin  = document.getElementById('result').style.margin;

// より良いやり方
var style   = document.getElementById('result').style,
    padding = style.padding,
    margin  = style.margin;
```

### 8.2.2 DOM操作

DOMの更新はできるだけ減らすのが大原則です。変更をひとつにまとめて、生のドキュメントの外側で実行すべきです。

```js
// アンチパターン
// ノードを作成するたびに追加する
var p, t;
p = document.createElement('p');
t = document.createTextNode('first paragraph');
p.appendChild(t);
document.body.appendChild(p); // <-

p = document.createElement('p');
t = document.createTextNode('second paragraph');
p.appendChild(t);
document.body.appendChild(p); // <-
```

ドキュメント断片を使う

```js
var p, t, frag;

frag = document.createDocumentFragment();

p = document.createElement('p');
t = document.createTextNode('first paragraph');
p.appendChild(t);
frag.appendChild(p);

p = document.createElement('p');
t = document.createTextNode('second paragraph');
p.appendChild(t);
frag.appendChild(p);

document.body.appendChild(frag); // <-
```

ドキュメント断片は、既存のツリーの一部を更新するときには、変更をひとつにまとめることもできます。

```js
var oldnode = document.getElementById('result'),
    clone = oldnode.cloneNode(true);

// クローンで作業する...

// 作業が完了したら:
oldnode.parentNode.replaceChild(clone, oldnode);
```

## 8.3 イベント

### 8.3.1 イベント処理

```html
<button id="clickme">Click me: 0</button>
```

```js
var b = document.getElementById('clickme');
if (document.addEventListener) { // W3C
  b.addEventListener('click', myHandler, false);
} else if (document.attachEvent) { // IE
  b.attachEvent('onclick', myHandler);
} else { // 最後の手段
  b.onclick = myHandler;
}
```

それぞれのボタンのノードへの参照とカウンタの値を保持するのは効率が悪いので、クリック時にイベントオブジェクトを作成して、そこから情報を取得できるようにします

```js
function myHandler(e) {
  var src, parts;

  // イベントの発生元の要素を取得
  e = e || window.event;
  src = e.target || e.srcElement;

  // 実作業: ラベルを更新
  parts = src.innerHTML.split(': ');
  parts[1] = parseInt(parts[1], 10) + 1;
  src.innerHTML = parts[0] + ': ' + parts[1];

  // 伝搬させない
  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
  }
  if (typeof e.cancelBubble !== 'undefined') {
    e.cancelBubble = true;
  }

  // デフォルトの動作を抑止する
  if (typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (typeof e.returnValue !== 'undefined') {
    e.returnValue = false;
  }
}
```

### 8.3.2 イベントの委譲

```html
<div id="click-wrap">
  <button>Click me: 0</button>
  <button>Click me too: 0</button>
  <button>Click me three: 0</button>
</div>
```

ボタンごとにリスナを結びつけるかわりに、`div` にリスナを結びつけて、クリックを覆います

```js
function myHandler() {
  // ...
  //
  e = e || window.event;
  src = e.target || e.srcElement;

  if (src.nodeName.toLowerCase() !== 'button') {
    return;
  }
  // ...
}
```

イベント委譲の欠点は、コンテナ内で発生する関心のないイベントを除外するために少しコードが増える点です。しかし、性能とコードがきれいになる利点が欠点を大幅に上回るので、推奨されるパターンです。


## 8.4 実行時間が長いスクリプト

JavaScript にはスレッドはありませんが、`setTimeout()` を使えばブラウザでシミュレートできます。また、最新のブラウザにはウェブワーカー(Web Worker)の機能があります。

### 8.4.1 `setTimeout()`

### 8.4.2 ウェブワーカー

```js
var ww = new Worker('my_web_worker.js');
ww.onmessage = function(event) {
  document.body.innerHTML +=
    '<p>message from the background thread: '+ event.data +'</p>';
};
```

```js
// my_web_worker.js

var end = 1e8, tmp = 1;

postMessage('hello there');

while (end) {
  end -= 1;
  tmp += end;
  if (end === 5e7) { // 5e7 は 1e8 の半分
    postMessage('halfway there, `tmp` is now ' + tmp);
  }
}

postMessage('all done');
```

## 8.5 リモートスクリプティング

### 8.5.1 XMLHttpRequest

`XMLHttpRequest` はほとんどのブラウザで利用できる特別なオブジェクト（コンストラクタ関数）です。

1. XMLHttpRequest オブジェクト（XHRと呼ばれます）を準備する
2. リクエストオブジェクトの状態が変わったとき、その通知を受けるコールバック関数を提供する
3. リクエストを送信する

```js
var i;
var xhr;
var activeXids = [
  'MSXML2.XMLHTTP.3.0',
  'MSXML2.XMLHTTP',
  'Microsoft.XMLHTTP'
];

if (typeof XMLHttpRequest === 'function') { // ネイティブのXHR
  xhr = new XMLHttpRequest();
} else { // IEバージョン7以前
  for (i = 0; i < activeXids.length; i += 1) {
    try {
      xhr = new ActiveXObject(activeXids[i]);
      break;
    } catch (e) {}
  }
}

xhr.onreadystatchange = function() {
  if (xhr.readyState !== 4) {
    return false;
  }
  if (xhr.status !== 200) {
    alert('Error, status code: ' + xhr.status);
    return false;
  }
  document.body.innerHTML += '<pre>' + xhr.responseText + '<\/pre>';
};

xhr.open('GET', 'page.html', true);
xhr.send('');
```

### 8.5.2 JSONP

XMRリエクストのレスポンスは、どのような種類のドキュメントでも構いません

- XMLドキュメント
- HTML断片
- JSONデータ
- テキストファイル、その他

```
http://example.org/getdata.php?callback=myHandler
```

`getdata.php` はページでもスクリプトでも構いません。
このURLを動的に代入します。

```js
var script = document.createElement('script');
script.url = url;
document.body.appendChild(script);
```

#### 8.5.2.1 JSONPの例: 三目並べ

```js
var ttt = {
  // 指定済みの升
  played: [],

  // 簡略メソッド
  get: function(id) {
    return document.getElementById(id);
  }

  // クリックの処理
  setup: function() {
    this.get('new').onclick = this.newGame;
    this.get('server').onclick = this.remoteRequest;
  },

  // 升をクリア
  newGame: function() {
    var tds = document.getElementsByTagName('td'),
        max = tds.length,
        i;
    for (i = 0; i < max; i += 1) {
      tds[i].innerHTML = '&nbsp;';
    }
    ttt.played = [];
  },

  // リクエストを実行
  remoteRequest: function() {
    var script = document.createElement('script');
    script.src = 'server.php?callback=ttt.serverPlay&played=' + ttt.played.join(',');
    document.body.appendChild(script);
  },

  // サーバの番に対応するコールバック
  serverPlay: function(data) {
    if (data.error) {
      alert(data.error);
      return;
    }
    data = parseInt(data, 10);
    this.played.push(data);

    this.get('cell-' + data).innerHTML = '<span class="server">X<\/span>';

    setTimeout(function() {
      ttt.clientPlay();
    }, 300); // 間を持たせて、考えているようにします
  },

  // クライアントの番
  clientPlay: function() {
    var data = 5;
    if (this.played.length === 9) {
      alert('Game over');
      return;
    }

    // 空の升が見つかるまで
    // 1から9の間の値をランダムに取得
    while (this.get('cell-' + data).innerHTML !== '&nbsp;') {
      data = Math.ceil(Math.random() * 9);
    }
    this.get('cell-' + data).innerHTML = '0';
    this.played.push(data);
  }
};
```


### 8.5.3 フレームと画像ビーコン

## 8.6 JavaScript の配備

### 8.6.1 スクリプトをまとめる

スクリプトファイルをまとめてバンドルすれば、ページの読み込みを著しく高速化できます。

スクリプトをまとめてしまうと欠点もあります

- リリース前の作業が増えてしまいますが、コマンドラインで自動化することもできます。`$ cat jquery.js jquery.quickselect.js jquery.limit.js > all.js`
- ブラウザキャッシュの利点がなくなります。
- バンドルの名前を工夫する必要があります。日付を使うか、ファイルの内容のハッシュ値を使います。


### 8.6.2 ミニファイする、あるいは圧縮する

gzip圧縮の設定 `.htacess`

```
AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json
```

### 8.6.3 Expires ヘッダ

ブラウザキャッシュの有効期限の設定 `.htaccess`

```
ExpiresAction On
ExpiresByType application/x-javascript "access plus 10 years"
```

ファイルの内容を変更したいときファイル名も変える必要があるのは欠点ですが、ファイルをバンドルにまとめる際に命名作法に従っていれば問題にはなりません

### 8.6.4 CDNを使う


## 8.7 読み込みのための戦略

## 8.7.1 script 要素をどこに書くか

ブロッキングの不具合を最小にするには、script 要素をページの終わり近く、`</body>` タグの直前に書きます


### 8.7.2 HTTPのチャンク形式

### 8.7.3 script 要素を動的にしてダウンロードのブロッキングを回避する

```js
var script = document.createElement('script');
script.src = 'all.js';
document.documentElement.firstChild.appendChild(script);
```

想定しているオブジェクトの未定義を解決するため、インラインスクリプトを格納する配列を定義。

```js
var mynamespace = {
  inline_scripts: []
};
```

関数を `inline_scripts` 配列に追加する

```html
// これを
// <script>console.log('I am inline');</script>

// このように変更します
<script>
mynamespace.inline_scripts.push(function() {
  console.log('I am inline');
});
</script>
```

最後に、メインスクリプトのループで配列を処理します。

```js
var i,
    scripts = mynamespace.inline_scripts,
    max = scripts.length;
for (i = 0; i < max; i += 1) {
  scripts[i]();
}
```

#### 8.7.3.1 script 要素を追加する

```js
// documentElement を使って追加
// documentElement は <html> であり、最初の子は <head> になります
document.documentElement.firstChild.appendChild(script);

// これは次のように書き換えられます
document.getElementsByTagName('head')[0].appendChild(script);

// document.body であれば、<head> や <body> が存在しなくても動作します
document.body.appendChild(script);
```

スクリプトが実行されるページに常に存在するタグがひとつあります。
それは `scirpt` タグです。この事実を利用して、ページで利用できる最初の script 要素で `insertBefore()` を実行します

```js
var first_script = document.getElementsByTagName('script')[0];
first_script.parentNode.insertBefore(script, first_script);
```

### 8.7.4 遅延読み込み

遅延読み込みとは、ページの `load` イベントが発生した後に外部ファイルを読み込むことを言います。
コードのバンドルが大きい場合、これを以下の2つに分割すると良いでしょう

- ページを初期化し、UI要素にイベントハンドラを結びつけるのに必要なコード
- ユーザの操作やその他の状況に応じて必要になるコード

```html
<script src="all.js"></script>
<script>
window.onload = function() {
  var script = document.createElement('script');
  script.src = 'lazy.js' ;
  document.documentElement.firstChild.appendChild(script);
};
</script>
```

### 8.7.5 オンデマンドで読み込む

- ロードオンデマンドパターン

```js
require('extra.js', function() {
  functionDefinedExtraJS();
});
```

`require()` の実装

```js
function require(file, callback) {
  var script = document.getElementsByTagName('script')[0];
  var newjs = document.createElement('script');

  // IE
  newjs.onreadystatechange = fucntion() {
    if (newjs.readyState === 'loaded' || newjs.readyState === 'complete') {
      newjs.onreadystatechange = null;
      callback();
    }
  };

  // IE以外
  mewjs.onload = function() {
    callback();
  };

  newjs.src = file;
  script.parentNode.insertBefore(newjs, script);
}
```


### 8.7.6 JavaScript を事前に読み込む

現在のページでは必要ないけれども、後に続くページで必要になるスクリプトも読み込むことができます。

構文解析と実行を行わずスクリプトを読み込むことは可能です。CSSと画像に対しても適用できます

```js
// IEの場合
// 画像ビーコンパターンでリクエストすることができます
new Image().src = 'preloadme.js';

// 他のブラウザの場合
// <script>  のかわりに <object> を使い data 属性にURLを指定します
var obj = document.createElement('object');
obj.data = 'preloadme.js';
document.body.appendChild(obj);
```

```js
var prelaod;
if (/*@cc_on!@*/false) { // 条件付きコメントでIEかどうかを判別します
  preload = function(file) {
    new Image().src = file;
  }
} else {
  preload = function() {
    var obj = document.createElement('object');
    var body = document.body;
    obj.width = 0;
    obj.height = 0;
    obj.data = file;
    body.appendChild(obj);
  };
}

// test
preload('my_web_worker.js');
```

このパターンの欠点はユーザエージェントの判別が行われる点ですが、これは避けれらません。

__条件付きコメントを使った IEの判別__

```js
var isIE = /*@cc_on!@*/false;
// 条件付きコメントの中に否定の ! があるので、IEからは
// 以下のように見えます
var isIE = !false; // => true
// そのたのブラウザはコメントを無視するので false に設定されます
```

## 8.8 まとめ
