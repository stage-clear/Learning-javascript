# リテラルとコンストラクタ

## 3.1 オブジェクトリテラル

```js
// 空のオブジェクトから始める
var dog = {};

// プロパティをひとつ追加
dog.name = 'Benji';

// メソッドをひとつ追加
dog.getName = function() {
  return dog.name;
}
```

プログラムが動作しているどの時点においても、以下の処理が可能です。

- プロパティの値とメソッドを変更できます

```js
dog.getName = function() {
  // ハードコーディングされた値を返すように
  // メソッドを再定義する
  return 'Fido';
};
```

- プロパティ/メソッドを完全に削除する

```js
delete dog.name;
```

- プロパティやメソッドをさらに追加する

```js
dog.say = function() {
  return 'Woof!';
};
dog.fleas = true;
```

必ずしもからのオブジェクトから始めなくても構いません。

```js
var dog = {
  name: 'Benji',
  getName: function() {
    return this.name;
  }
};
```

### 3.1.1 オブジェクトリテラルの構文

- オブジェクトを波括弧で囲む
- オブジェクト内部のプロパティやメソッドをカンマで区切る
- プロパティの名前とプロパティの値をコロンで区切る
- オブジェクトに変数を代入するときは、閉じ括弧の後のセミコロンを忘れないこと


### 3.1.2 コンストラクタからオブジェクトを作る

```js
// 組み込みコンストラクタを使う方法
// 警告: これはアンチパターンです
var car = new Object();
car.goes = 'far';
```

### 3.1.3 オブジェクトコンストラクタの落とし穴

オブジェクトリテラルが使えるときに `new Object()` を使うべき理由はありません。
問題になる機能とは、`Object()` コンストラクタが受け取ったパラメータの値によっては、オブジェクトの作成を
別の組み込みコンストラクタに委譲し、期待したのと違うオブジェクトを返すことがある点です。

```js
// 警告: 以下はアンチパターン

// 空のオブジェクト
var o = new Object();
console.log(o.constructor === Object); // true

// 数値のオブジェクト
var o = new Object(1);
console.log(o.constructor === Number); // true
console.log(o.toFixed(2)); // 1.00

// 文字列オブジェクト
var o = new Object('I am a string');
console.log(o.constructor === String); // true
// 通常のオブジェクトには substring() がありませんが、
// 文字列オブジェクトにはあります
console.log(typeof o.substring);// function

// ブーリアンオブジェクト
var o = new Object(true);
console.log(o.constructor === Boolean); // true
```

`Object()` コンストラクタのこの振る舞いは、コンストラクタに渡す値が動的で実行時でないとわからない場合、予期せぬ結果をもたらします。
`new Object()` は使わない、かわりに簡潔で信頼できるオブジェクトリテラルを使うべきというのが結論です。


## 3.2 カスタムのコンストラクタ関数

```js
var Person = function(name) {
  this.name = name;
  this.say = function() {
    return 'I am ' + this.name;
  };
};

var adam = new Person('Adam');
addam.say(); // 'I am Adam'
```

このコンストラクタ関数を `new` を使って呼び出すとき、関数内部での動作は以下のようになります。

- 空のオブジェクトが作成され、変数 `this` で参照されます。`this` はこの関数のプロトタイプを継承しています
- `this` が参照するオブジェクトにプロパティとメソッドが追加されます
- `this` が参照する新しく作られたオブジェクトは、関数の最後で（明示的に別のオブジェクトを返していなければ）暗黙に返されます

舞台裏では次のような処理が進行しています

```js
var Person = function(name) {
  // 次のオブジェクトリテラルを使って
  // 新しいオブジェクトを作成します。
  var this = {};
  // より正確にいうと次のようになります
  // var this = Object.create(Person.ptorotype);
  
  // プロパティとメソッドを追加します
  this.name = name;
  this.say = function() {
    return 'I am ' + this.name;
  };
  
  // return this;
};
```

`this` に `say()` を追加していますが、この結果、 `new Person()` が呼ばれるたびにメモリに新しい関数が作成されます。
メソッド `say()` はインスタンスごとに内容が変わるわけではないので、この動作は明らかに非効率です。`Person` のプロトタイプにこの
メソッドを追加したほうがいいでしょう。

```js
Person.prototype.say = function() {
  return 'I am ' + this.name;
};
```

メソッドのように再利用可能なメンバはプロトタイプで定義すべきことを覚えておいてください。


### 3.2.1 コンストラクタの戻り値

`new` を使ってコンストラクタを呼ぶとき、常にオブジェクトが返されます。
デフォルトでは `this` が参照するオブジェクトが帰ります。


```js
var Objectmaker = function() {
  // このコンストラクタは
  // 別のオブジェクトを返すので、
  // この name プロパティは無視されます
  this.name = 'this is it';
  
  // 新しいオブジェクトを作成して返します
  var that = {};
  that.name = 'And That\s that';
  return that;
};

// テスト
var o = new Objectmaker();
console.log(o.name); // "And that's that"
```

オブジェクトでありさえすれば任意のオブジェクトをコンストラクタから自由に返すことができます。
オブジェクトでないものを返そうとすると、エラーにはなりませんが、無視されてしまい、代わりに `this` が参照するオブジェクトが返されます。


## 3.3 `new` を強制するパターン

コンストラクタを呼ぶとき `new` を書き忘れると何が起きるでしょうか。
これは構文エラーにも実行時エラーにもなりませんが、論理上のエラーとなり予期せぬ振る舞いになります。


### 3.3.1 命名の作法

コンストラクタの名前は、頭文字を大文字にします。


### 3.3.2 `that` を使う

コンストラクタがコンストラクタとして必ず振る舞うようにするためのパターンがあります。
`this` にメンバをすべて追加する代わりに、`that` にメンバを追加し、`that` を返すのです。

```js
function Waffle() {
  var that = {};
  that.tastes = 'yummy';
  return that;
}

// より簡潔にしたければ
function Waffle() {
  return {
    tastes: 'yummy'
  };
}

var first = new Waffle();
var second = Waffle();
console.log(first.tastes); // yummy
console.log(second.tastes); // yummy
```

このパターンの問題は__プロトタイプへのリンクが失われてしまう__点です。


### 3.3.3 自己呼び出しコンストラクタ

コンストラクタの中で `this` がコンストラクタのインスタンスであるか検査し、そうでなかったら、
そのコンストラクタから `new` を正しく使って自分自身を呼ぶようにします。

```js
function Waffle() {
  if (!(this instanceof Waffle)) {
    return new Waffle();
  }
  this.tastes = 'yummy';
}

Waffle.prototype.wantAnother = true;

// テスト
var first = new Waffle();
var second = Waffle();

console.log(first.tastes); // yummy
console.log(second.tastes); // yummy

console.log(first.wantAnother); // true
console.log(second.wantAnother); // true
```

インスタンスを検査する汎用的なやり方があります。コンストラクタの名前をハードコーディングするかわりに
`arguments.callee` を呼びます

```js
if (!(this instanceof arguments.callee)) {
  return new arguments.callee();
}
```

`arguments.callee` はES5の `strict` モードでは許可されていないので注意してください。
既存のコードの中でこのパターンが使われているのを見つけたら、将来的には使うのをやめて取り除くほうがいいでしょう。


## 3.4 配列リテラル

組み込みのコンストラクタ `Array()` を使って作成できますが、オブジェクトリテラルと同様に配列のリテラル記法もあり、
こちらが簡潔で好まれています。

```js
// 要素が3個の配列
// 警告: これはアンチパターン
var a = new Array('itsy', 'bitsy', 'spider');

// 上とまったく同じ配列
var a = ['itsy', 'bisty', 'spider'];

console.log(typeof a);// 配列はオブジェクトなので object
consolelog(a.constructor === Array); // true
```

### 3.4.1 配列リテラルの構文

配列リテラルの構文についてあまり説明することはありません。

### 3.4.2 配列コンストラクタの奇妙な振る舞い

`new Array` を避けるべきもうひとつの理由はlこのコンストラクタにある落とし穴を避けるためです。
`Array()` コンストラクタに数値をひとつだけ渡した場合、その数値は配列の最初の要素の値にはなりません。
かわりに配列の長さが設定されます。

```js
// 要素がひとつの配列
var a = [3];
console.log(a.length); // 1
console.log(a[0]); // 3

// 要素が3個の配列
var a = new Array(3);
console.log(a.length); // 3
console.log(typeof a[0]); // undefined
```

浮動小数点は配列の長さとして妥当な値ではないので、結果はエラーになります。

```js
// 配列リテラルを使う
var a = [3.14] ;
console.log(a[0]); // 3.14

var a = new Arrau(3.14); // RangeError: invalida array length
console.log(typeof a); // undefined
```

### 3.4.3 配列かどうかの検査

配列に ` typeof` 演算子を使うと `object` が返ります

```js
console.log(typeof [1,2]); // object
```

ECMAScript5 では `Array.isArray()` という新しいメソッドが定義されています。
これは引数が配列のとき `true` を返します。

```js
Array.isArray([]); // true

// 配列もどきのオブジェクトを使って検査をだましてみる
Array.isArray({
  length: 1,
  '0': 1,
  slice: function() {}
});// false
```

この新しいメソッドが利用できない環境の場合、`Object.prototype.toString()` メソッドを呼んで検査することができます。

```js
if (typeof Array.isArray === 'undefined') {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

## 3.5 JSON

JSON とオブジェクトリテラルの構文の唯一の違いは、JSONではプロパティ名を引用符で囲む必要がある点です。
JSONデータでは、関数や正規表現リテラルを使うことはできません。

### 3.5.1 JSONを使った処理

JSONデータを `eval()` を使って闇雲に評価するのは、セキュリティの問題があるので勧められません。
`JSON.parse()` メソッドを使うのが最善策です。
旧式の JavaScript エンジンの場合、[JSON.org ライブラリ](https://github.com/douglascrockford/JSON-js)を使えば
JSONオブジェクトとそのメソッドにアクセスできます。

```js
// JSONデータを入力
var jstr = {"mykey": "my value"};

// アンチパターン
var data = eval('(' + jstr +')');

// 推奨パターン
var data = JSON.parse(jstr);

console.log(data.mykey);
```

YUI3 を使っている場合

```js
// JSONデータを入力
var jstr = '{"mykey": "my value"}';
// YUI インスタンスを使って
// データを解析し、オブジェクトに変換
YUI().use('json-parse', function(Y) {
  var data.Y.JSON.parse(jstr);
  console.log(data.mykey); // my value
});
```

jQuery の場合 `parseJSON()` メソッドがあります

`JSON.parse()` と逆の変換を行うメソッドが `JSON.stringify()` です。任意のオブジェクトや配列
（あるいはプリミティブ）を受け取り、それをJSONデータにシリアライズします

```js
var dog = {
  name: 'Fido',
  dob: new Date(),
  legs: [1,2,3,4]
};

var jsonstr = JSON.stringify(dog);
```


## 3.6 正規表現リテラル

JavaScript における正規表現もオブジェクトです。

- `new RegExp()` コンストラクタを使う
- 正規表現リテラルをつかう

```js
// 正規表現リテラル
var re = /\\/gm;

// コンストラクタ
var re = new RegExp('\\\\', 'gm');
```


### 3.6.1 正規表現リテラルの構文

- g -- グローバル検索
- m -- マルチ（複数）行
- i -- 大文字と小文字を区別しない

```js
function getRE() {
  var re = /[a-z]/;
  re.foo = 'bar';
  return re;
}

var reg = getRE();
var re2 = getRE();

console.log(reg === re2); // true
reg.foo = 'baz'; 
console.log(re2.foo);  // baz;
```

`RegExp()` を呼ぶとき、これをコンストラクタとみなして `new`を使っても、関数とみなして `new` を使わなくても同じ振る舞いになります


## 3.7 プリミティブのラッパー

JavaScript のプリミティブの値には、数値、文字列、ブーリアン、`null`、`undefined`という5つの型があります。
`null` と `undefined` は例外ですが、それ以外の3つの型には__プリミティブラッパーオブジェクト__があります。
これらは組み込みコンストラクタである `Number()` `String()` `Boolean()` を使って作成できます。

プリミティブの数値を数値オブジェクトの違い

```js
// プリミティブの数値
var n = 100;
console.log(typeof n); // number

// Number オブジェクト
var nobj = new Number(100);
console.log(typeof nobj); // object
```

ラッパーオブジェクトには便利なプロパティやメソッドがあります。
これらのメソッドは便利なので、プリミティブを使うのではなくオブジェクトの作成を選択する理由になります。
数値オブジェクト `toFixed()` `toExponential()`
文字列オブジェクト `substring()` `charAt()` `toLowerCase()` `length` 

```js
// プリミティブ文字列はオブジェクトとして使われる
var s = ''hello;
console.log(s.toUpperCase()); // HELLO

// この値はオブジェクトとして振る舞うことができます
'monkey'.slice(3, 6); // 'key'

// 数値についても同様です
(22 / 7).toPrecision(3); // 3.14
```

値を拡張して状態を永続化したいときは、ラッパーオブジェクトを使うべきです。
プリミティブはオブジェクトではないので、プロパティを拡張することはできません。

```js
// プリミティブ文字列
var greet = 'Hello there';

// split() メソッドを使うので
// プリミティブはオブジェクトに変換される
greet.split(' ')[0]; // Hello

// プリミティブを拡張しようとしてもエラーになりません
greet.smile = true;

// しかし実際には動作しません
typeof gree.smile; // undefined;
```

## 3.8 エラーオブジェクト

JavaScript には `Error()` `SyntaxError()` `TypeError()` など、組み込みのエラーコンストラクタがあり、
これらは `throw` 文と一緒に使われます。

```js
try {
  // なにか以上が発生したのでエラーを投げます
  throw {
    name: 'MyErrorType' ,
    message: 'oops',
    extra: 'this was rather embarrassing' ,
    remedy: genericErrorHandler // これを処理するハンドラー
  };
} catch (e) {
  // ユーザーに通知
  alert(e.message); // oops
  
  // エラーを優雅二処理
  e.remedy();
}
```


## 3.9 まとめ

- オブジェクトリテラル記法。キーと値の組をカンマで区切り、波括弧で囲むだけでオブジェクトを作成できる
- コンストラクタ関数には、組み込みのコンストラクタとカスタムのコンストラクタがあります
- カスタムコンストラクタを常に `new` で呼ばれたときと同じように振るまわせる方法
- 配列リテラル記法。間まで区切られた値のリストを角括弧で囲みます
- JSON。オブジェクトや配列のリテラルで構成されるデータフォーマット
- 正規表現リテラル
- 使用をさけるべき組み込みコンストラクタ: `String()` `Number()` `Boolean()`、さまざまな `Error()`コンストラクタ。

