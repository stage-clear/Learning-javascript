# 5 jQueryのデザインパターン

## 5.1 コンポジットパターン

- オブジェクトの単一インスタンスと同じ方法で, オブジェクトのグループを扱えるようにする.
- 扱うオブジェクト1個だろうと1000個だろうと, 同じ振る舞いになる. 
- jQueryでは, 1個の要素にメソッドを適用するときも, 要素のコレクションに適用するときもどちらの選択結果もjQueryオブジェクトが帰るので統一された方法で扱えます.

```javascript
// 単一の要素
$('#singleItem').addClass('active');
// 要素のコレクション
$('div').addClass('active');


var test = {
  addClass: function(value) {
    var classNames, i, l, elem, setClass, c, cl;

    if ($.isFunction(value) ) {
      return this.each(function(j) {
        $(this).addClass(value.call(this, j, this.className));
      });
    }

    if (value && typeof value === 'string') {
      classNames = value.split(rspace);

      for (i = 0, l = this.length; i < l; i++) {
        elem = this[i];
        if (elem.nodeType === 1) {
          if (!elem.className && classNames.length === 1) {
            elem.className = value;
          } else {
            setClass = ' ' + elem.className + ' ';
            for ( c = 0, cl = classNames.length; c < cl; c++) {
              if (!~setClass.indexOf(' '+classNames[c] + ' ')) {
                setClass += classNames[c] + ' ';
              }
            }
            elem.className = $.trim(setClass);
          }
        }
      }
    }
    return this;
  }
}
```

## 5.2 アダプタパターン

- あるオブジェクトやクラスのインターフェイスを, 特定のシステムと互換性のあるインターフェイスに変換する.
- インターフェイスに互換性がなくオブジェクトやクラスが相互連携できない場合に連携させられる
- アダプタはアダプタのインターフェイス呼び出しをオリジナルのインターフェイス呼び出しに変換します.

> 「1つの入力で, 復数のバリエーションに対応し, 同じ表現を実現する.」

```javascript
// jQueryの例
// jQueryの $.fn.css メソッドはよく使われますが, これはアダプタの一例です.
// 多くのブラウザに対して統一された方法でスタイルが適用できるように, インターフェイスが正規化されています
// ブラウザに依存しない透明度
// opacity: 0.9; (modern)
// filter: alpha(opacity=90); (IE6-8)

// 透明度を設定
$('.container').css({opacity: .5});

これを実現するjQueryコアcssHookは以下の通りです

var test = {
  get: function() {
    // IEは透明度にフィルタを仕様
    return ropacity.test((
      computed && elem.currentStyle ?
        elem.currentStyle.fillter : elem.style.filter) || '') ?
    (parseFloat(RegExp.$1) / 100) + '' :
      computed ? '1' : '';
  },
  set: function(elem, value) {
    var style = elem.style,
        currentStyle = elem.currentStyle,
        opacity = $.isNumeric(value) ?
          'alpha(opacity='+ value * 100 +')' : '',
        filter = currentStyle && currentStyle.filter || style.filter || '';

    // IEではレイアウトがないと透明度に問題が発生するので,
    // ズームレベルを強制的に1にする
    style.zoom = 1;

    // 透明度の設定値が1で, 他にフィルタが存在しないときには,
    // filter属性の削除を試みる
    if (value >= 1 && jQuery.trim(filter.replace(ralpha, '')) === '') {
      // style.filter に null, '' あるいは ' ' を設定しても,
      // cssText に 'filter:'があると 'filter:' が残り, clearType は無効になる
      // この style.removeAttribute は IE限定なので使用を避けたいが,
      // このコードに至る経緯は明白である...
      style.removeAttribute('filter');

      // 通用するfilterスタイルが CSSルールになければ, 処理を終了する
      if (currentStyle && !currentStyle.filter) {
        return ;
      }
    }

    // それ以外の場合は, 新しいフィルタの値を設定する
    style.filter = ralpha.test(filter) ?
      filter.replace(ralpha, opacity) :
      filter + ' ' + opacity;
  }
};
```

## 5.3 ファサードパターン

- （複雑になる可能性がある）大きなコード本体に対して, 単純な抽象インターフェイスを提供する.

```javascript

// 以下に示すのは jQuery の $.ajax() のファサード
$.get(url, data, callback, dataType);
$.post(url, data, callback, dataType);
$.getJSON(url, data, callback);
$.getScript(url, callback);

// $.get()
$.ajax({
  url: url,
  data: data,
  dataType: dataType
}).done(callback);

// $.post()
$.ajax({
  type: 'POST',
  url: url,
  data: data,
  dataType: dataType
}).done(callback);

// $.getJSON()
$.ajax({
  url: url,
  data: data,
  dataType: dataType,
}).done(callback);

// $.getScript()
$.ajax({
  url: url,
  dataType: 'script',
}).done(callback);

// さらに興味深いことに, 上記のファサードはまさにファサードそのものであり, 複雑さを舞台裏に隠します
function createStandardXHR() {
  try {
    return new window.XMLHttpRequest();
  } catch(e) {

  }
}

function createActiveXHR() {
  try {
    return new window.ActiveXObject('Microsoft.XMLHTTP');
  } catch(e) {

  }
}

// リクエストオブジェクトを作成
$.ajaxSettings.xhr = window.ActiveXObject ?
  /* Microsoft の IE7では XMLHttpRequestが適切に実装されていない
   * (ローカルファイルをリクエストできない)ので
   * 可能であればActiveXObject を利用する.
   * また, XMLHttpRequest はIE7/IE8で無効化されることがあるのでフォールバックが必要
   */
   function() {
    return !this.isLocal && createStandardXHR() || createActiveXHR();
   } :
   // 他のブラウザに関しては, 標準のXMLHttpRequest を利用する
   createStandardXHR;
```

## 5.4 オブザーバパターン

```javascript
// subscribe(topicName, callback) に相当
$(document).on('topicName', function() {
  // ,, なんらかの動作を行う
});

// publish(topicName) に相当
$(document).trigger('topicName');

// unsubscribe(topicName) に相当
$(document).off('topicName');


// jQueryでの実装
$.event = {
  add: function(elem, types, handler, data, selector) {
    var elemData, eventHandle, events,
        t, tns, type, namespaces, handleObj,
        handleObjIn, quick, handlers, special;

    // ...

    // 初回は, 要素のイベント構造とメインハンドラを初期化する
    events = elemData.events;
    if (!events) {
      elemData.events = evnets || {};
    }

    // ...

    // スペースで区切られた復数のイベントを取り扱う.
    // 例: jQuery(...).bind('mouseover mouseout', fn);
    types = jQuery.trim(hoverHack(types)).split(' ');
    for (t = o; t < types.length; t++) {
      // ...
      // 初回は, イベントキューを初期化する
      handlers = events[type];
      if (!handlers) {
        handlers = events[type] = [];
        handlers.delegateCount = 0;

        // この特別なイベントハンドラが false を返したら
        // addEventListener か attachEvent だけを使用する
        if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
          // グローバルイベントハンドラを要素にバインドする.
          if (elem.addEventListener) {
            elem.addEventListener(type, eventHandle, false);
          } else if (elem.attachEvent) {
            elem.attachEvent('on' + type, eventHandle);
          }
        }
      }
    }
  }
};
```

オブザーバパターンでの慣例的な命名規則を使いたい人のために, ベン・アルマンは, `$.publish` , `$.subscribe` , `$.unsubscribe` でアクセスできる上記のメソッドの簡単なラッパーを作成しました.

```javascript
(function($) {
  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };
})(jQuery);
```

jQueryの最近のバージョンでは, 多目的のコールバックオブジェクト `jQuery.Callbacks` が利用可能になり, コールバックリストに基づく新手法でコードが書けるようになりました. 発行/購読システムはこの機能を知った新手法の1つです.

```javascript
var topics = {};
jQuery.Topic = function(id) {
  var callbacks,
      topic = id && topics[id];

  if (!topic) {
    callbacks = jQuery.Callbacks();
    topic = {
      publish: callbacks.fire,
      subscribe: callbacks.add,
      unscribe: callbacks.remove
    };
    if (id) {
      topics[id] = topic;
    }
  }
  return topic;
};

var fn1 = function(val) {
  console.log(val);
  return false;
};

var fn2 = function(val) {
  fn1('fn2 says: ' + val);
  return false;
};

// 使用例
// Subscribers
$.Topic('mailArrived').subscribe(fn1);
$.Topic('mailArrived').subscribe(fn2);
$.Topic('mailSent').subscribe(fn1);

// Publisher
$.Topic('mailArrived').publish('hello, world!');
$.Topic('mailSent').publish('Woo! mail');

// 'mailArrived' 通知が発行されると, fn1 と fn2に'hello, world' がプッシュされる
// 'mailSent'通知が発行されると, fn1 に 'woo! mail'がプッシュされる

// 出力
// hello, world
// fn2 says: hello world
// woo mail!
```

## 5.5 イテレータパターン

- イテレータパターンとは, イテレータが集約オブジェクトの各要素に順にアクセスするデザインパターン
- イテレータは, その内部の構造を明かす必要はありません

> イテレータパターンはファサードの特殊なパターンとみなすことがでます. イテレーションに関する問題を明示的に扱うファサードです.

```javascript
$.each(['john', 'dave', 'rick', 'julian'], function(index, value) {
  console.log(index + ' ' + value);
});

// 以下に表すのは, `jQuery.fn.each()` のコードです
// 合成した全要素に対してコールバックを実行する
var fn = {
  each: function(callback, args) {
    return jQuery.each(this, callback, args);
  }
};

// この後に `jQuery.each()` が続きます.
var obje = {
  each: function(object, callback, args) {
    var name, i = 0,
        length = object.length,
        isObj = length === undefined || jQuery.isFunction(object);

    if (args) {
      if (isObj) {
        for (name in object) {
          if (callback.apply(object[name], args) === false) {
            break;
          }
        }
      } else {
        for ( ; i < length;) {
          if (callback.apply(object[i++], args) === false) {
            break;
          }
        }
      }
    // 最もよく使われる each の特殊高速バージョン
    } else {
      if (isObj) {
        for (name in object) {
          if (callback.call(object[name], name, object[name]) === false) {
            break;
          }
        }
      } else {
        for ( ; i < length) {
          if (callback.call(object[i], i, object[i++]) === false) {
            break;
          }
        }
      }
    }
    return object;
  }
}
```

## 5.6 遅延初期化

- 遅延初期化は, インスタンスが実際に必要とされるタイミングまで重い処理の実行を遅らせるデザインパターン.
- `jQuery.ready()` 関数がこれに相当します.

```javascript
// 使用例
$(document).ready(function(){
  // ajax要求はDOMが準備完了するまで実行されない
  var jqxhr = $.ajax({
    url: 'http//domain.com/api/',
    data: 'fdsajfksda'
  }).done(function(data){
    $('.status').html('connect loaded');
    console.log('Data output: ' + data);
  });
});
```

`jQuery.fn.ready()` は,以下に示す `jQuery.bindReady` によって制御されます.

```javascript
var fn = {
  bindReadh: function() {
    if (readyList) {
      return ;
    }
    readyList = jQuery.Callbacks('once memory');

    // ブラウザイベントが発生した後に, $(document).ready() が呼びだされるケースを補足
    if (document.readyState === 'complete') {
      // スクリプトがready を遅延処理でkるように非同期で処理する
      return setTimeout(jQuery.ready, 1);
    }

    // Mozilla, Opera, webkitはこのイベントをサポートする
    if (document.addEventListener) {
      // 便利なイベントコールバックを利用する
      document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);

      // window.onload は常に動作するので, これをフォールバックに利用する
      window.addEventListener('load', jQuery.ready, false);
    } else {
      // onloadの前にイベントが発行されるのを保証する.
      // タイミングが遅いかもしれないが, iframes でも安全.
      document.attachEvent('onload', jQuery.ready);

      // IEでかつフレームでない場合, document が ready かどうかのチェックを継続する
      var toplevel = false;

      try {
        toplevel = window.frameElement = null;
      } catch(e) {

      }

      if (document.documentElement.doScroll && toplevel) {
        doScrollCheck();
      }
    }
  }//,
};
```

## 5.7 プロキシパターン

- オブジェクトの背後で行われるアクセスやコンテキストを制御しなければならないときプロキシパターンが役立ちます.
- 重いオブジェクトをインスタンス化するタイミングを制御したり, オブジェクトを参照するための高度な方法を習得したり, といったことがプロキシを使うことで可能になる


```javascript
// `proxy()` メソッドは, 関数を入力として受け取り, 常に固有のコンテキストを持つ関数を新規作成して返します.

// プロキシが役立つ場面の例として, click イベントハンドラ内でのタイマーのりようが挙げられます.
// 次のように, 既にハンドラがあることを想定しています.
$('button').on('click', function() {
  // この関数内での this はクリックされた要素を参照する
  $(this).addClass('active');
});

// acitveクラスの追加を遅延させたければ, `stTimeout()` を利用できるかもしれません
// 残念ながら, この方法にはちょっとした問題があります. setTimeout に渡された関数の中で使われている this が違うからです
// this は, 期待に反して window を参照してしまいます

$('button').on('click', function() {
  setTimeout(function() {
    // thisは要素を参照していない
    // window を参照している
    $(this).addClass('active');
  });
});
```

この問題は, `jQuery.proxy()` を使ってプロキシパターンを実装すれば対処できます.
関数とthis に代入したい値で `jQuery.proxy()` を呼び出すと, 正しいコンテキストでその値を保持する関数が返されます.

```javascript
$('button').on('click', function(){
  setTimeout($.proxy(function() {
    // thisは期待通り
    $(this).addClass('active');
  }, this), 500);
  // this にDOMを参照させたいことを最後の引数のthis で $.proxy に伝える
});
```

jQuery の `jQuery.proxy()` の実装は次のとおりです.

```javascript
var fn = {
  // 関数をコンテキストにバインドし, 引数があれば部分適用する
  proxy: function(fn, context) {
    if (typeof context === 'string') {
      var tmp = fn[context];
      context = fn;
      fn = tmp;
    }

    // 対象が呼び出し可能かチェックする
    // 使用では TypeError を投げるが, ここでは単に undefined を返す
    if (!jQuery.isFunction(fn)) {
      return undefined;
    }

    // bindのシミュレーション
    var args = slice.call(arguments, 2);
    var proxy = function() {
      return fn.apply(context, args.concat(slice.call(arguments)));
    };

    // ハンドラのguid を元のハンドラに設定する
    // これでハンドラが削除可能になる
    proxy.guid = fn.guid = fn.guid || proxy.guid || jQyery.guid++;
    return proxy;
  }
}
```

## 5.8 ビルダーパターン

- オブジェクトに依存せずに複雑なDOMオブジェクトを組み立てる仕組みがあると, 柔軟性が得られる
- ビルダーを利用すると, オブジェクトの型と内容を指定するだけで, オブジェクトの作成や取得の処理を隠蔽しつつ, 複雑なオブジェクトを作成できます.

jQuery のドル記号(`$`)はまさにこれを実現しています.
要素の完全なマークアップを渡すか, マークアップの一部とその内容を渡すか, あるいは jQuery を使ってオブジェクトを作成するか,
さまざまな方法で jQuery(あるいはDOM)オブジェクトを動的に新規作成できます

```javascript
// 使用例
$('<div class="foo">bar</div>');

$('<p id="test">foo <em>bar</em>').append('body');

var newParagraph = $('<p />').text('Hello, world');

$('<input />')
  .attr({'type':'text', 'id':'sample'})
  .appendTo('#container');
```

以下にjQueryコアの内部メソッド `jQuery.prototype` の一部を示します
jQuery() セレクタに渡されたマークアップからjQueryオブジェクトを作成します.
`document.createElement` を使って要素を新規作成するかどうかに関係なく, `.attr()` などのメソッドが後から簡単に要素にアクセスできるように要素への参照を戻り値のオブジェクトに追加します

```javascript
// 処理: $(html) -> $(array)
  if (match[1]) {
    context = context instanceof jQuery ? context[0] : context;
    doc = (context ? context.ownerDocument || context : document);

    // 文字列が渡され, その文字列が単一タグの場合,
    // createElementを実行し, 残りの処理は行わない
    ret = rsingleTag.exec(selector);

    if (ret) {
      if (jQuery.isPlainObject(context)) {
        selector = [document.createElement(ret[1])];
        jQuery.fn.attr.call(selector, context, true);
      } else {
        selector = [doc.createElement(ret[1])];
      }
    } else {
      ret = jQuery.buildFragment([match[1]], [doc]);
      selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes;
    }
    return jQuery.merge(this, selector);
  }
```
