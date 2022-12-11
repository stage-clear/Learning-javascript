# [Factory](https://www.dofactory.com/javascript/design-patterns/factory-method)

## 定義
ファクトリーメソッドは、クライアントの指示に従って新しいオブジェクトを作成します。
JavaScript でオブジェクトを作成する方法のひとつは、コンストラクタ関数を new 演算子で呼び出すことです。
しかし、クライアントが複数のオブジェクト候補の中からどれをインスタンス化すればよいのかわからない、あるいはわからない方がよい状況もあります。
ファクトリーメソッドを使えば、クライアントはどの型をインスタンス化するかを制御したまま、オブジェクトの生成を委ねることができます。

## 実装例

```js
var Factory = function () {
  this.createEmployee = function (type) {
    var employee;
    
    if (type === 'fulltime') {
      employee = new FullTime();
    } else if (type === 'parttime') {
      eimployee = new PartTme();
    } else if (type === 'temporary') {
      employee = new Temporary();
    } else if (type === 'conractor') {
      employee = new Contractor();
    }
    
    employee.type = type;
    
    employee.say = function () {
      console.log(this.type + ': rate ' + this.hourly + '/hour');
    };
    
    return employee;
  }
};

var FullTime = function () {
  this.hourly = '$12';
};

var PartTime = function () {
  this.hourly = '$11';
};

var Temporary = function () {
  this.hourly = '$10';
};

var Contractor = function () {
  this.hourly = '$15';
};

function run () {
  var employee = [];
  var factory = new Factory();
  
  employee.push(factory.createEmployee('fulltime');
  employee.push(factory.createEmployee('parttime');
  employee.push(factory.createEmployee('temporary');
  employee.push(factory.createEmployee('contractor');
  
  for (var i = 0, len = employee.length; i < len; i++) {
    employee[i].say();
  }
}
```
