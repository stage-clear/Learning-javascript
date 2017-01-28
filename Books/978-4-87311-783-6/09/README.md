# オブジェクトとオブジェクト指向プログラミング
## 9.1 プロパティの列挙

### 9.1.1 for...in

```js
const SYM = Symbol()
const o = { a: 1, b: 2, c: 3, [SYM]: 4}
for (let props in o) {
  if (!o.hasOwnProperty(prop)) continue
  console.log(`${prop}: ${o[prop]}`)
}
```

```js
const o2 = { a: 1, b: 2, c:3, SYM: 4 }
console.log(o2.SYM) // 4
console.log(o2["SYM"]) // 4
console.log(o2[SYM]) // undefined
```

```js
const o3 = { a: 1, b: 2, c:3 }
o3[SYM] = 4
console.log(o3.SYM) // undefined
console.log(o3["SYM"]) // undefined
console.log(o3[SYM]) // 4
```

`for...in` では, キーがシンボルであるプロパティは処理の対象になりません.

### 9.1.2 Object.keys
列挙可能な文字列のプロパティをすべてまとめて一つの配列に記憶できます.

```js
const SYM = Symbol()
const o = { a: 1, b: 2, c: 3, [SYM]: 4 }
const propArray = Object.keys(o) // <-
console.log(propArray)
console.log('-----')
propArray.forEach(prop => console.log(`${prop}: ${o[prop]}`))
```

```js
const o = { apple: 1, xochitl: 2, ballon: 3, guitar: 4, xylophone: 5 }
Object.keys(o)
  .filter(prop => prop.match(/^x/))
  .forEach(prop => console.log(`${prop}: ${o[prop]}`))
```

## 9.2 オブジェクト指向のプログラミング

- __クラス__ - オブジェクトの基になる概念（ひな形）
- __インスタンス__ - 具体的なオブジェクト
- __メソッド__ - オブジェクトの持つ機能
- __クラスメソッド__ - クラス全体に関係するが, 特定のインスタンスには依存しない機能
- __コンストラクタ__ - 新しいインスタンスを生成する
- __初期化__ - コンストラクタがオブジェクトのインスタンスを初期化する

### 9.2.1 クラスとインスタンス生成

```js
class Car {
  constructor(make, model) {
    this.make = make // maker
    this.model = model // model
    this.userGears = ['P', 'N', 'R', 'D']
    this.userGear = this.userGears[0]
  }
  shift(gear) {
    if (this.userGears.indexOf(gear) < 0) {
      throw new Error(`ギア指定が正しくない: ${gear}`)
    }
    this.userGear = gear
  }
}

const car1 = new Car('Tesla', 'Model S')
const car2 = new Car('Mazda', '3i')

console.log(car1)
console.log(car2)
console.log(car1 instanceOf Car) // true
console.log(car2 instanceOf Car) // true
console.log(car1 instanceOf Array) // false

car1.shift('D')
car2.shift('R')

console.log(car1.userGear) // D
console.log(car2.userGear) // R
```

## 9.2.2 アクセッサプロパティ


```js
class Car {
  constructor(make, model) {
    this.make = make
    this.model = model
    this._userGears = ['P', 'N', 'R', 'D']
    this._userGear = this._userGears[0]
  }
  
  get userGear() {
    return this._userGear
  }
  set userGear(value) {
    if (this._userGears.indexOf(value) < 0) {
      throw new Error('ギア指定が正しくない: ${value}')
    }
    this._userGear = value
  }
  shift(gear) {
    this.userGear = gear
  }
}

const car1 = new Car('Tesla', 'Model S')
const car2 = new Car('Mazda', '3i')

console.log(car1)

car1.shift('D')
car2.shift('R')

console.log(car1.userGear) // D
console.log(car2.userGear) // R


car1.userGear = 'X' // Error: ギア指定が正しくない: X
```

もっと厳しくプライバシー管理をしたい場合は, スコープによって保護されたウィークマップを使うことができます.

```js
const Car = (function() {
  const carProps = new WeakMap()
  class Car {
    constructor(make, model) {
      this.make = make
      this.model = model
      this._userGears = ['P', 'N', 'R', 'D']
      carProps.set(this, { userGear: this._userGears[0] })
    }
    
    get userGear() {
      return carProps.get(this).userGear
    }
    
    set(value) {
      if (this._userGears.indexOf(value) < 0) {
        throw new Error('ギアが正しくない: ${value}')
      }
      carProps.get(this).userGear = value
    }
    
    shift(gear) {
      this.userGear = gear
    }
  }
  
  return Car
})()

const car1 = new Car('Tesla', 'Model S')
const car2 = new Car('Mazda', '3i')
console.log(car1)
console.log(car2)

car1.shift('D')
car2.shift('R')

console.log(car1.userGear) // D
console.log(car2.userGear) // R

car1.userGear = 'N'
console.log(car1.userGear) // N
car1.userGear = 'X' // Error
```

### 9.2.3 クラスは関数
class を使った構文のほうがずっと直感的で直接的ですが実は内部的にはクラスの本質は変わっていません.
(classはいわゆる「糖衣構文」の役目をしているだけです)
クラスは実は単なる関数なのです.

```js
// ES5
function Car(make, model) {
  this.make = make
  this.model = model
  this._userGears = ['P', 'N', 'D', 'R']
  this._userGear = this._userGears[0]
}
```

```js
class Es2015Car {
  constructor(make, model) {
    this.make = make
    this.model = model
    this._userGears = ['P', 'N', 'D', 'R']
    this._userGear
  }
  
  get userGear() {
    return this._userGear
  }
  set userGear(value) {
    this._userGear = value
  }
  shift(gear) {
    if (this._userGears.indexOf(gear) < 0) {
      throw new Error('Invalid gear')
    }
    this._userGear = gear
  }
}

function Es5Car(make, model) {
  this.make = make
  this.model = model
  this._userGears = ['P', 'N', 'D', 'R']
  this._userGear = this._userGears[0]
}

console.log(typeof Es2015Car) // function
console.log(typeof Es5Car) // function
```

### 9.2.4 プロトタイプ

> プロトタイプメソッドを表すのに `#` を使うことがあります.
> たとえば `Car.prototype.shift` の代わりに `Car#shift` と書いたりします.

### 9.2.5 静的メソッド

静的メソッドにおいては this がクラスそのものに結びつけられます.

```js
class Car {
  static getNextVin() { // 車両番号を得る
    return Car.nextVin++ // this.nextVin++ でも動作するがクラス名を用いるほうがよい
  }
  constructor(make, model) {
    this.make = make
    this.model = model
    this.vin = Car.getNextVin()
  }
  static areSimilar(car1, car2) {
    return car1.make === car2.make && car1.model === car2.model
  }
  
  static areSame(car1, car2) {
    return car1.vin ==== car2.vin
  }
}

Car.nextVin = 0

const car1 = new Car('Tesla', 'Model S')
const car2 = new Car('Mazda', '3i')
const car3 = new Car('Mazda', '3i')

console.log(car1.vin) // 0
console.log(car2.vin) // 1
console.log(car3.vin) // 2

console.log(Car.areSimilar(car1, car2)) // false
console.log(Car.areSimilar(car2, car3)) // true
console.log(Car.areSame(car2, car3)) // false
console.log(Car.areSame(car2, car2)) // true
```

### 9.2.6 継承

```js
class Vehicle {
  constructor() {
    this.passengers = []
    console.log('Vehicle が生成された')
  }
  addPassenger(p) {
    this.passengers.push(p)
  }
}

class Car extends Vehicle {
  constructor() {
    super() // スーパークラスのコンストラクタを呼び出す
    console.log('Car が生成された')
  }
  deployAirbags() {
    console.log('バーン!')
  }
}
```
]

