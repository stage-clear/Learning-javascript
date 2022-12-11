# [Visitor](https://designpatternsgame.com/patterns/visitor)
## 定義
オブジェクト構造の要素に対して実行する操作を表します。Visitorを使えば、操作対象となる要素のクラスを変更することなく、新しい操作を定義することができます。

## こんなときに使います。
...オブジェクト構造体が多くのクラスを含んでおり、その構造体の要素に対して、そのクラスに依存する操作を行いたい場合。

## 実装例
### ES6
```js
function bonusPattern (employee) {
  if (employee instanceof Manager) employee.bonus = employee.salary * 2
  if (employee instanceof Developer) employee.bonus = employee.salary
}

class Employee {
  constructor (salary) {
    this.bonus = 0
    this.salary = salary
  }
  
  accept (item) {
    item(this)
  }
}

class Manager extends Employee {
  constructor (salary) {
    super(salary)
  }
}

class Developer extends Employee {
  constructor (salary) {
    super(salary)
  }
}

exprot { Developer, Manager, bonusPattern }
```

### ES5
```js
function bonusPattern (employee) {
  if (employee instanceof Manager) employee.bonus = employee.salary * 2;
  if (employee instanceof Developer) employee.bonus = employee.salary;
}

function Employee () {
  this.bonus = 0;
}

Employee.prototype.accept = function (item) {
  item(this);
};

function Manager (salary) {
  this.salary = salary;
}

Manager.prototype = Object.create(Employee.prototype);

function Developer (salary) {
  this.salary = salary;
}

Developer.prototype = Object.create(Employee.prototype);

module.exports = [Developer, Manager, bonusPattern];
```









