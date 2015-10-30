## 4 モダンなモジュラー JavaScript デザインパターン
### 4.1 スクリプトローダに関するいくつかの注記

AMDやCommonJSのフォーマットでモジュールを読み込む優れたローダがたくさんあります

- [RequireJS](http://requirejs.org/)
- [curl.js](https://github.com/cujojs/curl)

面白いことにAlmondというAMDのAPI実装を利用すると, デプロイ先のサイトではRequireJSが必要なくなります

- [Almond](https://github.com/jrburke/almond)

### 4.2 AMD
AMD (Asynchronous Module Definition: 非同期モジュール定義) フォーマットの総合的な目的は, 開発者が利用できるモジュラーなJavaScriptを実現することです.

#### 4.2.1 モジュールを使う

```javascript
define(
  module_id /* 省略可 */,
  [dependencies] /* 省略可 */,
  definition function /* モジュールやオブジェクトをインスタンス化するための関数 */
);
```

|key|説明|
|:--|:--|
|module_id|モジュールID|
|dependencies|定義中のモジュールが影響を受ける依存モジュールの配列|
|definition function|(または factory function) モジュールのインスタンス化を実行する関数|

CommonJS環境で動作する r.js のようなAMD最適化ツールを利用すれば, 復数の環境で同一コードを実行できます.

- [r.js](https://github.com/jrburke/r.js/)

```javascript
// module_id (値はmyModule) はここでの説明のためだけに登場する
define('myModule',

  ['foo', 'bar'],

  // モジュールの定義
  // 依存モジュール(foo と bar) が関数の引数として渡される
  function(foo, bar) {
    // モジュールのエクスポートの内容（外部に後悔する関数など）
    // を決定する値を返す

    // ここでモジュールを作成する
    var myModule = {
      doStuff: function() {
        console.log('Yay! Stuff');
      }
    };
    return myModule;
  }
);

// あるいは以下の方法も適用できる
define('myModule',

  ['math', 'graph'],

  function(math, graph) {
    // これはAMDとは美味用に異なるパターンであることに注意
    // 書き方に柔軟性があるため, いろいろな方法でモジュール定義できる
    return {
      plot: function(x, y) {
        return graph.drawPie(math.randomGrid(x, y));
      }
    };
  }
);
```

次に示すのは, 依存モジュールを動的に読み込むコードの例です

```javascript
define(function(require) {
  var isReady = false, foobar;

  // モジュール定義内にインラインで require を書く
  require(['foo', 'bar'], function(foo, bar) {
    irReady = true;
    foobar = foo() + bar();
  });

  // モジュールを返すこともできる
  return {
    isReady: isReady,
    foobar: foobar
  };
});
```

AMD互換のプラグインは次のように定義できます

```javascript
// AMDを使うと, テキストファイルやHTMLをはじめとする
// ほぼすべての種類のデータを読み込みことができる
// ページ読み込み時に, あるいは動的に,
// コンポーネントのスキン処理に使えるように
// テンプレートを依存性に加えることができる

define(['./templates', 'text!./template.md', 'css!./template.css'],
  function(tempaltes, template) {
    console.log(templates);
    // テンプレートを利用した処理をここに書く
  }
);
```
この例は, `requirejs(['app/myModule'], function(){})` という形式に簡略化できます
define()関数を使ってモジュールを定義すれば, ローカルに要求されるモジュールをrequire([])で渡すやり方が `curl.js` と `RequireJS` の両方に適用できます

```javascript
// RequireJSを利用してAMDモジュールを読み込む
require(['app/myModule'],

  function(myModule) {
    // 他のモジュールを読み込むメインモジュールを起動する
    var module = new myModule();
    module.doStuff();
  }
);
```

```javascript
// curl.js を利用して AMDモジュールを読み込む
curl(['app/module'],

  function(myModule) {
    // 他モジュールを読み込むメインモジュールを起動する
    var module = new myModule();
    module.doStuff();
  }
);
```

依存性が遅延評価されるモジュールのコードは以下の通りです

```javascript
// これは jQuery の Deferred() の実装
// 例えば（少し構文が異なるが）futures.js などの実装と互換性がある.

define(['lib/Deferred'], function(Deferred) {
  var defer = new Deferred();

  require(['lib/templates/?index.html', 'lib/data/?stats'],
    function(template, data) {
      defer.resolve({template: template, data: data});
    }
  );
  return defer.promise();
});
```

#### 4.2.2 Dojo を利用したAMDモジュール
Dojoを使うとAMD互換のモジュールを極めて直接的なやり方で定義できます

```javascript
define(['dijit/Tooltip'], function(Tooltip) {
  // digit の tooltip がローカルで利用可能になる
  new Tooltip(/* ... */);
});
```

AMD的なモジュール参照の方法では, 依存モジュールのリストの中で引数とモジュールを定義しますが,
この方法は, Dojo 1.6 以前のビルドシステムではサポートされていません.
AMD互換のローダを利用する場合にのみ使えます. 使い方は以下のとおりです

```javascript
define(['dojo/cookie', 'dijit/Tooltip'], function(cookie, Tooltip) {
  var cookieValue = cookie('cookieName');
  new Tooltip(/* ... */);
});
```

#### 4.2.3 AMDモジュールのデザインパターン（Dojo）

AMDモジュールのデザインパターン（Dojo）
```javascript
// デコレータパターン
// mylib/UpdatebleObservable は　dojo/store/Observable のデコレータ
define(['dojo', 'dojo/store/Observable'], function(dojo, Observable) {
  return function UpdatebleObservable(store) {
    var observable = dojo.isFUnction(store.notify) ? store :
      new Observable(store);

    observable.updated = function(object) {
      dojo.when(object, function(itemOrArray) {
        dojo.forEach([].concat(itemOrArray), this.notify, this);
      });
    };

    return observable;
  };
});

// Decorator コンシューマ
// mylib/UpdateableObservable のためのコンシューマ
define(['mylib/UpdatebleObservable'], function(makeUpdatable) {
  var observable,
      updatable,
      someItem;

  // observableストアを更新可能にする
  updatable = makeUpdatable(observable); // 'new' は省略できる！

  // データが変更されたとき, データを渡したいときには
  // 後から .updatad() を呼び出すことができる
  // updatable.updated(updatedItem);
});
```

```javascript
// アダプタパターン
// 'mylib/Array' は jQueryの `each` 関数を真似たものである.
define(['dojo/_base/lang', 'dojo/_base/array'], function(lang, array) {
  return lang.delegate(array, {
    each: function(arr, lambda) {
      array.forEach(arr, function(item, i) {
        lambda.call(item, i, item);// jQueryのeachのような振る舞いになる
      });
    }
  });
});

// Adapter コンシューマ
// 'myapp/my-module'
define(['mylib/Array'], function(array) {
  array.each(['uno', 'dos', 'tres'], function(i, esp) {
    // ここでは this == item
  });
});
```

#### 4.2.4 jQueryを使ったAMDモジュール
Dojoと違って jQuery は1つのファイルだけで構成されています

```javascript
define(['js/jquery.js', 'js/jquery.color.js', 'js/underscore.js'],
  function($, colorPlugin, _) {
    // ここでは jQuery とカラープラグイントunderscoreを渡す
    // いずれもグローバルスコープではアクセスされないが,
    // これ以降, 簡単に参考できるようになる

    // 擬似乱数によって配列内の色を並べ替え, 最初の要素を取り出す
    var shuffleColor = _.first(_.shuffle('#666', '#333', '#111'));

    // ページにあるクラス 'item' で指定した要素の背景色を
    // 色のシャッフルを使ってアニメーションする
    $('.item').animate({'backgroundColor': shuffleColor});

    // ここで返したものは他のモジュールから利用できるようになる
    return {};
  }
);
```

__jQueryを非同期互換のモジュールとして登録する__

```javascript
// ドキュメントにjQueryのグローバルインスタンスが復数存在する可能性を考慮して,
// .noConflict() によるテストを提供する

var jQuery = this.jQuery || 'jQuery';
var $ = this.$ || '$';
originaljQuery  = jQuery;
orininal$ = $;

define(['jquery'], function($) {
  $('.items').css('backgroundColor', 'green');
  return function() {};
});
```

__モジュラーなJavaScriptを書く上でAMDが優れた方法である理由__

- 柔軟なモジュールを定義するための方法が整っている
- 今日私たちの多くが頼りにしているグローバル名前空間や<script>タグよりもはるかに無駄がない
  スタンドアロンなモジュールやそのモジュールが依存しているモジュールを定義する方法が整っている
- モジュール定義が隠蔽されているため, グローバル名前空間の汚染を避けることができる
- ほぼ間違いなく別の方法（CommonJS）よりもうまくいく.
  クロスドメインやローカルでの利用やデバッグをしても問題がなく, サーバサイドのツールに依存しない.
  多くのAMDローダはぶり度プロセスなしにブラウザでモジュールを読み込むことができる.
- 復数のモジュールを1つのファイルにふくめるために「トランスポート」手法を提供する
  CommonJSのような他の手法でもトランスポートフォーマットを利用できる
- 必要ならばスクリプトの遅延読み込みをすることもできる

__AMDをサポートするスクリプトローダとフレームワーク__

ブラウザサイド

- [RequireJS](http://requirejs.org/)
- [curl.js](https://github.com/cujojs/curl)
- [Yabble](https://github.com/jbrantly/yabble)
- [PINF](https://github.com/pinf/loader-js/)

サーバサイド

- RequireJS
- PINF

#### 4.2.5 AMDについてのまとめ
よりよいモジュールフォーマットに求められるたくさんのチェック項目をAMDはクリアしている

- グローバルについて心配するのを避けられる
- 名前付きモジュールがサポートされている
- 機能をサーバで変換する必要がない
- 依存性の管理に使うのが楽しい

boilerplagte/wrapper のオーバーヘッドにいらついたことがあるかもしれません.
このような問題に対応しているVoloのようなツールがあり, AMDを使う場合には, 利点が欠点に勝ると言えるでしょう.

- [Volo](https://github.com/volojs/volo);

### 4.3 CommonJS
AMDとは異なり, CommonJSでは IO, ファイルシステム, promise など, より広範な概念を扱います

#### 4.3.1 CommonJS を使う
CommonJSのモジュールとは, 利用可能な特定のオブジェクトをそれに依存する任意のコードに
エクスポートする再利用可能なJavaScriptコードです.
AMDとは異なり, 通常そのようなモジュールには関数ラッパーはありません（そのため,
例えば define はありません）

CommonJSのモジュールは基本的に2つに分けられます

- exports | あるモジュールが他のモジュールに使わせたいオブジェクトを含む自由変数
- require | 他のモジュールがエクスポートしたものをモジュールがインポートするのに使う関数

```javascript
// CommonJSの説明: require() と exports

// package/lib はここで必要としている依存ライブラリ
var lib = require('package/lib');

// モジュールの振る舞いを定義する
function foo() {
  lib.log('hello, world!');
}

// 他のモジュールに foo をエクスポートする
exports.foo = foo;
```

```javascript
// エクスポートの基本的な使い方
var lib = require('package/lib');

// モジュールの振る舞いを定義
function foo() {
  lib.log('hello, world');
}

// 他モジュールにfoo をエクスポートする
exports.foo = foo;
```

```javascript
// AMDと同等のCommonJSの例

define(function(require) {
  var li = require('package/lib');

  // モジュールの振る舞いを定義
  function foo() {
    lib.log('hello, world');
  }

  // 他モジュールにfooをエクスポート（開示）する
  return {
    foobar: foo
  }
});
// こうしたことが可能なのは, AMDが簡素化されたCommonJSのラッパーの機能をサポートしているからです.
```

#### 4.3.2 復数の依存モジュールを扱う
```javascript
// app.js

var modA = require('./foo');
var modB = require('./bar');

exports.app = function() {
  console.log('Im an application!');
};

exports.foo = function() {
  return modA.helloWorld();
};
```

```javascript
// bar.js
exports.name = 'bar';
```

```javascript
// foo.js

require('./bar');
exports.helloWorld = function() {
  return 'Hello world';
};
```

#### 4.3.3 CommonJSをサポートするローダやフレームワーク

ブラウザサイド

- curl.js
- [SproutCore](http://sproutcore.com/)
- PINF

サーバサイド

- [Node](http://nodejs.org)
- [Narwhal](https://github.com/tlrobinson/narwhal)
- [Persevere](http://www.persvr.org/)
- [Wakanda](http://www.wakanda.org/)

#### 4.3.4 CommonJSはブラウザにも適しているか？
CommonJSはサーバサイドでの開発のほうが向いていると感じる開発者もいて、意見が割れています
多くのCommonJS APIはブラウザレベルでは実装できないような io, system, js などのサーバ指向の機能に対応しているからです
これらの機能はブラウザには実装されていません.

CommonJSのモジュールの組み立て方を知っておくと, どこでも使えるモジュールを定義する方法がわかるので便利です
クライアント, サーバの両方のアプリケーションで利用されているモジュールには, バリデーション, 変換, テンプレートエンジンなどがあります

モジュールがサーバサイド環境で使われる場合にはCommonJSを選び, それ以外の場合にはAMDを利用する

### 4.4 競合しているが有効性で並ぶ2つのフォーマット: AMDとCommonJS

AMDとComonJS, それぞれのフォーマットの目的は異なる

AMDは非同期に動作するブラウザ優先の手法を採用し, 簡単に後方互換性が得られますが, ファイルI/Oに関する概念はありません
AMDはオブジェクト, 関数, コンストラクタ, 文字列, JSONなど, 多くのタイプのモジュールをサポートし, ブラウザ内でネイティブに実行されます

CommonJSは同期した動作を想定したサーバ優先の手法を採用し, グローバルを汚染するお荷物がなく, (サーバ上での)将来の要求に答えようとします.
CommonJSはごちゃごちゃしたモジュールをサポートしているので, AMDで強制される define() ラッパーから解放されて, ES.next/Harmony の仕様に近く
感じられるでしょう. しかし, CommonJSモジュールはオブジェクトをモジュールちしてだけしかサポートしていません.

#### 4.4.1 UMD: AMD と CommonJS に互換なプラグインのためのモジュール
UMDは実験的なモジュールフォーマットです.
このフォーマットによりスクリプト読み込みの手法のすべて, あるいはほとんどを備え, クライアントとサーバの両方の
環境で動作するモジュールを定義できるようになります.

- [UMD](https://github.com/umdjs/umd)

##### 基本的なAMDハイブリッドフォーマット
```javascript
define(function(require, exports, module) {
  var shuffler = require('lib/shuffle');

  exports.randomize = function(input) {
    return shuffler.shuffle(input);
  };
});
```

##### CommonJS, AMD, ブラウザのグローバルを使用してモジュールを作成する

```javascript
(function(root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    factory(exports, require('b'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD. 無名モジュールとして登録する
    define(['exports', 'b'], factory);
  } else {
    // ブラウザグローバル
    factory((root.commonJsStrict = {}), root.b);
  }
}(this, function(exports, b) {
  // 何らかのやり方でbを使う

  // exports オブジェクトにプロパティを置いてエクスポートされたモジュールプロパティを定義する
  exports.action = function() {

  };

}));
```

#####  すべての環境で動作するjQueryプラグイン

```html
<script type="text/javascript" src="jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="pluginCore.js"></script>
<script type="text/javascript" src="pluginExtension.js"></script>
<script>

$(function() {

  // この例では, プラグイン「core」が core名前空間配下で開示されていることを前提
  // まずプラグインへの参照をキャッチ
  var core = $.core;

  // 次にページ内の全divを黄色にハイライトする, コアに組み込まれた機能を利用
  core.highlightAll();

  // coreモジュールの「Plugin」名前空間に読み込まれた機能を利用する

  // ページ内の最初のdivの背景に緑色を設定する
  core.plugin.setGreen('div:first');
  // ここでは, 後で読み込むプラグインの中にある core の「hightlight」メソッドを利用している

  // コアなモジュールまたはプラグインにて定義されている
  // 「errorColor」プロパティにページ内の最後のdivに設定する
  // この後に出てくるコードを読むと, コアなプラグインとその他のプラグインとの間で
  // プロパティやメソッドを使うのが簡単であることがわかるだろう
  core.plugin.setRed('div:last');
});
</script>
```

```javascript
// pluginCore.js
// モジュール/プラグインコア
// 注: モジュールを囲むラッパーコードは,
// 定義された引数を期待されるフォーマットに対応づけることで,
// 復数のモジュールフォーマットと使用をサポートできるようにしている.
// この実装のモジュール機能は, 名前付きモジュールと exports を例示する
// 後半部で定義されている
//
// 依存性は必要であれば簡単に宣言できる
// AMDモジュールの例を使って前に示したのと同じように動作すべきである

(function(name, definition) {
  var theModule = definition(),
      // これは true
      hasDefine = typeof define === 'function' && define.amd,
      // hasDefine = typeof define === 'function',
      hasExports = typeof module !== 'undefined' && module.exports;

  if (hasDefine) { // AMD モジュール
    define(theModule);
  } else if (hasExports) { // Node.jsモジュール
    module.exports = theModule;
  } else { // 共通名前空間, あるいはグローバルオブジェクト(window)に代入
    (this.jQuery || this.ender || this.$ || this)[name] = theModule;
  }
})('core', function() {
  var module = this;
  module.plugins = [];
  module.hightlightColor = 'yellow';
  module.errorColor = 'red';

  // ここでコアモジュールを定義し, 公開APIを返す
  // このhightlightメソッドは, コアのhighlightAll()メソッド
  // そして要素の色をハイライト表示するすべてのプラグインで使用される
  module.highlight = function(el, strColor) {
    if (this.jquery) {
      jQuery(el).css('background', strColor);
    }
  };

  return {
    highlightAll: function() {
      module.highlight('div', module.highlightColor);
    }
  };
});
```

```javascript
// pluginExtension.js
// モジュールコアの拡張

(function(name, definition) {
  var theModule = definition(),
      hasDefine = typeof define === 'function',
      hasExports = typeof module !== 'undefined' && module.exports;

  if (hasDefine) { // AMDモジュール
    define(theModule);
  } else if (hasExports) { // Node.js モジュール
    module.exports = theModule;
  } else {
    // フラットファイル/グローバルモジュール拡張を考慮して,
    // 共通名前空間あるいはグローバルオブジェクトに代入する
    var obj = null,
        namespaces,
        scope;

    obj = null;
    namespaces = name.split('.');
    space = (this.jQuery || this.ender || this.$ || this);

    for (var i = 0; i < namespaces.length; i++) {
      var packageName = namespace[i];
      if (obj && i == namespaces.length - 1) {
        obj[packageName] = theModule;
      } else if (typeof scope[packageName] === 'undefined') {
        scope[packageName] = {};
      }
      obj = scope[packageName];
    }
  }
})('core.plugin', function() {
  // ここでモジュールを定義し, 公開APIを返す.
  // highlightメソッドを拡張したければ拡張できるように,
  // コア機能を上書きし拡張できるメソッドを許可すれば,
  // このコードを簡単にコアに適合させることが可能
  return {
    setGreen: function(el) {
      highlight(el, 'green')
    },
    setRed: function(el) {
      highlight(el, 'red');
    }
  };
})
```
UMDはAMDやCommonJSに取って代わることを目指すのではなく, より多くの環境でコードを動作
させたいと思う今日の開発者の声に応えるべく, 補足的な機能を提供しているだけです.

### 4.5 ES Harmony

ES6-->ES5 コンパイラ

- [Traceur compiler](https://google.github.io/traceur-compiler/demo/repl.html#)
- [Babel](http://babeljs.io/)

### 4.5.1 モジュールのインポートとエクスポート

- import宣言はモジュールをバインドしてローカル変数としてエクスポートし, リネームする.
  これにより名前の衝突を避ける事ができる
- exportはモジュールのローカルバインドが外部から可視であることを宣言している.
  そのため他のモジュールは exports をよむかもしれないが, 他の箇所で定義されているモジュールはエクスポートできない
  その外部名とローカル名が同じにならないように, エクスポートの名前を変更することもできる

```javascript
module staff {
  // 他モジュールによって使用できる（パブリックな）エクスポートを指定する.
  export var baker = {
    bake: function(item) {
      console.log('Woo! I just baked ' + item);
    }
  }
}

module skills {
  export var speciality = 'baking';
  export var experience = '5 years'
}

module cakeFactory {
  // 依存モジュールを指定する
  import baker from staff;
  // ワイルドカードを使ってインポートする
  import * from skills;

  export var oven = {
    makeCupcake: function(toppings) {
      baker.bake('cupcake', toppings);
    },
    makeMuffin: function(size) {
      baker.bake('muffin', size);
    }
  }
}

```

#### 4.5.2 リモートのソースからモジュールを読み込む
外部に置かれたモジュールを読み込むことができます.

```javascript
module cakeFactory from 'http://example.com/factory/cakes.js'
cakeFactory.oven.makeCupcake('sprinkles');
cakeFactory.oven.makeMuffin('large');
```

#### 4.5.3 モジュールローダ API
ローダは, モジュールを読み込むための `load(url, moduleInstance, error)` をはじめ
`creatModule(object, globalModuleReferences)` やその他のシグネチャをサポートしています.

リモートのソースからモジュールを読み込む例とは異なり, モジュールローダAPIの方が動的なコンテキストに適しています.

```javascript
Loader.load('http://example.com/factory/cakes.js',
  function(cakeFactory) {
    cakeFactory.oven.makeCupcake('chocolate');
  }
);
```

#### 4.5.4 サーバ用のCommonJS的なモジュール
サーバ上で利用するためのCommonJS的なモジュール

```javascript
// io/File.js
export function open(path) { /*...*/ }
export function close(hnd) { /*...*/ }

// compiler/LexicalHandler.js
module file from 'io/File';

import {open, close} from file;
export function scan(in) {
  try {
    var h = open(in);
  } finally {
    close(h);
  }
}

module lexer from 'compiler/LexicalHandler';
module stdlib from '@std';

// ... scan(cmdline[0]); ...
```

#### 4.5.5 クラスとコンストラクタ, ゲッター, セッター

```javascript

class Cake {
  // 「constructor」キーワードとそれに続く引数のリストを使うと,　クラスのコンストラクタを定義できる
  constructor(name, toppings, price, cakeSize) {
    public name = name;
    public cakeSize = cakeSize;
    public toppings = toppings;
    private price = price;
  }

  // 次のような場合には「function」キーワードを削ることで, 「function」の濫用を防いでいる
  // 識別子の後に引数リストと本体を起き, 新しいメソッドを定義している
  addTopping(topping) {
    public(this).toppings.push(topping);
  }

  // 識別子/メソッド名と波カッコで囲われたメソッド本体の前に get と書くことでゲッターを定義
  get allToppings() {
    return public(this).toppings;
  }

  get qualifiesForDiscount() {
    return private(this).price > 5;
  }

  // ゲッターと同様に識別子の前に「set」キーワードを書くことでセッターを定義
  set cakeSize(cSize) {
    if (cSize < 0) {
      throw now Error('Cake must be a valid size - either small, medium or large');
    }
    public(this).cakeSize = cSize;
  }
}

```

#### 4.5.6 ES Harmonyについてのまとめ

現在のブラウザで ES6 シンタックスを使用するためには Google Traceur や Esprima などの
transpiler を使用するのが一番良いやり方です.
AMDと一緒にHarmonyモジュールを利用する[Require HM](https://github.com/jrburke/require-hm)などのプロジェクトもありますが,
仕様が確定するまではAMDとCommonJSを使うのが確実です.

### 4.6 まとめ

モジュールフォーマットには, モジュールパターンを利用するのに勝る, 数多くの利点があります.

- グローバル変数を管理する必要がない
- 静的または動的な依存関係が管理しやすくなる
- スクリプトローダとの互換性が上昇する
- サーバ上のモジュールとの互換性が増す

