/*
 * Splat (-2)
 * 新な関数を生成してそれを戻り値として返します
 * @param {Function} fun
 * @returns {Function} <Delegate>
 */
function splat(fun) {
  return function(array) {
    return fun.apply(null, array);
  };
}

/*
 * Unsplat (-3)
 * 関数を引数にとり別の関数を返します
 * @param {Function} fun
 * @returns 
 */
function unsplat(fun) {
  return function() {
    return fun.call(null, _.toArray(arguments));
  }
}

// splatの実装例)
var addArrayElements = splat(function(x, y) { return x + y; });
addArrayElements([1, 2]);

function fail (thing) {
  throw new Error(thing);
}

function warn (thing) {
  console.log(['警告: ', thing].join(''));
}

function note (thing) {
  console.log(['情報: ', thing].join(''));
}

function not(x) {
  return !x;
}

/*
 * Existy
 * 非等値演算子(!=)を使うことで, null/undefinedを区別できる
 * @param {Any} x
 * @returns {Boolean}
 */
function existy(x) {
  return x != null;
}

/*
 * Truthy
 * 与えられた引数が true であるかどうか
 * @param {Any} x
 * @returns {Boolearn}
 */
function truthy(x) {
  return existy(x) && x !== false;
}

function doWhen(cond, action) {
  if (truly(cond)) {
    return action();
  } else {
    return undefined;
  }
}

function executeIfHasField(target, name) {
  return doWhen(existy(target[name]), function() {
    var result = _.result(target, name);
    console.log('結果は', result.join(''));
    return result;
  });
}

/*
 * IsIndexed (-16)
 * 渡された引数のデータ型が `Array` もしくは `String` であるかどうか
 * @param {Array|String} data
 * @returns {Boolean}
 */
function isIndexed(data) {
  return _.isArray(data) || _.isString(data);
}

/*
 * Nth (-16)
 * 配列から任意のインデックス番号の要素を取り出す
 * @param {Array} a
 * @param {Number} index
 * @returns {Any}
 */
function nth(a, index) {
  if (!_.isNumber(index)) fail('インデックスは数値である必要があります');
  if (!isIndexed(a)) fail('インデックス指定可能ではないデータ型はサポートされていません');
  if ((index < 0) || (index > a.length -1)) fail('指定されたインデックスは範囲外です');
  return a[index];
}

/*
 * Second (-17)
 * 配列の2番目の要素を返す
 * @param {Array}
 * @returns {Any}
 */
function second(a) {
  return nth(a, 1);
}

/*
 * Double All (-47)
 * 数値をすべて2倍する
 * @param {Array} array
 */
function doubleAll(array) {
  return _.map(array, function(n) {return n*2});
}

/*
 * Average (-47)
 * @param {Array} Array [Number]
 */
function average(Array) {
  var sum = _.reduce(array, function(a, b) {
    return a + b;
  });
  return sum / _.size(array);
}

/*
 * Only Even (-47)
 * @param {Array} array
 */
function onlyEven(array) {
  return _.filter(array, function(n) {
    return (n%2) === 0;
  });
}

/*
 * Div (-50)
 * 割り算
 * @param {Number} x
 * @param {Number} y
 * @returns {Number}
 */
function div(x, y) {
  return x / y;
}

/*
 * All Of (-50)
 * @param {Function} arguments
 *
 */
function allOf(/* 1つ以上の関数 */ ) {
  return _.reduce(arguments, function(truth, f) {
    return truth && f();
  }, true);
}

/*
 * Any Of (-50)
 * @param {Function} arguments
 */
function anyOf(/* 1つ以上の関数 */) {
  return _.reduceRight(arguments, function(truth, f) {
    return truth || f();
  }, false)
}

/*
 * Complement (-52)
 * プレディケートを引数に取り, (委譲先より)真偽値を反転して返す
 *  @param {Function} pred <Predicate>
 *  @returns {Function} <Delegate>
 */
function complement(pred) {
  return function() {
    return !pred.apply(null, _.toArray(arguments));
  }
}

/*
 * Cut (-55)
 * 復数の配列を結合する
 * @param {Array} arguents {[Array], [Array] ...}
 * @returns {Array}
 */
function cat(/* いくつかの配列 */) {
  var head = _.first(arguments);
  if (existy(head)) {
    return head.concat.apply(head, _.rest(arguments));    
  } else {
    return [];
  }
}

/*
 * Construct (-55)
 * `head`を先頭にして, `tail`と結合する
 * @param {Any} head
 * @param {Array} tail
 * @returns {Array}
 */
function construct (head, tail) {
  return cat([head], _.toArray(tail));
}

/* 
 * Mapcat <作用的な関数の例> (-55)
 * (coll)で渡された配列の値それぞれに(fun)を実行する
 * @param {Function} fun
 * @param {Array} coll
 */
function mapcat (fun, coll) {
  return cat.apply(null, _.map(coll, fun));
}

/*
 * ButLast (-56)
 * (coll)で渡された配列の最後の値を除外して返す
 * @param {Array} coll
 * @returns {Array}
 */
function butLast(coll) {
  return _.toArray(coll).slice(0, -1);
}

/*
 * Interpose <作用的な関数の例> (-56)
 * (coll)で渡された配列の要素の間に, (inter)で指定された要素を加える
 * @param {Any} inter
 * @param {Array} coll
 * @returns {Function} <Delegate>
 */
function interpose(inter, coll) {
  return butLast(mapcat(function(e) {
    return construct(e, [inter]);
  }, coll));
}

// 実装例)
interpose(',', [1,2,3]);
// => [1,',',2,',',3]

// (-60)
var library = [
  {title: 'SICP', isbn: '026201771', ed: 1},
  {title: 'SICP', isbn: '026201772', ed: 2},
  {title: 'Joy of Clojure', isbn: '4738942734', ed:1}];

/*
 * Project (-62)
 * @param {Object} table <Map>
 * @param {} keys
 */
function project(table, keys) {
  return _.map(table, function(){
    return _.pick.apply(null, construct(obj, keys));
  });
}

/*
 * Rename (-64)
 * @param {Object} obj
 * @param {Object} newNames
 */
function rename(obj, newNames) {
  return _.reduce(newNames, function(o, nu, old) {
    if (_.has(obj, old)) {
      o[nu] = obj[old];
      return o;
    } else {
      return o;
    }
  },
  _.omit.apply(null, construct(obj, _.key(newNames))));
}

/*
 * As (-64)
 * @param {Object} table <Map>
 * @param {Object} newNames
 * @returns {Object}
 */
function as(table, newNames) {
  return _.map(table, function(obj){
    return rename(obj, newNames);
  });
}

/*
 * Restrict (-65)
 * @param {Object} table <Map>
 * @param {Function} pred
 */
function restrict(table, pred) {
  return _.reduce(table, function(newTable, obj) {
    if (truthy(pred(obj))) {
      return newTable
    } else {
      return _.without(newTable, obj);
    }
  });
}

/*
 * Rpeat (-102)
 * (value)で渡された値を(times)の回数繰りし出力する
 * @param {Number} times
 * @param {Any} value
 */
function repeat(times, value) {
  return _.map(_.range(times), function(){ return value; });
}

/*
 * Rpeatedly (-102)
 * (fun)で渡された処理を(times)回繰り返し実行する
 * @param {Number} times
 * @param {Function} fun
 * @returns {Any}
 */
function repeatedly(times, fun) {
  return _.map(_.range(times), fun);
}

/*
 * Always (-107)
 * 定数を返す関数
 * (このような関数はよくシンプルに`k`と呼ばれますがここではわかりやすく`always`と呼ぶ)
 * @param {Any} value
 * @returns {Function} <Delegate>
 * [combinator]
 */
function always (value) {
  return function() {
    return value;
  }
}

/*
 * Invoker (-107)
 * メソッドを引数に取り, ターゲットとなるオブジェクトでそのメソッドを実行する
 * @param {String} name
 * @param {String} method
 * @returns {Function} <Delegate>
 */
function invoker (name, method) {
  return function (target /* 任意の数の引数 */) {
    if (!existy(target)) fail('Must provide a target');
    
    var targetMethod = target[name];
    var args = _.rest(arguments);

    return doWhen((existy(targetMethod) && method === targetMethod), function(){
      return targetMethod.apply(target, args);
    });
  }
}
// invokerの実装例 (-107)
var rev = invoker('reverse', Array.prototype.reverse);

/*
 * Fnull
 * 与えられた関数の実行前に, 引数うに`null`か`undefined`が
 * 入っていないかを確認しいずれかが見つかった場合は, 
 * これらをデフォルトの値に書き換えて, 新しい引数を使って元の関数を実行する
 * @param {Function} fun
 * @param {Any} arguments
 * @returns {Function} <Delegate>
 */
function fnull(fun /*, 1つ以上のデフォルト値 */) {
  var defaults = _.rest(arguments);
  return function(/* args */) {
    var args = _.map(arguments, function(e, i) {
      return existy(x) ? e : defaults[i];
    });
    return fun.apply(null, args);
  }
}

/*
 * Checker
 * それぞれのプレディケート関数が実行されるたびにerrs配列に値が追加される
 * @param {Function} arguments <Predicate>
 * @returns {Function} <Delegate>
*/
function checker(/* 1つ以上の検証関数 */) {
  var validators = _.toArray(arguments);

  return function(obj) {
    return _.reduce(validators, function(err, check) {
      if (check(obj)) {
        return err;
      } else {
        return _.chain(errs).push(check.message).value();
      }
    }, []);
  }
}

/*
 * Validator
 * (fun)で渡された要素を検証する
 * @param {String} message
 * @param {Function} fun <Predicate>
 * @returns {Function} 
*/
function validator (message, fun) {
  var f = function() {
    return fun.apply(fun, arguments);
  };
  f['message'] = message;
  return f;
}

var gonnaFial = checker(validator('ZOMG!', always(false)));
gonnaFail(100);
// => ['ZOMG!']

function aMap(obj) {
  return _.isObject(obj);
}

function hasKeys() {
  var keys = _.toArray(arguments);
  
  var fun = function(fun) {
    return _.every(keys, function(k) {
      return _.has(obj, k);
    });
  };
  
  fun.message = cat(['これらのキーが存在する必要があります'], keys).join(' ');
  return fun;
}

///// 5章 関数を組み立てる関数

/*
 * Dispatch
 * 1. ターゲットが存在することを確認する
 * 2. JavaScriptネイティブメソッドの存在を確認し,存在する場合はそのメソッドを仕様する
 * 3. ネイティブメソッドが存在しない場合は, 動作を実装し, 決められたタスクを行う
 *    - 該当する場合, 特定の型に依存したタスクを実行
 *    - 該当する場合, 特定の引数に依存ししたタスクを実行
 *    - 該当する場合, 引数の数に依存したタスクを実行
 *
 * @param {Function} arguments
 * @returns {Function} (target [, args... ]) <Delegate>
*/
function dispatch (/* 任意の数の関数 */) {
  var funs = _.toArray(arguments);
  var size = funs.length;
  
  return function(target /*, 追加の引数 */) {
    var ret = undefined;
    var args = _.rest(arguments);

    for (var funIndex = 0; funIndex < size; funIndex++) {
      var fun = funs[funIndex];
      ret = fun.apply(fun, construct(target, args));
      
      if (existy(ret)) return ret; 
    }
    return ret;
  }
}

function stringReverse(s) {
  if (!_.isString(s)) return undefined;
  return s.split('').reverse().join('');
}

// このstringReverse関数とArray#reverseメソッドを合成することで,
// 次のような新なポリモーフィック関数polyrevを生成できます
var polyrev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);
polyrev([1,2,3]);
//=> [3,2,1]
polyrev('abc');
//=> 'cba'

// 常に正常な値を返すか, 常にエラーを返す関数をデフォルトの動作を定義する「終了関数」として用意
var sillyReverse = dispatch(polyrev, always(42));
sillyReverse([1,2,3]);
// => [3,2,1]
sillyRervese('abc');
// => cba
sillyReverse(1000000);
// => 42

////////////// カリー (Curry) ////////////// 

/* 
 * Curry
 * カリー化
 * @param {Function} fun
 * @returns {Function} <Delegate>
*/
function curry (fun) {
  return function(arg) {
    fun (arg);
  };
}

/* Curry2 (-133)
 * 2段階のカリー化
 * @param {Function}
 * @retunrs {Function} <Delegate>
*/
function curry2 (fun) {
  return function(secondArg) {
    return function(firstArg) {
      fun (firstArg, secondArg);
    };
  };
}

/*
 * Curry3 (-136)
 * 3段階のカリー化
 * @param {Function} fun
 * @returns {Function} <Delegate>
*/
function curry3(fun) {
  return function(last) {
    return function(middle) {
      return function (first) {
        fun(first, middle, last);
      };
    };
  };
}

// 例1 ) 特定の色調を持った色のHTMLカラーコードを生成する関数
var blueGreenish = curry3(rgbTohexString)(255)(200);
blueGreenish(0);

function toHex(n) {
  var hex = n.toString(16);
  return (hex.length < 2) ? [0, hex].join('') : hex;
}

function rgbToHexString(r, g, b) {
  return ['#', toHex(r), toHex(g), toHex(b)].join('');
}

rgbToHexString(255, 255, 255);
// => #ffffff

// 例2 ) validator
var greaterThan = curry2(function(lhs, rhs) { return lhs > rhs; });
var lessThan = curry2(function(lhs, rhs) { return lhs < rhs; });

var withinRange = checker(
  validator('10より大きい必要があります.', greaterThan(10)),
  validator('20より小さい必要があります.', lessThan(20))
);

withinRange(15);
withinRange(1);

//////////// 部分適用 (partial) //////////////
/*
 * Partial1
 * 1つの引数を部分適用
 * 委譲先のargumentsの先頭に(arg1)を追加し, (fun)の引数に渡して実行する
 * @param {Function} fun
 * @param {Any} arg1
 * @returns {Function} fun([arg1] + arguments) <Delegate>
*/
function partial1(fun, arg1) {
  return function(/* args */) {
    var args = construct(arg1, arguments);
    return fun.apply(fun, args);
  }
}

// 実装例)
// div([10,5])
var over10Part1 = partial1(div, 10);
over10Part(5);
// => 2

/*
 * Partial2
 * 2つの引数を部分適用
 * @param {Function} fun
 * @param {Any} arg1
 * @param {Any} arg2
 * @returns {Function} fun([arg1, arg2] + arguments) <Delegate>
*/
function partial2(fun, arg1, arg2) {
  return function(/* args */) {
    var args = cat([arg1,arg2], arguments);
    return fun.apply(fun, args);
  }
}

// 実装例
var div10By2 = partial2(div, 10, 2);
div10By2();
// => 5

// Partial
// 任意の数の部分適用
// @param {Function} fun
// @param {Any}
// @returns {Function} fun([pargs] + arguments) <Delegate>
function partial(fun /*, 任意の数の引数 */) {
  var pargs = _.rest(arguments);

  return function(/* args */) {
    var args = cat(pargs, _.toArray(arguments));
    return fun.apply(fun, args);
  }
}

// 実装例
var over10Partial = partial(div, 10);
over10Partial(2);
// => 5

// 失敗例
var div10By2By4By5000Partial = partial(div, 10, 2, 4, 5000);
div10By2By4By5000Partial();
//=> 5

/*
 * Condition1 (-145)
 * 事前条件と事後条件の妥当性をチェックし, 部分適用を改めて結びつける
 * - 委譲先で渡される引数(arg)の妥当性をチェックして, fun(arg)を実行する
 * | 事前条件 | preconditions (関数の呼び出し元の保証)
 * | 事後条件 | postconditions (事前条件が満たされたと想定した場合の,関数呼び出しの結果に対する保証)
 * @param {Function} arguments <predicate>
 * @returns {Function} <Delegate> (委譲する関数を求めている関数)
 */
function condition1(/* 1つ以上の検証関数 */) {
  var validators = _.toArray(arguments);

  return function(fun, arg) {
    var errors = mapcat(function(isValid) {
      return isValid(arg) ? [] : [isValid.message];
    }, validators);

    if (!_.isEmpty(errors)) {
      throw new Error(errors.join(', '));
    }

    return fun(arg);
  }
}

// 実装例
var sqrPre = condition1(
  validator('0ではいけません', complement(zero)),
  validator('引数は数値である必要があります', _.isNumber)
);

// 安全ではないsqr関数
function uncheckedSqr(n) { return n * n; }
uncheckedSqr('');
//=> 0 (空文字が0に変換される)

var checkedSqr = partial1(sqrPre, uncheckedSqr);
checkedSqr(10);
// => 100
// partial1関数により, `uncheckedSqr`と`10`が, `condition1` の返り値の関数(sqrPre)に渡される

var sillySquare = partial1(
    condition1(validator('偶数を入力してください', isEven)),
    checkedSqr);
sillySquare(10);
// => 100
// 1. checkedSqr に(100)が渡される
// 2. condition1 に(1)の結果が渡される
// 3. validator で評価


///////// 並べた関数を端から端までcompose関数でつなぎ合わせる
var sqrPost = condition1(
    validator('結果は数値である必要があります', _.isNumber),
    validator('結果はゼロではない必要があります', complement(zero))
    validator('結果は正の数である必要があります', greaterThan(0)));

// _.compose関数を使って接着する
var megaCheckSqr = _.compose(partial(sqrPost, _.identity), checkSqr);
megaCheckSqr(10);
// 1. ckeckSqrに(10)が渡される
// 2. partialに(1)の結果が渡される
// 3. sqrPost(_.indentity, x) に(2)の結果が渡され実行する


//////// 6章 再帰
/*
 * My Length
 * @param {Array} ary
 * @returns {Number}
 * @example `myLength(_.range(10));`
 * [Recursive]
*/
function myLength(ary) {
  if (_.isEmpty(ary)) {
    return 0;
  } else {
    return 1 + myLength(_.rest(ary));
  }
}

/*
 * Cycle
 * @param {Number} times
 * @param {Array} ary
 * @returns {Array}
 * @example `cycle(2, [1,2,3]);`
 * [Recursive]
 */
function cycle(times, ary) {
  if (times <= 0) {
    return [];
  } else {
    return cat(ary, cycle(times - 1, ary));
  }
}


/*
 * IsIndexed (-16)
 * 渡された引数のデータ型が `Array` もしくは `String` であるかどうか
 * @param {Array|String} data
 * @returns {Boolean}
 */
function isIndexed(data) {
  return _.isArray(data) || _.isString(data);
}

/*
 * Nth (-16)
 * 配列から任意のインデックス番号の要素を取り出す
 * @param {Array} a
 * @param {Number} index
 * @returns {Any}
 */
function nth(a, index) {
  if (!_.isNumber(index)) fail('インデックスは数値である必要があります');
  if (!isIndexed(a)) fail('インデックス指定可能ではないデータ型はサポートされていません');
  if ((index < 0) || (index > a.length -1)) fail('指定されたインデックスは範囲外です');
  return a[index];
}

/*
 * Second (-17)
 * 配列の2番目の要素を返す
 * @param {Array}
 * @returns {Any}
 */
function second(a) {
  return nth(a, 1);
}

///////// 第5章

/*
 * Mega Checked Sqr (-152)
 */
var megaCheckedSqr = _.compose(partial(sqrPost, _.identity), checkedSqr);

var zipped1 = [['a','1']];

/*
 * @param {Array} pair 処理対象となる配列
 * @param {Array} resets 終了判定となる配列
 * @returns {Array}
 */
function constructPair(pair, resets) {
  return [
    construct(_.first(pair), _.first(resets)),
    construct(second(pair), second(resets))
  ];
}

constructPair(['a','1'], [[],[]]);
// => [['a'], ['1']]

_.zip(['a', [1]]);
// => [['a' '1']]

_.zip.apply(null, constructPair(['a','1'], [[],[]]));
// => [['a', '1']]

constructPair(['a', '1'],
  constructPair(['b', '2'],
    constructPair(['c', '3'], [[],[]])));

/*
 * Unzip (-160)
 * @param {Array} pairs
 * @returns {Array}
 * [recursive]
 */
function unzip(pairs) {
  if (_.isEmpty(pairs)) return [[],[]];
  return constructPair(_.first(pairs), unzip(_.rest(pairs)));
}

//////// 6.1.2 再帰を使ったグラフ検索

var influences = [
  ['Lisp', 'Smalltalk'],
  ['Lisp', 'Scheme'],
  ['Smalltalk', 'Self'],
  ['Scheme', 'JavaScript'],
  ['Scheme', 'Lua'],
  ['Self', 'Lua'],
  ['Self', 'JavaScript']
];

/*
 * データを探索する再帰関数
 * @param {Array} graph
 * @param {} node
 * [recursive]
 */
function nexts(graph, node) {
  if (_.isEmpty(graph)) return [];
  var pair = _.first(graph);
  var from = _.first(pair);
  var to = second(pair);
  var more = _.rest(graph);

  if (_.isEqual(node, from))  {
    return construct(to, nexts(more, node));
  } else {
    return nexts(more, node);
  }
}
// nextsの実装例)
nexts(influences, 'Lisp');
//=> Smalltalk, Scheme

////////  6.1.2 記録つき深さ優先自己再帰探索

/*
 * Depth Search
 * 累積変数(accumurator)を使った深さ優先探索
 * @param {Array} graph 検索の対象となるデータ
 * @param {Array} nodes 検索ワード
 * @param {Array} seen #検索済みのノードを蓄積し, 再度検索をしないようにするための累積変数
 */
function depthSearch(graph, nodes, seen) {
  if (_.isEmpty(nodes)) return rev(seen);

  var node = _.first(nodes);
  var more = _.rest(nodes);

  // Q. seenの中にnodeが含まれるかどうか
  if (_.contains(seen, node)) {
    return depthSearch(graph, more, seen);
  } else {
    return depthSearch(graph, cat(nexts(graph, node), more), construct(node, seen));
  }
}
// depthSearcの実装例)
depthSearch(influences, ['Lisp'], []);
//=>['Lisp','Smalltalk', 'Self', 'Lua', 'JavaScript', 'Schme']
depthSearch(influences, ['Smalltalk', 'Self'], []);
//=>['Smalltalk', 'Self', 'Lua', 'JavaScript']
depthSearch(construct(['Lua', 'Io'], influences), ['Lisp'], []);
//=>['Lisp','Smalltalk','Self','Lua', 'Io','JavaScript','Schme']

//////// 6.1.2.1 末尾再帰(自己末尾再帰)

/*
 * Tc Length
 * `myLength`を末尾再帰で書きなおした場合
 * @param {Array} ary
 * @param {Number} n
 * @returns {Number}
 */
function tcLength(ary, n) {
  var l = n ? n : 0;
  if (_.isEmpty(ary)) {
    return l;
  } else {
    return tcLength(_.rest(ary), l + 1);
  }
}
// tcLengthの実装例
tcLength(_.range(10))
//=> 10

//////// 6.1.3 再帰と関数合成 : 論理積と論理和

/*
 * Andify
 * いくつかのプレディケートを引数に受け取り, すべてtrueを返すかどうかを検証する
 * @param {Function} arguments <Predicate>
 * @param {Function} <Delegate>
 */
function andify (/* 任意の数のプレディケート */) {
  var preds = _.toArray(arguments);

  return function(/* 任意の数の引数 */) {
    var args = _.toArray(arguments);
    var everything = function(ps, truth) {
      if (_.isEmpty(ps)) {
        return truth;
      } else {
        return _.every(args, _.first(ps)) && everything(_.rest(ps), truth);
      }
    };
    return everything(preds, true);
  };
}

// andifyの実装例)
var evenNums = andify(_.isNumber, isEven);
evenNums(1,2);
//=> false
evenNums(2,4,6,8);
//=> true
evenNums(2,4,6,8,9);
//=> false

/*
 * Orify
 * いくつかのプレディケートを引数に受け取り, いずれかがtrueを返すかを検証する
 * @param {Function} arguments <Predicate>
 * @returns {Function} <Delegate>
 */
function orify(/* 任意の数のプレディケート */) {
  var preds = _.toArray(arguments);

  return function(/* 任意の数の引数 */) {
    var args = _.toArray(arguments);

    var something = function(ps, truth) {
      if (_.isEmpty(ps)) {
        return truth;
      } else {
        return _.some(args, _.first(ps)) || something(_.rest(ps), truth);
      }
    };
    return something(preds, false);
  };
}
// orifyの実装例
var zeroOrOdd = orify(isOdd, zero);
zeroOrOdd();
//=> false

zeroOrOdd(0,2,4,6);
//=> true

zeroOrOdd(2,4,6);
//=> false

//////// 6.1.4 相互再帰関数（自身を呼ぶ他の関数を呼ぶ関数）

function evenSteven(n) {
  if (n === 0) {
    return true;
  } else {
    return oddJohn(Math.abs(n) - 1);
  }
}

function oddJohn(n) {
  if (n === 0) {
    return false;
  } else {
    return evenSteven(Math.abs(n) - 1);
  }
}
// 実装例)
evenSteven(4);
//=> true
oddJohn(11);
//=> true

/*
 * 配列を平坦にする
 * @param {Array} array
 * [Recursive]
 */
function flat(array) {
  if (_.isArray(array)) {
    return cat.apply(cat, _.map(array, flat));
  } else {
    return [array];
  }
}

flat([[1,2],[3,4]]);
//=> [1,2,3,4]
flat([[1,2],[3,4,[5,6,[[[7]],[8]]]]]);
//=> [1,2,3,4,5,6,7,8]


//////// 6.1.5 再帰を使った深いコピー

/*
 * Deep Clone
 * ネストされたオブジェクトのクローンを作る
 * @param {Object} <Original>
 * @returns {Object} <Clone>
 */
function deepClone(obj) {
  if (!existy(obj) || !_.isObject(obj)) {
    return obj;
  }

  var temp = new obj.constructor();
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      temp[key] = deepClone(obj[key]);
    }
  }
  return temp;
}
// deepCloneの使用例
var x = [{a: [1,2,3], b:42}, {c: {d:[]}}];
var y = deepClone(x);

console.log(_.isEqual(x, y));
//=> true

y[1]['c']['d'] = 42;

console.log(_.isEqual(x, y));
// => false

//////// 6.1.5 ネストされた配列を探索する

/*
 * Visit
 * ネストされたオブジェクトを探索する
 * @param {Function} mapFun <Iterator>
 * @param {Function} reusltFun
 * @param {Array} array
 * @returns {Any}
 */
function visit(mapFun, resultFun, array) {
  if (_.isArray(array)) {
    return resultFun(_.map(array, mapFun));
  } else {
    return resultFun(array);
  }
}
// visitの使用例)
visit(_.identity, _.isNumber, 42);
//=> true

visit(_.isNumber, _.identity, [1, 2, null, 3]);
//=> [true, true, false, true]

visit(function(){return n * 2;}, rev, _.range(10));
//=> [18, 16, 14, 12, 10, 8, 6, 4, 2, 0]

/*
 * Post Depth
 * 配列の要素にmapFunを実行し, その配列に深さ優先探索を行う
 * 子要素を展開した後に実行
 * @param {Function} fun <Iterator>
 * @param {Array} ary
 * @returns {Function}
 */
function postDepth(fun, ary) {
  return visit(partial1(postDepth, fun), fun, ary);
}

// postDepthの使用例
postDepth(_.identity, influences);
// "Lisp" を "LISP" に変更する
postDepth(function(x){
  if (x === 'Lisp') {
    return 'LISP';
  } else {
    return x;
  }
}, influences);

/*
 * Pre Depth
 * 配列の要素にmapFunを実行し, その配列に深さ優先探索を行う
 * 子要素を展開した前に実行
 * @param {Function} fun <Iterator>
 * @param {Array} ary
 * @returns {Function}
 */
function preDepth(fun, ary) {
  return visit(partial1(preDepth, fun), fun, fun(ary));
}

function influencedWidthStrategy(strategy, lang, graph) {
  var results = [];

  strategy(function(x){
    if (_.isArray(x) && _.first(x) === lang) {
      results.push(second(x));
    }
    return x;
  }, graph);

  return results;
}

influencedWidthStrategy(postDepth, 'Lisp', influences);

//////// 6.2 再帰多すぎ！（トランポリンとジェネレータ）

function even0line(n) {
  if (n === 0) {
    return true;
  } else {
    return partial1(odd0line, Math.abs(n) - 1);
  }
}

function odd0line() {
  if (n === 0) {
    return false;
  } else {
    return partial1(even0line, Math.abs(n) - 1);
  }
}
// 例)
odd0line(3)()()();
odd0line(5)()()()()();

/*
 * Trampoline (-177)
 * 深くネストされた再帰呼び出しを「平坦化」する
 * @param {Function} fun
 * @param {Any} arguments
 * @returns {}
 */
function trampoline(fun /*, 任意の数の引数*/) {
  var result = fun.apply(fun, _.rest(arguments));

  while (_.isFunction(result)) {
    result = result();
  }

  return result;
}

// 例) trampolineの使用する
trampoline(odd0line, 3);

// 例) trampoline関数を関数内部に隠ぺいする例
function isEvenSafe(n) {
  if (n === 0) {
    return true;
  } else {
    return trampoline(partial1(odd0line, Math.abs(n) - 1));
  }
}

function isOddSafe(n) {
  if (n === 0) {
    return false;
  } else {
    return trampoline(partial1(even0line, Math.abs(n) - 1));
  }
}

// #### 6.2.1 ジェネレータ

// {head: aValue, tail: '???'};

/*
 * Generator
 * ジェネレータ
 * @param {} seed
 * @param {} current
 * @param {} step
 * @returns {}
 */
function generator (seed, current, step) {
  return {
    head: current(seed),
    tail: function() {
      console.log('forced');
      return generator(step(seed), current, step);
    }
  }
}
// 例) generator
var ints = generator(0, _.identity, function(n){ return n + 1;});

function genHead(gen) {
  return gen.head;
}
// 例)
genHead(ints);

function genTail(gen) {
  return gen.tail();
}
// 例)
genTail(ints);
genTail(genTail(ints));

function genTake(n, gen) {
  var doTake = function(x, g, ret) {
    if (x === 0) {
      return ret;
    } else {
      return partial(doTake, x-1, genTail(g), cat(ret, genHead(g)));
    }
  };
  return trampoline(doTake, n, gen, []);
}

// 例)
genTake(10, ints);
genTake(100, ints);
genTake(1000, ints);
genTake(10000, ints);




// 6.2.2 トランポリンの原則とコールバック
/*
 * Async Get Any
 * 非同期APIによる再帰
 * @param {Number} interval <ms>
 * @param {Array} urls
 * @param {Function} onsuccess
 * @param {Function} onfailure
 */
function asyncGetAny(interval, urls, onsuccess, onfailure) {
  var n = urls.length;
  var looper = function() {
    setTimeout(function() {
      if (i >= n) {
        onfailure('failed');
        return;
      }
      $.get(urls[i], onsuccess)
        .alwais(function() {
          console.log('try: ' + urls[i]);
        })
        .fail(function() {
          looper(i + 1);
        });
    }, interval);
  };
  looper(0);
  return 'go';
}

// 例) asyncGetAny
var urls = ['http://dsfgfgs.com', 'http://sgdsafdsa.biz', '_.html', 'foo.txt'];
asyncGetAny(2000, urls,
  function(data) { alert('データが見つかりました'); },
  function(data) { console.log('すべて失敗しました'); });

////// 6.3 再帰は低レイヤーでの操作

var gruopFrom = curry2(_.groupBy)(_.first);
var gruopTo = curry2(_.groupBy)(second);

gruopFrom(influences);
gruopTo(influences);

function influenced(graph, node) {
  return _.map(groupFrom(graph)[node], second);
}

/*
 * Rand String
 * ランダムな文字列を返す
 * @param {Number} len
 */
function randString(len) {
  var ascii = repeatedly(len, partial1(rand, 36));

  return _.map(ascii, function(n) {
    return n.toString(36);
  }).join('');
}
// 例)
randString(0);
randString(1);
randString(10);

// randStringから純粋と不純を分離する
function generateRandomCharacter() {
  return rand(26).toString(36);
}
function generateString(charGen, len) {
  return repeatedly(len, charGen).join('');
}

generateString(generateRandomCharacter, 20);

var composedRandomString = partial1(generateString, generateRandomCharacter);
composedRandomString(10);


// 冪等である関数は次の条件を満たす
someFun(arg) == _.compose(someFun, someFun)(arg);

/*
 * Skip Take
 * 数値(n)と配列を渡すと, 配列のインデックスがnの倍数の要素を抜き出して新な配列に格納し, その新な配列を返す
 * @param {Number} n
 * @param {} coll
 */
function skipTake(n, coll) {
  var ret = [];

  var sz = _.size(coll);
  for (var index = 0; index < sz; index += n) {
    ret.push(coll[index]);
  }
  return ret;
}

// 例) skipTake

skipTake(2, [1,2,3,4]);
//=> [1,3]

////////// 7.3 不変性

// new の付与をわすれてしまいました. そもそもオブジェクトの生成に new を使うか
// 使わないかという問題もありますが, このような問題を回避する方法は多数存在します.
function queue() {
  return new SafeQueue(_.toArray(arguments));
}
var q = queue(1,2,3);

// invokerを使ってメソッドを委譲する関数を生成する
var method = invoker('method', SaferQueue.prototype.method);
method(q, 42);

/*
 * Container (-220)
 * コンテナ型のシンプルな実装
 * @param {Any} init
 */
function Container(init) {
  this._value = init;
}
Container.prototype = {
  /*
   * Container#update
   * @param {Function} fun
   * @param {Any} arguments
   * @returns {Any}
   */
  update: function(fun /*, args*/) {
    var args = _.rest(arguments);
    var oldValue = this._value;
    this._value = fun.apply(this, construct(oldValue, args));
    return this._value;
  }
};

var aNumber = new Container(42);
aNumber;
// {_value: 42}
aNumber.update(function(n){return n + 1});
// 43

// 例) 復数の引数を渡す
aNumber.update(function(n,x,y,z){return n/x/y/z}, 1,2,3);
//=> 7.16666...7

// 例) 制約関数を使う
aNumber.update(_.compose(megaCheckedSqr, always(0)));
// Error: 0ではいけません.


/*
 *
 */
function createPerson() {
  var firstName = '';
  var lastName = '';
  var age = 0;

  return {
    setFirstName: function(fn) {
      fistName = fn;
      return this;
    },
    setlastName: function(ln) {
      lastName = ln;
      return this;
    },
    setAge: function (a) {
      age = a;
      return this;
    },
    toString: function() {
      return [firstName, lastName, age].join();
    }
  };
}

createPerson()
  .setFirstName('Mike')
  .setLastName('Fogus')
  .setAge(108)
  .toString();
//=> Mike Fogus 108


/*
 * Lazy Chain (-228)
 * 遅延実行を行うチェーン
 * @param {Any} obj
 */
function LazyChain(obj) {
  this._calls = [];
  this._target = obj;
}
/*
 * LazyChain#invoke (-228)
 * @param {String} methodName
 * @param {Any} arguments
 */
LazyChain.prototype.invoke = function(methodName /*, 任意の数の引数 */) {
  var args = _.rest(arguments);

  this._calls.push(function(target) {
    var meth = target[methodName];

    return meth.apply(target, args);
  });

  return this;
};

/*
 * LazyChain#force (-231)
 * レイジーチェーンの実行エンジン
 * 最初のサンクにターゲットオブジェクトを渡して, 続く
 * それぞれのサンクが前のサンクの実行結果を与えられて呼びだされます.
 */
LazyChain.prototype.force = function() {
  return _.reduce(this._calls, function(target, thunk) {
    return thunk(target);
  }, this._target);
};

/*
 * LazyChain#tap (-232)
 * @param {Function} fun
 */
LazyChain.prototype.tap = function(fun) {
  this._calls.push(function(target){
    fun(target);
    return target;
  });
  return this;
};

// 例)
new LazyChain([2,1,3]).invoke('sort')._calls;
//=> [function(target){}]
new LazyChain([2,1,3]).invoke('sort')._calls[0]();
var deferredSort = new LazyChain([2,1,3]).invoke('sort').tap(alert);
deferredSort.force();

/*
 * Lazy Chain Chain Chian (-233)
 * レイジーチェーンに別のレイジーチェーンをチェーンできるようにする
 * @param {LazyChain} obj
 */
function LazyChainChainChain(obj) {
  var isLC = (obj instanceof LazyChain);

  this._calls = isLC ? cat(obj._calls, []) : [];
  this._target = isLC ? obj._target : obj;
}

LazyChainChainChain.prototype = LazyChain.prototype;

// 例)
new LazyChainChainChain(deferredSort)
  .tap(alert)
  .invoke('toString')
  .force();

/*
 * Go
 * jQuery#promise の実装
 * $.when関数を使ってpromiseチェーンを開始する
　* @returns {Object} <promise>
 */
}
function go() {
  var d = $.Deferred();

  $.when('')
    .then(function(){
      setTimeout(function(){
        console.log('sub-task 1');
      }, 2000);
    })
    .then(function(){
      setTimeout(function(){
        console.log('sub-task 2');
      }, 10000);
    })
    .then(function(){
      setTimeout(function(){
        d.resolve('done done done done');
      }, 15000);
    });

  return d.promise();
}

// 例) 
var yearning = go().done(note);
console.log( yearning.state() );

/*
 * Pipeline (-240)
 * (seed)で受け取った値を渡しながら関数と関数をつなぐ
 * 参照ではなく値を扱う
 * 遅延実行は行わない
 * @param {Any} seed
 * @param {Function} arguments
 */
function pipeline (seed /*, 任意の数の関数 */) {
  return _.reduce(_.rest(arguments),
    function(l, r) { return r(l); },
  seed);
}
// 例)
pipeline();
pipeline(42);
pipeline(42, function(n){ return -n;});

// pipeline に遅延実行させる
function fifth(a) {
  return pipeline(a
    , _.rest
    , _.rest
    , _.rest
    , _.rest
    , _.first);
}
// 例)
fifth([1,2,3,4,5]);

// パイプラインを使って構築した抽象を他のパイプラインに挿入する
function negativeFifth(a) {
  return pipeline(a
    , fifth
    , function(n) { -n});
}
// 例)
negativeFifth([1,2,3,4,5,6,7,8,9]);

/*
 * First Editions
 * @param {Object} table <Map>
 * @param {Object} table <New Map>
 */
function firstEditions(table) {
  return pipeline(table
    , function(t) { return as(t, {ed: 'edition'}); }
    , function(t) { return project(t, ['title', 'edition', 'isbn'])}
    , function(t) { return restrict(t, function(book) {
      return book.edition === 1;})
    });
}
// 例)
firstEditions(library);
//=> [{title: 'SICP', ...}]

// カリー化されたバージョンの「流暢」な関係演算子
// RQL(Relational Query Language)
var RQL = {
  select: curry2(project),
  as: curry2(as),
  where: curry2(restrict)
};

/*
 * All First Editions
 * RQL内でカリー化されたので, firstEditionsより読みやすく改善することができた.
 * @param {Object} table
 */
function allFirstEditions(table) {
  return pipeline(table
    , RQL.as({ed, 'edition'})
    , RQL.select({'title', 'edition', 'isbn'})
    , RQL.where(function(){
      return book.edition === 1;
  }));
}
// 例)
allFirstEditions(library);
//=> [{title: 'SICP', ....}]

/*
 * Actions (-248)
 * - それぞれの関数がanswerとstateという2つのキーを持ったオブジェクトを返すことを前提としています.
 * - answerの値は関数呼び出しの結果に対応し, stateはそれぞれのアクションが実行された後の新しい状態を保持します.
 * - stateはそれぞれのアクションが実行された後の新しい状態を保持します.
 * - 状態オブジェクintermediateは最終結果とはいえない値を持っている可能性があります.
 *   (例えばnote関数実行後のanswerはundefined) actionsはこれらをフィルタし, 除去します.
 * - 最後にactionsはフィルタされた値(keep)とstateをdone関数に渡して, 最終結果を得ます.
 *   stateもしくはvaluesのいずれかだけをdoneに渡すような設計も可能ですが, ここで可能な限り柔軟性を与えるために,
 *   また例示のために, これらを両方渡すことにしました.
 * @param {Function} acts
 * @param {} done
 * @returns {Any}
 */

function actions(acts, done) {
  return function(seed) {
    var init = { values : [], state: seed };

    var intermediate = _.reduce(acts, function(stateObj, action) {
      var result = action(stateObj.state);
      var values = cat(stateObj.values, [result.answer]);
      return {values: values, state: result.state }
    }, init);

    var keep = _.filter(intermediate.values, existy);

    return done(keep, intermediate.state);
  };
}

// 例)
// M Sqr (-250)
function mSqr() {
  return function (state) {
    var ans = sqr(state);
    return {answer: ans, state: ans};
  }
}

var doubleSquareAtion = actions(
  [mSqr(), mSqr()],
  function(values) {
    return values;
  });
doubleSquareAction(10);
//=> [100, 1000]

// M Note (-251)
function mNote() {
  return function(state) {
    note(state);
    return {answer: undefined, state: state}
  }
}

// M Neg (-251)
function mNeg() {
  return function(state) {
    return {answer: -state, state: -state };
  }
}

var negativeSqrAction = actions([mSqr(), mNote(), mNeg()],
  function(_, state) {
    return state;
  });

negativeSqrAction(9);
//情報: 81
//=> 81

/*
 * Lift (-252)
 * - liftは, 2つの関数を引数に取ります.
 * - 1つめは, 与えられてなにかのアクションの結果を提供する関数
 * - 2つめは, 新しいstateを提供する関数
 */
function lift(answerFun, stateFun) {
  return function(/* 任意の数の引数 */) {
    var args = _.toArray(arguments);

    return function(state) {
      var ans = answerFun.apply(null, construct(state, args));
      var s = stateFun ? stateFun(state) : ans;
      return {answer: ans, state: s };
    };
  };
}

// 例)
var mSqr2 = lift(sqr);
var mNote2 = lift(note, _.identity);
var mNeg2 = lift(function(n){ return -n; });

var negativeSqrActions = actions([mSqr2(), mNote2(), mNeg2()],
  function(noUsed, state) {
    return state;
  });

negativeSqrAction(100);
// 情報: 10000
//=> -10000

// 驚くべきことに, actins関数を使うと, 連続したスタックイベントを
// まだ実現していない値としてキャプチャしておくことができます.

pipeline([], stackAction, _.chain)
.each(function(elem){
  console.log(polyToString(elem));
});
// (console) [1] // stackActionのpush(1) 後のスタック
// (console) [2, 1] // stackActionのpush(2) 後のスタック
// (console) 2 // stackActionのpop()後のスタック


/*
 * LazyCain v2.0 (-259)
 * 旧LazyCainとの違い
 * - 関数呼び出しによってレイジーチェーンが初期化される
 * - コールドチェーンがプライベートデータである
 * - LazyChain型が明示的に存在しない
 *
 */
function lazyCain(obj) {
  var calls = [];

  return {
    invoke: function(methodName /*, 任意の引数 */) {
      var args = _.rest(arguments);
      calls.push(function(target) {
        var meth = target[methodName];
        return meth.apply(target, args);
      });
      return this;
    },
    force: function() {
      return _.reduce(calls, function(ret, thunk) {
        return thunk(ret);
      }, obj);
    }
  };
}

// 例)
var lazyOp = lazyChain([2,1,3])
  .invoke('concat', [7,7,8,9,0])
  .invoke('sort');

lazyOp.force();
//=> [0,1,2,3,7,7,8,9]

/*
 * Poly To String (-267)
 * オブジェクトを文字列に変換する
 * @param {Any}
 */
function polyToString(obj) {
  if (obj instanceof String) {
    return obj;
  } else if (obj instanceof Array) {
    return stringifyArray(obj);
  }
  return obj.toString();
}

/*
 * Stringify Array (-267)
 * 配列を文字列に変換する
 * @param {Any}
 * @returns {ANy}
 */
function stringifyArray(ary) {
  return ['[', _.map(ary, polyToString).join(','),']'].join('');
}

// 例)
polyToString([1,2,3]);
//=> '[1,2,3]'

polyToString([1,2,[3,4]]);
//=> '[1,2,[3,4]]'

var polyToString = dispatch(
  function (s) { return _.isString(s) ? s : undefined},
  function (s) { return _.isArray() ? stringifyArray(s) : undefined},
  function (s) { return _.isObject() ? JSON.stringify(s) : undefined},
  function (s) { return s.toString(); });

polyToString(42);
//=> '42'

polyToString([1,2,[3,4]]);
//=> '[1,2,[3,4]]'

polyToString('a');
//=> 'a'

polyToString(new Container(_.range(5)));
//=> {'_value':[0,1,2,3,4]}



//////////////////

