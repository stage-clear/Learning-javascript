# フィルター

## 4.1 フィルターの基本
### 4.1.1 テンプレートからのフィルター利用

```
{{ expression | filter [: param1 [: param2]] }}
```


### 4.1.2 JavaScript からのフィルター利用

```js

/**
 * $filter
 * @param {String} filter - フィルター名
 * @param {Any} expression - 整形対象の式
 * @param {String} param1, param2, ... - パラメータ
 */

$filter(filter)(expression [, param1 [, param2]]);

// $filter はサービスの一種なので、
// 配列アノテーションで明示的に注入します
angular.module('myApp', [])
  .controller('MyController', ['$scope', '$filter', function($scope, $filter) {
    $filter('currency')(price, '¥');
  }]);
```


## 4.2 文字列関連のフィルター

|フィルター名|概要|
|:--|:--|
|`lowercase`|大文字から小文字に変換|
|`uppercase`|小文字から大文字に変換|
|`json`|オブジェクトをJSON形式の文字列に変換|
|`linky`|URL/メールアドレスをリンクに整形|


### 4.2.1 文字列を大文字⇔小文字に変換する - `lowercase/uppercase`

- [サンプル](https://jsfiddle.net/walfo/g3ob2hks/) - `lowercase.html`


### 4.2.2 オブジェクトを JSON 形式に変換する - `json` 

- [サンプル](https://jsfiddle.net/walfo/hax7j2vv/) - `json.html`

オブジェクトにメソッドがある場合は無視されます。


### 4.2.3 URL/メールアドレスのリンクを整形する - `linky`

- `@required ngSanitize`
- リンク化する対象は、`http/https/ftp/mailto` の4種類
- メールアドレスには `mailto:` を付けても付けなくても付けなくても、同じメールリンクとして認識
- URLを含んだ文字列は、URL部分だけをリンク化
- [サンプル](https://jsfiddle.net/walfo/2rh5brLx/) - `linky.html`


## 4.3 配列関連のフィルター

配列を対象とするフィルターは、その性質上 `ng-repeat` とセットで利用することの多いフィルターです

|フィルター名|概要|
|:--|:--|
|`orderBy`|配列を指定の条件でソート|
|`limitTo`|配列から先頭の `n` 件を抽出|
|`filter`|配列を指定の条件でフィルタリング| 


### 4.3.1 配列をソートする - `orderBy`


#### 特定のキーでソートする（文字列式）

- `ng-repeat="book in books | orderBy: 'price'"` - `book` 要素の `price` プロパティでソートする場合
- 降順にソートするなら、ソート式に `'-price'` マイナス記号を付与します
- `ng-repeat="book in books | orderBy: 'price': true"` - `orderBy` フィルターの `reverse` プロパティを `true` にしても同じ意味です
- [サンプル](https://jsfiddle.net/walfo/nzm3yr4h/)


#### 複数のキーでソートする（配列式）

- `ng-repeat="book in books | orderBy: ['publish', 'price']"`
- [サンプル](https://jsfiddle.net/walfo/k73xm37g/) - `order_array.html`


#### ソート規則をカスタマイズする（関数式）


- `ng-repeat="member in members | orderBy: mySort"` - 引数に関数名を指定します
- 降順にする場合 `orderBy: mySort : true` - `reverse` プロパティに `true` を指定します
- 複数指定のひとつとする場合 `orderBy: [mySort, 'old']`
- [サンプル](https://jsfiddle.net/walfo/4pa1uyr3/)


__ソート関数は以下の条件を満たす必要があります__

- 引数としてソート対象のオブジェクトを受け取ること
- 戻り値としてソートに利用される数値を返すこと

```js
$scope.mySort = function(target) {
  var types = { 'a': 0. 'b': 1. 'c': 2, 'd': 3 };
  return roles[target.type];
}
```

__配列をダンラムに並べかえる__

```js
$scope.mySort = function(member) {
  return Math.random();
}
```


### 4.3.2 例: ソート可能なテーブルを作成する

- [サンプル](https://jsfiddle.net/walfo/xd9qehe4/) - `order_table.html`


### 4.3.3 配列の件数を制限する - `limitTo`

__構文 `limitTo` フィルター__

```
/**
 * expression 操作対象の配列
 * num 取得する件数
 */
{{ expression | limitTo: num }}
```

- `limitTo` フィルターはその性質上、`orderBy` フィルターとセットでよく利用します
- [サンプル](https://jsfiddle.net/walfo/e7ngcbnv/) - `limit.html`


### 配列の後方から取得する

`limitTo: -3` - 負数を与えることで、末尾から `n` 件を取得することもできる


### ページング機能を実装する

__構文 `limitTo` フィルター（2）__

```
/**
 * expression 操作対象の配列
 * num 取得する件数
 * start 開始位置 (デフォルトは8。負数で配列の末尾からのインデックス値)
 */
{{ expression | limitTo: num: start }}
```

- [サンプル](https://jsfiddle.net/walfo/1o0qpo8c/) - `limit_pager.html`


#### 部分文字列を取得する

`limitTo` フィルターは文字列に対して適用することができます。

- [サンプル](https://jsfiddle.net/walfo/h5awmyf4/) - `limit_str.html`


### 4.3.4 配列を特定の条件で絞り込む - `filter`

```
/**
 * expression - 検索対象の配列
 * search - 検索式
 * comparator - 比較オプション
 */
{{ expression | filter: search: comparator }}
```

#### 文字列で部分一致検索する

- `ng-repeat="item in items | filter: 'keyword'"`
- `!` を付与した場合は否定条件となります。 `ngprepeat="item in items | filter: '!keyword'"`
- [サンプル](https://jsfiddle.net/walfo/pm7zhmL2/) - `filter.html`


__フィルター件数を保存する__

as 句でフィルター結果を変数に格納することで、あとからこれを参照できます

```html
<tr ng-repeat="book in books | filter: 'keyword' as filtered">
</tr>

表示件数 {{ filtered.length }}件数
```

#### 文字列で完全一致検索する

- 引数 `comparator` に `true` を指定することで、完全一致検索にすることができます
- `ng-repeat="item in items | filter: 'keyword' : true"`
- [サンプル](https://jsfiddle.net/walfo/w83f6zpp/) - filter.html


#### 特定のプロパティに対して検索する

- 引数 `search` を 「プロパティ名: 検索文字列」のハッシュ値で指定します
- `!` で否定もできますし、`comparator` を指定することもできます
- `ng-repeat="item in items | filter: { title: 'keyword', publish: 'A'}"`
- オブジェクト式でキーとして `$` を渡すと、すべてのプロパティを表します


#### 自作の検索条件を適用する

```html
<tr ng-repeat="item in items | filter: myFilter"> 
</tr>
```

```js
angular.module(myApp, [])
  .controller('MyController', ['$scope', function($scope) {
    // ...
    $scope.myFilter = function(value, index) {
      return value.price >= 3000;
    };
  }]);
```

- [サンプル](https://jsfiddle.net/walfo/Lmz1eaf8/) - filter_func.html


__検索条件メソッドであることの条件__

- 引数として、現在の要素値（ `value` ）とインデックス値（ `index` ）を受け取ること
- 結果配列に現在の要素を残す場合には、戻り値を `true` とすること


#### 独自の比較オプションを設定する

- 引数 `comparator` は、`true/false` 以外に関数を指定することができます
- 関数を指定することで、期待値（検索式）と実際値（配列内の要素）とをどのように比較すべきかをカスタマイズできます

```html
<tr ng-repeat="item in items | filter: { title: 'keyword'} : myComparator">
</tr>
```

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    // 実際値と期待値の比較方法を決定する myComparator メソッド
    $scope.myComparator = function(expected, actual) {
      return expected.indexOf(actual) > -1;
    };
  }])
```

- [サンプル](https://jsfiddle.net/walfo/08c0s13p/) - `filter_comp.html`

__比較オプションを表すための条件__

- 引数として、`expected` （検索式）と`actual` （実際の要素値）を受け取ること
- 結果配列に現在の要素を残す場合には、戻り値として `true` を返すこと


__引数　`comparator` が `true` であるとは？__

引数 `comparator` に　`true` を指定することは、以下を指定したのと同じ意味となります

```js
function (expected, actual) {
  return angular.equals(expected, actual);
}
```

## 4.4 数値/日付関連のフィルター

|フィルタ名|概要|
|:--|:--|
|`number`|数値を文字列として整形（桁区切り文字、丸めなど）|
|`currency`|通過形式に整形|
|`date`|日付を整形|

`<script src="i18n/angular-locale_ja-jp.js"></script>`

- [i18n](https://github.com/angular/angular.js/tree/master/src/ngLocale)


### 4.4.1 数値を桁区切り文字で整形して出力する - `number`

```
/**
 * expression: 整形対象の数値
 * fraction: 小数点以下の最大桁数（日本語ロケールのデフォルトは3）
 */
{{ expression | number [:fraction] }}
```

- [サンプル](https://jsfiddle.net/walfo/vgpvhr1w/) - `number.html`


### 4.4.2 数値を通過形式に整形する - `currency`

```
/**
 * expression: 整形対象の数値
 * symbol: 通過記号
 * fraction: 小数点以下の最大桁数（日本語ロケールのデフォルトは2）
 */
{{ expression | currency [:symbol [:fraction]] }}
```

- [サンプル](https://jsfiddle.net/walfo/fzg30058/)


### 4.4.3 日付を整形する - `date`

```
/**
 * datetime: 日付時刻数値
 * format: 日付時刻書式（デフォルトは mediumDate）
 * timezone: タイムゾーン
 */
{{ datetime | date [:format [:timezone]] }}
```

- [サンプル](https://jsfiddle.net/walfo/rze54bfj/) - `date.html`