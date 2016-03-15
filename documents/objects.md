# オブジェクト

## さまざまな構文

### リテラル

```js
var object = {
  method() { /* do something */ }
};
```

### コンストラクタ

```js
var Constructor = function() {};
// or
function Constructor() {}
// prototype method
Constructor.prototype.method = function() {
  // do something...
};

var object = new Constructor();
```

__関数式の中でコンストラクターを定義する__

```js
var Constructor = function() {
  function Constructor() {}
  // prototype method
  Constructor.prototype.method = function() {
    // do something...
  };
  
  return Constructor;
};
```

### 即時関数

```js
var object = (function() {
  return {
    method() { /* do something */ }
  }
})();
```

### プライベートメンバ

#### コンストラクタとプライバシー

```js
function MyObj() {
  // プライベートメンバ
  var name = 'my, oh my';
  this.getName = () => name;
}
```

#### リテラルとプライバシー

```js
var myObj = {};
(function() {
  // プライベートメンバ
  var name = 'my, oh my';
  myObj.getName = () => name;
})();
```

#### 即時関数とプライバシー

```js
var myObj = (function() {
  // プライベートメンバ
  var name = 'my, oh my';

  return {
    getName() { return name; }
  }
})();
```

#### プロトタイプとプライバシー

```js
function MyObj() {}
MyObj.prototype = (function() {
  // プライベート
  var name = 'my, oh my';

  return {
    getName() {　return name; }
  }
})();
```


## さまざまな使い方

coming soon?


## その他

- __特権メソッド__ - プライベートメンバにアクセスできるパブリックメソッド
