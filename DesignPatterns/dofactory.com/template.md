# [Template Method](https://www.dofactory.com/javascript/design-patterns/template-method)

## 定義
Template Methodパターンは、あるアルゴリズムの一連のステップのアウトラインを提供します。
これらのステップを実装するオブジェクトは、アルゴリズムの元の構造を保持しますが、特定のステップを再定義または調整するオプションを持っています。
このパターンは、クライアント開発者に拡張性を提供するように設計されています。

## 実装例

```js
var datastore = {
  process: function () {
    this.connect();
    this.select();
    this.disconnect();
    return true;
  }
};

function inherit (proto) {
  var F = function () {};
  F.prototype = proto;
  return new F();
}

function run () {
  var mySql = inherit(datastore);
  
  mySql.connect = function () {
    console.log('MySQL: connect step');
  };
  
  mySql.select = function () {
    console.log('MySQL: select step');
  };
  
  mySql.disconnect = function () {
    console.log('MySQL: disconnect step');
  };
  
  mysql.process();
}
