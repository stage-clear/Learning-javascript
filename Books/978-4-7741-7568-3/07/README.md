# ディレクティブ/フィルター/サービスの自作

## 7.1 フィルターの自作

### 7.1.1 フィルターの基本

```js
angular.module('myApp', [])
  .filter('nl2br', function() {
    return function(value) {
      if (!angular.isString(value)) {
        return value;
      }
      return value.replace(/\r?\n/g, '<br/>');
    }
  });
```

__構文: `filter` メソッド__

```js
/**
 * filter
 * @param {String} name - フィルター名
 * @param {Function} factory - 関数を生成するファクトリー関数
 */
angular.filter(name, factory)
```

引数 `factory` には、フィルター関数そのものではなく、フィルター関数を生成するための関数
（ファクトリー関数）を指定します。フィルター関数であることの条件は以下の通りです。

- 第1引数として、フィルターの加工対象となる値を受け取ること(ここでは `true` )
- 戻り値としてフィルターで加工したあとの値を返すこと

__例__

- [サンプル](https://jsfiddle.net/walfo/06qm5b2L/) - `basic.html`


### 7.1.2 パラメーター付きのフィルターを定義する


__例) `truncate` フィルター__

```js
/**
 * truncate 
 * {{ str | truncate [:length [:omission]]}}
 */
```

- [サンプル](https://jsfiddle.net/walfo/38nes0fr/) - `params.js`


### 7.1.3 例: 配列の内容を任意の条件でフィルターする

__例: `grep` フィルター__

```js
/**
 * {{ array | grep : callcack}}
 * @param {Array} array - 処理対象の配列
 * @param {Function} callback - 配列要素を絞り込むためのコールバック関数
 */
```

- [サンプル](https://jsfiddle.net/walfo/6td46yjL/) - `array.html`


#### フィルターはできるだけシンプルに

フィルターは、あくまで最終的な結果値を加工するためのシンプルな用途に留めるべきです。
フィルターの中身が複雑になってきたら、そもそもサービスに委ねるべき処理ではないのかを、あらためて
検証するようにしてください。


### 7.1.4 既存のフィルターを利用する - `$filter`

__例: `percent` フィルター__

```js
/**
 * {{ num | percent [: fraction] }}
 * @param {Number} num - 処理対象の数値
 * @param {Number} fraction - 小数点以下の桁数（def: 0）
 */
```

- [サンプル](https://jsfiddle.net/walfo/4tkn4wm5/) - `use.html`


## 7.2 サービスの自作

サービスを登録するためのメソッドには、以下の5種類があります

- `value`
- `constant`
- `factory`
- `service`
- `provider`


### 7.2.1 シンプルな値を共有する（1） - `value` メソッド

AngularJS アプリの中で、グローバル変数（のようなもの）を提供するサービス、と言っても良いかもしれません。

__構文 `value` メソッド__

```js
/**
 * value
 * @param {String} name -サービス名
 * @param {Any} object - サービスのインスタンス（任意の型）
 */
value(name, object)
```

- [サンプル](https://jsfiddle.net/walfo/mn2jc81t/) - `value.html`


### 7.2.2 シンプルな値を共有する（2） - `constant` メソッド

```js
/**
 * constant
 * @param {String} name - サービス名
 * @param {Any} object - サービスのインスタンス（任意の型）
 */
constant(name, object)
```

- [サンプル](https://jsfiddle.net/walfo/b1z6hzc1/) - `constant.html`


__`value` との違い__

サービスが利用可能となるタイミングです。

`config` メソッドはサービスのインスタンスが登録される __前に__ 呼び出されるという性質があります。
このため、一般のサービスは注入に失敗します。例外的に `constant` サービスだけが `config` メソッドの
__前に__ 利用可能になります。

`config` メソッドで参照するひつようがある情報は `constant` メソッドで、その他は `value` で、
という使い分けをします。


### 7.2.3 ビジネスロジックを定義する（1） - `service` メソッド

一般的なビジネスロジックはの登録には、`service/factory` メソッドを利用すべきです。
`value/constant` は他のサービスを注入することができないからです。

```js
/**
 * service
 * @param {String} name - サービス名
 * @param {Function} constructor - サービス生成のためのコンストラクター関数
 */
service(name, constructor)
```

- [サンプル](https://jsfiddle.net/walfo/gfzzdjpg/) - `service.html`


### 7.2.4 ビジネスロジックを定義する（2）- `factory` メソッド

```js
/**
 * factory 
 * @param {String} name - サービス名
 * @param {Function} func - サービスのインスタンスを返すための関数
 */
factory(name, func)
```

`service/factory` メソッドの違いは、前者がサービスを生成するコンストラクターを指定するのに対して、
後者はサービスのインスタンスを返す関数を指定する点です。

「既にサービスとして提供したい機能がクラスとして用意されている」もしくは、「特定のメソッドの
戻り値をサービスとして利用したい」場合には、`factory` メソッドを利用することで、手軽にサービス化できます

```js
// (1) 既にどこかで用意されている FooClass
.factory('MyService', function() {
  return new FooClass(); 
})

// (2) サービスオブジェクトを返す
.facotry('MyService', function() {
  return FooClass.GetInstance(data); 
})

// (3) オブジェクトリテラルを返す
.factory('MyService', function() {
  return {
    method() {
      // do something
    },
    method2() {
      // do something
    }
  };
})
```

- [サンプル](https://jsfiddle.net/walfo/qwgensu5/)


### 7.2.5 パラメータ情報を伴うサービスを定義する - `$provider` メソッド

`provider` メソッドは、サービス登録のためのもっとも基本となるメソッドです。
`value/service/factory` はいずれも内部では `provider` メソッドを呼び出しています。
`provider` は `value/service/facotyr` のシンタックスシュガーと言っても良いでしょう

```js
/**
 * provider
 * @param {String} name - サービス名
 * @param {Function} providerType - サービスのインスタンスを生成するコンストラクター関数
 */
provider(name, providerType) 

.provider('MyService', function() {
  this.defaults = {};
  this.$get = ['$log', function($log) {
    return {
      method() {
        // do something..
      },
      method1() {
        // do something..
      }
    }
  }]
})
```

`provider` メソッドは、基本的に、以下の局面でのみ利用すべきです。
__利用者によって設定すべきパラメーター情報を持つようなサービスを定義する__

#### `provider` サービスの実装例

- [サンプル](https://jsfiddle.net/walfo/L0ktbnek/) - `provider.html`


__既存のサービスを注入する方法__

- a. `provider` メソッドの引数 `providerType` に対して
- b. `$get` メソッドに対して

```js
// a) `provider` メソッドの引数 `providerType` に対して
.provider('MyService', ['MyConst', function(MyConst) {
  return {
    
  }
}])

// b) `$get` メソッドに対して
.provider('MyService', function() {
  this.$get = ['MyConst', function(MyConst) {
    return {
      
    }
  }]
});
```

a では、`Constant/Provider` サービスしか注入できない点に注意してください。


#### `Provider` サービスの利用方法

`Provider` サービスのパラメータを設定するには、`config` メソッドで「`サービス名 + Provider`」
という名前で注入します

```js
// MyLog サービスの例
.config(['MyLogProvider', function(MyLogProvider) {
  MyLogProvider.defaults.logLevel = 3;
}])
```


### 7.2.6 より本格的な自作のための補足

#### 既存のサービスを上書きする - `decorator` メソッド

`$provide.decorator` メソッドを利用することで、サービスの生成プロセスに割り込んで、
既存の振る舞いを上書き/修正することもできます。

```js
/**
 * decorator
 * @param {String} name - 上書きするサービスの名前
 * @param {Function} decorator - サービスを上書きするための処理（デコレータ関数）
 */
$provide.decorator(name, decorator)
```

- [サンプル](https://jsfiddle.net/walfo/uhvj9ajf/) - `decorator.html`

引数( `decorator` )の条件は、以下の通りです

- 引数として元となるサービスのインスタンス（ `$delegate` ）を受け取ること
- 戻り値として上書きされたサービスを返すこと



#### `$provide` サービス

`$provide` は、もともとモジュールに対してコンポーネントを登録するためのサービスです
`config` メソッドの中で、`value/constant/service/factory/provider` といったメソッドを
呼び出すことで、同じようなことを実装できます

```js
config(['$provide', function($provide) {
  $provide.value('AppTitle', 'AngularJS programing');
  $provide.value('AppInfo', {
    author: 'John',
    updated: new Date(1991, 2, 3)
  });
  $provide.value('CommonProc', function(value) {
    console.log(value);
  })
}])
```

#### サービスメソッドの使いわけ

|特徴/サービス型|`factory`|`service`|`value`|`constant`|`provider`|
|:--|:--:|:--:|:--:|:--:|:--:|
|依存性の設定|○|○|×|×|○|
|`config` メソッドでの利用|×|×|×|○|○|
|`decorator` メソッドによる上書き|○|○|○|×|○|
|関数型の利用|○|○|○|○|○|
|基本型の利用|○|×|○|○|○|

グローバル変数/定数の登録ならば `value/constant` メソッドを、一般的なロジックの登録ならば
`factory/service` を利用します（他のサービスを注入すべきロジックは、`factory/service` を
利用します）。


#### サービスはシングルトンである

AngularJS では、すべてのサービスは __シングルトン__ で、アプリの中で、ここのサービスは
それぞれ1つだけしかインスタンスを持ちません。

- [サンプル](https://jsfiddle.net/walfo/4tpbz3rh/) - `shared.html`


#### 補足: サービスで複数のインスタンスを生成する

- [サンプル](https://jsfiddle.net/walfo/uq8suo2k/) - `singlton.html`


## 7.3 ディレクティブの自作

### 7.3.1 ディレクティブの基本

```js
/**
 * directive
 * @param {String} name - ディレクティブの名前
 * @param {Function} factory - ディレクティブを生成するためのファクトリー関数
 */
angular.directive(name, factory)
```

__ディレクティブで利用出来る主なプロパティ__

|プロパティ|概要|
|:--|:--|
|`template`|ディレクティブで利用するテンプレート（文字列）|
|`templateUrl`|ディレクティブで利用するテンプレート（指定のファイル）|
|`templateNamespace`|テンプレートで利用されている文書型（`html/svg/math` デフォルトは `html`）|
|`restrict`|ディレクティブの適用先|
|`replace`|現在の要素をテンプレートで置き換えるか（デフォルトは `false`）|
|`transclude`|子要素のコンテンツをテンプレートに反映|
|`multiElement`|複数の要素にまたがってディレクティブを指定できるか|
|`scope`|ディレクティブに適用するスコープを設定|
|`link`|ディレクティブの挙動を定義|
|`compile`|コンパイルの挙動を定義|
|`controller`|他のディレクティブに対する機能の提供を宣言|
|`controllerAs`|コントローラーを参照する際の別名|
|`bindToController`|分離スコープをコントローラー利用可能にするか|
|`require`|ディレクティブ同士の依存関係を定義|
|`priority`|ディレクティブの優先順位（デフォルトは 0）|
|`terminal`|`true` の場合、該当ディレクティブより `priority` が低いディレクティブは実行しない|


- [サンプル](https://jsfiddle.net/walfo/4kg812wa/) - `basic.html`


### 7.3.2 利用するテンプレートを指定する - `template/templateUrl` プロパティ

- [サンプル](https://jsfiddle.net/walfo/sa3Lmp38/) - `base_url.html`


### 7.3.3 現在の要素をテンプレートで置き換える - `replace` プロパティ

- [サンプル](https://jsfiddle.net/walfo/90u2fdqq/) - `basic_replace.html`


### 7.3.4 ディレクティブの適用箇所を宣言する - `restrict` プロパティ

__ディレクティブの記述箇所__

|記述箇所|例|
|:--|:--|
|要素（`E`）|`<my-hello attr="exp"></my-hello>`|
|属性（`A`）|`<div my-hello="exp"></div>`|
|クラス（`C`）|`<div class="my-hello:exp"></div>`|
|コメント（`M`）|`<!-- directive: my-hello exp -->`|

デフォルトは `EA` （=要素/属性いずれも認める）です。

一般的に、タブパネルや開閉パネルのように、それ自体が独立したウィジェットのような役割を提供
するようなら要素（`E`）として、パネルにツールヒントを追加するといった追加的な役割を提供する
なら属性（`A`）として定義するのが自然です。


#### `restrict` プロパティの利用例

- [サンプル](https://jsfiddle.net/walfo/ma0xzoy0/) - `basic_restric.html`


### 7.3.5 子要素のコンテンツをテンプレートに反映させる - `transclude` プロパティ

- [サンプル](https://jsfiddle.net/walfo/k3o6bb5o/) - `transcluce.html`


### 7.3.6 ディレクティブに適用すべきスコープを設定する - `scope` プロパティ


__`scope` プロパティの設定値__

|設定値|概要|
|:--|:--|
|`false`|現在の要素に適用されたスコープをそのまま利用|
|`true`|現在の要素から派生したスコープを新規に生成|
|オブジェクト|分離（隔離）された新たなスコープを作成|


#### 現在のスコープをそのまま利用する - `scope: false`

`scope: false` のもっともシンプルなパターンです。

- [サンプル](https://jsfiddle.net/walfo/Lhy5jdcx/) - `scope.html`


#### 現在のスコープを継承して新しいスコープを生成する - `scope: true`

`scope: true` と設定した場合には、現在のディレクティブが属するスコープを継承して、新たな
スコープを生成します

- [サンプル](https://jsfiddle.net/walfo/hn9L364d/) - `scope_parent.html`


#### ディレクティブ独自の独立したスコープを作成する 

`scope` プロパティに `true/false` を設定した場合には、いずれもディレクティブを配置した位置に
よってスコープが影響を受けます。これは、ディレクティブの部品としての独立という意味で、望ましい
状況ではありません。

- [サンプル](https://jsfiddle.net/walfo/Lj7dwe50/) - `scope_isolate.html`


#### 分離スコープでの紐づけ方法

|記号|概要|
|:--|:--|
|`=`|属性値を Angular 式として解釈し、その結果を紐付ける|
|`@`|属性値を文字列として紐付ける|
|`&`|属性値を関数として解釈し、あとから実行できるように紐付ける|


__`@` でも式を指定できる__

`@` で紐づけを定義した場合にも、,`{{...}}` で明示的に括ることで、Angular 式を利用できます。

```html
<my-hello my-type="greeting" my-name="{{ name }}" my-click="onclick()"></my-hello>
```

- [サンプル](https://jsfiddle.net/walfo/nrat7q3k/) - `scope_isolate2.html`


分離スコープのプロパティ名と、ディレクティブ側の属性名が等しい場合には、省略記法を利用できます。

- [サンプル](https://jsfiddle.net/walfo/15z7zk7k/) - `scope_isolate3.html`



### 7.3.7 ディレクティブの挙動を定義する - `link` プロパティ

`link` プロパティは、ディレクティブを定義する上で最も重要な情報です。
ディレクティブとスコープとを紐付ける - モデルとビューとをリンクするための `link` 関数を定義します。

__例) `<my-image-btn>` 要素の属性__

|属性|概要|
|:--|:--|
|`pre-src`|正気表示される画像のパス|
|`post-src`|マウスポインターを置いたときに表示される画像のパス|


- [サンプル](https://jsfiddle.net/walfo/419t0b8n/) - `link.html`


`link` 関数は引数として以下の値を受け取ります

- スコープオブジェクト (`scope`)
- ディレクティブが指定された要素 (`element`)
- ディレクティブが指定された要素の属性軍 (`attrs`)
- ディレクティブに適用されたコントローラー (`controller`)


__`prelink/postlink` 関数__

モデルとビューのリンク前後で呼び出される `prelink/postlink` 関数を指定することもできます

```js
link: {
  pre: function(scope, element, attrs, controller) {
    // ...
  },
  post: function(scope, element, attrs, controller) {
    // ...
  }
}
```

単一の関数を指定した場合には、`postlink` 関数だけが指定されたものとみなされます

```js
link: function(scope, element, attrs, controller) {
  // ...
}
```


### 7.3.8 コンパイル時の挙動を定義する - `compile` プロパティ

AngularJS では、厳密には、ディレクティブが実行されるまでに、以下のようなステップを踏んでいます

1. `ng-app` 属性を検索
2. `ng-app` 属性配下のディレクティブを検索
3. `template/transclude/replace` などに基づいてテンプレート編集 = __コンパイル処理__
4. ディレクティブとスコープとを紐づけ、動的な処理を実装 = __リンク処理__

`compile` 関数はコンパイル時に一度だけ呼び出されますが、`link` 関数はディレクティブの
インスタンスが生成される度に実行されます。
初回だけ編集すれば良いような処理はできるだけ `compile` 関数として記述し、スコープによって
結果が変動する処理だけを `link` 関数で表すべきです。


#### `compile` 関数の基本

`compile` 関数は、引数として以下の値を受け取ります。

- ディレクティブが指定された要素 (`element`)
- ディレクティブが指定された要素の属性群 (`attrs`)


__例) `button` ディレクティブ__

```js
/**
 * button ディレクティブ
 * <button type="type" block="block"> ... </button>
 * @param {String} type - ボタンの種類 [submit | reset | button]
 * @param {Boolean} ブロックを有効にするか
 */
```

- [サンプル](https://jsfiddle.net/walfo/g4oyptd2/) - `compile.html`


`link` 関数と似ていますが、スコープ/コントローラーはコンパイル時点では存在しない点に注目
してください。


#### `compile/link` 関数を併用する場合

`compile/link` パラメーターを同時に指定することはできません。
`compile` 関数を実行したあとに `link` 関数を呼び出したい場合には、`compile` 関数の戻り値
として、`link` 関数を指定してください

- [サンプル](https://jsfiddle.net/walfo/ocd8kc9x/) - `compile_link.html`


#### 例: 階層型メニューを実装する

- [サンプル](https://jsfiddle.net/walfo/k68g5erm/) - `menu.html`


__構文 `$compile` サービス__

```js
/**
 * $compile
 * @param {Object} element - コンパイル対象の要素
 * @param {Function} transclude - ディレクティブで利用できる関数（非推奨）
 * @param {Number} max - 優先順位
 */
$compile(element [,transclude [, max]])
```

__構文 リンク関数__

```js
/**
 * link
 * @param {Object} scope - 紐付けるスコープ
 * @param {Function} clone テンプレートを複製し、その内容を元の文書ツリーに反映させる関数
 */
link(scope [,clone])
```


#### コンパイルの位置に注意

`$compile` サービスの呼び出しを `compile` 関数の中で実行してしまうとブラウザは即座に
クラッシュします。


### 7.3.9 ディレクティブの優先順位と処理方法を決める - `priority/terminal` プロパティ

ディレクティブは親要素から順に処理されるのが基本です。
しかし、同一階層の複数のディレクティブが設定されていた場合には、`priority` プロパティによって
優先順位を決定します

#### 標準ディレクティブの優先順位

#### 優先順位の低いディレクティブを処理しない

- [サンプル](https://jsfiddle.net/walfo/ocd8kc9x/) - `compile_link.html`


### 7.3.10 ディレクティブ同士で情報を交換する - `controller/require` プロパティ

より本格的なディレクティブでは、複数のディレクティブが互いに連携して、1つの機能を実装する
ということはよくあることです。

- `<accordion>/<panel>` - アコーディオンパネルと個々のパネル
- `<tab-panel>/<tab>` - タブパネルと個々のタブ
- `<menu>/<menu-item>` - メニュー全体と個々のメニュー項目

#### 1. 依存関係にあるディレクティブを宣言する

|接頭辞|概要|
|:--|:--|
|なし|現在の要素だけで依存ディレクティブを検索する（デフォルト）|
|`^`|依存するディレクティブを現在の要素、または祖先要素で検索する|
|`^^`|依存するディレクティブを祖先要素から検索する|
|`?`|依存するディレクティブが見つからなくてもエラーを発生しない|


#### 2. 子要素の情報を親要素に集約する

`controller` パラメータでは、ディレクティブでの共通的な処理を実装します。


__コントローラーに注入できるオブジェクト__

|引数|概要|
|:--|:--|
|`$scope`|現在のスコープ|
|`$element`|現在の要素|
|`$attrs`|現在の属性（群）|
|`$transclude`|子要素を処理するための関数| 


#### 3. 親ディレクティブのコントローラーを利用する

`require` パラメーターが指定された場合、`link` 関数の第4引数には、親ディレクティブで定義
されたコントローラーがセットされます

```js
require: '^^myCart',
link: function(scope, element, attrs, cartController) {
  // 
  cartController.addItem(scope);
}
```

__`require` パラメーターは複数のディレクティブも指定できる__

`require` パラメーターには、`['^myCart', '?^ngModel']` のように、配列の形式で、複数の
ディレクティブを指定することもできます。
`link` 関数の第4引数にもそれぞれのディレクティブに属するコントローラーが配列形式で渡されます


#### 4. 親テンプレートで子テンプレートを呼び出す

親テンプレートで `ng-transclude` 属性を指定し、子ディレクティブのテンプレートを反映させます。


- [サンプル](https://jsfiddle.net/walfo/rar06tpx/) - `cart.js`


### 7.3.11 コントローラーに別名を付ける - `controllerAs` プロパティ

`controllerAs` パラメーターを利用することで、コントローラーに別名を付けて、テンプレート内でも
そのメンバーにアクセスできるようになります。


- [サンプル](https://jsfiddle.net/walfo/kwmpe8tx/) - `cart.js`


### 7.3.12 複数の要素にまたがってディレクティブを適用する - `multiElement` プロパティ

ディレクティブを複数の要素にまたがって適用したい場合があります。
`ng-repeat-start/ng-repeat-end` 属性のような状況です。

- [サンプル](https://jsfiddle.net/walfo/8t015fdp/) - `multi.js`



## 7.4 自作ディレクティブの具体例

### 7.4.1 タブパネルを実装する

- [サンプル](https://jsfiddle.net/walfo/xh8764e3/) - `controller.html`


__マークアップのルール__

- 個々のタブは `<my-tab>` 要素で定義（タブタイトルは `title` 属性で表す）
- タブパネル全体を `<my-tab-panel>` 要素で括ること
- `<my-tab-panel>` 要素の `active` 属性で初期表示するタブを指定（先頭タブは `0`）


#### `<my-tab>` の定義

1. 依存関係にあるディレクティブを宣言する
2. コンテンツの表示領域を定義する
3. タブのタイトルを定義する
4. タブをタブパネルに登録する


#### `<my-tab-panel>` 要素の実装

1. 個々のタブを登録する
2. アクティブなタブを切り替える
3. タブパネル全体の骨組みを定義する


### 7.4.2 `ng-required` 属性の実装を読み解く


```js
var requiredDirective = function() {
  return {
    restrict: 'A',
    // ng-model 属性に依存（ただし、省略も可）
    require: '?ngModel',
    link: function(scope, elem, attr, ctrl) {
      // ng-model がない場合は、そのまま処理を終了
      if (!ctrl) return ;
      attr.required = true;
      
      // 検証コードを追加
      ctrl.$validators.required = function(modelValue, viewValue) {
        return !attr.required || !ctrl.$isEmpty(viewValue);
      };
      
      // required 属性に変化があった場合には検証を実施
      attr.$observe('required', function() {
        ctrl.$validate();
      });
    }
  }
};
```

#### 補足: `ng-model` ディレクティブのコントローラー

__メソッド__

- `$render()` - ビューを更新するために呼び出されるメソッド
- `$isEmpty(value)` - 値 `value` が空（`undefined` `null` `NaN` のいずれか）であるか
- `$setValidity(key, isValid)` - 検証結果を設定（`key` が￥は検証名、`isValid` は検証の成否）
- `$setPristine()` - 値が変更されていない状態を設定（`ng-pristine` クラスを付与）
- `$setDirty()` - 値が変更された状態を設定（`ng-dirty` クラスを付与）
- `$setUntouched()` - フォーム要素にフォーカスが当たったことがない状態を設定（`ng-untached` クラスを付与）
- `$setTouched()` - フォーム要素にフォーカスが当たったことがある状態を設定（`ng-touched` クラスを付与）
- `$rollbackViewValue()` - フォーム要素への変更をロールバック
- `$commitViewValue()` - フォーム要素への変更コミット
- `$validate()` - 登録済みの検証（`$validators`）を実行
- `$setViewValue(value, trigger)` - `$viewValue` の値を設定（引数 `trigger` は更新のトリガーとなるイベント）

__プロパティ__

- `$viewValue` - ビューで表された値
- `$modelValue` - コントローラーに紐付いたモデル上の値
- `$parsers` - ビューからモデルへの引き渡しの際に実行される関数群（`$viewValue` の変換/サニタイズなどの利用）
- `$formatters` - モデルからビューへの引き渡しの際に実行される関数群（`$modelValue` の整形などに利用）
- `$validators` - モデル値を検証するための関数群
- `$asyncValidators` - モデル値を検証するための関数群（非同期実行）
- `$viewChangeListeners` - ビューの値が変更された時に実行される関数群
- `$error` - 検証エラー情報
- `$pending` - 保留状態の検証情報
- `$untouched` - フォーム要素にフォーカスが当たったことがないか
- `$touched` - フォーム要素にフォーカスが当たったことがあるか
- `$pristine` - 値が変更されていないか
- `$dirty` - 値が変更されているか
- `$valid` - 検証エラーがないか
- `$invalid` - 検証エラーが1つでもあるか
- `$name` - フォーム要素の名前


フォーム要素の入力は、`$setViewValue` メソッドを通じて `$viewValue` に反映されます。
`$viewValue` の値は、`$parsers` に登録された変換関数を介した上で、`$modelValue` に反映されます。

```js
function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
  // .. 中略 ..
  // $viewValue -> $modelValue での変換
  ctrl.$parsers.push(function(value) {
    // 値が空でない数値gであった場合だけ、その文字列表現を反映
    if (!ctrl.$isEmpty(value)) {
      // 数値でない値が渡された場合は例外を発生
      if (!isNumber(value)) {
        throw $ngModelMinErr('numfmt', 'Expected `0` to be a number', value);
      }
    }
    value = value.toString();
  });
}
```


### 7.4.3 `$asyncValidators` プロパティによる非同期検証の実装

`$http` サービスによる非同期通信を伴う検証


#### `my-unique` 属性の利用例

```html
<form>
  <input ng-modl="isbn" ng-unique=""/>
</form>
```

```js
angular.module('myApp', [])
  .directive('myUnique', ['$http', '$q', function($http, $q) {
    return {
      restrict: 'A',
      // ng-model 属性が前提
      require: '?ngModel',
      scope: {},
      // 検証コードは link 関数の中で
      link: function(scope, elem, attr, ctrl) {
        // ng-model 属性が存在しない場合
        // my-unique 属性の処理もスキップ
        if (!ctrl) return ;
        
        // 非同期検証を登録
        ctrl.$asyncValidators.unique = function(modelValue, viewValue) {
          var value = modelValue || viewValue;
          // 戻り値は Promise オブジェクト
          return $http.get(attr.myUnique + value)
            .then(function() {
              return $q.reject('value exists!');
            }, function() {
              return true;
            });
        };
        
        // my-unique 属性に変更があったら再検証
        attr.$observe('myUnique', function(value) {
          ctrl.$validate();
        });
      }
    }
  }]);
```


__`ctrl.$asyncValidatos.検証名 = 検証関数`__

検証関数であることの条件は、以下のとおりです。

- 引数としてモデル値（`modelValue`）、ビュー値（`viewValue`）を受け取ること
- 戻り値として `Promise` オブジェクトを返すこと


### 7.4.4 例: jQuery UI のウィジェットをディレクティブ化する

AngularJS では、双方向データバインディングやディレクティブのしくみが提供されているその性質上
文書ツリーをアプリで直接操作することはほとんどありませんし、また、そうすべきではありません。
jQuery（jqLite）は AngularJS では極力利用すべきではありません


#### `Autocomplete` ウィジェットでオートコンプリート機能を実装する

__例: `my-autocomplete` ディレクティブ__

```html
<input my-autocomplete source="data" minlength="min" select="onselect" />
```

- [サンプル](https://jsfiddle.net/walfo/ckrwevqs/) - `autocomplete.html`


### `Slider` ウィジェットでスライダーを実装する

- [サンプル](./slider.html) - `slider.html`











