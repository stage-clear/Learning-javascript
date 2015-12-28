# オブジェクト作成のパターン

## 5.1 名前空間パターン

```js
// グローバルオブジェクト
var MYAPP = {};

// コンストラクタ
MYAPP.Parent = function() {};
MYAPP.Child = function() {};

// 変数
MYAPP.come_var = 1;

// オブジェクトのコンテナ
MYAPP.modules = {};

// 入れ子になったオブジェクト
MYAPP.modules.module1 = {};
MYAPP.modules.module1.data = {a: 1, b: 2 };
MYAPP.modules.module2 = {};
```

名前空間パターンの利点

- プログラムで必要なグローバルの数を減らせると同時に、名前の衝突や長すぎる接頭辞を避けられます


名前空間パターンの欠点

- タイピングの量が少し増える。変数や関数ごとに接頭辞が付くのでダウンロードするコードのサイズも大きくなります
- グローバルのインスタンスがひとつだけということは、コードの一部を変更するとグローバルのインスタンスが変更されることを意味します。
変更したコード以外の残りの部分は更新された状態に置かれます
- 入れ子が深い名前は、それだけプロパティの解決に時間がかかることを意味します


### 5.1.1 汎用の名前空間関数

```js
// 安全ではない
var MYAPP = {};
// より良いやり方
if (typeof MYAPP === 'undefined') {
  var MYAPP = {};
}

// もっと短くする
var MYAPP = MYAPP || {};
```

```js
// 名前空間関数を使う
MYAPP.namespace('MYAPP.modules.module2');

// これは以下と等価です
// var MYAPP = {
//   modules: {
//     module2: {}
//   }
// };
```

名前空間関数の実装

```js
var MYAPP = MYAPP || {};

MYAPP.namespace = function(ns_string) {
  var parts = ns_string.split('.'),
      parent = MYAPP,
      i;

  // 先頭の冗長なグローバルを取り除く
  if (parts[0] === 'MYAPP') {
    parts = parts.slice(1);
  }

  for (var i = 0; i < parts.length; i += 1) {
    // プロパティが存在しなければ作成する
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
};
```


## 5.2 依存関係の宣言

この宣言では、ローカル変数だけを作成し、使いたいモジュールを指すようにします

```js
var myFunction = function() {
  // 依存するモジュール
  var event = YAHOO.util.Event;
  var dom = YAHOO.util.Dom;

  // 残りの関数で event と dom を使う
};
```

これは極端に単純なパターンですが、たくさんの利点があります

- 依存関係を明示することで、あなたのコードの利用者にページに取り込む必要があるスクリプトファイルをしらせることができます
- 関数の冒頭で宣言しておけば、依存関係を見つけ出し、それを解決するのが容易になります
- ローカル変数を使って処理すると、グローバルやグローバル変数のプロパティの入れ子を使うよりも処理が高速なので、性能が向上します。
この依存関係宣言パターンに従えば、グローバルシンボルの解決はこの関数の中で１回きり実行されるだけです。ローカル変数に代入された後はさらに高速になります
- ミニファイツールは、ローカル変数の名前を変更します。この結果コードは小さくなります。グローバル変数の名前を変更するのは安全ではないので、グローバル変数の名前は変更されません


## 5.3 プライベートなプロパティとメソッド

JavaScript にはプロパティやメソッドに対して Java などの言語で実現されているような
プライベート、プロテクテッド、パブリックで修飾する構文はありません。オブジェクトメンバは
すべてパブリックになります

```js
var myobj = {
  myprop: 1,
  getProp: function() {
    return this.myprop;
  }
};

console.log(myobj.myprop); // myprop はパブリックにアクセス可能
console.log(myobj.getProp()); // getProp() もパブリックです
```

## 5.3.1 プライベートメンバ

```js
function Gadget() {
  // プライベートメンバ
  var name = 'iPod';
  // パブリックメンバ
  this.getName = function() {
    return name;
  };
}
var toy = new Gadget();
// name はプライベートなので undefined
console.log(toy.name); // undefined
// パブリックメソッドjは name にアクセスできます
console.log(toy.getName()); // iPod
```

### 5.3.2 特権メソッド

__特権メソッド__ という概念に特別な構文はありません。
プライベートメンバにアクセスできるパブリックメソッドにつけた名称にすぎません。

### 5.3.3 プライバシーの侵犯

プライバシーに関してはいくつかきわどいケースがあります

- Firefox の古いバージョンでは `eval()` メソッドに第2パラメータを文脈オブジェクトとして渡すことができます
この場合、関数のプライベートスコープの中に忍び込むことができあm酢
- 特権メソッドからプライベート変数を直接返すとき、この変数がオブジェクトや配列である場合、
これは参照渡しになるので、外部のコードはこのプライベート変数を変更できます

```js
function Gadget() {
  // プライベート
  var specs = {
    screen_width: 320,
    screen_height: 480,
    color: 'white'
  };

  // パブリック関数
  this.getSpecs = function() {
    return spacs
  };
}
```

問題は `getSpecs()` が `specs` オブジェクトへの参照を返すところにあります

```js
var toy = new Gadget();
var specs = toy.getSpecs();

specs.color = 'black';
specs.price = 'free';

console.dir(toy.getSpecs());
```

解決法のひとつは、`getSpecs()` が返す新しいオブジェクトに含めるデータを、そのオブジェクト
の利用者が関心あるデータだけに限定することです。
これはPOLA（Principle Of Least Authority: 最小限の原則）として知られています。
POLAでは必要以上に権限を与えるべきではないとされています。

- 返す値をプリミティブにする
- オブジェクトは複製関数を作って、オブジェクトのコピーを作成する


### 5.3.4 オブジェクトリテラルとプライバシー
