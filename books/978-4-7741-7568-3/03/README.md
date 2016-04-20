# ディレクティブ

ディレクティブは、テンプレートで利用できる AngularJS の命令です。
要素（タグ）、属性などの形式で、テンプレートを操作するためのさまざまな命令を指定できます。


## 3.1 ディレクティブの基本

標準的なHTMLに対して、`ng-app` `ng-repeat` などのカスタム要素/属性のことを __ディレクティブ__ と言います


### 3.1.1 ディレクティブの記法


__ディレクティブの様々な記法（ns: 名前空間, directive: ディレクティブ名）__

|種別|記法|記述例|
| :--|:--|:--|
|AngularJS|`ns-directive`|`ng-style="myStyle"`|
|HTML5|`data-ns-directive`|`data-ng-style="myStyle"`|
|XML|`ns:directive`|`ng:style="myStyle"`|
|XHTML|`x-ns-directive`|`x-ng-style="myStyle"`|


### 3.2 バインド関連のディレクティブ

### 3.2.1 バインド式を属性値として指定する - `ng-bind`

__ページを起動した最初のタイミングで、一瞬だけ生の式表現 `{{}}` が表示されてしまう__ という問題があります。
そこで利用するのが、モデルをビューにバインドするためのディレクティブ `ng-bind` 属性です

```html
<label for="name">Name: </label>
<input id="name" name="name" type="text" ng-model="myName"/>
<div ng-bind="'Hello, '+ myName +'!'"></div>
```


### 3.2.2 Angular 式による画面のチラツキを防ぐ - `ng-cloak`

`{{}}` を利用する場合でも、`ng-cloak` 属性を利用することで、初期化前に `{{}}` が露出してしまうのを防げます


```html
<div ng-cloak>{{"Hello, " + myName + "!"}}</div>
```

__利用にあたっての注意点__

1. AngularJS はページの先頭でインポートすること
2. ng-cloak 属性 Angular 式を指定した要素に付与すること


### 3.2.3 データバインドを無効化する - `ng-non-bindable`

`{{...}}` を Angular式としてではなく、そのまま文字列として表示したい場合には `ng-non-bindable` 属性を利用します



### 3.2.4 HTML 文字列をバインドする - `ng-bind-html`

AngularJS では、Angular 式によるテキスト埋め込み時にも、セキュリティ的な考慮がなされています。

- [サンプル](./bind_html_no.html) - HTMLはエスケープされる

HTML 文字列を反映させたい場合は、`ng-bind-html` 属性を利用します

```html
<div ng-bind-html="memo"></div>
```

```js
angular.module('myApp', ['ngSanitize'])  // <- import `ngSanitize`
  .controller('MyController', ['$scope', function($scope) {
    $scope.memo = '<p onmouseover="alert(\'OK\');">' + 
      '<a href="http://www.google.com">Google.com</a>' + 
      '<script> var x = 1; </script>' + 
      '<button>submit</button>';
  }]);
```

`ngSanitize` は特定のタグ/属性を除去し、無害化（sanitize）するためのモジュールです


#### 補足: `<script>` / `<button>` などの要素をバインドする

__信頼済みマーク__ を付与することで、`ngSanitize` によるサニタイズを回避できます。

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', '$sce', function($scope, $sce) {
    var memo = '<p onmouseover="alert(\'OK\');">welcome</p>' + 
     '<a href="http://google.com/">Google.com</a>' + 
     '<script> var x = 1; </script>' + 
     '<button> submit </button>';
     
     $scope.memo = $sce.trustAsHtml(memo);
  }]);
```

SCE（Strict Contextual Escaping）。SCE とは、文脈に応じて、安全でない可能性がある文字列、もしくは信頼されていないドメインからのデータを制限するためのしくみです。


### 3.2.5 テンプレートをビューにバインドする - `ng-bind-template`

`ng-bind` 属性がモデルをバインドするのに対して、`ng-bind-template` 属性はテンプレートをバインドします

```html
<div ng-bind="memo"></div>

<div ng-bind-template="{{memo}}"></div>
```

例)

```html
<div>
  <label for="name">Name: </label>
  <input id="name" name="name" type="text" ng-model="name" />
</div>

<div>
  <label for="age">Age: </label>
  <input id="age" name="age" type="text" ng-model="age" />
</div>

<div ng-bind-template="{{ name }} is {{ age }} years old."></div>
```


### 3.2.6 数値によってバインドする文字列を変化させる - `ng-plurlize`

```html
<div ng-pluralize count="favs.length" offset="2"
  when="{
    '0': '[いいね！]されていません',
    '1': '{{ favs[0] }}さんが [いいね！] と言っています。',
    '2': '{{ favs[0] }}さん、{{favs[1]}} さんが [いいね！] と言っています',
    'one': '{{ favs[0] }}さん、{{ favs[1] }}さんとあと1名が [いいね！] と言っています。',
    'other': '{{ favs[0] }}さん、{{ favs[1] }}さん、他{}名が [いいね！] と言っています。'
  }">
```

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.favs = ['Yamada', 'Koshikake', 'Tanaka', 'Sato', 'Suzuki'];
  }]);
```

|属性|概要|
|:--|:--|
|`count`|メッセージ判定のためのカウント数（必須）|
|`when`|カウント（count 属性）に応じたメッセージのパターン（必須）|
|`offset`|カウント（count 属性）から削除する値（デフォルトは0）|


#### 補足: Angular 1.4 での新しい記法 - `ngMessageFormat` モジュール

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular-message-format.min.js"></script>
<div>{{ favs.length, plural, offset: 2
  =0    { [いいね！] されていません }
  =1    { {{favs[0]}}さんが [いいね！]と言っています }
  =2    { {{favs[0]}}さん、{{favs[1]}}さんが [いいね！] と言っています }
  one   { {{favs[0]}}さん、{{favs[1]}}さんとあと1名が [いいね！] と言っています }
  other { {{favs[0]}}さん、{{favs[1]}}さん、他#名が [いいね！] と言っています }
}}</div>
```

```js
angular.module('myApp', ['ngMessageFormat']) // <-
  .controller('MyController', ['$scope', function($scope) {
    // ..
  }]);
```


__性別の区別も可能__

```
{{gender, select,
    male { 彼は男です }
  female { 彼女は女です }
   other { 彼/彼女は... }
}}
```


## 3.3 外部リソース関連のディレクティブ

リンク/画像/テンプレートなど、外部リソースの扱い


### 3.3.1 アンカータグを動的に生成する - `ng-href`

初期化前はリンクがただの文字列として表示される

```html
<a ng-href="{{ url }}">Link</a>
```

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.url = 'https://google.com';
  }]);
```


### 3.3.2 画像を動的に生成する - `ng-src` `ng-srcset`

```html
<img ng-src="http://www.wings.msn.to/books/{{ isbn }}/{{ isbn }}.jpg">
```

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.isbn = '978-4-7741-7078-7';
  }]);
```


### 3.3.3 補足: `<iframe>` / `<object>` などで別ドメインのリソースを取得する - `$sce`


#### 外部リソースは許可されない

```html
<iframe ng-src="{{ url }}"></iframe>
```

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.url = 'http://www.wings.msn.to/';
  }]);
```


#### 1. trustAs メソッドで信頼済みマークを付与する

```js
// $sce.trustAs メソッドで、$sce.RESOUCE_URL として信頼できることを宣言
$scope.url = $sce.trustAs($sce.RESOURCE_URL, 'http://example.com/');
// trustAsResourceUrl メソッドで置き換え可能
$scope.url = $sce.trustAsResouceUrl('http://example.com/');
```


#### 2. ホワイトリストを準備する

信頼するドメインをあらかじめ宣言しておきます

```js
angular.module('myApp', [])
  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://example.com/**'
    ]);
  }])
  .controller('MyController', ['$scope', function($scope) {
    $scope.url = 'http://example.com';
  }]);
```

- すべてのプロバイダーは、（コントローラー配下ではなく）config メソッド配下で設定しなければならない点に注意
- 引数list では、self （現在のドメイン）は実質必須です


__$sceDelegateProvider プロバイダーで利用できるワイルドカード__

|ワイルドカード|概要|
|:--|:--|
|`*`|0文字以上の文字列（`:/.?&;` を除く）|
|`**`|0文字以上の文字列（すべて）|


__ブラックリストを併用する__

```js
$sceDelegateProvider.resourceUrlBlacklist([
  'http://example.com/index.php/~/A-07/**'
]);
```


### 3.3.4 別ファイルのテンプレートを取得する - `ng-include`

`ng-include` 属性（ディレクティブ）を利用することで、別ファイルで用意されたテンプレートを動的にインクルードできます


```html
// 以下2つは等価です
<div ng-include="template"></div>

<div ng-include src="template"></div>
```

テンプレートを反映させるべき親要素がない場合には、`ng-include` を要素として指定することもできます

```html
<ng-include src="template"></ng-include>
```

#### ng-include ディレクティブの属性

|属性|概要|
|:--|:--|
|`onload`|テンプレート呼び出しのタイミングで実行する式|
|`autoscroll`|自動スクロール機能（`$anchorScroll`）を有効にするか|


### 3.3.5 インクルードするテンプレートを先読みする - `<script>`

- [サンプル](./script.html) - script.html


```html
<!--execution.html, tempo.html を準備 -->
<script type="text/ng-template" id="template/execution.html">
  <dl>
    <dt>template 1</dt>
  </dl>
</script>
```


#### 補足: JavaScript からテンプレートを登録する

`<script>` 要素は、内部的に `$templateCache/$templateRequest` というサービスを利用してテンプレートをキャッシュしています。よって、もしも JavaScript からテンプレートを登録したい場合には、,`$templateCache/$templateRequest` サービスを呼び出すことでも可能です

```js
angular.module('myApp', [])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('templates/execution.html', 
      '<dl><dd>マルカート</dt></dl>'
    );
  }])
  .controller('MyController', ['$scope', function($scope) {
    $scope.templates = [
      { title: 'execution', url: 'templates/executon.html' },
      { title: 'tempo', url: 'templates/tempo.html' }
    ];
  }]);
  
  $scope.onload = function() {
    console.log($scope.template);
  };
```

`run` メソッドは、すべてのモジュールを読み込み終えたところで実行されるメソッドです

```js
console.log($templateCache.get('templates/execution.html'));
```

同じく、`$templateRequest` サービスで外部ファイルからテンプレートを読み込むなら

```js
angular.module('myApp', [])
  .run(['$templateRequest', function($templateRequest) {
    $templateRequest('templates/execution.html');
    $templateRequest('templates/tempo.html');
  }])
```


## 3.4 イベント関連のディレクティブ

```html
<form>
  <label for="name">Name: </label>
  <input id="name" name="name" type="text" ng-model="myName"/>
  <button ng-click="onclick()">submit</button>
</form>
<div>
```

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    // greeting initialize
    $scope.greeting = 'Hello, John';
    
    // event listener for click
    $scope.onclick = function() {
      $scope.greeting = 'Hello, ' + $scope.myName + '!';
    };
  }]);
```

__<a name="event">#</a> 構文: イベントリスナーの設定__

```html
<element ng-event="...">~</element>
```

__`ng-event` 属性にもコードを書ける__

```html
<button ng-click="greeting = 'Hello, ' + myName + '!'"></button>
```


### 3.4.1 イベント関連の主なディレクティブ

- `ng-dblclick` - ダブルクリック時
- `ng-mousedown` - マウスボタンを押した時
- `ng-mouseup` - マウスボタンを離した時
- `ng-mouseenter` - マウスポインターが要素に入った時
- `ng-mouseover` - マウスポインターが要素に乗った時
- `ng-mousemove` - マウスポインターが要素ないを移動した時
- `ng-mouseleave` - マウスポインターが要素から離れる時
- `ng-focus` - 要素にフォーカスした時
- `ng-blur` - 要素からフォーカスが外れた時
- `ng-keydown` - キーを押した時
- `ng-keypress` - キーを押し続けている時
- `ng-keyup` - キーを離した時
- `ng-copy` - コピー時
- `ng-cut` - カット時
- `ng-paste` - ペースト時
- `ng-submit` - サブミット時


### 3.4.2 イベント情報を取得する - `$event`

```html
<img ng-src="{{ path }}" alt="logo"
  ng-mouseenter="onmouseenter($event)" ng-mouseleave="onmouseleave()" />
```

```js
$scope.onmouseenter = function($event) {
  console.log($event);
  $scope.path = 'http://www.web-deli.com/image/home_chara.gif';
}
```

![mouse event](https://courses.cs.washington.edu/courses/cse190m/12su/lectures/slides/images/figure_2_mouse_events.png)


```html
<div id="main" style="position: absolute: margin:58px; width: 300px;
  height: 300px; border: 1px solid #000;" ng-mousemove="onmousemove($event)">
  <p>screen: {{ screenX }} x {{ screenY }}</p>
  <p>page: {{ pageX }} x {{ pageY }}</p>
  <p>client: {{ clientX }} x {{ clientY }}</p>
  <p>offset: {{ offsetX }} x {{ offsetY }}</p>
</div>
```

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.onmousemove = function() {
      $scope.screenX = $event.screenX;
      $scope.screenY = $event.screenY;
      $scope.pageX = $event.pageX;
      $scope.pageY = $event.pageY;
      $scope.clientX = $event.clientX;
      $scope.clientY = $event.clientY;
      $scope.offsetX = $event.offsetX;
      $scope.offsetY = $event.offsetY;
      $scope.layerX = $event.layerX;
      $scope.layerY = $event.layerY;
    };
  }]);
```


#### イベント発生時のキー情報を取得する

```html
<form>
  <label for="key">key input: </label>
  <input id="key" name="key" ng-keydown="onkeydown($event)" />
</form>
<div ng-show="altKey"> [Alt] </div>
<div ng-show="ctrlKey"> [Ctrl] </div>
<div ng-show="shiftKey"> [Shift] </div>
<div>keyCode: {{ which }}</div>
```

```js
$scope.onkeydown = function($event) {
  $scope.altKey = $event.altKey;
  $scope.ctrlKey = $event.ctrlKey;
  $scope.shiftKey = $event.shiftKey;
  $scope.which = $event.which;
};
```


#### イベントのデフォルト動作をキャンセルする

```html
<form>
  <label for="zip">zip code</label>
  <input id="zip" name="zip" type="text" size="10" ng-model="zip"
  ng-keypress="onpress($event)" />
</form>
```

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.onpress = function($event) {
      var k = $event.which;
      
      if (!((k >= 48 && k <= 57) || k === 45 || k === 8 || k === 0)) {
        $event.preventDefault();
      }
    }
  }]);
```


#### イベントバブリングをキャンセルする

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.onclick1 = function() {
      console.log('clicked outer');
    };
    
    $scope.onclick2 = function($event) {
      $event.stopPropagation();   // <-
      console.log('clicked inner');
    };
  }]);
```


## 3.5 制御関連のディレクティブ

条件式に要素の表示/スタイルを制御するためのさまざまなディレクティブ


### 3.5.1 要素にスタイルプロパティを付与する - `ng-style`

- `プロパティ名: 値` のハッシュとして指定します
- スタイルプロパティをハッシュで指定する場合、camelCase 形式を用いる必要があります

```html
<form>
  <button ng-click="myStyle={ backgroundColor: '#f00', color: '#fff' }">
    Red
  </button>
  <button ng-click="myStyle={ backgroundColor: '#0f0', color: '#fff' }">
    Green
  </butto>
  <button ng-click="myStyle={ backgroundColor: '#00f', color: '#fff' }">
    Blue
  </button>
</form>

<div ng-style="myStyle">
  <p>This is paragraph.</p>
</div>
```


### <a name="#ng-class">3.5.2</a> 要素にスタイルクラスを付与する - `ng-class`


```html
<link rel="stylesheet" href="css/class.css">

<form>
  <button ng-click="myStyle=red">Red</button>
  <button ng-click="myStyle=green">Green</button>
  <button ng-click="myStyle=blue">Blue</button>
</form>
<div ng-class="myStyle">
  <p>this is paragraph.</p>
</div>
```

```css
.red { background-color: red; }
.green { background-color: green; }
.blue { background-color: blue; }
```

```js
// $scope を用意するだけ
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
  }]);
```

もし、レテラルな文字列でクラスを渡したい場合はクオートで括ります

```html
<div ng-class="'red'"></div>
```


#### `ng-class` ディレクティブのさまざまな設定方法

`ng-class` ディレクティブには、文字列/配列/ハッシュとして渡すことができます

1. 複数のクラスを渡す（配列） - [サンプル](https://jsfiddle.net/walfo/5sk2zewx/)
2. 複数クラスのオンオフを制御する（ハッシュ） - [サンプル](https://jsfiddle.net/walfo/4p7c2xmL/)
3. 配列/ハッシュを混在させる - [サンプル](https://jsfiddle.net/walfo/ubbmxpc7/)


### <a name="ng-if">3.5.3</a> 式の真偽によって表示/非表示を切り替える(1) - `ng-if`
`ng-if` ディレクティブには、`true/false` 値として評価できる式を指定します。

- [サンプル](https://jsfiddle.net/walfo/8xbx72xu/)

#### 補足: `ng-if` ディレクティブの注意点
`ng-if` による表示/非表示は、__スタイルシートによる操作でなく__ 該当の要素そのものを文書ツリーから破棄します



### <a name="ng-show">3.5.4</a> 式の真偽によって表示/非表示を切り替える(2) - `ng-show` `ng-hide`

- [サンプル](https://jsfiddle.net/walfo/5aj2m8pg/)

#### 補足: `ng-if` ディレクティブとの差異
`ng-show/ng-hide` ディレクティブで要素を非表示にした場合、`class="nh-hide"` 属性が付与されます。
`ng-if` では要素を破棄していたのに対して、`ng-show/ng-hide` ディレクティブはスタイルシートでもって、
表示/非表示を制御します。

表示/非表示を動的に切り替える場合には `ng-show/ng-hide` を利用し、特定の条件で表示を切り替え、
非表示のものを再表示しないような場合には、`ng-if` を利用するという使いわけをしていくと良いでしょう


### <a name="ng-open">3.5.5</a> 式の真偽に応じて詳細の表示/非表示を切り替える - `ng-open` 

`<details>` 要素のみが対象となります

- [サンプル](https://jsfiddle.net/walfo/7p8yrgLv/)


### <a name="ng-switch">3.5.6<a> 式の値によって表示を切り替える - `ng-switch`

`ng-switch` ディレクティブは JavaScript での `switch` 命令に相当します。
指定された式に応じて、表示すべきコンテンツを切り替えます

- [サンプル](https://jsfiddle.net/walfo/8kgbqqxx/)

```html
<parent ng-switch="exp">
  <child ng-switch-when="value1"> ... </child>
  <child ng-switch-when="value2"> ... </child>
  <child ng-switch-default> ... </child>
</parent>
```

式の値に基づいて多岐分岐するのであれば、`ng-if/ng-show/ng-hide` よりも `ng-switch` を
優先して利用してください


### <a name="ng-repeat">3.5.7</a> 配列/オブジェクトをループ処理する - `ng-repeat`

`ng-repeat` ディレクティブは、指定された配列/ハッシュから順に要素を取り出し、ループ処理します

- [サンプル](https://jsfiddle.net/walfo/8arrkqms/)

`(keyVar, valueVar) in Object`

#### `ng-repeat` 配下で利用できる特殊変数

|変数名|概要|
|:--|:--|
|`$index`|インデックス番号(0...length-1)|
|`$first`|最初 === true|
|`$middle`|(!最初 && !最後) === true|
|`$last`|最後 === true|
|`$even`|!($index % 2) === true|
|`$odd`|$index % 2 === true |


- [サンプル](https://jsfiddle.net/walfo/uufc6g81/)


#### 異なる要素のセットを繰り返し出力する

`ng-repeat-start/ng-repeat-end` ディレクティブを利用することで、ループの開始と終了を
明示的に（= 要素をまたいで）宣言できます

- [サンプル](https://jsfiddle.net/walfo/4jvbs4yo/)


#### 重複した配列を出力する - トラッキング式

重複した配列要素を `ng-repeat` ディレクティブでループ処理する
トラッキング式は、`track by` 句で表現できます。


```html
<li ng-repeat="book in books track by $index">{{ book }}</li>
```

- [サンプル](https://jsfiddle.net/walfo/4xzswppn/)


### <a name="ng-class-even">3.5.8</a> 奇数行に対してだけスタイルを適用する - `ng-class-even/ng-class-odd`

- [サンプル](https://jsfiddle.net/walfo/ajdfzfb7/) - `event_odd.html`


### <a name="ng-init">3.5.9</a> モデルの初期値を設定する - `ng-init`
一般的に、モデルの初期値はコントローラーで設定するのが基本ですが、たとえば、テキストボックスの
初期値など、その場限りで利用するような値を設定するために利用すると便利です。

- [サンプル](https://jsfiddle.net/walfo/dud1awnL/) - `init.html`


## 3.6 フォーム関連のディレクティブ

- [サンプル](https://jsfiddle.net/walfo/nyosaowL/) - `form.html`


__1. 入力フォームを準備する `<form>` 要素__

|属性|概要|
|:--|:--|
|`name`|フォームの名前。後から検証結果を検出するため|
|`ng-submit`|サブミット時に呼び出す処理|
|`novalidate`|HTML5で提供される検証処理を無効化|

__2. 入力ボックスを配置する `<input>` 要素__

__3. 検証結果を参照する `$error` オブジェクト__

`フォーム名.入力要素名.$error.検証型`

__4. 検証エラー時にサブミットボタンを無効にする `ng-disabled` 属性__

`<input type="submit" value="submit" ng-disabled="myForm.$invalid"/>`


### 3.6.1 入力ボックスで利用出来る属性 - `<input>` `<textarea>`

__`<input>` `<textarea>` 要素で利用可能な主な属性__

- `ng-model` - 入力ボックスにバインドするための式
- `name` - 要素名
- `ng-change` - 入力値に変更があった場合に実行される式
- `required` - 必須であるか
- `ng-required` - 必須であるか
- `ng-trim` - 入力値をトリミングするか
- `min` - 最小値
- `max` - 最大値
- `ng-minlength` - 最小の文字数
- `ng-maxlength` - 最大の文字数
- `ng-pattern` - 文字列パターン（正規表現式）


__(1) `required` `ng-required` 属性の相違点__

通常は `required` を利用していれば問題ありません。
AngularJS 式を渡して動的に [必須/任意] を切り変える場合に `ng-required` を利用します

- [サンプル](https://jsfiddle.net/walfo/1xqfcmzd/) - `form_required.html`


__(3) 正規表現で入力パターンを指定する__

`ng-pattern` 属性では、正規表現を指定することで、正規表現パターンに合致しない
入力値を検出できます `<element ng-pattern="/[0-9]+/"></element>`

- [サンプル](https://jsfiddle.net/walfo/66p6swfo/) - `form_pattern.html`


__(3) 日付/時刻の max/min 属性は ISO-8601 形式で__

日付/時刻ボックスで min/max 属性を指定する場合、それぞれ ISO-8601 で指定しなければなりません

|type属性|形式|例|
|:--|:--|:--|
|`datetime-local`|yyyy-MM-ddTHH:mm:ss|2015-12-04T11:04:15|
|`date`|yyyy-MM-dd|2015-06-25|
|`time`|HH:mm:ss|21:17:11|
|`month`|yyyy-MM|2015-08|
|`week`|yyyy-W##|2015-W11|


- [サンプル](https://jsfiddle.net/walfo/9g9b3ybq/) - `datetime.html`


### 3.6.2 フォーム要素の値が変更された時の処理を定義する - `ng-change`

`ng-change` はすべてのフォーム要素で利用できるディレクティブで、フォーム要素への
入力値に変更があった場合に行うべき処理を規定します

- [サンプル](https://jsfiddle.net/walfo/vyxamm0e/) - change.html


### 3.6.3 ラジオボタンを設置する - `<input>` (radio)

ラジオボタン `<input type="radio">` では、`ng-model/ng-change` 属性の他、ラジオボタンの
値を表す `ng-value` 属性を利用できます。
スカラー値だけでなく、配列/ハッシュなどを値として利用できます

- [サンプル](https://jsfiddle.net/walfo/wrp7yhzt/) - `radio_hash.html`


#### `ng-repeat` 属性とセットで利用する場合の注意点

```js
angular.module('myApp', [])
  .controller('MyController', ['$scope', function($scope) {
    $scope.data = { book : '111-1111' }; // <- 
    // * ラジオボタンのデフォルト値
    //   これがないとラジオボタンの値を取得できなくなる
    //   `ng-repeat` でラジオボタンを設定する場合のイディオム
    
    $scope.books = [
      { isbn: '999-9999', title: 'book 1'},
      { isbn: '888-8888', title: 'book 2'},
      { isbn: '777-7777', title: 'book 3'}
    ];
  }]);
```

- [サンプル](https://jsfiddle.net/walfo/g5kpxw78/) - `radio_list.html`


### 3.6.4 チェックボックスを設置する - `<input>` (checkbox)

- `<input type="checkbox">`
- `ng-model/ng-change` 属性
- `ng-true-value/ng-false-value` 属性
- [サンプル](https://jsfiddle.net/walfo/3zvq49ky/) - `check_list.html`


### 3.6.5 チェックボックスのオンオフを切り替える - `ng-checked`

チェックボックス（ `<input type="checkbox">` ）のオンオフを切り替えるには、`ng-checked` 属性を利用します

1. [すべてをチェック] の `ng-model` に `all` を紐づける
1. 個別のチェックボックスの `ng-checked` 属性に `all` を紐づける
1. この時点で [すべてをチェック] をオンオフに応じて、個別のチェックボタンのオンフが切り替わる
1. このままでは、個別のチェックボックスの `ng-model` に反映されていない
1. [すべてをチェック] の `ng-change` のタイミングで、モデルを強制的に更新する
   `$scope.data.book[isbn] = ...`

- [サンプル](https://jsfiddle.net/walfo/tq5nkn2s/) - `checked.html`


### 3.6.6 選択ボックスを設置する - `<select>` (ng-options)

- `<select>`
- `ng-model/required/ng-required` 属性
- `ng-options` 属性


__`ng-options` の構文パターン__

1. `ラベルテキスト for 要素 in 配列`
   [サンプル](https://jsfiddle.net/walfo/7avpnefd/) - `select.html`
2. `選択値 as ラベルテキスト for 要素 in 配列`
    選択時に渡される値（選択値）を指定します
   [サンプル](https://jsfiddle.net/walfo/xbvt2tbk/) - `select.html`
3. `ラベルテキスト group by グループ化キー for 要素 in 配列`
   `group by` によって特定のキーでグループ化できます
   [サンプル](https://jsfiddle.net/walfo/jw3vnxbu/) - `select_group.html`
4. 特定のオプションだけを無効化する
   `disable when` 句で指定された式が `true` の場合そのオプションを無効化します
　 [サンプル](https://jsfiddle.net/walfo/0v0gjj7q/) - `select_sisable.html`
5. `選択値 as ラベル for (キー, 値) in オブジェクト`
   オブジェクトの `key-value` を元に選択オプションを列挙します
   [サンプル](https://jsfiddle.net/walfo/bj64yoah/) - `select_obj.html`
6. `選択値 as ラベルテキスト group by グループ化キー for (キー, 値) in ハッシュ`
   [サンプル](https://jsfiddle.net/walfo/xf9veysn/) - `select_obj_group.html`


#### 特定のオプションを選択状態にする - `ng-selected`

- [サンプル](https://jsfiddle.net/walfo/atL2eau0/) - `selected.html`


### 3.6.7 テキストボックスの内容を区切り文字で分割する - `ng-list`

デフォルトでは、区切り文字に `,` を採用します 

- [サンプル](https://jsfiddle.net/walfo/worxp2mc/) - `list.html`


### 3.6.8 フォーム要素を読み取り専用/利用不可にする - `ng-disabled` `ng-readonly`

`ng-readonly` には、`true/false` となる式を渡します

- [サンプル](https://jsfiddle.net/walfo/569s2ydv/) - `readonly.html`



### 3.6.9 フォームの状態を検知する

__1. 検証項目の単位でエラーの有無をチェックする__
`フォーム名.入力要素名.$error.検証型`
[サンプル](https://jsfiddle.net/walfo/mn602gvy/) - `form.html`

|検証型|概要|
|:--|:--|
|`email`|メールアドレスの妥当性検証|
|`max`|最大値検証|
|`maxlength`|文字列の最大長検証|
|`min`|最小値検証|
|`minlength`|最小長検証|
|`number`|数値検証|
|`pattern`|正規表現検証|
|`required`|必須検証|
|`url`|URLの妥当性検証|
|`date`|日付検証|
|`datetimelocal`|日付時刻検証|
|`time`|時刻検証|
|`week`|週検証|
|`month`|月検証|


__2. フォーム/入力項目の単位でエラーの有無をチェックする__

`$valid/$invalid` プロパティ

```js
フォーム名.入力要素名.$valid      // 入力値が正しいか
フォーム名.入力要素名.$invalid    // エラーがあるか
```

入力項目単体でなく、フォーム全体で検証エラーの有無を確認したいなら

```js
フォーム名.$valid                // 入力値が正しいか
フォーム名.$invalid              // エラーがあるか
```

[サンプル](https://jsfiddle.net/walfo/pm0Lqdua/)

__3. 入力の有無を判定する__

`$pristine/$dirty` プロパティ

```js
フォーム名.$pristine             // フォームは変更されていない
フォーム名.$dirty                // フォームが更新された
フォーム名.入力要素名.$pristine   // 入力要素は更新されていない
フォーム名.入力要素名.$dirty      // 入力要素が更新された
```

```html
<input type="reset" value="reset" ng-disabled="myForm.$pristine"/>
<!-- もしくは $dirty を利用した同等のれい ↓ -->
<input type="reset" value="reset" ng-disabled="!myForm.$dirty"/>
```

- [サンプル](https://jsfiddle.net/walfo/o4kagmq9/) - `form.html`


__4. サブミット済みかどうかを判定する__

`$submitted` プロパティ

```html 
<!-- ボタンを再度クリックできないようにする例 -->
<input type="submit" value="entry" ng-disabled="myForm.$invalid || myForm.$submitted"/>
```


__5. 検証エラー時に入力ボックスのスタイルを変更する__

AngularJS では、フォームの状態に応じて、以下のようなスタイルクラスを付与します

|スタイルクラス|概要|
|:--|:--|
|`ng-valid`|入力値が妥当である|
|`ng-valide-[key]`|入力値が妥当である（特定キーだけ。例えば `ng-valid-required`）|
|`ng-invalid`|入力値が不正である|
|`ng-invalid-[key]`|入力値が不正である（特定のキーだけ。例えば `ng-invalid-required`）|
|`ng-pristine`|入力値が初期値から変更されていない|
|`ng-dirty`|入力値がが初期値から変更された|
|`ng-touched`|フォーム要素にフォーカスが当たったことがある|
|`ng-untouched`|フォーム要素にフォーカスが当たったことがない|
|`ng-pending`|`$asyncValidators` が保留状態である|
|`ng-submitted`|フォームがサブミットされた（`<form>` 要素のみ）|


```css
input.ng-invalid { background-color: #fee; }
```

この方法では、`required` が設定されている項目に対して最初からクラスが当たってしまいます。
これを避けるためには以下のようにします

```css
input.ng-dirty.ng-invalid { background-color: #fee; }
```

- [サンプル](https://jsfiddle.net/walfo/cm14ejk6/) - `form.html`



## 3.7 その他のディレクティブ

### 3.7.1 メッセージの表示/非表示を条件に応じて切り替える - `ng-message`

条件式の値に応じてメッセージの表示/非表示を切り替える事ができます

#### `ng-messages` ディレクティブの基本

```html 
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular-messages.min.js"></script>
```

```js
angular.module('myApp', ['ngMessages']) // <- モジュールへの依存関係を宣言
  .controller()
```

__構文 `ng-messages` ディレクティブ__

```html 
<parent ng-messages="exp">
  <child ng-message="prop1">message1</child>
  <child ng-message="prop2, prop3, ...">message2</child>
</parent>
```

- [サンプル](https://jsfiddle.net/walfo/36v8ocwr/) - `messages.html`

`ng-messages/ng-message` ディレクティブは（属性でなく）要素の形式でも呼び出すことができます

```html 
<ng-messages for="myForm.mail.$error">
  <ng-message when="prop1">message1</ng-message>
  <ng-message when="prop2, prop3,...">message2</ng-message>
  <ng-message when="prop"4>message3</ng-message>
</ng-messages>
```

条件オブジェクトは `for` 属性で、キー名は `when` 属性で、それぞれ表します


#### 複数のメッセージを表示する - `ng-messages-multiple`

```html
<span ng-messages="myForm.mail.$error" ng-messages-multiple>
```

- [サンプル](https://jsfiddle.net/walfo/u2w3p8hn/) - `messages.html`


#### メッセージ情報をテンプレート化する - `ng-messages-include`

- [サンプル](https://jsfiddle.net/walfo/qfe7c2w4/) - `messages_template.html`


#### メッセージを JavaScript 側で管理する - `ng-message-exp`

- [サンプル](https://jsfiddle.net/walfo/sqpv3f6q/) - `messags_exp.html`



### 3.7.2 モデルの更新方法を設定する - `ng-model-options`

`ng-model-options` 属性を利用することで、モデルを更新するタイミング/方法などを設定できます

- `updateOn` - モデルを更新するトリガーとなるイベント（空白区切りで複数指定可）
- `debounce` - モデルの更新まで待機する時間（ミリ秒）
- `allowInvalid` - 不正なモデル値を許容するか
- `getterSetter` - モデルに値を設定する際、`getter/setter` を利用するか
- `timezone` - タイムゾーン設定


#### モデルを特定のイベントでのみ更新する

```html 
<input id="name" name="name" type="text" ng-model="myName"
  ng-model-options="{ updateOn: 'blur' }"/>
```

- [サンプル](https://jsfiddle.net/walfo/ye81q0kn/) - `model_opts_update.html`


#### モデルの更新を遅延させる

```html 
<input id="name" name="name" type="text" ng-model="myName"
  ng-model-options="{ debounce: 2000 }"/>
```

- [サンプル](https://jsfiddle.net/walfo/s4yjn4cv/) - `model_opts_debounce.html`

キー入力時は2000ミリ秒更新を遅延し、フォーカスを外した場合には即座に更新する

```html
<input id="name" name="name" type="text" ng-model="myName"
  ng-model-options="{ updateOn: 'default blur',
                      debounce: { 'default': 2000, 'blur': 0 }
                    }"/>
```

- [サンプル](https://jsfiddle.net/walfo/csu8pdue/) - `model_opts_debounce2.html`


#### 不正なモデル値を反映させる

```html
<input id="mail" name="mail" type="email" ng-model="email"
  ng-model-options="{ allowInvalid: true }"/>
```

- [サンプル](https://jsfiddle.net/walfo/xfee4nLm/) - `model_opts_invalid.html`


#### モデルに値を出し入れする際に `getter/setter` を利用する

```html
<input id="name" name="name" type="text" ng-model="my.name"
  ng-model-options="{ getterSetter: true }"/>
```

- [サンプル](https://jsfiddle.net/walfo/0maqp1qx/) - `model_opts_setter.html`


#### 日付時刻値のタイムゾーンを宣言する

```html
<input id="today" name="today" type="time" ng-model="today"
  ng-model-options="{ timezone: '+0900'}">
```

- [サンプル](https://jsfiddle.net/walfo/5tn28cwz/)


#### 補足: モデル遅延更新した場合の注意点

- `updateOn/debounce` パラメーターを指定した場合、ビューとモデル間で見た目の値が異なる時間が発生します
- `$rollbackViewValue()` を利用すると __保留中の変更はキャンセル__ されビュー/モデルが一致します
- `フォーム名.要素名.$rollbackViewValue()`
- [サンプル](https://jsfiddle.net/walfo/73xnkspg/) - `model_opts_rollback.html`


```js
$scope.myForm.myName.$rollbackViewValue();
```


### 3.7.3 Content Security Policy を利用する - `ng-csp`

CSPとは、XSSをはじめとして、よくあるアプリへの攻撃の可能性を軽減させるためのセキュリティフレームワークです

- 異なるドメインのスクリプト/スタイルシート読み込みを禁止
- インラインスクリプト（.html ファイル内の JavaScript ）を禁止
- JavaScript 擬似プロトコルを禁止（`<a href="javascriipt:">` など）
- eval 関数/Function コンストラクターの禁止
- setTimeout/setInterval 関数への文字列コード引き渡しを禁止
- プラグイン（Java/Flash/Silverlight など）の利用を禁止
- Worker/SharedWorker オブジェクトによる外部スクリプトの読み込みを禁止


### AngularJS アプリで CSP を有効にする

```php
<?php 
header('Content-Security-Policy: default-src 'self' ajax.googleapis.com);
?>
<!doctype html>
<html ng-app="myApp">
```

AngularJS は以下のケースでCSPの制約に抵触しているため、エラーがでます。

- `ng-clock` 属性のためにインラインスタイルシートを出力
- パフォーマンス最適化のために `Function` コンストラクターを利用（Angular 式による深いオブジェクト階層の参照時）

これは `ng-csp` 属性をルート要素に指定することで解消されますが、以下の点に注意する必要があります


__1. `ng-clock` 属性で利用するスタイルシートを明示的にインポートすること__

```php
<?php header('Content-Security-Policy: default-src 'self' ajax.googleapis.com) ;?>
<!doctype>
<html ng-app="myApp" ng-csp>
<head>
<meta charset="utf-8">
<title>AngularJS</title>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular-csp.css"/>
```

__2. パフォーマンスが若干低下する__

__3. アプリのコードではCSP制約を意識すること__


### 3.7.4 要素の表示/非表示時にアニメーションを適用する - `ngAnimate`

以下のディレクティブは、標準でアニメーションに対応しています

- `ng-repeat`
- `ng-view`
- `ng-include`
- `ng-switch`
- `ng-if`
- `ng-class`
- `ng-show`
- `ng-hide`


```html
<link rel="stylesheet" href="css/animate.css"/>
<scirpt src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.min.js"></script>
```

- [サンプル](https://jsfiddle.net/walfo/gvjxzrbn/) - `animate.html`


__アニメーション関連のスタイルクラス（ `ng-repeat` ディレクティブ）__


|スタイルクラス|タイミング|
|:--|:--|
|`ng-enter`|要素が追加された時（開始点）|
|`ng-enter-active`|要素が追加された時（終了点）|
|`ng-leave`|要素が削除された時（開始点）|
|`ng-leave-active`|要素が削除された時（終了点）|
|`ng-move`|要素の並びが変更された時（開始点）|
|`ng-move-active`|要素の並びが変更された時（終了点）|


```css
/**
 * transition property
 */

E {
  transition: [property] [duration] [timing] [delay];
}
```

__引数 `timing` の主な設定値__

|設定値|概要|
|:--|:--|
|`ease`|最初と最後をゆっくり（デフォルト）|
|`linear`|直線的な変化|
|`ease-in`|ゆっくり開始|
|`ease-out`|ゆっくり終了|
|`ease-in-out`|最初と最後をゆっくり（ease とほぼ同様）|
|`cubic-bezier(x1, y1, x2, y2)`|制御点（x1, y1）/(x2, y2)から成るベジエ曲線|


__アニメーション機能に対応するその他のディレクティブ__

|ディレクティブ|スタイルクラス|タイミング|
|:--|:--|:--|
|`ng-view/ng-include`|`ng-enter`|新規テンプレートを表示する時|
||`ng-leave`|既存テンプレートを非表示にする時|
|`ng-if/ng-switch`|`ng-enter`|新規の要素を追加した時|
||`ng-leave`|既存の要素を文書ツリーから吐きする前|
|`ng-class`| _clazz_ `-add`|クラス `clazz` を適用した時|
|| _class_ `-remove`|クラス `clazz` を除外した時|
|`ng-show/ng-hide`|`ng-hide-add`|要素を非表示にする時|
||`ng-hide-remove`|要素を表示状態にする|


#### 補足: アニメーションを JavaScript で登録する

```js
/**
 * @required jquery.js
 * @required jquery-ui.js
 */

angular.module('myApp', ['ngAnimate'])
  .animation('.box', function() {
    return {
      enter: function(element, done) {
        element.css('opacity', '0');
        element.css('background-color', '#000');
        $(element).animate({
          opacity: 1,
          backgroundColor: '#ff0'
        }, 2000, function() {
          element.css('background-color', '#fff');
          done();
        });
        return function(cancelled) {
          if (cancelled) {
            $(element).stop();
          }
        }
      },
      leave: function(element, done) {
        $(element).fadeOut(2000, done);
        return function(cancelled) {
          if (cancelled) {
            $(element).stop();
          }
        }
      }
    }
  })
  .controller('MyController', ['$scope', function($scope) {
    // ...
  }]);
```

__<a name="animation">#</a> 構文 `animation` メソッド__

```js
/**
 * animation
 * @param {String} name
 * @param {Object} factory { enter: { .. }, leave: { .. }}
 *    @argument {HTMLElement} element 対象の要素
 *    @argument {Function} done アニメーション完了後の処理
 * @return {Function} cancelled function
 */
.animation(name, factory);
```







