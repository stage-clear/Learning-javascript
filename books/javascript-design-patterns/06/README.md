## 6 jQuery プラグインのデザインパターン

### 6.1 パターン

プラグインの書き方
```javascript
//1. 最も簡単な例
$.fn.myPluginName = function() {
  // ここにプラグインのロジックを書く
};

// 2. クロージャをでjQueryオブジェクトを渡す
(function($) {
  $.fn.myPluginName = function() {
    // ここにプラグインのロジックを書く
  };
})(jQuery);

// 3. extend を使う
(function($) {
  $.extend($.fn, {
    myPluginName: function() {
      // ここにプラグインのロジックを書く
    }
  });
})(jQuery);
```

### 6.2 軽量スタートパターン
軽量スタートには以下の特徴があります.

- 関数を実行する直前にセミコロンを書く
- window や document, undefined を引数として関数に渡す
- 要素の初期作成と代入に関するロジックのための簡単なプラグインコンストラクタである
- defaults を使ってオプションを拡張する
- インスタンスが復数生成されるのを防ぐため, コンストラクタをラッピングする
- 可読性を高めるために jQuery コアスタイルガイドラインに準拠する

```javascript
/*!
 * jQuery 軽量プラグインのテンプレート
 * Original author: @author
 * Further changes, comments: @test
 * Licensed under the MIT license
 */
// 関数実行の直前にあるセミコロンは,
// 正しく閉じられていないスクリプトやプラグインが連結されたときに
// 不具合をさけるためのセーフティネットとして作用する

;(function($, window, document, undefined) {
  // ここでは undefined を ECMAScript 3 における未定義グローバル変数として
  // 使っている. この undefined は可変である (つまり, 任意の場所から
  // 値を変更することが可能). undefined は実際には渡されないので,
  // その値が undefined であることは保証できる
  // ES5 になると, undefined はもはや変更できない

  // window と document をグローバルでなくローカル変数として扱っているのは
  // (わずかとはいえ) 参照を高速化し, より効率よく見ミニファイするため
  // (特にこの2つがプラグインで頻繁に参照される場合に効果がある)

  // いったんデフォルトを作成
  var pluginName = 'defaultPluginName',
      defaults = {
        propertyName: 'value'
      };

  // 実際のプラグインのコンストラクタ
  function Plugin(element, options) {
    this.element = element;

    // jQueryにあるextendメソッドは,
    // 復数のオブジェクトをマージした結果を最初のオブジェクトに保存する.
    // 通常, この最初のオブジェクトには空のオブジェクトを使う
    // このプラグインのインスタンスを追加する際に,
    // デフォルトのオプションが変わってしまうのを避けるため
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype.init = function() {
    // ここに初期化のロジックを書く
    // this.element で DOM要素に, this.opsions でオプションにアクセスできる
  };

  // 復数のインスタンスが作成されることを防止するためのコンストラクタのラッパー
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);

// 使用例
$('#elem').defaultPluginName({
  propertyName: 'a custom value'
});
```

### 6.3 完全なウィジェットファクトリパターン
```javascript
/*!
 * jQuery UI ウィジェットファクトリプラグインのテンプレート
 * Author: @author
 * Further changes: @test
 * Licensed under the MIT license
 */
;(function($, window, document, undefined) {
  // ウィジェットを任意の名前空間で定義する. 引数を設定することも可能.
  // $.widget('namespace.widgetname', (optional));
  // この optional の部分に相当するオブジェクトリテラルは,
  // 継承したい既存ウィジェットのプロトタイプであり,
  // このウィジェットののプロトタイプになる
  $.widget('namespace.widgetname', {
    // Option のデフォルト値
    options: {
      someValue: null
    },
    // ウィジェットのセットアップ（要素作成, テーマ適用, イベントのバインド等）
    _create: function() {
      // このウィジェットが初めて呼びだされたときには, _create が自動的に実行される.
      // ウィジェットの初回設定をするコードをここに記述する
      // そうすると, this.element で要素にアクセスし, ウィジェットが呼び出せる.
      // 上で定義したオプションには
      // this.options this.element.addStuff() でアクセスできる.
    },

    // プラグインのインスタンスを破棄し, ウィジェットにDOMに対して行った変更を取り消す
    destroy: function() {
      // this.element.removeStuff();
      // UI 1.8 では破棄はベースウィジェットから実行しなければならない
      $.widget.prototype.destroy.call(this);
      // UI 1.9 では, 代わりに _destroy を定義する
      // ベースウィジェットに関して気にする必要はない
    },

    methodB: function(event) {
      // _trigger はプラグインのユーザが購読できる, コールバックを発行する
      // シグネチャは次のとおり.
      // _trigger('callbackName', [eventObject], [uiObject])
      // 例: this._trigger('hover', e /* where e.type==='mouseenter' */
      // , {hoverd: $(e.target)});
      this._trigger('methodA', event, {
        key: value
      });
    },
    methodA: function(event) {
      this._trigger('dataChanged', event, {
        key: value
      });
    },

    // ユーザが option メソッドに加えたあらゆる変更に応答する
    _setOption: function(key, value) {
      switch (key) {
        case 'someValue';
          // this.options.someValue = doSomethingwith(value);
          break;
        default:
          // this.options[key] = value;
          break;
      }

      // UI 1.8 では _setOptions はベースウィジェットから主導で起動しなければならない
      $.widget.prototype._setOption.apply(this, arguments);
      // UI 1.9 では代わりに _super を使うことができる
      // this._super('_setOption', key, value);
    }
  });

})(jQuery, window, document);

// 使用例
var collection = $('#elem').widgetName({
  foo: false
});

collection.widgetName('methodB');
```

### 入れ子の名前空間プラグインパターン

グローバル空間における変数やオブジェクト名の衝突を防ぐため, 自分のコードを名前空間に隔離することは,
プラグインを作る際のマナーと言えます. 自分のプラグインの動作だけでなく, それ以外のプラグインの挙動にも
影響を及ぼしかねないからです.

```javascript
/*!
 * 名前空間対応のjQueryプラグインを作成するためのテンプレート
 * Author: @author
 * Further changes: @test
 * Licensed under the MIT lisence
 */
;(function($, window, document, undefined){
  if (!$.myNamespace) {
    $.myNamespace = {};
  }

  $.myNamespace.myPluginName = function(el, myFunctionParam, options) {
    // スコープの問題を避けるために this ではなく base を使う
    // 内部イベントや関数からこのクラスを参照するための変数
    var base = this;

    // 要素へのアクセス方法. jQuery と DOM はそれぞれ以下のとおり
    base.$el = $(el);
    base.el = el;

    // DOMオブジェクトへの逆参照を追加する
    base.$el.data('myNamespace.myPluginName', base);

    base.init = function() {
      base.myFunctionParam = myFunctionParam;

      base.options = $.extend({},
        $.myNamespace.myPluginname.defaultOptions, options);

      // ここに初期化のコードを書く
    };

    // サンプルの関数. 使用する場合はコメントを外す
    base.functionName = function(parameters) {
    };

    // 初期化処理を実行
    base.init();
  };

  $.myNamespace.myPluginName.defaultOptions = {
    myDefaultValue: ''
  };

  $.fn.mynamespace_myPluginName = function(myFunctionParam, options) {
    return this.each(function() {
      (new $.myNamespace.myPluginName(this, myFunctionParam, options));
    });
  }

})(jQuery, window, document);

// 使用例
$('#elem').mynamespace_myPluginName({
  myDefaultValue: 'foobar'
});
```

### 6.5 カスタムイベントプラグインパターン (ウィジェットファクトリと併用)

jQuery UI ウィジェットファクトリパターンでは, 基本的なカスタムイベント方式で発行/購読の機能を実装します
この機能を使うことで, プラグインはアプリ全体からの通知を受け取り, それに対応した応答を実装できるようになります.

```javascript 
/*!
 * jQueryカスタムイベントプラグインのひな形
 * Author: @author
 * Further changes: @test
 * Licensed under the MIT license
 */
// このパターンでは, jQueryのカスタムイベントを使って
// ウィジェットに発行/購読機能を追加する
// 各ウィジェットはある特定のイベントを発行し,
// 他のウィジェットを購読する
// このアプローチによって, 各ウィジェットの疎結合化と
// 機能の独立化が効率よく実現できる.
;(function($, window, document, undefined) {
  $.widget('ao.eventStatus', {
    options: {

    },
    _create: function() {
      var self = this;

      //self.element.addClass('my-widtget');

      // 'myEventStart'を購読
      self.element.on('myEventStart', function(e) {
        console.log('event start');
      });

      // 'myEventEnd'を購読
      self.element.on('myEventEnd', function(e) {
        console.log('event end');
      });

      // 'myEventStart'の購読を中止
      self.element.off('myEventStart', function(e) {
        console.log('unsubscribed to this event');
      });
    },
    destroy: function() {
      $.widget.prototype.destroy.apply(this, arguments);
    },
  });
})(jQuery, window, document);

// イベント通知を発行する
// $('.my-widget').trigger('myEventStart');
// $('.my-widget').trigger('myEventEnd');

// 使用例
var el = $('#elem');
el.eventStatus();
el.eventStatus().trigger('myEventStart');
```

### 6.6 DOMからオブジェクトへのブリッジパターンを使ったプロトタイプ継承

プラグインを生成するプロセス自体からプラグインのロジックを定義するオブジェクトを明確に分離する

__利点__  

- プラグインコードのテストが容易になる
- 同じプラグイン初期化のコードを何度も繰り返して書く必要がないので, DRYの概念が維持できる


```javascript 
/*!
 * jQuery プロトタイプ継承プラグインのひな形
 * Author: Alex Sexton, Scott Gonzalez
 * Further changes: @test
 * Licensed under the MIT license
 */
// myObject - モデル化したい概念を表現するオブジェクト
// (例えば車など)
var myObject = {
  init: function(options, elem) {
    // 渡されたオプションをデフォルトオプションにミックスイン
    this.options = $.extend({}, this.options, options);

    // 要素の参照(jQueryの参照と正規の参照の両方)
    this.elem = elem;
    this.$elem = $elem;

    // DOMの初期構造を構築
    this._build();

    // メソッドチェインに対応させ, 少ないコードでブリッジが使えるように,
    // this を返す.
  },
  options: {
    name: 'No name'
  },
  _build: function() {
    // this.$html.html('<h1>' + this.options.name + '</h1>');
  },
  myMethod: function(msg) {
    // 関連付けられたキャッシュされたjQuery用に直接アクセスできる
    // this.$elem.append('<p>' + msg + '</p>');
  }
};

// Object.create がサポートされているかテストする
// 非サポートのブラウザの場合はフォールバック
if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

// 定義されたオブジェクトをもとにプラグインを作成する
$.plugin = function(name, object) {
  $.fn[name] = function(options) {
    return this.each(function() {
      if (!$.data(this, name)) {
        $.data(this, name, Object.create(object).init(
          options, this
        ));
      }
    });
  }
};
```

### 6.7 jQuery UI ウィジェットファクトリのブリッジパターン

`$.widget.bridge`  
このブリッジは, $.widget を使用して作成された JavaScript オブジェクトと jQuery のコアAPIの間の中間層として機能します. オブジェクトベースのプラグインを定義する際に, より組み込みに近いソリューションが提供されます.  
実際には, カスタムコンストラクタを使ってステートフルなプラグインを作成することができます  
これ以外にも $.widget.bridge はさまざまな機能を提供します  

- 古典的なオブジェクト指向言語に期待されるのと同じ扱いができる, パブリックメソッドとプライベートメソッドの機能（パブリックメソッドは外部からアクセスできますが, プライベートメソッドを外部から呼び出すことはできない）
- 初期化が複数回実行されるのを自動的に防ぐ機能
- 渡されたオブジェクトのインスタンスを自動生成し, 選択領域の内部になる $.data キャッシュに, それらのインスタンスを保持する機能
- 初期化の後でもオプションの値を変更できる機能

```javascript 
/*!
 * jQuery UI ウィジェットファクトリ[ブリッジ]プラグインのひな形
 * Author: @author
 * Futther changes, additional comments: @test
 * Licensed under the MIT license
 */

// 'widgetName' オブジェクトのコンストラクタ
// 必須: この関数には2つの引数を指定します
// options: 設定オプションを表すオブジェクト
// element: インスタンスの作成先になるDOM要素
var wdgetName = function() {
  this.name = 'myWidgetName';
  this.options = options;
  this.element = element;
  this._init();
};

// 'widgetName'のプロトタイプ
widgetName.prototype = {
  // このウィジェットが初めて呼ばれた時に _create が実行される
  _create: function() {
    // 作成コード
  },

  // 必須: 初期化ロジックを _init に書く
  // インスタンスが初めて作成されたとき, そして初期化が完了した後,
  // ウィジェットの初期化が（ブリッジによって）再度行われるとき, このメソッドが呼ばれる
  _init: function() {
    // 初期化コード
  },

  // 必須: ブリッジが使うオブジェクトには 'option' が含まれていなければならない.
  // 初期化の後処理として, オプションを変更するロジックをここに書く
  option: function(key, value) {
    // 省略可: オプションの取得/変更
    // オプションが必要なければ, 初期化の後処理は無視される

    // シグネチャ: $('#foo').bar({cool: false});
    if ($.isPlainObject(key)) {
      this.options = $.extend(true, this.options, key);

    // シグネチャ: $('#foo').options('cool'); - getter
    } else if (key && typeof value === 'undefined') {
      return this.options[key];


      // シグネチャ: $('#foo').bar('option', 'baz', false);
    } else {
      this.options[key] = value;
    }

    // 必須: option は現在のインスタンスを返さなければならない.
    // 要素上のインスタンスを再初期化するときには,
    // 最初にoption が呼ばれ, 次に _init メソッドが連鎖される
    return this;
  },

  // パブリックメソッドにはアンダースコアをつけない.
  publicFunction: function() {
    console.log('public function');
  },
  // プライベートメソッドにはアンダースコアをつける.
  _privateFunction: function() {
    console.log('private function');
  }
};

// 使用例
// 名前空間'foo'において, ウィジェットオブジェクトをjQueryのAPIに結びつける
$.widget.bridge('foo', widgetName);

// 使用するウィジェットのインスタンスを作成する
var instance = $('#foo').foo({
  baz: true
});

// bridgeではパブリックメソッドの呼び出しはできる
// 出力: 'public method'
instance.foo('publicFunction');

// bridgeでは内部メソッドへの呼び出しはできない
instance.foo('_privateFunction');
```

### jQuery Mobile ウィジェットのウィジェットファクトリ

```javascript 
/*!
 * (jQuery Mobile) jQuery UI ウィジェットファクトリのプラグインのひな形
 * (1.8/9+ が対象)
 * Author: @author
 * Further changes: @test
 * Licensed under the MIT license
 */
;(function($, window, document, undefined) {

  // 指定した名前空間にウィジェットを定義する
  // 第1引数には, 名前空間として選んだ 'mobile' が含まれている
  $.widget('mobile.widgetName', $.mobile.widget, {
    // デフォルトとして使うオプション
    options: {
      foo: true,
      bar: false
    },
    _create: function() {
      // このウィジェットが初めて呼ばれたときに _create が自動実行される
      // ここにウィジェットの初期設定コードを記述すれば,
      // ウィジェットが呼ばれた要素は this.element でアクセスできる
      // 上で定義した options は this.options でアクセスできる

      // var m = this.element,
      //     p = m.parents(':jqmData(role="page")'),
      //     c = p.find(':jqmData(role="content")');
    },

    // プライベートのメソッドやプロパティには_(アンダースコア)を付ける
    _dosomething: function() {
      // ...
    },

    // パブリックメソッドは次のように外部から呼べる
    // $('#myelem').foo('enable', arguments);
    enable: function() {
      // ...
    },

    // インスタンス作成されたプラグインを破棄し, DOMに作成されたウィジェットの変更を消し去る
    destroy: function() {
      // this.element.removeStuff();
      // UI 1.8では, destroy はこの基本ウィジェットあｋら呼びだされなければならない.
      $.widget.prototype.destroy.call(this);
      // UI 1.9では, 代わりに _destroy を定義するので, 基本ウィジェットの呼び出しを気にすることはない
    },

    methodB: function(event) {
      // _trigger は, プラグインのユーザが購読できるコールバックを実行開始する

      // シグネチャ: _trigger('callback', [eventObject], [uiObject]);
      // e.g. this._trigger('hover', e /* where e.type === 'mouseenter' */, {hoverd: $(e.target)} );
      this._trigger('methodA', event, {
        key: value
      });
    },

    methodA: function(event) {
      this._trigger('dataChanged', event, {
        key: value
      });
    },

    // option メソッドを用いた変更に応答する
    _setOption: function(key, value) {
      switch(key) {
        case 'someValue';
          // this.options.someValue = doSomethingWith(value);
          break;
        default:
          // this.options[key] = value;
          break;
      }

      // UI 1.8　では _seOption を
      // 基本ウィジェットから呼びださなければならない
      $.Widget.prototype._setOption.apply(this, arguments);
      // UI 1.9 では, 代わりに _super メソッドが使われる
      // this._super('_setOption', key, value);
    }
  });

})(jQuery, window, document);

// 使用例
var instance = $('#foo').widgetName({
  foo: false
});

instance.widgetName('methodB');

// 新規ページが作成される度にプラグインを自動実行できます.
$(document).on('pagecreate', function(e) {
  // ここでは e.target は作成されたページを参照する (pagecreate イベントのターゲットである).
  // このため, 指定したセレクタに合致するページの要素を簡単に検索し,
  // それらのプラグインを呼び出すことができる
  // data-role属性が 'foo' である要素で 'foo' プラグインを呼び出す方法は以下のとおり
  $(e.target).find('jqmData(role="foo")').foo(options);
});
```

### 6.9 RequireJS と jQuery UI ウィジェットファクトリ

- ウィジェットモジュールの依存関係を定義できる. 前に説明したjQuery UIウィジェットのファクトリパターンの先頭に作成される.
- (Underscore.js マクロテンプレート機能を使って) テンプレートのウィジェットを作成する. HTMLテンプレートアセットに渡すアプローチを紹介する
- 後でRequireJS の最適化ツールにウィジェットモジュールを渡せるように, ウィジェットもジュルを調整可能にするヒントが含まれている

```javascript 
/*!
 * jQuery UI ウィジェット + RequireJS モジュールのひな形 (1.8/9+ が対象)
 * Author: @author
 * Licensed under the MIT license
 */

// ジェームズの注釈
//
// RequireJS + jQueryのファイルの使用を前提としている
// 以下のファイルを同じディレクトリに配置しておく.
//
// - require-jquery.js
// - jquery-ui.custom.min.js (ウィジェットファクトリを持つカスタムjQuery UIビルド)
// - templates/
//   - asset.html
// - ao.myWidget.js

// ウィジェットは次のようにして作成できる.

// ao.mywidget.js ファイルの内容:
define('ao.widget', ['jquery', 'text!templates/asset.html', 'underscore',
  'jquery-ui-custom.min'], function($, assetHtml, _) {
  // 指定した名前空間にウィジェットを定義する
  // ここでは「ao」という名前空間を指定している
  $.widget('ao.myWidget', {
    // デフォルトとして使用するオプション
    options: {},

    // ウィジェットの設定（要素の作成, テーマの提供,
    // イベントのバインド, など）を実行する
    _create: function() {
      // このウィジェットが初期設定するコードを記述される.
      // ここにウィジェットを初期設定するコードを記述する
      // this.element で要素にアクセスし, ウィジェットを呼び出すことができる
      // 上で定義したオプションには this.options でアクセスできる.

      // this.element.addStuff();
      // this.element.addStuff();

      // assetHtml と Underscore テンプレーティングは使用できる
      // var template = _.template(assHtml);
      // this.content.append(template({}));
    },

    // プラグインのインスタンスを破棄し, ウィジェットがDOMに加えた変更を消し去る
    destroy: function() {
      // this.element.removeStuff();
      // UI 1.8 では, 基本ウィジェットから destroy を呼びださなければならない
      $.Widget.prototype.destroy.call(this);
      // UI 1.9 では, 代わりに _destroy を定義するので, 基本ウィジェットを気にすることはない
    },

    methodB: function(event) {
      // _trigger はプラグインのユーザが購読できるコールバックを実行開始する
      // シグネチャは次の通り
      // _trigger('callbackName', [eventObject], [uiObject])
      this._trigger('methodA', event, {
        key: value
      });
    },

    methodA: function(event) {
      this._trigger('dataChanged', event, {
        key: value
      });
    },

    // ユーザが option メソッドに加えたあらゆる変更に応答する
    _setOption: function(key, value) {
      switch(key) {
        case 'someValue':
          // this.options.someValue = doSomethingWith(value);
          break;
        default:
          // this.options[key] = value;
          break;
      }

      // UI 1.8 では, 基本ウィジェットから _setOption を起動しなければならない
      $.Widget.prototype._setOption.apply(this, arguments);
      // UI 1.9 では, 代わりに _super メソッドを使うことができる
      // this._super('_setOption', key, value);
    }
  });
});

// 使用例
// index.html のコードは以下のとおり
// <script data-main="script/main" src="require.js"></script>
```

```javascript 
// main.js
require({
  path: {
    'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
    'jqueryui': 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui-.min',
    'boilerplate': '../patters/jquery.widget.factory.require.js.boilerplate'
  }
}, ['reqyure', 'jquery', 'jqueryui', 'boilerplate'],
function(req, $) {
  $(function() {
    var instance = $('#elem').myWidget();
    instance.myWidget('methodB');
  });
});

// ### 6.10 グローバルと呼び出し単位のどちらかでオーバーライドできるオプション（最適なオプションパターン）

// カスタマイズ可能なオプションが豊富なプラグインを開発していると, ユーザがグローバルに, あるいは1回の呼び出し単位で
// オプションをオーバーライド可能にしたくなるかもしれません. これが実現できると, プラグインがさらに使いやすくなります.

// プラグインの名前空間に定義されたオプションオブジェクトを ($.fn.pluginName.options のように) 明示的に参照し,
// これが初めて呼ばれるときに, プラグインに渡されたオプションと結合すれば, ユーザは, プラグインの初期化の際にオプションを
// あるいは, （以下で説明するように）プラグインの外部でオプションをオーバーライドするか, どちらか選択できます.
```

```javascript 
/*!
 * jQuery '最適なオプション'プラグインのひな形
 * Author: @author
 * Further changes: @test
 * Licensed under the MIT license
 */
;(function($, window, document, undefined) {

  $.fn.pluginName = function(options) {

    // オプション指定で「デフォルト」をオーバーライドするための
    // ベストプラクティス.
    // 第2引数では, 通常のデフォルトオブジェクトを渡す代わりに,
    // $.fn.pluginName.options を明示的に参照し,
    // プラグインに渡されたオプションと結合する
    // これによってオプションのオーバーライドをグローバルに実行するか
    // あるいは呼び出し単位で実行するか選べるようになる

    options = $.extend({}, $.fn.pluginName.options, options);

    return this.each(function() {
      var elem = $(this);
    });

    // グローバルにオプションをオーバーライドする方式
    // パブリックにアクセス可能なデフォルトのプラグインのオプション
    // このオプションは, 期待されるすべての値をユーザが渡していない場合に
    // 利用可能になる
    // ユーザにはデフォルト設定が提供されるが,
    // 必要に応じて値をオーバーライドできる.
    // 例: $.fn.pluginName.key = 'otherval'

    $.fn.pluginName.options = {
      key: 'value',
      myMethod: function(elem, param) {
        // ...
      }
    };
  };

})(jQuery, window, document);

// 使用例
$('#elem').pluginName({
  key: 'foobar'
});
```

### 6.11 高度な設定と変更が可能なプラグインのパターン

- グローバルに, あるいは要素のコレクション単位で, オプションをオーバーライドする.
- オプションは, HTML5のdata属性を使って要素単位でカスタマイズする（以下に方法を示す）要素のコレクションに対して data 属性を使ってプラグインの振る舞いを適用可能に, 各要素ごとに異なるデフォルト値を持たせていインスタンス可する必要がなく, インラインでカスタマイズ可能になる

```javascript 
// 後者の方法
// 例として, 大量の要素をドラッグ可能にするプラグインを書くことを考えてみましょう.

$('.item-a').draggable({'defaultposition': 'top-left'});
$('.item-b').draggable({'defaultPosition': 'bottom-right'});
$('.item-c').draggable({'defaultPosition': 'bottom-left'});
// etc...

// インラインで処理を行う方法を使うと, 以下のようなやり方が可能になります.
$('.items').draggable();
```

```html
<div class="item" data-plugin-options="{'defaultPosition': 'top-left'}"></div>
<div class="item" data-plugin-options="{'defaultPosition': 'bottom-left'}"></div>
```

```javascript 
/*!
 * "高度に設定可能な" 可変的プラグインのひな形
 * Author: @author
 * Further changes, comments: @test
 * Licensed under the MIT license
 */

// Alex Sexton による方法と同じく, このパターンでは,
// プラグインのロジックを jQuery のプラグインの中に入れ子にしない
// 代わりに, jQuery をインスタンス化で利用する

;(function($, window, document, undefined) {

  // プラグインのコンストラクタ
  var Plugin = function(elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;

    // 次の行ではHTML5のdata属性を利用して
    // 要素レベルでのプラグインのカスタマイズをサポートしている
    // 使用例
    // <div class="item" data-plugin-option="{'message':'Goodbye World!'}"></div>
    this.metadata = this.$elem.data('plugin-options');
  };

  // プラグインのプロトタイプ
  Plugin.prototype = {
    defaults: {
      message: 'Hello world!'
    },

    init: function() {
      // オブジェクトリテラルを使用することにより, グローバルに,
      // あるいは要素のコレクション単位で, 拡張できるデフォルトを導入する
      this.config = $.extend({}, this.defaults, this.options, this.metadata);

      // 使用例:
      // インスタンスごとにメッセージを設定する
      // $('#elem').plugin({message: 'Goodbye World'});
      // あるいは,
      // var p = new Plugin(document.getElementById('elem'),
      // {message: 'Goodbye world!'}).init();
      // あるいは, グローバルなデフォルトメッセージを設定する.
      // Plugin.default.messsage = 'Goodbye World';

      this.sampleMethod();
      return this;
    },

    sampleMethod: function() {
      // ここでは例として, 現在設定されているメッセージを表示している
      // console.log(this.config.message);
    }
  };

  Plugin.defaults = Plugin.prototype.defaults;

  $.fn.plugin = function(options) {
    return this.each(function() {
      new Plugin(this, options).init();
    });
  };

})(jQuery, window, document);

// 使用例　
$('#elem').plugin({
  message: 'foobar'
});
```

### 6.12 パターン以外にプラグインに必要なものとは？

サードパーティ製のプラグインを選ぶ基準
#### 6.12.1 品質
javaScript と jQuery の両方に関してベストプラクティスを意識してください.
問題のないコードになるように jsHintやjsLintを使っていますか？プラグインは最適化されていますか？

#### 6.12.2 コードスタイル
jQuery コアのスタイルガイドラインのようなコードスタイルのガイドに従っていますか？
従っていない場合, あなたが書いているコードはきれいで読みやすいものですか？

#### 6.12.3 互換性
どのバージョンのjQueryがプラグインに対応していますか？
プラグインは最新のjQueryのgitリポジトリまたは安定版でテストされていますか？ jQuery1.6で属性や
プロパティの扱いが変わったため, jQuery 1.6未満で書かれたプラグインには属性やプロパティに関数る問題が生じる可能性があります.
jQueryの新バージョンではコアライブラリの改修内容を含む向上が図られています. よりより方向を目指しているときには,
問題が発生することもあります

#### 6.12.4 信頼性
プラグインはユニットテストと一緒に配布すべきです.

#### 6.12.5 パフォーマンス
プラグインが広範囲にわたる処理や負担の大きいDOM操作をしなければならない場合には,
ベンチマークのベストプラクティスに従って, こうした負荷を最小にすべきです.

#### 6.12.6 ドキュメント作成
プラグインを使う開発者に望むことがあれば, きちんと文書化しておいてください.
APIやプラグインの使用例, どんなメソッドやオプションがサポートされているのか
ユーザが知っておくべきことは何ですか？
コードにコメントが書かれていると大変役立ちます
あなたの書いたコードが使える, 改善できる, と感じる人が現れたら, よい仕事ができたと言えるでしょう.

#### 6.12.7 メンテナンス性
プラグインをリリースするときに, 保守やサポートに必要となる時間を見積もって下さい
保守に関するプロジェクトの方針をREADMEファイルで述べると良いでしょう


### 6.14 名前空間作成のパターン
アプリケーション開発において, 名前空間は数多くの役割を担っています.
JavaScript では, グローバル名前空間においてオブジェクトや変数が衝突するのを避けるのに役立ちます.
また, コードベースにおける機能ブロックを組織するのに非常に役立ちます.

名前空間をサポートする他の言語にある仕組みは, JavaScriptでは組み込みレベルではサポートされていません.
しかし, オブジェクトとクロージャを使うことで, 同様の仕組みが実現できます.

### 6.15 名前空間作成の基礎
#### 6.15.1 1-グローバル変数
参照のための主要なオブジェクトとして1個のグローバル変数を選ぶやり方です

```javascript
var myApplication = (function(){
  function () {
    // ...
  },
  return {

  };
})();
// 1-グローバルのパターンは, 特定の状況ではうまく機能しますが, 同じグローバル変数名がページの
// 他の箇所で使われていないことを保証するのが大きな課題です.
```

#### 6.15.2 接頭辞による名前空間
一意な接頭辞（次の例ではmyApplication）を選び, それを名前空間として使い, 次のように同じ接頭辞に合わせてメソッドや変数を定義します.

```javascript 
var myApplication_propertyA = {};
var myApplication_propertyB = {};
function myApplication_myMethod() {
  // ...
}
// このパターンの最大の課題は, アプリケーションの成長とともにグローバルオブジェクトの数も増える点です.
```

#### 6.15.3 オブジェクトリテラル記法
オブジェクトリテラル記法を, コロンで区切られたキーと値のペアのコレクションを持つオブジェクトと考えれば,キーは名前区間を表します

```javascript
var myApplication = {
  // 前に説明したとおり, このオブジェクトリテラルに対して機能を簡単に定義できる
  getInfo: function() {
    // ...
  },

  // 他に何かを含むオブジェクト名前空間をサポートすることもできる.
  // 望むものはなんでも.
  models: {},
  views: {
    pages: {}
  },
  collections: {

  }
};

// 名前空間にプロパティを直接追加することもできます.
myApplication.foo = function() {
  return 'bar';
};

myApplication.util = {
  toString: function() {
    // ...
  },
  export: function() {
    // ...
  }
};

// - グローバル名前空間を汚染せずにコードとパラメータを論理的に構造化できる.
// オブジェクトリテラルを使う場合には同盟の変数が存在するか確認できるので, 衝突危険性が著しく減ります.
// 次の例では, 名前空間のオブジェクトが既に存在していないか, さまざまな方法でチェックし,
// 存在しなければ定義します

// グローバル名前空間に「myApplication」が既に存在しているかを確認しない.
var myApplication = {};

// 変数や名前空間の存在を確認する
// 方法1:
var myApplication = myApplication || {};

// 方法2:
if (!myApplication) { myApplication = {} };

// 方法3: (既に初期化されていることが前提)
window.myApplication || (window.myApplication = {});
// または, myApplication || (myApplication = {} );
// 例:
function foo(myApplication) {
  myApplication || (myApplication = {});
}
foo();

// 方法4: (jQueryプラグインを書いているときに役立ちます)
var myApplication = $.fn.myApplication = function() {};
// 例:
var myPlugin = $.fn.myPlugin = function() {}
myPlugin.defaults = {};

// 方法5:
var myApplication = myApplication === undefined ? {} : myApplication;

var namespace = (function() {

  // ローカルスコープを定義する
  var privateMethod1 = function() { /*...*/ };
  var privateMethod2 = function() { /*...*/ };
  var prvateProperty1 = 'foobar';

  return {
    // ここで返すオブジェクトは, 必要に応じて階層を深くできるが,
    // すでに指摘したように, 著者の意見としては,
    // このやり方が最もうまくいくのは,
    // 小規模でスコープが限定されているアプリケーションの場合.
    publicMethod: privateMethod1,
    // パブリックプロパティを持つ入れ子の名前空間.
    properties: {
      publicProperty1: privateProperty1
    },
    // 名前空間をさらに追加
    utils: {
      publicMethod2: privateMethod2
    }
  };

})();

var myConfig = {
  language: 'english',
  defaults: {
    enableGeolocation: true,
    enableSharing: false,
    maxPhotos: 20
  },
  theme: {
    skin: 'a',
    toolbars: {
      index: 'ui-navigation-toolbar',
      pages: 'ui-custom-toolbar'
    }
  }
};
```

#### 6.15.4 入れ子の名前空間
入れ子の名前空間はオブジェクトリテラルパターンの拡張です.

- 衝突の危険性が少ない

```javascript 
var myApp = myApp || {};

// 入れ子のオブジェクトの子を定義する時は同様の存在確認を行う
myApp.routers = myApp.routers || {};
myApp.model = myApp.model || {};
myApp.model.special = myApp.model.special || {};

// 入れ子の名前空間は必要なだけ複雑にできる
// myApp.utilities.charting.html5.plotGraph();
// myApp.modules.financePlanner.getSummry();
// myApp.services.social.facebook.realtimeStrema.getLatest();
```

#### 6.15.5 即時呼び出し関数式（IIFE）
IIFEは実質的には, 定義された直後に即座に呼びだされる無名関数  
文脈の内部からしかアクセスできないので, プライバシーを実現するための簡単な手段を提供する

```javascript
// （無名）即時呼び出し関数式
(function() { /* ... */ })();

// 名前のある即時呼び出し関数式
(function foobar() {/* ... */}());

// 最初の例を少し拡張したバージョン
var namespace = namespace || {};

// 名前空間オブジェクトは関数のパラメータとして渡され,
// そのオブジェクトにパブリックなメソッドとプロパティが設定される
(function(o) {
  o.foo = 'foo';
  o.bar = function() {
    return 'bar';
  };
})(namespace);

console.log(namespace);

// namespace (この例で使用sる名前空間の名前) と undefined を渡し, 次の2点を確認する
// 1. 名前空間はローカルからは変更できるが, 関数の外部からは上書きできない.
// 2. undefiend の値が本当にundefinedであることが保証されれている
// ES5 より前のバージョンではundefined の値が変更できてしまうことに関連する問題を避けるため
;(function(namespace, undefined) {

  // プライベートプロパティ
  var foo = 'foo';
  var bar = 'bar';

  // パブリックなメソッドとプロパティ
  namespace.foobar = 'foobar';
  namespace.sayHello = function() {
    speak('Hello, world');
  };

  // プライベートメソッド
  function speak(msg) {
    console.log('You said: ' + msg);
  }

  // グローバル名前空間に「namespace」が存在しているか確認する
  // 存在しなければ window.namespace にオブジェクトリテラルを代入する

})(window.namespace = window.namespace || {});

// プロパティとメソッドについてのテスト
// パブリック
console.log(namespace.foobar);
// => foobar

namespace.sayHello();
// => hello, world

namespace.foobar2 = 'foobar';

console.log(namespace.foobar2);
// => foobar

// namespace を新機能で拡張する
(function(namespace, undefined) {

  // パブリックメソッド
  namespace.sayGoodbye = function() {
    console.log(namespace.foo);
    console.log(namespace.bar);
    speak('goodbye');
  };

})(window.namespace = window.namespace || {});

namespace.sayGoodbye();
```

#### 6.15.6 名前空間の注入
名前空間の注入は即時呼び出し関数式のもう1つのバリエーションです  
このパターンの利点は, 機能的振る舞いを復数のオブジェクトあるいは名前空間に簡単に適用できる点です  
このパターンの欠点は, 同じ目標を実現できるもっと簡単で最適なアプローチがある点です  

```javascript 
var myApp = myApp || {};
myApp.utils = {};

(function() {
  var val = 5;

  this.getValue = function() {
    return val;
  };

  this.setValue = function(newVal) {
    val = newVal;
  };

  // 下位の名前空間も作成する
  this.tools = {};

}).apply(myApp.utils);

// ユーティリティモジュール経由で定義した tools 名前空間に
// 振る舞いを新規注入する

(function() {
  this.diagnose = function() {
    return 'diagnosis';
  };
}).apply(myApp.utils.tools);

// ここで示した拡張のアプローチは, IIFEにも応用できる
// thisではなく文脈を引数として渡し,
// 渡された文脈を変更するだけでよい

// 使用例
// 作成した名前空間を出力する
console.log(myApp);
console.log(myApp.utils.getValue()); // => 5
// val の値を設定しそれを返す
myApp.utils.setValue(25);
console.log(myApp.utils.getValue()); // => 25
// 他の階層についてもテストする
console.log(myApp.utils.tools.diagnose());

// Angus Croll は, callというAPIを使って文脈と引数を自然に分離する手法を提案しています

// 後から使用できる名前空間を定義ｓるう
var ns = ns || {};
var ns2 = ns2 || {};

// モジュールあるいは名前空間を作成する関数
var creator = function(val) {
  var val = val || 0;

  this.next = function() {
    return val++;
  };

  this.reset = function() {
    val = 0;
  };
};

creator.call(ns);
// ここでは ns.next と ns.reset は存在する

creator.call(ns2, 5000);
// ns2 にも同じメソッドが含まれている
// val の値は5000で上書き
```

### 6.16 高度な名前空間パターン
#### 6.16.1 入れ子の名前空間を自動生成

```javascript 
var application = {
  utilities: {
    drawing: {
      canvas: {
        2d: {
          //...
        }
      }
    }
  }
};
// このパターンの明らかな課題の1つは, 作成したい階層を追加するたびに, トップレベルの名前空間にある
// おやオブジェクトに対する子オブジェクトとして, 別オブジェクトを定義する必要がある点です

// 解決策
// オブジェクトリテラルが代入される最上位の名前空間
var myApp = myApp || {};

// 名前空間の文字列を解析し, 入れ子の名前空間を自動作成する簡易関数
function extend(ns, ns_string) {
  var parts = ns_string.split('.'),
      parent = ns,
      pl;

  pl = parts.length;

  for (var i = 0; i < pl; i++) {
    // 存在していなければプロパティを作成する
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }

  return parent;
}

// 使用例:
// 深い入れ子の名前空間を使って myApp を拡張する
var mod = extend(myApp, 'modules.module2');
console.log(mod === myApp.modules.module2);
extend(myApp, 'moduleA.moduleB.moduleC.moduleD');
extend(myApp, 'longer.version.looks.like.this');
```

#### 6.16.2 依存性宣言パターン
入れ子の名前空間を作成するパターンを少し拡張した「依存性宣言パターン」とでも呼ぶべきパターン  
オブジェクトをローカル参照すれば, 名前解決全体の時間を短縮できることがわかっています.  

```javascript
// 入れ子の名前空間にアクセスする一般的な方法
myApp.utilities.math.fibonacci(25);
myApp.utilities.math.sin(56);
myApp.utilities.drawing.plot(98, 50, 60);

// ローカル/キャッシュの参照を使う
var utlis = myApp.utilities,
    maths = utils.math,
    drawing = utils.drawing;

// 名前空間へのアクセスがより簡単になる
maths.fibonacci(25);
maths.sin(56);
drawing.plot(98, 50, 60);

// 入れ子の名前空間と名前空間のローカル参照との比較は,
// 数千オーダーの呼び出しを実行したときに,
// 性能差が顕著になる点に注意

// * ローカル変数を使うやり方は, 最上位のグローバル（myAppなど）を使うやり方と比べると,
//   ほぼ常に早くなります.
```

#### 6.16.3 深いオブジェクト拡張
名前空間の自動化の代替アプローチとして, 深いオブジェクト拡張があります.  
オブジェクトリテラル記法を使って名前空間を定義すれば, 他の名前空間のオブジェクトを簡単に拡張（マージ）できます  
$.extend  

```javascript 
function extend(destination, source) {
  var toString = Object.prototype.toString;
  var objTest = toString.call({});

  for (var property in source) {
    if (source[property] && objTest === toString.call(source[property])) {
      destination[property] = destination[property] || {};
      extend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
}

console.group('objextend namespacing tests');

// 最上位の名前空間を定義する
var myNS = myNS || {};

// 1. 「utils」オブジェクトで名前空間を拡張
extend(myNS, {
  utils: {

  }
});

console.log('test 1', myNS);
// ここで myNS.utils は存在する

// 2. 復数階層による拡張（namespace.hello.world.wave）
extend(myNS, {
  hello: {
    world: {
      wave: {
        test: function() {
          // ...
        }
      }
    }
  }
});

// 期待どおりに直接代入できることを確認
myNS.hello.test1 = 'this is a test';
myNS.hello.world.test2 = 'this is another test';
console.log('test 2', myNS);

// 3. 追加する名前空間（この例では library）が myNS にすでに含まれる場合はどうなるか？
// 拡張しても名前空間が上書きされないことを保証したい
myNS.library = {
  foo: function() {

  }
};

extend(myNS, {
  library: {
    bar: function() {
      // ...
    }
  }
});

// （期待どおり）安全に拡張されたのを確認
// myNSにはlibrary.foo と library.bar が含まれている
console.log('test 3', myNS);

// 4. 名前空間全体を毎回タイプしないで, 特定の名前空間にアクセスしたい場合
var shorterAcess1 = myNS.hello.world;
shorterAcess1.test3 = 'hello, again';
console.log('test 4', myNS);

console.groupEnd();
```

#### 6.16.4 推奨
オブジェクトリテラルパターンを使って入れ子構造のオブジェクトで名前空間を作成する  
可能であれば, 入れ子の名前空間の自動化で実装する  

