# コンストラクタパターン
![IMG_8D0323C130BB-1](https://user-images.githubusercontent.com/4797793/222317009-13241aa1-86b0-442d-a8c0-34b8ae6a5f5d.jpeg)

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

`new` で呼び出されるたびにメモリに新しい関数が作成されます。インスタンスごとに内容が変わらないメソッドは prototype に追加したほうがいいでしょう。

```js
var civic = new Car('Honda Civic', 2009, 20000);
console.log(civic.toString());
```
