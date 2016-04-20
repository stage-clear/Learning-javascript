# スコープオブジェクト

## 6.1 スコープ有効範囲

### 6.1.1 有効範囲の基本

コントローラーでスコープを準備した場合、その有効範囲は現在のコントローラー配下に限定されるのが基本です。


### 6.1.2 複数のコントローラーを配置した場合

コントローラーは `ng-controller` 単位でインスタンス化されるため、同名のコントローラーであっても
異なるインスタンスの変数は参照できない

```html
<div ng-controller="MyController">
  <label for="name">Name: </label>
  <input type="text" ng-model="name"/>
</div>

<div ng-controller="MyController">
  <div>Hello, {{ name }} !</div><!-- name は反映されない -->
</div>
```

### 6.1.3 コントローラーを入れ子に配置した場合

コントローラを入れ子にした場合、配下のコントローラーが上位のコントローラを継承します

- [サンプル](https://jsfiddle.net/walfo/k6veat6w/) - `nest.html`


### 6.1.4 入れ子となったコントローラーでの注意点

親子コントローラーの継承関係は、JavaScript 特有のプロトタイプ継承に基づいているからです。

- __暗黙の参照__
- 子の側が親オブジェクトのプロパティを書き換えることはありませんし、その逆もありません
- [サンプル](https://jsfiddle.net/walfo/1fj27yqu/)


## 6.2 コントローラー間の情報共有

### 6.2.1 親コントローラーのスコープを取得する - `$parent`

`$parent` を使うことで子コントローラーから親コントローラーのスコープにアクセスできるようになります

```js
$scope.onchild = functoin() {
  $scope.$parent.value += 1;
}
```

- [サンプル](https://jsfiddle.net/walfo/epd47px6/) - `nest_parent.html`


### 6.2.2 アプリ唯一のスコープを取得する - `$rootScope`

AngularJS は、それぞれが唯一のルートスコープを持ちます
すべてのスコープは `$rootScope` を継承します

- `$rootScope` は `$scope` と同じく配列アノテーションでコントローラーに注入することで利用できます
- 別解として、現在のスコープから `$root` プロパティを利用することで、`$rootScope` にアクセスすることもできます


```js
angular.module('myApp', [])
  .controller('ParentController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.value = 1;
    // $scope.$root.value = 1;
    
    $scope.onparent = function() {
      $rootScope.value += 1;
      // $scope.$root.value += 1;
    };
  }])
  .controller('ChildController', ['$scope', function($scope) {
    $scope.onchild = function() {
      $rootScope.value += 1;
      // $scope.$root.value += 1;
    };
  }]);
```

- [サンプル](https://jsfiddle.net/walfo/6f13x09s/) - `scope_nest.html`


### 6.2.3 イベントによるスコープ間のデータ交換

コントローラー間でデータを交換するために、AngularJS ではイベント通知の仕組みを提供しています

```js
/**
 * $broadcast - 下位のスコープに広報
 * $emit - 上位のスコープに通知
 * @param {String} name - イベントの名前
 * @param {Any} args - イベントと合わせて送信する情報
 */

scope.$broadcast(name [, args...])
scope.$emit(name [, args...])


/**
 * $on
 * `$broadcast/$emit` で通知したイベントを受信します
 * @param {String} name - イベントの名前
 * @param {Function} listener - イベントリスナー
 *   @arg {Object} e - イベントオブジェクト
 *   @arg {Any} 受信したデータ（可変引数）
 */
scope.$on(name, listener)
```

- [サンプル](https://jsfiddle.net/walfo/uvLd3Lj5/) - `event.html`

__イベントオブジェクトの主なメンバー__

|メンバー|概要|
|:--|:--|
|`name`|イベントの名前|
|`targetScope`|イベント発生元のスコープ（ `$emit/$broadcast` 側）|
|`currentScope`|現在のスコープ（ `$on` 側）|
|`stopPropagation()`|イベントの以降の伝播を停止（`$emit` でのみ利用可能）|
|`preventDefault()`|`defaultPrevented` プロパティを `true` に設定|
|`defaultPrevented`|`preventDefault` メソッドが呼び出されたか|


__`preventDefault` メソッド__

`preventDefault` メソッドはブラウザ標準の挙動に影響を与えるものではありません。
あくまで、`defaultPrevented` プロパティに `true` をセットするだけです。
`defaultPrevented` プロパティの真偽を判定して、挙動を分岐するのはアプリ開発者の役割です


### 6.2.4 並列関係にあるスコープでイベントを通知する

- [サンプル](https://jsfiddle.net/walfo/wnsnL01v/) - `event2.html`


### 6.2.5 補足: 標準サービス/ディレクティブでの `$broadcast/$emit` イベント

#### ルーティング関連の `$broadcast` イベント

`$routeProvider` プロバイダーでは、ルート変更のタイミングでイベントを発生します。
いずれも `$rootScope` のイベントとして `broadcast` されますので、任意のコントローラーで補足可能です。

|イベント|発生タイミング|
|:--|:--|
|`$routeChangeStart`|ルートの変更を開始した時|
|`$routeChangesSuccess`|ルートの変更に成功した時|
|`$routeChangeError`|ルートの変更に失敗した時（`resolve`で指定された `Promise` が1つでも `reject` された時）|
|`$routeUpdate`|パスが変更された時（`reloadOnSearch` が `false` の場合）|


```js
// ... 中略 ...
.controller('ArticlesController', [
  '$scope', '$routeParams', '$location', '$anchorScroll',
  function($scope, $routeParams, $location, $anchorScroll) {
    // ... 中略 ...
    $scope.$on('$routeChangeSuccess', function(e, new_r, old_r) {
      $location.hash($routeParams.scroll); // ハッシュにクエリ情報 scroll 値をセット
      $anchorScroll(); // ハッシュ(#~)の値に基づいて、指定の要素にページをスクロールします
    });
  }
]);
```

#### インクルード時に発生する `$emit` イベント

`ng-include` ディレクティブは、別ファイルをインクルードする前後で、イベントを発生します。
`onload` 属性でまかなえないリクエスト前後や、エラーのタイミングでなんらかの処理を差し
はさむために利用します

|イベント名|発生タイミング|
|:--|:--|
|`$includeContentRequested`|ファイルを要求する時|
|`$includeContentLoaded`|ファイルが正しく読み込めた時|
|`$includeContentError`|ファイルの取得に失敗した時|

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.$on('$includeContentRequested', function(e, path) {
      console.log(e); // イベントオブジェクト
      console.log(path); // インクルードファイルのパス
    });
  }]);
```


## 6.3 スコープの監視

### 6.3.1 スコープの変更をビューに反映する - `$apply` メソッド

```js
/**
 * $apply
 * AngularJS に対してスコープの更新を通知し、ビューに
 * 強制的に反映させるためのメソッドです
 * @param {Function|String} func - 実行する処理（関数）、または Angular 式（文字列）
 */
$scope.$apply([func]);

// example
if (!$scope.$$phase) { // <- 二重更新を防ぐ
  $scope.$apply(function() {
    // do something
  })
}
```

- [サンプル](https://jsfiddle.net/walfo/a68qoenv/) - `apply.html`

__`$apply` メソッドの内部的な挙動__

```js
function $apply(exp) {
  try {
    return $eval(exp); // <- 1. Angular 式を実行
  } catch(e) {
    $exceptionHandler(e); // <- 2. 例外が発生した場合 $exceptionHandler を処理
  } finally {
    $root.$digest(); // <- 3. 最後に $digest で変更をビューに反映させて完了
  }
}
```

#### `$timeout` サービスを利用する方法

`$$phase/$apply` はフレームワーク内部に密接に絡んだ低レベルなメンバーであり、アプリから
直接利用するのはあまり望ましい状態ではありません。より適しているのが `$timeout` サービスを
利用する方法です

- [サンプル](https://jsfiddle.net/walfo/Lb60yzqd/) - `apply_timeout.html`


### 6.3.2 アプリ内データの更新を監視する - `$watch` メソッド

スコープオブジェクトが提供するメソッドの中でも、特によく利用するのが、`$watch` をはじめとする
`$watchXxxxx` メソッドです。

- [サンプル](https://jsfiddle.net/walfo/oh6rnboy/) - `watch.html`

```js
/**
 * $watch
 * スコープオブジェクトの状態を監視し、値に変化があった場合に、
 * 関連する処理を実行できます
 * @param {String|Function} exp - 監視する値
 * @param {Function} listener - 引数 exp が変化した時に実行する処理
 *   @arg {Any} newValue - 監視中の値（引数exp）の現在の値
 *   @arg {Any} oldValue - 監視中の値（引数exp）の以前の値
 *   @arg {Object} scope - 現在のスコープ
 */
$scope.$watch(exp, listener)

// ex)
$scope.$watch('base * height / 2', function(newVal, oldVal, scope) {
  scope.area = newVal
});

// 引数 exp は文字列としてだけでなく、関数として指定することも可能
$scope.$watch(function() {
  return $scope.base * $scope.height / 2;
}, function(newVal, oldVal, scope) {
  scope.area = newVal;
});
```

__ `$watch` 式の注意点__

- 実行による副作用を伴わないこと（= `$watch` 式によって値が変更されない）
- `$watch` 式の実行はできるだけ軽くすること
- `$watch` 式そのものの数を必要最小限に抑えること（最大でも2000個を超えるべきではない）


#### 補足: 無限ループに要注意

引数 `listener` では、監視対象の変数を変更すべきではありません。
どうしても変更せざるを得ない場合にも、ある短い間隔では同じ結果を返すか、あるいは何回か
繰り返して呼び出した場合には同じ結果を返すよう、実装する必要があります。


### 6.3.3 スコープの監視を中止する

`$watch` メソッドは、戻り値として監視リスナーを解除するための関数を返します

```js
$scope.cancel = // <- リスナー解除関数を cancel プロパティに保存
  $watch('base * height / 2', function(newVal, oldVal, scope) {
    scope.area = scope.base * scope.height / 2;
});

$scope.onstop = function() {
  $scope.cancel; // <- 監視リスナーを解除
};
```

### 6.3.4 複数の値セットを監視する - `$watchGroup` メソッド

`$watchGroup` メソッドを利用することで、複数の値を同時に監視できます

```js
/**
 * $watchGroup
 * 複数の値を監視する
 * @param {Array} 監視する値
 * @param {Function} 引数 exp すべてが変化した時に実行する処理
 */
$watchGroup(exp, listener)
```

#### `$watch` メソッドでも代用可能

```js
/**
 * $watch 
 * @param {String|Function} exp - 監視する値
 * @param {Function} listener - 引数 exp の要素
 * @param {Boolena} equality - 引数 exp の要素/プロパティの変化も監視するか(def: false)
 */
$scope.$watch(exp, listener, equality)
```

- [サンプル](https://jsfiddle.net/walfo/gudw1L1e/) - `watch_array.html`


### 6.3.5 配列の追加/削除/変更を監視する - `$watchCollection` メソッド

配下の要素のプロパティの変更までは監視しませんが、配下の要素の追加/削除/置換を検出します


```js
/**
 * $watchCollection
 * @param {String|Function} exp - 監視する値
 * @param {Function} listener - 引数 exp が変化した時に実行する処理
 */
$scope.$watchCollection(exp, listener)
```

- [サンプル](https://jsfiddle.net/walfo/9ts063z4/) - `watch_collection.html`


|No|概要|`$watch(false)`|`$watchCollection`|`$watch(false)`|
|:--|:--|:--:|:--:|:--:|
|1|配列の置換|○|○|○|
|2|配列要素の追加/削除/置換|×|○|○|
|3|配列要素のプロパティを変更|×|×|○|


#### `$watchCollection` メソッドでオブジェクトを監視する

`$watchCollection` メソッドでは、オブジェクト（ハッシュ）を監視することもできます。

- オブジェクトそのものの置換
- プロパティ値の編集
- プロパティの追加/削除

以上のケースで監視が有効になります

- [サンプル](https://jsfiddle.net/walfo/e7cq2cme/) - `watch_collection2.html`



### 6.3.6 補足: `$digest` ループ

- `$evalAsyc` メソッドで登録されたコードを実行
- `$watch` メソッドで登録された式（`$watch` 式）を評価
- 変更があった `$watch` 式に対応するコールバック関数を実行（ページを更新）

という処理を __すべての `$watch` 式が前回の結果から変化しなくなるまで__ 繰り返します。
これを __`$digest` ループ__ 、または __`$digest` サイクル__ と呼びます


__dirty checking__

`$watch` 式が変化しなくなるまで、式をチェックする方式のことを __dirty checking__ と呼びます
