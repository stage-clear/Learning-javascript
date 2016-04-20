# テスト

## 8.1 テストの基本

- ユニットテスト - 単体テストとも。サービス/コントローラー/ディレクティブ/フィルターなど、個々の構成要素を単体でチェッック
- E2E(End to End)テスト - インテグレーションテスト、シナリオテストとも。複数のコントローラー/ビューにまたがる、ユーザーの実際の操作に沿った挙動のテスト


## 8.2 ユニットテスト（基本）

### 8.2.1 ユニットテストのためのツール

1. テスティングフレームワーク
  - [QUnit](http://qunitjs.com/)
  - [Mocha](http://mochajs.org/)
  - [Nodeunit](https://github.com/caolan/nodeunit)
  - [Jasmine](http://jasmine.github.io/)
2. テストランナー
  - [Karma](http://karma-runner.github.io/)


Karma の特徴

- コマンドラインから簡単に起動でき、実行スピードにも優れる
- 複数のブラウザー環境で同時にテストが可能
- ファイルの変更を検知して、自動的にテストを実行
- Jasmine、Mocha、QUnit、Nodeunit など主要なテスティングフレームワークに対応
- CI（継続的インテグレーション）ツールである Jenkins/Travis などとも連携が可能


### 8.2.2 ユニットテストの準備

1. Node.js をインストールする
2. Karma と関連ライブラリをインストールする
  `$ npm install karma` `$ npm install -g karma-cli`
3. AngularJS のライブラリを配置する
4. Karma を初期化する

```sh
$ karma init
```

テストコードは一般的に、`xxxx_spec.js` のような命名をします。
`xxxx` の部分は、一般的には、テスト対象のファイル名とします。


### 8.2.3 テストの基本

#### 1. テストコードを準備する

```js
/**
 * describe
 * @param {String} name - テストスイートの名前
 * @param {Function} specs - テストケース（群）
 */
describe(name, specs)

/**
 * it
 * @param {String} name - テストケースの名前
 * @param {Function} test - テストの内容
 */
it(name, test)


/**
 * expect/[matcher]
 * @param {Any} result_value - テスト対象のコード（式）
 * @param {Function} matcher - 検証メソッド
 * @param {Any} expect_value - 期待する値
 */
expect(result_value).matcher(expect_value)
```

__Jasmine 標準で用意されている主な Mathcer__

|Matcher|概要|
|:--|:--|
|`toBe(expect)`|期待値 `expect`と同じオブジェクトであるか|
|`toEqual(expect)`|期待値 `expect` と同じ値であるか|
|`toMatch(regex)`|正規表現 `regex` にマッチするか|
|`toBeDefined()`|定義済みであるか|
|`toBeNull()`|`null` であるか|
|`toBeTruthy()`|`true` とみなせる値であるか|
|`toContainer(expect)`|期待値 `expect` 配列に含まれているか|
|`toBeLessThan(compare)`|比較値 `compare` より小さいか|
|`toBeGreaterThan(compare)`|比較値 `compare` より大きいか|
|`toBeCloseTo(compare, precision)`|精度 `precision` に丸めた値が比較値 `compare` と同じか|
|`toThrow()`|例外が発生するか|

否定したい場合は、`not` メソッドを利用してください

```js
expect(1 + 1).not.toEqual(2);
```


#### 2. テストを実行する

```sh
$ karma start karma.conf.js
```


## 8.3 ユニットテスト（AngularJS アプリ）

### 8.3.1 フィルターのテスト

- [サンプル](./spec/basic_spec.js) - `basic_spec.js`


#### テストスイート共通でサービスを準備する

__アンダースコアラッピング__

```js
var $filter;

// .. 中略 ..

beforeEach(inject(function(_$filter_) {
  $filter = _$filter_;
}));
```


### 8.3.2 サービスのテスト

- [サンプル](./spec/service_spec.js) - `service_spec.js`


### 8.3.3 コントローラーのテスト


- [サンプル](./spec/controller_spec.js) - `controller_spec.js`

```js
/**
 * $controller
 * @param {String} constructor - コントローラー名
 * @param {Object} locals - コントローラーに注入する値（ハッシュ値）
 */
$controller(constructor, locals)


/**
 * $new
 * @param {Boolean} isolate - 親スコープをプロトタイプ継承しない（def: false）
 * @param {Object} prent - 親となるスコープ（def: current scope）
 */
$rootScope.$new(isolate [, parent]);
```


### 8.3.4 ディレクティブのテスト

- [サンプル](./spec/directive_spec.js) - `directive_spec.js`


```js
/**
 * $compile
 * @param {} element - コンパイル対象
 * @param {} transclude - ディレクティブで利用可能な関数
 * @param {} priority - 優先順位（指定値よりも低いディレクティブだけを処理）
 */
$compile(element, [, transclude [, priority]])
```


## 8.4 モック

__モック__ とは一言で言うならば、ユニットテストのためのダミーのオブジェクトです。


### 8.4.1 タイムアウト/インターバル時間を経過させる　- `$timeout/$interval` モック




