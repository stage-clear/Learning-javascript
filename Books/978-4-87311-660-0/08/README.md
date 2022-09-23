# 第8章 フローベースプログラミング


## 8.1 チェーン

### 8.1.1 レイジーチェーン(遅延実行を行うチェーン)
```js
function LazyChain (obj) {
  this._calls = []
  this._target = obj
}

LazyChain.prototype.invoke = function (methodName /*, 任意の引数 */) {
  var args = _.rest(arguments)
  
  this._calls.push(function (target) {
    var meth = target[methodName]
    
    return meth.apply(target, args)
  })
  
  return this
}

LazyChain.prototype.force = function () {
  return _.reduce(this._calls, function (target, thunk) {
    return thunk(target)
  }, this._target)
}

LazyChain.prototype.tap = function (fun) {
  this._calls.push(function (target) {
    fun(target)
    return target
  })
  return this
}
```

```js
new LazyChain([2,1,3])
  .invoke('concat', [8,5,7,6])
  .invoke('sort')
  .invoke('join', ' ')
  .tap(alert)
  .force()
```


> 後の実行のために動作をラッピングする関数のことを__サンク(thunk)__と呼びます. `229`  

しかし, このようにサンクに直接引数を与えることはただのイカサマに見えるだけではなく, ひどいAPIです. `230`  

### 8.1.2 Promise

`promise`を理解する上で一番シンプルな考え方は、 `promise`は未消化の活動を表しているということです. `234`

```js
var longing = $.Deferred()

longing.promise()
longing.promise().state() //=> 'pending'

longing.resolve('<3')
longing.promise().state() //=> 'resolved'

longing.promise().done(note)
// NOTE: <3
// => promiseを返す
```

```js
function go () {
  var d = $.Deferred()
  
  $.when('')
    .then(function () {
      setTimeout(function () {
        console.log('sub-task 1')
      }, 5000)
    })
    .then(function () {
      setTimeout(function () {
        console.log('sub-task 2')
      }, 10000)
    })
    .then(function () {
      setTimeout(function () {
        d.resolve('done done done done')
      }, 5000)
    })

  return d.promise()
}

var  yearning = go().done(note)
yearning.state()
//=> 'pending'

//(console) 'sub-task1'
yearning.state()
//(console) 'pending'
//=> 'sub-task2'
//(console) '情報: done done done
yearning.state()
//=> 'resolved'
```

## 8.2 パイプライン

チェーンはオブジェクトやメソッド呼び出し周りの「流暢な」APIを構築するために有用なパターンですが, 関数型APIのためにはそこまで有用なわけではありません. `238`  

Underscore は, その関数のほとんどが1つ目の引数にコレクションを取るという特性を活かして `_.chain`でチェーンを実装しています. 対照的に, 本書で定義している関数は1つ目の引数に関数を取ります. これは部分適用とカリー化を用意にするために選択したものです. `238`

メソッドチェーンには, 様々な欠点が存在します. `238`
- オブジェクトの`set`と`get`のロジックが堅く連結されてしまうこと(コマンドとクエリの分離)
- ぎこちないネーミングの問題
- ひとつの呼び出しから次の呼び出しに移る際に, 共通の参照を変更してしまう

理想的には, 関数に渡されたオリジナルのデータは実行後もオリジナルのまま残るべきです. 関数型のコードにおけるチェーンは, 期待されるデータ値が入力されると, 非破壊的変換を行い, そして, 新しいデータを返す動作が最初から最後まで連続するものです. (238)

```javascript
// 例) 「間違った」API
pipeline([2,3,null,1,42, false]
  , _.compact
  , _.initial
  , _.rest
  , rev);

// このパイプラインで行われる連続処理
// 1. 配列[2,3,null,1,42,false]を引数に取り, _.compact関数に渡す
// 2. _.compact 関数の戻り値を _.initial に渡す
// 3. _.initial 関数の戻り値を _.rest 関数に渡す
// 4. _.initial 関数の戻り値を rev 関数に渡す

rev(_.rest(_.initial(_.compact([2,3,null,1,42,false]))));
```

JavaScriptにおけるパイプラインは, かりーかや部分適用と一緒に使用されることにより「流暢な」作法を持つ関数を合成する手段を提供します.

コードは読みやすいように書くべきであるというのが私の持論です. `243`  

関数プログラミングは, ある関数から次の関数へ流れるにしたがってデータを変換することに焦点を当てているものの, 関節参照や入れ子関数によってその焦点が曖昧になってしまいます. パイプラインを使うことに寄る追加のアドバンテージとして, 曖昧になりがちなデータフローがより明確になります. しかし, パイプラインはすべての場合において適切な選択肢ではありません.
たとえば, I/OやAjaxコール,そして変異のように副作用を伴うような場面ではプイプラインを使うことはほとんどありません. 戻り値がないケースが多いからです. `243`  


## 8.3 データフロー対コントロールフロー (制御構造)

問題は, もし形(型や構造)が一致しなければ,  `pipeline`も`_.compose`も, もしっくは`lazyChain`も期待通りの動作を行わないということです. `246`  


### 8.3.1 共通の形をみつける

```js
/**
 * @param {Function} 値を与えられて何かのアクションの結果を提供する関数
 * @param {Function} 新しいstateを提供する関数
 */
function lift (answerFun, stateFun) {
  return function (/* 任意の数の引数 */) {
    var args = _.toArray(arguments)
    
    return function (state) {
      var ans = answerFun.apply(null, construct(state, args))
      var s = stateFun ? stateFun(state) : ans
      
      return { answer: ans, state: s }
    }
  }
}
```

```js
var mSqr2 = lift(sqr)
var mNote2 = lift(note, _.identity)
var mNeg2 = lift(function(n) { return -n})
```


持っていて便利なデータといえば, 状態か, もしくは処理間で共通のターゲットオブジェクトと言えるでしょう. `247`  

`actions` 関数にみられるような合成の考え方を使うことは, 異なる形をもつ関数を合成するための一般的な手段です. `251`  


### 8.3.2 アクションの生成をシンプルにする関数

liftとactionsを使ってスタック動作を行う関数stackActionを実装できます. `254`  

```javascript
// Push
// スタックに扮した配列を新に生成し, その配列を返します.
// 配列の先頭には新な値を格納しています.
// 中間状態がanswerでもあるので, stateFun関数を与える必要はりません.
var push = lift(function(stack, e){ return construct(e, stack)});

// Pop
// 配列を使ってスタックのシミュレーションを行っているため
// answerFunは最初の要素を取得する関数_.firstです
// stateを返すstateFunは, 一番上の要素を除いた新しいスタックを返す_.restです
var pop = lift(_.first, _.rest);

// これら2つの関数を使って, 例えば次のようにpushを2回, popを1回行うアクションを合成できます
var stackAction = actions([push(1), push(2), pop()],
  function(values, state){
    return values;
  });

```

## 8.4 まとめ

__メソッドチェーン__  

this参照のみを返すオブジェクトメソッドを書くことによって, ルールを共有するメソッドを
連続して呼ぶことが出来る仕組み.

__レイジーチェーン__  

ある共通のターゲットに対していくつかの連続したメソッド呼び出しを遅延実行するための考え方

__パイプライン__  

一方からデータを入力すると, 変換されたデータを反対側から出力するような関数呼び出しの連続.
チェーンとは異なり, 共通の参照ではなく, 配列やオブジェクトといったデータを扱う.
パイプラインのデータは 次の関数が受け取ることがでくるのであればパイプラインの途中で変更することも出来ます.
パイプラインは純粋性を持つため, パイプラインに与えられるデータの元データが破壊されることはありません.

チェーンとパイプラインは両方共既知の参照もしくはデータ型を扱いますが, 
アクションの連続という考え方はデータ型に制限されることはありません.
そのかわり, `actions`関数を型として実装して, 内部のデータ構造を管理詳細を隠蔽し, 
異なる型の引数を取り, 異なる型の値を返す関数をミックスするために使いました. 
`255`
