# AngularJS の基本

- [module メソッド](./#module-methodo) - メソッド
- [controller メソッド](./#controller-method) - メソッド
- [$scope](./#scope) - データの受け渡し
- [ng-repeat属性](./#ng-repeat) - ディレクティブ
- [filter](./#filter) - フィルター
- [value メソッド](./#value) - メソッド

## 2.1 AngularJSを利用するための準備

```html
<!doctype html>
<html ng-app>
<head>
<meta charset="utf-8"/>
<title>AngularJS</title>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.min.js"></script>
</head>
<body>
<!-- AngularJS を利用したページ -->
</body>
</html>
```

### 2.1.1 AngularJS アプリの実行

```html
<body>
{{ 3 + 5 }}
</body>
```

### 2.1.2 補足: オフライン環境で AngularJS を動作する

```html
<script src="lib/angular.min.js"></script>
```

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.min.js"></script>
<script>window.angular || document.write('<script src="lib/angular.min.js"><\/script>');</script>
```


## 2.2 コントローラー/サービスの基本

### 2.2.1 コントローラー/ビューの連携

- サンプル [controller.html](./controller.html)/[controller.js](./controller.js)

1. モジュールを定義する

__<a id="module-method">#</a> 構文 module メソッド__

```js
/**
 * @param {String} name : モジュール名
 * @param {Array} requires : 依存するモジュール
 * @param {Object} config : 構成の定義
 */
module(name, [, requires [, config]])
```

__モジュールオブジェクトの主なメソッド__

|メソッド|概要|
|:--|:--|
|`animation`|アニメーションを定義|
|`controller`|コントローラーを定義|
|`directive`|ディレクティブを定義|
|`filter`|フィルターを定義|
|`service`|サービスを定義|
|`factory`|サービスを定義|
|`provider`|サービスを定義|
|`value`|サービスを定義|
|`constant`|サービスを定義|
|`config`|モジュールの構成情報を定義|
|`run`|アプリの初期化情報を定義|


2. コントーラーを定義する

__<a id="controller-method">#</a> controller メソッド__

```js
/**
 * @param {String} name: コントローラー名
 * @param {Function} constructor: コンストラクター関数
 */
controller(name, constructor)
```

3. スコープオブジェクトを定義する

__<a id="scope">#</a> スコープの設定__

```js
/**
 * name: 変数名
 * value: 値
 */
$scope.name = value;
```

4. モジュール/コントローラーをテンプレートに紐づける
5. スコープオブジェクトにアクセスする

```js
// good
{{ msg }}

// bad
{{ $scope.msg }}
```

### 2.2.2 コントローラー/ビューの連携 - オブジェクト配列

```html
<html ng-app="myApp">
<body ng-controller="MyController">
  <table>
    <tr ng-repeat="book in books">
      <td>{{ book.title }}</td>
      <td>{{ book.published | date: 'yyyy年MM月dd日' }}</td>
    </tr>
  </table>
</body>
```

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.books = [
      {
        title: 'Book 1',
        published: new Date(2015, 0, 8)
      },
      {
        title: 'Book 2',
        published: new Date(2014, 10, 11)
      }
    ]
  }]);
```

1. 配列を処理するのは `ng-repeat` 属性の役割

__<a id="ng-repeat">#</a> 構文 ng-repeat 属性__

```html
<element ng-repeat="var in list">...</element>
```

2. 日付を加工する `date` フィルター

__<a id="filter">#</a> フィルター__

```html
{{ exp | filter: augs }}
```


### 2.2.3 サービスへの分離

一般的に、コントローラーはスコープの設定に徹して、アプリ固有のビジネスロジックはサービスに委ねるべきです。

```js
angular.module('myApp', [])
  .controller('MyController', function($scolpe, BookList) {
    $scope.books = BookList;
  })
  .value('BookList', function() {
    return [{
      title: 'Book 1'
    },
    {
      title: 'Book 2'
    }];
  });
```

__<a id="value">#</a> value メソッド__

```js
/**
 * @param {String} name: サービス名
 * @param {Any} object: サービスのインスタンス
 */
value(name, object)
```




- モジュール - アプリを構想するコンポーネント部品の入れ物
- DI コンテナー - オブジェクト同士の依存関係を橋渡しする
- 双方向データバインディング 

### 2.3.1 モジュール

```js
// 新規モジュールの定義
angular.module('myApp', []);

// 既存モジュールの取得
angular.module('myApp');
```

- `ng` - angular.min.js - AngularJSのコア機能
- `ngAnimate` - angular-animate.min.js - アニメーション機能
- `ngAria` - angular-aria.min.js - アクセシビリティに関わるARIA属性を追加
- `ngCookies` - angular-cookies.min.js - クッキー機能
- `ngMessageFormat` - angular-messageFormat.min.js - 複数形/性別などに応じた文字列の整形
- `ngMessage` - angular-messages.min.js - メッセージ表示のための諸機能
- `ngMock` - angular-mocks.js - ユニットテストのためのモック
- `ngMockE2E` - angular-mocks.js - E2Eテストのためのモック
- `ngResource` - angular-resource.min.js - サーバーサイドへの RESTful なアクセス
- `ngRoute` - angular-route.min.js - ルーティング機能
- `ngSanitize` - angular-sanitize.min.js - サニタイジング機能
- `ngTouch` - angular-touch.min.js - タッチスクリーンにおけるタッチ/スワイプなどの機能


### 2.3.2 DI コンテナー

DI（Dependency Injection）


#### 依存性注入の基本

```js
angular.module('myApp', [])
  .controller('MyController', function($scope) {
    $scope.msg = 'Hello, AngularJS!';
  });
```

### 配列アノテーションによる注入

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', 'BookList', function($scope, BookList) {
    $scope.books = BookList();
  }]);
```

- [ng-annotate ライブラリ](https://github.com/olov/ng-annotate)


#### $inject プロパティによる注入

```js
// controller
var My = function($scope, BookList) {
  $scope.books = BookList();
};

// add dependency
My.$inject = ['$scope', 'BookList'];

// add Controller to module
angular.module('myApp', [])
  .controller('MyController', My)
  .value('BookList', function() {
    return [
      {
        title: 'Book 1'
      },
      {
        title: 'Book 2'
      }
    ];
  });
```


#### 配列アノテーションの強制 - ng-strict-di 属性

```html
<!doctype>
<html ng-app="myApp" ng-strict-di>
```


### 2.3.3 双方向データバインディング

__データバインディング__ とは、JavaScript のオブジェクト（モデル）をHTMLテンプレートに紐付けるためのしくみのことです。


#### 双方向データバインディングの基本

`<input />` `<textarea?` `<select>` などのフォーム要素をモデルに紐づけるには、 `ng-model` 属性（ディレクティブ）を利用します


```html
<form>
  <label for="name">Name: </label>
  <input id="name" name="name" type="text" ng-model="myName" />
  <div>Hello, {{ myName }}!</div>
</form>
```

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    // 
  }]);
```


#### 補足: テキストボックスのデフォルト値

`ng-model` 属性を利用した場合、フォーム要素側に設定されたデフォルト値は無視されます。
`ng-model` が付与された時点で、フォーム要素の値はモデル値と同期しているため。


```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    // default value
    $scope.myName = 'Dan';
  }]);
```


#### One-time Binding

式の値が `undefined` の間だけ関しを実行し、一度、値がバインドしたら、監視を打ち切るしくみ。

__<a id="one-time-bind">#</a> 構文 One-time Binding__

```html
{{::expression}}
<div ng-bind="::expression">...</div>
```

たとえば

```html
<input id="name" name="name" type="text" ng-model="myName"/>
<div>Hello, {{ myName }}</div>
<div>Nice to meet you, {{::myName}}</div>
```

`ng-repeat` 属性であれば

```html
<tr ng-repeat="book in ::books">
  <td>{{ ::book.isbn }}</td>
  <td>{{ ::book.title }}</td>
  <td>{{ ::book.price }}</td>
  <td>{{ ::book.publish }}</td>
  <td>{{ ::book.published | date: 'yyyy年mm月dd日' }}</td>
</tr>
```


#### コントローラーのプロパティにアクセスする - controller as 構文

```html
<div ng-controller="MyController as my">
  <div>{{ my.msg }}</div>
</div>
```

```js
angular.module('myApp', [])
  .controller('MyController', function() {
    this.msg = 'Hello, AnglarJS';
  });
```
