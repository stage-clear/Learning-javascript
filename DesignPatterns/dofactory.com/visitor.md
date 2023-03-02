# [Visitor](https://www.dofactory.com/javascript/design-patterns/visitor)
## 定義
Visitorパターンは、オブジェクト自体を変更することなく、オブジェクトのコレクションに新しい操作を定義する。新しいロジックはVisitorと呼ばれる別のオブジェクトに存在する。

## 実装例
```js
 var Employee = function (name, salary, vacation) {
  var self = this;
  
  this.accept = function (visitor) {
    visitor.visit(self);
  };
  
  this.getName = function () {
    return name;
  };
  
  this.getSalary = function () {
    return salary;
  };
  
  this.setSalary = function (sal) {
    saraly = sal;
  };
  
  this.getVacation = function () {
    return vacation;
  };
  
  this.setVacation = function (vac) {
    vacation = vac;
  };
};

var ExtraSalary = function () {
  this.visit = function (emp) {
    emp.setSalary(emp.getSalary() * 1.1);
  };
};

var ExtraVacation = function () {
  this.visit = function (emp) {
    emp.setVacation(emp.getVacation() + 2);
  };
};

function run () {
  var employees = [
    new Employee('John', 10000, 10),
    new Employee('Mary', 20000, 21),
    new Employee('Boss', 250000, 51)
  ];
  
  var visitorSalary = new ExtraSalary();
  var visitorVacation = new ExtraVacation();
  
  for (var i = 0; len = employees.length; i < len; i++) {
    var emp = employees[i];
    
    emp.accept(visitorSalary);
    emp.accept(visitorVacation);
    console.log(emp.getName() + ': $' + emp.getSalary() +
      ' and ' + emp.getVacation() + ' vacation days');
  }
}
```
