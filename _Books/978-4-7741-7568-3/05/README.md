# サービス

## 5.1 サービスの基本

|サービス|概要|
|:--|:--|
|`$http`|非同期通信の実行|
|`$resouce`|HTTP経由でのCRUD処理|
|`$interval`|指定された時間単位に処理を実行|
|`$timeout`|指定時間の経過によって処理を実行|
|`$location`|ページのアドレス情報を取得/設定|
|`$q`|非同期処理のための機能群群|
|`$routeProvider`|ルートの定義|
|`$cookies`|クッキーを登録/削除|
|`$log`|開発者ツールにログを出力|
|`$exeptionHandler`|アプリ共通の例外処理を定義|
|`$injector`|依存性注入に関わる機能を提供|
|`$swipe`|モバイルデバイスへの対応|

## 5.2 非同期通信の実行 - `$http` サービス

### 5.2.1 `$http` サービスの基本

```
/**
 * $http 
 * config: 非同期通信の設定
 */
```

- [サンプル](https://jsfiddle.net/walfo/q5mj8910/) - `http.html`


__非同期通信のパラメータ情報（引数 config）__

|パラメータ|概要|
|:--|:--|
|`method`|リクエストに使用するHTTPメソッド(GET, POST, PUT, DELETE)|
|`url`|リクエスト先のURL|
|`params`|クエリ情報（キー名: 値..）のハッシュ形式|
|`data`|リクエスト本体として送信するデータ（キー名: 値..）のハッシュ形式|
|`headers`|リクエストヘッダー情報（キー名: 値..）のハッシュ形式|
|`timeout`|リクエストのタイムアウト時間|
|`responseType`|レスポンスの方（text, blob, document など。デフォルトは文字列）|
|`cache`|HTTP GETリクエストをキャッシュするか（`$cacheFactory` で生成したキャッシュを指定も可）|
|`xsrfHeaderName`|CSRFトークンで利用するリクエストヘッダーの名前|
|`xsrfCookieName`|CSRFトークンを含んだクッキーの名前|
|`paramSerializer`|クエリ情報（paramsパラメータ）のシリアライズ方法|
|`transformRequest`|リクエスト変換関数（配列も可）|
|`transformResponse`|レスポンス変換関数（配列も可）|
|`withCredentials`|XHRオブジェクトに `withCredentials` フラグを設定するか|


__非同期通信の結果処理メソッド__ 

|メソッド|概要|
|:--|:--|
|`sucess(s_func)`|通信制工事に実行する成功コールバック `s_func` を設定|
|`error(e_func)`|通信失敗時に実行するエラーコールバック関数 `e_func` を設定|
|`then(s_func, e_func)`|成功/エラーコールバック関数をまとめて設定|


__コールバック関数の引数__

|引数|概要|
|:--|:--|
|`data`|レスポンス本体（JSON 文字列の場合、JavaScript オブジェクトに変換）|
|`status`|HTTPステータスコード|
|`headers`|レスポンスヘッダー|
|`config`|リクエスト時に使用された構成オブジェクト|


__`$http` サービスのショートカットメソッド__

|メソッド|概要|
|:--|:--|
|`$http.get(url, config)`|`HTTP GET` でリクエスト|
|`$http.post(url, config)`|`HTTP POST` でリクエスト|
|`$http.put(url, config)`|`HTTP PUT` でリクエスト|
|`$http.patch(url, config)`|`HTTP PATCH` でリクエスト|
|`$http.delete(url, config)`|`HTTP DELETE` でリクエスト|
|`$http.head(url, config)`|`HTTP HEAD` でリクエスト|
|`$http.jsonp(url, config)`|`JSONP` としてリクエスト|


### 5.2.2 `HTTP POST` による非同期通信

```js
$http({
  method: 'POST',
  url: 'http.php',
  data: { name: $scope.name } // <-
})
```

```php
$n = $_POST['name'];
```

### 5.2.3 JSON 形式の Web API にアクセスする

クロスドメイン制約を超える手段としての JSONP

- [サンプル](https://jsfiddle.net/walfo/7nrh487h/) - `jsonp.html`

1. コールバック関数の名前 `JSON_CALLBACK` は固定
2. 成功コールバックは JavaScript オブジェクトを受け取る


### 5.2.4 非同期通信時のデフォルト値を設定する

`$httpProvider` プロバイダーを利用することで、`$http` サービスにおけるデフォルトの挙動を設定できます

```
/**
 * $httpPriovider
 * param: パラメータ名
 * value: 値
 */
$httpProvider.defaults.param = value;
```

個別のリクエストに限定した情報は `$http` メソッドから設定してください。


__`$httpProvider` プロバイダーで設定できる主なパラメータ__

|パラメーター名|概要|
|:--|:--|
|`cache`|キャッシュに利用すべきオブジェクト|
|`xsrfCookieName`|CSRFトークンを含んだクッキー名（デフォルトは `XSRF-TOKEN`）|
|`xsrfHeaderName`|CSRFトークンを含んだヘッダー名（デフォルトは `X-XSRF-TOKEN`）|
|`transformRequest`|リクエスト本体を変換する関数|
|`transformResponse`|レスポンス本体を変換する関数|
|`headers`|リクエストに付与するヘッダー情報|


#### リクエストヘッダーに追加する

```
/**
 * $httpProvider.defalts.headers
 * method: ヘッダーを付与する際のHTTPメソッド - common, get, post, put, patch, delete ..
 * header: ヘッダー名
 * value: ヘッダー値
 */
$httpProvider.defaults.headers.method[header] = value;          // (1)
$httpProvider.defaults.headers.method = { header: value, ... }  // (2)
```

デフォルトでは、以下リクエストヘッダーがセットされています

- `Accept: "application/json, text/plain, */*"` (common)
- `Content-Type: "application/json;charset=utf-8"` (post/put/patch)

既にヘッダー情報を持つHTTPメソッドにさらにヘッダーを追加/更新するには `(1)` を、
（getのように）まだヘッダー情報のない HTTPヘッダーを設定する場合には `(2)` を利用してください


```js
angular.module('myApp', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-with'] = 'XMLHttpRequest'
  }]);
```


#### リクエスト本体を操作する

- [サンプル](https://jsfiddle.net/walfo/d5t7d0ue/) - `http_request.js`


#### 標準のリクエスト変換関数

データがオブジェクトで、かつ、ファイル/Blob/FormData 型でない場合に JSON に変換しています

```js
transformRequest: [function(d) {
  return isObject(d) && !isFile(d) && !isBlob(d) && !isFormData(d) ? toJson(d) : d;
}],
```


#### 補足: リクエスト情報のシリアライザー

__AngularJS 標準のシリアライザー__


|サービス|概要|
|:--|:--|
|`$httpParamSerializer`|`$http` サービスデフォルトのシリアライザー|
|`$httpParamSerializerJQLike`|jQuery同様の機能を提供するシリアライザー|


```js
headers: {
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
},
transformRequest: $httpParamSerializerJQLike
```

- [サンプル](https://jsfiddle.net/walfo/5zg0c7k8/) - `http_request.js`


#### レスポンス本体を操作する

リクエストを加工する `transformRequest` プロパティに対して、レスポンスを加工するのは
`transformResponse` プロパティの役割です

```js
function defaultHttpesponseTransform(data, headers) {
  if (isString(data)) {
    // JSON_PROTECTION_PREFIX = ()]}',¥n / 空白を除去
    var tempData = data.replace(JSON_PROTECTION_PREFIX, '').trim();

    // JSON 形式のレスポンスはデシリアライズ
    if (tempData) {
      var contentType = headers('Content-Type');
      if ((contentType && (contentType.indexOf(APPLICATION_JSON) === 0)) ||
          isJsonLike(tempData)) {
        data = fromJson(tempData);
      }
    }
  }
  return data;
}
```

#### クロスサイトリクエストフォージェリ対策を実装する

サーバーサイドであらかじめランダムな文字列を生成し、クライアントに送信します。
クライアントサイドでも、リクエスト時にこの文字列をヘッダーなどに乗せて送信することで、
証明書代わりとするわけです。

一般的に、このようなXSRF対策はサーバーサイド主導で実施します。よって、`$http` サービスで
提供するのは、__決められたトークンをクッキー経由で受け取ったら、これをヘッダーで送信する__
というところだけです。


#### リクエスト/レスポンス時の共通処理を実装する

インターセプターとは、`$http` サービスによるリクエスト/レスポンスの前後で任意の処理を差し挟む
ためのしくみです

基本的な例。

- リクエストの処理時間を計測し、ログ出力する
- リクエスト/レスポンスに渡された構成情報をログ出力する
- サーバーが `500` エラーを返した場合、ダイアログ表示&指定のページに移動


- [サンプル](https://jsfiddle.net/walfo/wfoo6qLk/)  - `http_interceptor.js`


__構文 インターセプターの追加__

```
/**
 * $httpProvider.interceptors.push(func)
 * func: インターセプターのインスタンスを返すための関数
 */
$httpProvider.interceptors.push(['$q', '$log', '$window', 
  funciono($q, $log, $window) {
    return {
      
    };
  }
]);
```

__インターセプターで実装すべきメソッド__

|メソッド|概要|
|:--|:--|
|`request(config)`|リクエストされる直前に実行|
|`requestError(rejection)`|リクエストでエラーが発生した場合に実行|
|`response(response)`|レスポンスがアプリに渡される直前に実行|
|`responseError(rejection)`|レスポンスでエラーが発生した場合に実行|



## 5.3 HTTP経由での CRUD 処理 - `$resouce` サービス

`$http` を隠蔽し、HTTP 経由での CRUD (Create-Read-Update-Delete) をオブジェクト指向
ライクなコードで表現できるサービスとして、`$resouce` を用意しています。
RESTful なサービスと通信する場合には、原則として( `$http` ではなく) `$resource` サービス
を利用することをおすすめします。

__REST とは?__

REST(REpresentational State Transfer) ネットワーク上のコンテンツをすべて一意な URL で
表現するのが基本です。これらの URL に対して、HTTP のメソッドであるGET、POST、PUT、DELETE
を使ってアクセスするわけです。


### 5.3.1 サーバーサイドの準備

1. angular データベースの準備
2. PHP スクリプトを準備する


### 5.3.2 クライアントサイドの実装

- [サンプル](https://jsfiddle.net/walfo/1qoaz3z0/) - `resouce.html`


### 5.3.3 `resource` オブジェクトの生成

```js
/**
 * $resource
 * @argument {String} url: リクエスト先のURL
 * @argument {Object} defaults: リクエスト時に送信するパラメータのデフォルト値
 * @argument {Object} actions: アクション情報
 * @argument {Object} options: 動作オプション
 */
$resource(url [,defaults [, actions [,options]]])
```

|メソッド|HTTPメソッド|用途|
|:--|:--|:--|
|`query`|`GET`|複数のデータを取得（戻り値は配列）|
|`get`|`GET`|単一のデータを取得（戻り値は単一のオブジェクト）|
|`save`|`POST`|新規データを登録|
|`remove`|`DELETE`|既存データを削除|
|`delete`|`DELETE`|既存データを削除|


#### URLテンプレート - 引数 `url`

`resouce.php/:isbn` などのプレイスホルダーが使える


#### パラメータのデフォルト値 - 引数 `defaults`

`/articles/:id` に対して、引数 `defaults` が `{ id: 108, charset: 'utf8'}` であれば
デフォルトで `/artilces/108?charset=utf8` のようなアドレスが生成されます


#### アクションの追加情報 - 引数 `actions`


__引数 `actions` で指定できる主なパラメータ__

|パラメータ名|概要|
|:--|:--|
|`action`|アクション名|
|`method`|利用するHTTPメソッド（GET/POST/PUT/DELETE/JSONP）|
|`params`|アクションが利用するパラメータ|
|`url`|リクエスト先（元々指定されたものを上書き）|
|`isArray`|アクションの戻り値が配列であるか（`true/false`）|
|`transformRequest`|リクエスト変換関数（配列も可）|
|`transformResponse`|レスポンス変換関数（配列も可）|
|`cache`|HTTP GET リクエストをキャッシュ|
|`timeout`|リクエストのタイムアウト時間（ミリ秒）|
|`withCredentials`|XHRオブジェクトに `withCredentials` フラグを設定するか|
|`responseType`|レスポンスの型（`text` `blob` `document` など。デフォルトは文字列型）|
|`interceptor`|インターセプターを設定|


### 5.3.4 アクションの実行

```js
/**
 * query([params [,success [, error]]])
 * get([params [, success [, error]]])
 * save([params ,] post [, success [, error]])
 * remove([params ,] post [, success [, error]])
 * delete([params ,] post [, success [, error]])
 *
 * @argument {String} params - URLパラメータ
 * @argument {Object} post - リクエスト本体
 * @argument {Function} success - 成功コールバック関数
 * @argument {Function} error - 失敗コールバック関数
 */
```


#### 補足: インスタンスメソッド

非HTTP GET 系のアクションは、接頭辞 `$` 付きのインスタンスメソッドとしても利用できます

```js
var b = Book.get({ isbn: '000-0-0000-0000-0' }, function() {
  b.title = 'book title';
  b.$update(function() {
    $scope.books = Book.query();
  });
});
```


## 5.4 ルーティング - `$routeProvider` プロバイダー

__ルーティング__ とは、リクエストURLに応じて処理の受け渡し先（コントローラーとテンプレート）
を決定すること、そのしくみのことを言います


### 5.4.1 ルーティングの基本

- `ngRoute` をあらかじめインポートしておく必要があります
- `ng-view` 属性は、`ngRoute` モジュールで提供されるディレクティブです
- ルーティングによって呼び出されたテンプレートは、`ng-view` 属性で指定された領域の

```
/**
 * when
 * path: URLパターン
 * route: ルート情報（「パラメータ名: 値..」のハッシュ値）
 */
```

```
/**
 * otherwise(route)
 * route: ルート情報（「パラメータ名: 値..」のハッシュ値）
 */
```


#### テンプレート/コントローラーの作成

```
.
└── route.html#/articles/:id
    ├── route.html#/articles/100 --> $routeParams.id = 100
    └── route.html#/articles/108 --> $routeParams.id = 108

.
└── route.html#/search/:keyword*
    ├── route.html#/search/Angular/Karma/Bower --> $routeParams.keyword = 'Angular/Karma/Bower'
    └── route.html#/search/jQuery --> $routeParams.keyword = 'jQuery'
```


### 5.4.2 `$routeProvider.when` メソッドのパラメーター

```js
/**
 * when/otherwise
 * @argument {String} URLパターン
 * @argument {Object} ルート情報
 */
when(path, route)
otherwise(route)
```


#### 引数 path - URL パターン

引数 `path` は、ルーティングの際にどのルートを利王するかを決めるキーとなる情報です。
`/articles/:id`


__プレイスホルダーとURLパターンの例__

|No.|プレイスホルダー|URLパターン|マッチするリクエストURL（例）|
|:--|:--|:--|:--|
|1|`:name`|`/blog/:year/:month/:day`|`/blog/2015/08/05`  `/blog/2020/12/31`|
| |`:name`|`/blog/:year-:month-:day`|`/blog/2015-08-05`  `/blog/2020-12-31`|
|2|`:name?`|`/blog/:year?/:month?/:day?`|`/blog/2015/08/05`  `/blog/2015/08`  `/blog/2015`  `/blog`|
| |`:name?`|`/blog/:year/:month?/:day`|`/blog2015/08/31`  `/blog/2015/31`|
|3|`:name*`|`/search/:keyword*`|`/search/JavaScript`  `/search/JavaScript/AngularJS/jQuery`|
| |`:name*`|`/bookmark/:tag*/comment`|`/bookmark/javascript/framework/ecma/comment`|

- 原則として、省略パラメータは末尾に集めることをおすすめします - `:name?`


__ルートの優先順位__

特殊なルートを先に、一般的なルートをあとに記述する


__`hash` モードと　`html5` モード__

ルーティング時のパスには、`$location` サービスの `hash/html5` モードが利用されます。
デフォルトは、hash モードとなります。

- `http://example.com/routing/route.html#/articles/100` - hash モード
- `http://example.com/routing/articles/100` - html5 モード


#### 引数 `route` - ルート情報

__ルーティングにかかわる主なパラメータ（引数 route のキー）__

|パラメータ名|概要|
|:--|:--|
|`controller`|ルーティング先で利用するコントローラ|
|`controllerAs`|コントローラ名のエイリアス|
|`template`|利用するテンプレート（文字列）|
|`templateUrl`|利用するテンプレート（パス）|
|`resolveTo`|コントローラに注入する依存関係のマップ|
|`redirectTo`|リダイレクト先|
|`reloadOnSearch`|`$location.search/hash` が変更された時にルート先をリロードするか（デフォルトは `true`）|
|`caseInsensitiveMatch`|ルーティングの際に大文字小文字を区別しないか（デフォルトは `false` / 区別する）|

この中でもよく利用するのは `controller/templateUrl` パラメータです


### 5.4.3 例: 決められたルールで別のルートにリダイレクトする

```js
// ...
.when('/books/:id', { // <- 
  redirectTo: function(routeParams, path, search) {
    return '/articles/' + (Number(routeParams.id) + 10000);
  }
})
// ...
```

__`redirectTo` パラメータの引数__

|引数|概要|
|:--|:--|
|`routeParams`|ルートパラメータ（`$routeParams` に相当）|
|`path`|パス情報（`$location.path` に相当）|
|`search`|クエリ情報（`$location.search` に相当）|

- [サンプル](routing/index.html) - `route.js`


### 5.4.4 例: コントローラーの処理前に任意の処理を挿入する

`resolve` パラメータは、コントローラに注入されるべきサービスをハッシュ形式で指定します

- [サンプル](routing/index.html#/resolve) - `route_resolve.js`


## 5.5 標準オブジェクトのラッパー

AngularJS では JavaScript 標準の `window` `document` `location` オブジェクト、
`setInterval` `setTimeout` メソッドを利用してはいけません。

- `$window`
- `$document`
- `$location`
- `$interval`
- `$timeout`

### 5.5.1 指定された時簡単位に処理を実行する - `$interval`

```js
/**
 * $interval
 * @param {Function} fn - 実行する処理
 * @param {Number} delay - 処理間隔（ms）
 * @param {Number} count - 処理を繰り返す回数（d:0 = 無限）
 * @param {Boolean} invokeApply - $apply メソッド配下で引数 fn を実行するか（d: true）
 */
$interval(fn, delay [, count [, invokeApply]]);
```

- [サンプル](https://jsfiddle.net/walfo/sLu6ezw9/) - `interval.html`


#### タイマー処理をキャンセルする

```js
/**
 * cancel
 * @param {Object} Promise
 */
$timer.cancel(promise);
```

- [サンプル](https://jsfiddle.net/walfo/o3m7uh4d/) - `interval.html`


### 5.5.2 指定時間の経過によって処理を実行する - `$timeout`

```js
/**
 * $timeout
 * @param {Function} fn - 指定時間が経過したあと実行する処理
 * @param {Number} delay - 処理間隔（ms）
 * @param {Boolean} invokeApply - $apply メソッド配下で fn を実行するか（d: true）
 */
$timeout(fu, delay [, invokeApply]);
```

- [サンプル](https://jsfiddle.net/walfo/3th9vbh2/) - `timeout.html`


__引数付きの関数も実行可能に__

サービスの最後の引数として、コールバック関数への引数を指定できます。
可変長引数なので、複数の引数を受け取る場合にも必要な数だけ列挙できます

```js
var handler = function(message) {
  $scope.greeting = message;
};
var timer = $timeout(handler, 1000, true, 'Hello World!');
```


### 5.5.3 ページのアドレス情報を取得/設定する - `$location`

`$location` は現在のページのアドレス情報を取得/設定するためのサービスです。

- [サンプル](https://jsfiddle.net/walfo/vLb7evh0/) - `location.html`

__アドレスでもって現在の状態を表している__

#### `$location` サービスで利用できる主なメソッド

__`$location` サービスの主なメソッド__

|メソッド|概要|戻り値|
|:--|:--|:--|
|`absUrl()`|完全なアドレスを取得|`http://example.com/location.html#/articles?id=100#hash`|
|`*hash([hash])`|ハッシュ部分を取得/設定|`hash`|
|`host()`|ホスト情報を取得|`example.com`|
|`*path([path])`|パス情報を取得/設定|`/articles`|
|`port()`|ポート番号を取得|`80`|
|`protocol()`|プロトコル情報を取得|`http`|
|`*search([search])`|クエリ情報を取得/設定|`{ id: "100" }`|
|`*url([url])`|アドレス全体||


__1. アドレス情報を取得__

```js
if ($location.path() === '/articles') {
  console.log('id: ' + $location.search().id);
}
```

__2. JavaScript でルートを移動__

```html
<button ng-click="onclick()">記事No.13 へ移動</button>
```
```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', '$location', 
    function($scope, $location) {
      // ...
      $scope.onclick = function() {
        $location.path('/articles/13');
      };
  }]);
```


#### html5 モードと　hash モード

- html5モードでは、相対パスの基準URIを示すため `<base/>` 要素は必須です
- [サンプル](location/location_html5.html) - `location_html5.html`


__hash の接頭辞を設定する__

```js
$locationProvider.hasPrefix('!');
//=> http:example.com/location.html#!/articles?id=100#hash
```


## 5.6 Promise による非同期処理 - `$q`

### 5.6.1 Promise の基本

- [サンプル](https://jsfiddle.net/walfo/j9uwup0f/) - `promise.js`

Promise を利用する場合、ひとつひとつの処理をあらかじめ関数として用意しておくのが基本です。

__Promise に対応した関数の条件__

1. `deferred` オブジェクト
2. 非同期処理の中では、`deferred` オブジェクト経由で処理の結果を通知する
3. 戻り値として `Promise` オブジェクトを返す

`Promise` と `deferred` は常に `1:1` の関係にあります。
`Promise` が処理の状態を表すのに対して、`deferred` は `Promise` に対して処理の成否を
通知する役割を担います。


__`deferred` オブジェクトの主なメソッド__

|メソッド|概要|
|:--|:--|
|`resolve(value)`|成功通知（引数 `value` は結果値など）|
|`reject(reason)`|失敗通知（引数 `reason` はエラー情報など）|
|`notify(value)`|状況通知 `resolve/reject` で何度でも呼び出し可能（引数 `value` は任意の情報）|


__`Promise` オブジェクトの主なメソッド__

|メソッド|概要|
|:--|:--|
|`then(success [,error [, notice]])`|成否/通知に対応するコールバック関数を登録|
|`catch(error)`|エラー時に実行すべきコールバック関数を登録|
|`finaly(final [, notice])`|処理の成否にかかわらず、最後に呼び出されるコールバック関数 `final` を登録| 


### 5.6.2 非同期処理の連結

- [サンプル](https://jsfiddle.net/walfo/Lofdkk1e/) - `promise.js`

```js
process.
  then(
    function(o_resolcve) {
      return '++' + o_resolve + '++'; // ->
    }
  )
  .then(
    function(o_resolve) {
      console.info(o_resolve); // 前の `then` の戻り値を引き継ぐ
    }
  );
```


### 5.6.3 例: 現在地から日の入り時刻を求める

- [サンプル](promise/get.html) - `geo.html`

`$http` `$resource` `$timeout` `$interval` などのサービスは `$q` に依存しており、戻り値として
`Promise` オブジェクトを返します

`then` メソッドを連結する場合には、一般的に、`Promise` 対応関数（= `Promise` オブジェクトを返す関数）
をそのまま、成功/失敗コールバックの戻り値に渡すのが一般的です


### 5.6.4 複数の非同期処理を監視する

```
/**
 * $q.all
 * @param {Array} promises - 監視する Promise オブジェクトの配列
 */
$q.all(promises).then(resolve [, reject])
```

- [サンプル](https://jsfiddle.net/walfo/exyz0sfx/) - `promise.js`

```js
$q.all([
  asyncProcess('value1'),
  asyncProcess('value2'),
  asyncProcess('value3')
])
.then(
  function(o_resolve) {
    // 成功時
    console.log(o_resolve);
  },
  function(o_reject) {
    console.log(o_reject);
  }
);
```

## 5.7 その他のサービス

__その他のサービス__

|サービス名|概要|
|:--|:--|
|`$cookies`|クッキー登録/削除|
|`$log`|開発者ツールにログを出力|
|`$exceptionHandler`|アプリ共通の例外処理を定義|
|`$injector`|非 AngularJS アプリで AngularJS のサービスを利用|
|`$swipe`|モバイルデバイスへの対応|


### 5.7.1 クッキーを登録/削除する - `$cookies/$cookiesProvider`

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-cookies.min.js"></script>
```

```js
angular.module('myApp', ['ngCookies'])
  .controller('MyController', ['$scope', '$cookies', 
    function($scope, $cookies) {
      // 
      $cookeis.get('key');
      $cookeis.put('key', 'value', {
        expire: expire
      });
      $cookies.remove('key');
    }]);
```

- [サンプル](https://jsfiddle.net/walfo/rgjrg4vc/) - `cookies.html`

```js
/**
 * $cookies.get
 * @param {String} key - クッキー名
 */
$cookies.get(key)

/**
 * $cookies.put
 * @param {String} key - クッキー名
 * @param {Any} value - クッキー値
 * @param {Object} options - クッキーオプション
 */
$cookies.put(key, value [, options])


/**
 * $cookies.remove
 * @param {String} key - クッキー名
 * @param {Object} options - クッキーオプション
 */
$cookies.remove(key, [, options])
```


__`$cookies` サービスで利用できる主なオプション__

|パラメータ|概要|デフォルト|
|:--|:--|:--|
|`path`|有効なパス|`<base>` 要素の `href` 属性|
|`domain`|有効なドメイン|現在のドメイン|
|`expires`|有効期限|`0`|
|`secure`|SSL接続でのみクッキーを送信するか|`false`|


__すべてのクッキーを取得する__

```js
angular.forEach($cookies.getAll(), function(value, key) {
  console.log(key + ':' value);
});
```


#### クッキーにオブジェクトを保存する

```js
/**
 * $cookies.putObject
 * @param {String} key - クッキー名
 * @param {Any} value - クッキー値
 * @param {Object} options - クッキーオプション
 */
$cookies.putObject(key, value [,options])


/**
 * $cookies.getObject
 * @param {String} key - クッキー名
 */
$cookies.getObject(key)
```

- [サンプル](https://jsfiddle.net/walfo/xep7vo8x/) - `cookies_obj.html`


#### アプリ共通のクッキーオプションを設定する

```
/**
 * $cookiesProvider
 * param: パラメータ名
 * value: 値
 */
$cookiesProvider.defaults.param = value;
```

- `$cookiesProvider` プロバイダーによる設定は、module オブジェクトの `config` メソッド内で行われます
- [サンプル](https://jsfiddle.net/walfo/awvodv58/)  - `cookies.html`


### 5.7.2 開発者ツールにログを出力する - `$log/$logProvider`

__`$log` サービスのメソッド__

|メソッド|概要|
|:--|:--|
|`debug(str)`|デバッグのための情報|
|`error(str)`|エラーメッセージ|
|`info(str)`|情報|
|`log(str)`|一般的なログ|
|`warn(str)`|警告メッセージ|

- `$logProvider` プロバイダーによる設定は、module オブジェクトの `config` メソッドで行います
- [サンプル](https://jsfiddle.net/walfo/6y4d74go/) - `log.html`


## 5.7.3 アプリ共通の例外処理を定義する - `$exceptionHandler`

- `$exceptionHandler` を定義（上書き）するには、`factory` メソッドを利用します
- [サンプル](https://jsfiddle.net/walfo/9jva44ju/) - `exception.js`


```
/**
 * $exceptionHandler
 * @argument {Object} exception - 発生した例外情報
 * @argument {String} cause - 例外に付随する詳細情報
 */
$exceptionHandler(exception [,cause])
```


### 5.7.4 非 AngularJS アプリで AngularJS のサービスを利用する - `$injector`

__サービスを注入できるメソッド__

- `controller`
- `filter`
- `directive`
- `service`
- `factory`
- `provider`
- `config`
- `run`

これらのメソッド以外でサービスを注入した、そもそも AngularJS の管理外のコードから AngularJS
のサービスを利用したいという場合


#### `$injector` サービスの基本

- [サンプル](https://jsfiddle.net/walfo/q06yrw84/) - `injector.html`

```js
/**
 * angular.injector
 * @param {Array} modules - サービスが属するモジュールのリスト
 */
$injector = angular.injector(modules)


/**
 * $injector.invoke
 * @param {Function} fnc - 実行する関数
 * @param {Object} self - 配下の this が指すオブジェクト
 * @param {Object} locals - 配下で利用できるサービス（「名前 : 値」のハッシュ）
 */
$injector.invoke(fnc [, self [, locals]])


/**
 * $injector.get
 * インスタンスを取得する
 * @param {String} name - サービス名
 */
$injector.get(name)


/**
 * $injector.has
 * サービスが存在するかどうかを判定する
 * @param {String} name - サービスの名前
 */
$injector.has(name)


/**
 * $injector.instantiate
 * サービスを注入してインスタンスを生成する
 * @param {Function} type - アノテーションされたコンストラクター関数
 * @param {Object} locals - 引数情報（「名前: 値」）
 */
$injector.instantiate(type [, locals])

/**
 * $injector.annotate
 * 関数が要求するサービスの名前を取得する
 * @param {Function} fnc - 任意の関数
 */
$injector.annotate(fuc)
```

- [サンプル](https://jsfiddle.net/walfo/tcoce0st/) - `$injector.get`
- [サンプル](https://jsfiddle.net/walfo/c7bpvknx/) - `$injector.has`
- [サンプル](https://jsfiddle.net/walfo/fuLp6160/) - `$injector.instantiate`
- [サンプル](https://jsfiddle.net/walfo/0gz1f9j8/) - `$injector.annotate`


### 5.7.5 モバイルデバイスへの対応 - `$swipe (ngTouch)` 


#### タッチ/スワイプイベントを捕捉する

__`ngTouch` モジュールが提供するディレクティブ__

|ディレクティブ|概要|
|:--|:--|
|`ng-click`|タッチイベントを捕捉|
|`ng-swipe-left`|左スワイプイベントを捕捉|
|`ng-swipe-right`|右スワイプイベントを捕捉| 


- [サンプル](swipe/swipe.html) - `swipe.html`


#### スワイプの細かな挙動を監視する

__`$swipe` サービスによるスワイプの検知__

1. Start イベント/タッチの開始 - `touchstart/mousedown`
2. move イベント/タッチ中 - `touchmove/mousemove`
3. end イベント/タッチ終了 - `touchend/mouseup`
3. cancel イベント/キャンセル ^ `touchcancel`

```js
/**
 * $swipe.bind
 * @param {Object} element - 対象の要素
 * @param {Object} events - イベント情報
 */
$swipe.bind(element, events)
```


## 5.8 グローバル API

__グローバルAPI__ とは　`angular` オブジェクト経由でよびだせるメソッド群の総称です。

### 5.8.1 AngularJS の現在のバージョン情報を取得する - `version` プロパティ

```js
console.log( angular.version );
```

- [サンプル](https://jsfiddle.net/walfo/2y9dw3Ls/) - version.html 


### 5.8.2 オブジェクトが等しいかどうかを判定する - `equals` メソッド

```js
/**
 * equals メソッド
 * オブジェクトが等しいかどうかを判定する
 * @param {Any} o1 - 比較するブジェクト（オブジェクト、配列、正規表現のいずれか）
 * @param {ANy} o2 - o1と同じ
 */
angular.equals(o1, o2)
```

`equals` メソッドが `true` を返す条件

- オブジェクト（値）同士が `===` 演算子による比較で `true` を返すこと
- オブジェクト（値）同士が同じ型で、かつ、すべてのプロパティが `angular.equals` メソッドによる比較で等価であること
- 値同士がいずれも `NaN` であること
- 値同士がいずれも同じ正規表現であること

なお、プロパティの比較に際して、以下のものは無視されます

- `function` 型のプロパティ（= メソッド）
- `$` で始まる名前のプロパティ

- [サンプル](https://jsfiddle.net/walfo/e3n9kkbp/) - `equals.html`


### 5.8.3 変数の型を判定する - `isXxxxx` メソッド

|メソッド|概要|
|:--|:--|
|`isArray(value)`|値が配列であるか|
|`isDate(value)`|値が日付型であるか|
|`isDefined(value)`|値が `undefined` であるか|
|`isElement(value)`|値が要素オブジェクトであるか|
|`isFunction(value)`|値が関数型であるか|
|`isNumber(value)`|値が数値型であるか|
|`isString(value)`|値が文字列型であるか|
|`isUndefined(value)`|値が `undefined` であるか|

```js
angular.isElement(document.getElementById('main')); // true
angular.isElement($('#main')); // true 

angular.isDefined(undefined); // false
angular.isDefined(null); // true
angular.isUndefined(undefined); // true
angular.isUndefined(null); // false

angular.isNumber(0.123E10); // true
angular.isNumber('0.123E10'); // false
angular.isNumber(0xFF); // true

angular.isArray(['a', 'b']); // true
angular.isArray(new Aray('a', 'b')); // true

angular.isString('yamada'); // true
angular.isString(12345); // false

angular.isDate(new Date()); // true
angular.isDate(new Date().getTime()); // false

angular.isFunction(function() { /**/ }); // true
angular.isFunction(new Function()); // true

angular.isObject(['a', 'b']); // true
angular.isObject(null); // false
angular.isObject(undefined); // false
angular.isObject('yamada'); //false
angular.isObject(new Date()); // true
angular.isObject({foo: 'bar'}); // true
```

### 5.8.4 文字列を大文字⇔小文字に変換する - `lowercase/uppercase` 

```js
angular.lowercase('AngularJS'); // angularjs
angular.uppercase('AngularJS'); // ANGULARJS
```


### 5.8.5 JSON 文字列⇔JavaScriptオブジェクトを変換する

```js
/**
 * angular.fromJson
 * @param {String} json - 任意の文字列
 * @return {Object} 
 */
angular.fromJson(json)

/**
 * angular.toJson
 * @param {Object} obj - 任意のオブジェクト [Object|Array|Date|string|number]
 * @param {Boolean} pretty - 変換後の文字列に空白や改行を含めるか(def: false)
 */
angular.toJson(obj [,pretty])
```

- `$$` で始まる名前のプロパティを除去（ `toJson` ）
- 文字列以外を渡した場合には、引数の値そのままを返す（ `fromJson` ）


### 5.8.6 配列/オブジェクトの要素を順番に処理する - `forEach` メソッド

```js
/**
 * angular.forEach
 * @param {Object} obj - 処理対象 [Array|Object]
 * @param {Function} iterator - 処理するコールバック関数
 *   #iterator(value, index|key, ary)
 *   @arg {Any} value - 配列の値
 *   @arg {Number} index|key - 配列のインデックス番号、もしくはプロパティ名
 *   @arg {Array} ary - 配列そのもの
 * @param {Object} context - コールバック関数内で `this` とするべきオブジェクト
 */
angular.forEach(obj, iterator [, context])
```

#### 配列を処理する

```js
var books = [
  { isbn: '111', title: 'title' }, 
  // ...
];
angular.forEach(book, function(value, index, ary) {
  console.log(index + ', ' + value.title);
});
```

#### オブジェクトを処理する

```js
var book = { isbn: '111', title: 'title' };
angular.forEach(book, function(value, key, obj) {
  console.log(key + ', ' + value);
});
```

#### コールバック関数配下の `this` を固定する

```js
var books = [
  { isbn: '111', title: 'title' }
];
var res = [];
angular.forEach(books, function(value, index, ary) {
  this.push(index + ', ' + value.title);
}, res)
```


### 5.8.7 オブジェクト/配列をコピーする - `copy` メソッド

```js
/**
 * angular.copy
 * @param {Object} - コピー元の配列
 * @param {Object} - コピー先の配列
 */
angular.copy(source [,dest]);
```

- 引数 `dest` を省略した場合、戻り値として配列/オブジェクトのコピーを返す
- 引数 `dest` を指定した場合、その要素（またはプロパティ）をすべて削除の上で、コピーを実行
- 引数 `source` が配列/オブジェクトでない場合、その値をそのまま戻り値として返す
- 引数 `source/dest` が同一の場合、`copy` メソッドは例外を返す


#### 補足: シャローコピーとディープコピー

JavaScript 標準の `concat` メソッドはシャローコピーで、オブジェクト配下のメンバーではなく、オブジェクトの参照をコピーします。一方 `angular.copy` はディープコピーで、コピー元への変更がコピー先に影響することはありません。


### 5.8.8 オブジェクト同士をマージする - `extend/merge` メソッド

```js
/**
 * anglar.extend
 * @param {Object} target - 拡張対象のオブジェクト
 * @param {Object} src - 連結するオブジェクト（複数可）
 */
angular.extend(target, src,...)
```

- 同名のプロパティは、あとのもので上書きされる
- 再帰的なマージには未対応（入れ子の中身など）
  - 中身もマージする場合は `angular.merge` メソッドを利用する

```js
/**
 * angular.merge
 * @param {Object} target
 * @param {Object} src -
 */
angular.merge(target, src,...)
```

### 5.8.9 jQuery 互換オブジェクトを取得する - `element` メソッド

```js
/**
 * angular.element
 * @param {HTMLObject} elm - 要素オブジェクト、またはHTML文字列
 * @return {Object} jqLite オブジェクト
 */
angular.element(elem)
```

AngularJS をインポートする前に、jQuery をインポートしておくと、jqLite を jQuery に置き換えることも可能です

#### 利用する jqLite/jQuery を固定する - `ng-jq` ディレクティブ

1. jqLite の利用を強制する - `<html ng-app ng-jq>`
2. jQuery のバージョンを固定する 

```html 
<html ng-app ng-jq="newJq"> 
<script>
var newJq = jQuery.noConflict();
</script>
```

#### jQuery/jqLite の AngularJS 拡張

|分類|機能|概要|
|:--|:--|:--|
|イベント|`$destory`|要素ノード破棄の際に発生|
|メソッド|`contorller([name])`|現在の要素、もしくは親要素のコントローラーを取得|
||`injector()`|現在の要素、もしくはその親要素お `$injector` を取得|
||`scope()`|現在の要素、もしくはその親要素のスコープオブジェクトを|
||`isolateScope`|現在の要素に関連づいた分離スコープを取得|
||`inheriteData()`|Data メソッドと同様、見つかるでに上位要素を探索|


### 5.8.10 AngularJS アプリを手動で起動する - `bootstrap` メソッド

```js
/**
 * angular.bootstrap
 * @param {HTMLElement} element - AngularJS アプリのルート要素
 * @param {Array} module - アプリが依存するモジュール
 */
angular.bootstrap(element [,modules]);
```


### 5.8.11 `this` キーワードのコンテキストを強制的に変更する - `bind` メソッド

```
/**
 * angular.bind
 * @param {Object} self - fnc の中で `this` とみなすオブジェクト
 * @param {Function}  fuc - 対象の関数
 * @param {Object} args - 関数に渡す引数（可変長引数）
 */
```

```js
document.getElemnentById('btn').addEventListener('click', angular.bind(obj, obj.show), true);
```


### 5.8.12 空の関数を取得する - `noop` メソッド

高階関数などで関数が指定されなかった場合に、「なにもしない」を表現するために利用します。
（`noop` は No Operation のこと）

```js
angular.noop;
```

### 5.8.13 デフォルトの関数を準備する - `identity` メソッド

```js
/**
 * identity
 * @param {Any} value
 */
angular.identity(value)
```