# DOM を扱う
p5.js でも p5.dom.js を利用することで DOM を扱うことができます

## 11.1 HTML の要素を追加する

```js
// HelloDOM
function setup() {
  noCanvas();
  createDiv('Heloo, <strong>DOM!</strong>'); // DIVタグを追加する
  // <body></body> の間に追加される
}

function draw() {
  
}
```

- `createDiv(html)`
- `createP(html)`
- `createSpan(html)`
- `createElement(tag, [content])`


## 11.2 タグの属性を扱う

```js
// AddAttribute
function setup() {
  noCanvas();
  var msg1 = createDiv('時は準宝石の螺旋のように');
  msg1.style('color', '#ff0000'); // style 属性を追加
  
  var msg2 = createDiv('ラルフ124C41+');
  msg2.class('message'); // class を指定
}
```

```js
// attribute
function setup() {
  noCanvas();
  var msg1 = createDiv('段落1');
  msg1.style('color', '#ff0000');
  
  var msg2 = createDiv('段落2');
  msg2.attribute('align', 'center'); // align 属性を追加
  
  var style = msg1.attribute('style'); // msg1 の style 属性をよみ出し
  msg2.attribute('style', style);
}
```


__属性を扱う関数__

- `id(id)`
- `class(class)`
- `addClass(class)`
- `removeClass(class)`
- `position([x], [y])`
- `translate(x, y, [z], [perspective])`
- `rotate(x, [y], [z])`
- `style(property, [value])`
- `attribute(attr, [value])`
- `value([value])`
- `show()`
- `hide()`
- `size([w], [h])`


## 11.3 HTML を操作する
追加したり変更したりする方法


```js
// HelloDOM2
function setup() {
  noCanvas();
  var msg = createDiv('');  // 空の div 要素を作る
  msg.id('greeting');
  
  var hello = createSpan('Hello, '); // span 要素を作る
  msg.child(hello); // hello を msg 要素の子要素にする
  
  var dom = createSpan('<b>DOM!</b>'); // span 要素を作る
  dom.style('color', '#ff0000'); // color 属性を指定する
  dom.parent('greeting'); // msg を dom の親要素にする
}

// ..
```

__HTMLの構造を操作する `p5.Element` の関数__

- `parent(parent)` - 指定した要素を親要素にする
- `child(child)` - 指定した要素をオブジェクトの子要素にする
- `remove()` - オブジェクトを削除する


```js
/**
 * removeElement()
 * p5.js で生成したすべての要素を削除する。ただし、canvas と graphics を除く
 * 
 */
```


## 11.4 HTML を動的に操作する

```js
// Select
var titles; // 要素を保持する変数
var no, pno;

function setup() {
  noCanvas();
  createDiv('段落1').class('title').hide(); // div要素を作成し、クラスをつけ不可視にする
  createDiv('段落2').class('title').hide();
  createDiv('段落3').class('title').hide();
  createDiv('段落4').class('title').hide();
  createDiv('段落5').class('title').hide();
  
  titles = selectAll('.title'); // 指定した class を持つ要素を集める
  no = 0;
  pno = 0;
  
  frameRate(1); // フレームレートを 1fps にする
}

function draw() {
  titles[pno].hide(); // 要素を見えなくする
  titles[no].show(); // 要素を見えるようにする
  pno = no;
  no = (no + 1) % titles.length;
}
```

```js
/**
 * selectAll(name)
 * name で指定したタグ名、あるいは class 名に一致する要素をすべて取得する
 * @param {String} name - 探す要素のタグ名、あるいはclass名
 * @param {Array} p5.Element オブジェクトの配列
 */

/**
 * select(name)
 * name で指定したタグ名、ID名、あるいは class 名に一致する要素を1つ取得する
 * @param {String} name - 探す要素のタグ名、ID名、class 名
 * @return {p5Element}
 */
```


## 11.5 外部サービスとの連携


### 11.5.1 Picasa の WebAPI

https://picasaweb.google.com/data/feed/api/all?kind=photo&q=[searchTerm]&alt=json-in-script
https://picasaweb.google.com/data/feed/api/all?kind=photo&q=cat&alt=json-in-script

```js
httpGet('https://picasaweb.google.com/data/feed/api/all', {
    'kind': 'photo',
    'q': serchTerm,
    'alt': 'json-in-script'
  },
  'jsonp',
  show_thumbnail
);
```


### 11.5.2 json-in-scipt と JSONP


### 11.5.3 サンプルプログラム

```js
// PhotoSearch

var search_text; // 検索テキスト用変数
var thumbnail_area; // サムネイルの表示領域変数

function setup() {
  var input_area, search;
  noCanvas();
  
  search_text = createInput(); // テキストの有力領域を作る
  search = createButton('search'); // 検索開始用ボタンを作る
  search.mouseClicked(go_search); // クリックされたときの関数を設定
  
  input_area = createDiv('').id('input_area'); // テキスト入力をまとめる div 要素を作る
  input_area.child(search_text); // 入力領域を子要素にする
  input_area.child(search); // ボタンを子要素にする
  
  thumbnail_area = createDiv('').id('thumbnail_area'); // サムネイルの表示領域
}

function draw() {
  
}

// search ボタンがクリックされたときの動作
function go_search() {
  var text = search_text.value(); // input 要素に入力されたテキストを読む
  
  if (thumbnail_area.html() !== '') {
    thumbnail_area.html(''); // サムネイルを消す
  }
  
  search_photos(text);
  search_text.value(); // テキスト入力を空にする
}

function search_photos(text) {
  httpGet('', {
      'kind': 'photo',
      'q': text,
      'alt': 'json-in-script'
    },
    'jsonp',
    show_thumbnail
  );
}

function show_thumbnail(response) {
  var photos = response.feed.entry; // 取得した写真の情報の配列
  
  // 写真が見つからない倍位は Not Found と表示する
  if (photos === undefined) {
    var msg = createSpan('Not Found');
    msg.parent(thumbnail_area);
    return ;
  }
  
  for (var i = 0 ; i < photos.length; i += 1) {
    // 写真のタイトルを取得
    var tl = photos[i].summary.$t !== '' ? tl = photos[i].summary.$t : tl = photos[i].title.$t;
    
    // 取得した写真の URL から img タグを作成し、サムネイルを作る
    var img = createImg(photos[i].content.src).size(100, 100).attribute('title', tl);
    // 写真を別ウィンドウで開くための a タグを作成
    var a = createA(photos[i].content.src, '', '_blank');
    a.child(img);
    a.parent(thumbnail_area);
  }
}
```


```js
/**
 * httpGet(path, [data], [datatype], [callback])
 * @param {String} path -
 * @param {Object} data
 * @param {String} datatype - "json"|"jsonp"|"xml"|"text" 
 * @param {Function} callback
 */


/**
 * httpPost(path, [data], [datatype], [callback])
 * @param {String} path
 * @param {Object} data
 * @param {String} datatype - 
 * @param {Function} callback
 */


/**
 * httpDo(path, [method], [data], [datatype], [callback])
 * @param {String} path
 * @param {String} method - "GET"|"POST"|"PUT"| 
 * @param {Object} data
 * @param {String} datatype - 
 * @param {Function} callback
 */
```

## 11.6 まとめ

