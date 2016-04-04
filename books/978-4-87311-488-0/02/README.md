# 必須パターン

## 2.1 保守しやすいコードを書く

時間が経過してからコードを再検討すると、以下のような時間がかかります。

- 問題を把握し理解するための時間
- 問題を解決できそうなコードを理解するための時間

保守しやすいコードとは、以下のようなコードです。

- 読みやすい
- 一貫性がある
- 見通しが良い
- 一人で書いたようなコードに見える
- ドキュメントが整備されている


## 2.2 グローバル変数の使用を最小にする

JavaScript は関数を使ってスコープを管理します。

### 2.2.1 グローバル変数を使う時の問題

グローバル変数の問題は、JavaScript アプリケーションやウェブページにあるすべてのコードでそれが共有されてしまう点です

- サードパテーィ製の JavaScript ライブラリ
- 広告パートナーが使用するスクリプト
- ユーザの行動を追跡し分析するサードパーティ製のスクリプト
- ウィジェット、バッジ、ボタン


__暗黙のグローバル: `var` を使った宣言で代入の連鎖を行う__

```js
// Bad!
// a はローカルだが b はグローバルとなる
function foo() {
  var a = b = 0;
  //...
}

// Good
function foo() {
  var a, b;
  a = b = 0; // どちらもローカル
}
```

### 2.2.2 `var` を忘れた時の副作用

- `var` を使って（関数の外部で）作られたグローバルは削除できません
- `var` を使わず（関数の内部かどうかは関係なく）作られた暗黙のグローバルは削除できま


### 2.2.3 グローバルオブジェクトへのアクセス

ブラウザ環境では、グローバルオブジェクトは `window` プロパティを介してコードのどこからでもアクセスできます

```js
// この方法を使えば、いつでもグローバルオブジェクトを取得できまし
var global = (function() {
  return this;
}());
```

### 2.2.4 単独 `var` パターン

関数の先頭で `var` 文をひとつにまとめるパターンは導入しやすいでしょう
以下の利点があります。

- その関数で必要なすべてのローカル変数が一目でわかるように1カ所にまとめてある
- 変数を定義する前にその変数を使用してしまう論理上のエラーを予防できる
- 宣言する変数を覚えるのに役立ち、そのためグローバルを最小にできる
- コードが少なくて済む

```js
function func() {
  var a = -1,
      b = 2,
      sum = a + b,
      i,
      j;

  // 関数の本体
}
```

### 2.2.5 巻き上げ:散乱した `var` の問題

JavaScript では、ひとつの関数の内部のどこにでも `var` 文を書けます


## 2.3 `for` ループ

```js
function looper() {
  var i = 0,
      max,
      myarray = [];

  for (i = 0; max = myarray.length; i < max; i++) {
    // myarray[i] に対して何か行う
  }
}
```

`for` のパターンに最適化を施したバリエーションが2つあります

- 変数の数を減らす
- 0 にカウントダウンする。配列の長さや0以外の値と比較するようり0と比較する方が効率が良くて高速です

```js
var i, myarray = [];

for (i = myarray.length; i--;) {
  // myarray[i] に対してなにか行う
}
```

```js
var array = [],
    i = myarray.length;

while (i--) {
  // myarray[i] に対して何か処理を行う
}
```

## 2.4 `for-in` ループ

`for-in` ループは配列以外のオブジェクトを繰り返し処理するときに使うべきです

__`hasOwnProperty` を使ってプロトタイプ連鎖からきたプロパティを除外する__

```js
var man = {
  hands: 2,
  legs: 2,
  heads: 1
};

if (typeof Object.prototype.clone === 'undefined') {
  Object.prototype.clone = function() {};
}

for (var i in man) {
  if (man.hasOwnProperty(i)) { // フィルタ
    console.log(i, ':', man[i]);
  }
}
```

`hasOwnProperty()` を使うもうひとつのパターンは、`Object.prototype` からのこのメソッドの呼び出しです

```js
for (var i in man) {
  if (Object.prototype.hasOwnProperty.call(man, i)) {
    console.log(i, ':', man[i]);
  }
}
```

```js
var i,
    hasOwn = Object.prototype.hasOwnProperty;

for (i in man) if(hasOwn.call(man, i)) { // フィルタ
  console.log(i, ':' ,man[i]);
}
```


## 2.5 組み込みプロトタイプを拡張（しない）

コンストラクタ関数の `prototype` プロパティを拡張するのは、機能を追加するための協力な方法ですが、場合によっては強力すぎることもあります

組み込みプロトタイプは拡張しない方がベストです。ただし以下の条件をすべて満たしていれば、この規則の例外が適用されます

1. 将来の ECMAScript のバージョンやJavaScript 実装では、この機能が組み込みメソッドとして整合性をもって実装されることが期待されます。たとえば、ブラウザがこれに追いつくのを待ちつつ ECMAScript 5 で記述されたメソッドを追加できます。この場合、一足先に便利なメソッドを定義するだけです。
2. カスタムのプロパティやメソッドが存在しないことが確認できていること。コードのどこかですでに実装されているかもしれませんし、対象となるブラウザのJavaScript エンジンにすでに実装されているかもしれません。
3. ドキュメントに明記し、この変更をチームに伝えてあること


## 2.6 `switch` パターン

```js
var inspect_me = 0;
    result = '';

switch(inspect_me) {
  case 0: 
    result = 'zero';
    break;
  case 1:
    result = 'one';
    break;
  case 2:
    result = 'two';
    break;
  default: 
    result = 'unknown';
    break;
}
```


## 2.7 暗黙の型変換を避ける

JavaScript では変数を比較するとき暗黙の方変換が行われます
暗黙の型変換によって生じる混乱を避けるため、比較する値と式の型の両方がチェックされるように `===` `!==` を必ず使いましょう


### `eval()` を避ける

コードの中で `eval()` が使われているのをみたら、「`eval()`はワル」という呪文を唱えましょう

`eval()` を使うとセキュリティの問題もあります。不正なコードが実行される危険があるからです。
文字列を `setInterval()` `setTimeout()` あるいは `Function()` コンストラクタに渡すのは、たいていの場合、`eval()` を使うのと同様なので、これも避けるべきです。

```js
// Bad!
setTimeout('myFunc()', 1000);
setTimeout('myFunc(1,2,3)', 1000);

// Good
setTimeout(myFunc, 1000);
setTimeout(function() {
  myFunc(1,2,3);
}, 1000);
```

`new Funciton()` というコンストラクタは `eval()` と同様なので、注意して使うべきです。

```js
console.log(typeof un);    // undefined
console.log(typeof deux);  // undefined
console.log(typeof trois); // undefined

var jsstring = 'var un = 1; console.log(un);';
eval(jsstring);// 1がログに表示される

jsstring = 'var deux = 2; console.log(deux);';
new Function(jsstring)(); // 2 がログに表示される

jsstring = 'var trois = 3; console.log(trois);';
(function() {
  eval(jsstring);
}()); // 3がログに表示される

console.log(typeof un);    // number
console.log(typeof deux);  // undefined
console.log(typeof trois); // undefined
```

`eval()` と `Function` のもうひとつの違いは、`eval()` がスコープの連鎖を妨害してしまうのに対して、`Function` は安全なサンドボックスの中に閉じている点です
どこで `Function` を実行しようと、そこからはグローバルスコープしか見えません。そのためローカル変数が汚染される可能性は低くなります。

`eval()`はその外部のスコープにある変数にアクセスし変更できてしまいますが、`Function` ではできません

```js
;(function() {
  var local = 1;
  eval('local = 3; console.log(local);'); // 3がログに表示される
  console.log(local); // 3が表示される
}());

;(function() {
  var local = 1;
  Function('console.log(typeof local);')(); // undefined がログに表示される
}());
```

## 2.8 `parseInt()` による数値変換

`parseInt()` を使うと文字列を数値に変換できます

```js
var month = '06',
    year = '09';
month = parseInt(month, 10);
year = parseInt(year, 10);

// 文字列を数値に変換する方法は他にもあります
+'08' // 結果は 8
Number('08'); // 8
```

## 2.9 コーディングの作法

### 2.9.1 インデント

インデントのないコードは読めたものではありません。
それよりもっと悪いのは、インデントに一貫性がないコードです。


### 2.9.2 波括弧

波括弧は、それが省略できる場合であっても必ず使うべきです。
文法上は `if` や `for` の中に文がひとつしかなければ、波括弧や要求されませんが、その場合でも使うべきです。
それによってコードの一貫性が高まり、更新が容易になります・

### 2.9.3 波括弧を開く位置

波括弧を開く位置も開発者は、同じ行にするか、次の行にするかにこだわるようです
結論として、常に波括弧を使いましょう。波括弧を開く位置は直前の文と同じ行にしましょう


### 2.9.4 空白

空白を適切に使うと、コードの読みやすさと一貫性が向上します。
空白を使うべき状況は以下の通りです。

- `for` ループの式を区切るセミコロンの後 `for (var i = 0; i < 10; i += 1) {}`
- `for` ループで複数の変数(`i` と `max`)を初期化しているとき `for (var i = 0, max = 10; i < max; i += 1) {}`
- 配列の要素を区切るカンマの後 `[1, 2, 3];`
- オブジェクトプロパティを区切るカンマの後。プロパティ名とその値を区切るコロンの後 `{a: 1, b: 2}`
- 関数の引数を区切る `myFunc(a, b, c)`
- 関数の波括弧の前 `function myFunc() {}`
- 無名関数の場合、`function` の後 `var myFunc = function() {};`
- 演算子とその演算対象の間 `a && b || c`


## 2.10 命名の作法

コードの見通しと保守性を向上させる方法には、命名の作法もあります。変数や関数の名前に一貫性を持たせることを意味します。

### 2.10.1 コンスラクタの頭文字は大文字にする

```js
var adam = new Person();

function MyConstructor() { ... }
function myFunction() { ... }
```

### 2.10.2 単語で分ける

一般的な作法としてキャメルケースを使うやり方があります。
コンストラクタの名前には `MyConstructor()` のようにお思いjキャルケースを、
関数やメソッドの名前には `myFunction()` `calcurateArea()` `getFirstName()` のように小文字キャメルケースを使います。

変数名には通常小文字キャメルケースが使われますが、すべて小文字にして単語の区切りをアンダースコアにするのも良いやり方です。
`favorite_bands` `old_company_name`  `first_name`


### 2.10.3 その他の命名パターン

命名の作法を使って言語の機能を補ったり置き換えることがあります。

```js
var PI = 3.14,
    MAX_WIDTH = 800;
```

定数と強豪してしまいますが、グローバル変数の名前に大文字を使う作法もあります。

JavaScript でもプライベートメンバは実装できますが、プライベートのメソッドやプロパティの先頭にアンダースコアを付加すれば、一目でそれとわかります。

```js
var person = {
  getName: function() {
    return this._getFirst() + ' ' + this._getLast();
  },
  _getFirst: function() {
    // ...
  },
  _getLast: function() {
    // ...
  }
};
```

以下に、_private の作法のバリエーションを示します

- アンダースコアが後置きされていればプライベートの意味(`_name` `getElements_()` など)
- アンダースコアを1個前置きしたら、`_protected` プロパティ、2個前置きしたら `__private` プロパティ
- Firefox では言語の一部ではないけれどもいくつか内部プロパティが利用できます。これらのプロパティは `__proto__` や `__parent__` のように、アンダースコア2個が前後に置かれています


## 2.11 コメントを書く

たとえあなた以外の誰も触らないとしても、コードにコメントを書くべきです。
問題に深く集中しているときは、コードが何をしているのか十分把握できていますが、一週間後にコードに戻ってみると、それがどのように動作するのか性格に思い出しづらくなります。

すべての行にコメントをつけるのは、やりすぎです。ただし、関数とその引数と戻り値、さらに興味深いアルゴリズムや変わったテクニックについてはドキュメントにしておく必要があります。


## 2.12 API のドキュメントを書く

API ドキュメントはコードのコメントから自動生成できます
[JSDoc Toolkit](https://code.google.com/p/jsdoc-toolkit/)

APIドキュメントを生成する手順は次の通りです。

- 特別にフォーマットしたコードのブロックを書く
- コードにコメントを解析するツールを実行する
- ツールの出力結果を公開する（HTMLページになることが多い）

覚える必要がある特別な構文は、以下のような十数個のタグだけです。

```js
/**
 * @tag 値
 */
```

```js
/**
 * 文字列を反転させる
 *
 * @param {string} 反転させたい文字列
 * @return {string} 反転されたもj亀裂
 */
var reverse = function() {
  // ...
  return output;
};
```

### 2.12.1 YUIDoc の例

YUIDoc はもともと YUI ライブラリのドキュメント化のために作られましたが、どんなプロジェクトでも使えます

```js
/**
 * JavaScript アプリケーション
 * 
 * @module myapp
 */
var MYAPP = {};
```

```js
/**
 * 数学ユーティリティ
 * @namespace MYAPP
 * @class math_stuff
 */
MYAPP.math_staff = {
  /**
   * 和を計算
   * 
   * @method sum
   * @param {Number} a 数値1
   * @param {Number} b 数値2
   * @return {Number} 2つの数の和
   */
  sum: function(a, b) {
    return a + b;
  },
  
  /**
   * 積を計算
   * 
   * @method multi
   * @param {Number} a 数値1
   * @param {Number} b 数値2
   * @return {Number} 2つの数の積
   */
  multi: function(a, b) {
    return a * b;
  }
}
```

|タグ|意味|
|:--|:--|
|`@namespace`|オブジェクトを包含するグローバル参照|
|`@class`|実はクラスではありません。オブジェクトあるいはコンストラクタ関数の意味で使われます|
|`@method`|オブジェクトのメソッドの名前を指定します|
|`@param`|関数が取る引数のリスト。パラメータの型は波括弧に書き、その後にパラメータの名前と説明を続けます|
|`@return`|`@param` と同様、メソッドの戻り値を説明します。名前の指定はありません|

```js
/**
 * Person オブジェクトの作成
 * @class Person
 * @constructor
 * @namespace MYAPP
 * @param {String} first ファーストネーム
 * @param {String} last ラストネーム
 */
MYAPP.Person = function(first, last) {
  /**
   * ファーストネーム
   * @property first_name
   * @type String
   */
  this.first_name = first;
  
  /**
   * ラストネーム
   * @property last_name
   * @type String
   */
  this.last_name = last;
};

/**
 * その人の名前を返す
 * 
 * @method getName
 * @return {String} 名前
 */
MYAPP.Person.prototype.getName = function() {
  return this.first_name + ' ' + this.last_name;
};
```


## 2.13 読み手を考えて書く

コードを書くときも同じです。集中して問題を解くとき、その答えは第一草稿と同じです。
読んで、理解して、保守して、更新するのが容易にできますか？コードを再検討するときは、しばらく時間をおくのが理想的です。

初稿については「あるものを捨てるために計画する」という考え方もあります。


### 2.14 ピアレビュー


## 2.15 プロダクション段階でミニファイする

ミニフィケーションとは、空白やコメントなど、JavaScript のコード以外の部分を削除することを言います。

ミニファイアは、空白、改行、コメントを除去するだけでなく、パラメータD,C,B,Aのように変数名を短い名前に変更します（そうしても安全なときだけ）。
グローバル変数の名前は変更するとコードが壊れるかもしれないので、変更するのはローカル変数だけです。
Google Clusure Compiler は（アドバンスモードで）グローバル変数もミニファイしようとするので危険です。

## 2.16 JSLint を実行する

JSLint は何を見ているでしょうか

- 到達できないコード
- 適宜される前に使われている変数
- 安全でないUTF文字
- `void` `with` `eval` のしよう
- 正規表現の中の不適切なエスケープ文字


## 2.17 まとめ

- グローバル変数を減らす。理想的にはひとつのアプリケーションに一つのグローバル
- 関数では単独の `var` を使う。これによってあるカ所にあるすべての変数が一目で把握でき、変数の巻き上げが原因でおきる不具合が避けられます
- `for` ループ、 `for-in` ループ、`switch` の書き方。「`eval()` はワル」。組み込みの `prototype` を拡張しない
- コーディング作法に従う（空白、インデント、の使い方を一貫させる。波括弧とセミコロンをたとえ省略できるときでも省略せずに使う）。コンストラクタ、関数、変数の名前の作法

