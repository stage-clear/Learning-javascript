# コンストラクタパターン

```js
function Car (model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}

Car.prototype.toString = function () {
  return `${this.model} has done ${this.miles} miles.`;
};
```

```js
var civic = new Car('Honda Civic', 2009, 20000);
console.log(civic.toString());
```
