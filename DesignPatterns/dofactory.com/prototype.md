# [Prototype](https://www.dofactory.com/javascript/design-patterns/prototype)

## 定義
Prototypeパターンは、新しいオブジェクトを作成しますが、初期化されていないオブジェクトを作成するのではなく、プロトタイプ（またはサンプル）オブジェクトからコピーした値で初期化されたオブジェクトを返します。
PrototypeパターンはPropertiesパターンとも呼ばれる。

## 実装例
```js
function CustomPrototype (proto) {
  this.proto = proto
  
  this.clone = function () {
    var customer = new Customer();
    
    customer.first = proto.first;
    customer.last = proto.last;
    customer.status = proto.status;
    
    return customer;
  };
}

function Customer (first, last, status) {
  this.first = first;
  this.last = last;
  this.status = status;
  
  this.say = function () {
    console.log('name: ' + this.first + ' ' + this.last + ', status: ' + this.status);
  };
}

function run () {
  var proto = new Customer('n/a', 'n/a', 'pending');
  var prototype = new CustomerPrototype(proto);
  
  var customer = prototype.clone();
  customer.say();
}
```
