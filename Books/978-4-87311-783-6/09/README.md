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

- `extends` - これにより `Car` は `Vehicle` のサブクラスとなります
- `super()` - これは特別な関数で, スーパークラスのコンストラクタを呼び出します. 呼び出しておかないとエラーになってしまいます

### 9.2.7 ポリモーフィズム
ポリモーフィズムとは, 「あるインスタンスをそのインスタンスが属するクラスのメンバーとして扱うだけでなく,
スーパークラスのメンバーとしても扱う」ということを意味する言葉です.

```js
const v = new Vehicle()
v.addPassenger('taro')
v.addPassenger('hana')
console.log(v.passengers) // ['taro', 'hana']

const c = new Car()
c.addPassenger('kei')
c.addPassenger('midori')
console.log(c.passengers) // ['kei', 'midori']
c.deployAirbags() // 

class Motocycle extend Vehicle {}

const c2 = new Car()
const m = new Motorcycle()
console.log(c instanceof Car) // true
console.log(c instanceof Vehicle) // true
console.log(m instanceof Car) // false
console.log(m instanceof Motorcycle) // true
console.log(m instanceof Vehicle) // true
```

### 9.2.8 プロパティの列挙

```js
class Super {
  constructor() {
    this.name = 'Super'
    this.isSuper = true
  }
}

Super.prototype.sneaky = 'Deprecated!' // 可能だが非推奨

class Sub extends Super {
  constructor() {
    super()
    this.name = 'Sub'
    this.isSub = true
  }
}

const obj =  new Sub()

for (let p in obj) {
  console.log(`${p}: ${obj[p]}` + (obj.hasOwnProperty(p) ? '' : '(継承)'))
}
```

### 9.2.9 文字列による表現
`toString()` はデフォルトでは `[object Object]` を戻します(これはほとんど役に立ちません)
オブジェクトに関する何らかの情報を提供してくれる `toString` メソッドがあるとデバッグなどにオブジェクトの状態がわかって便利です.

```js
class Car {
  toString() {
    return `${this.make} ${this.model}: ${this.vin}`
  }
}
```

## 9.3 多重継承, ミックスイン, インタフェース
多重継承は「コリジョン（衝突）」の危険性をはらむことになります. 
同じメソッドを2つのスーパークラスが持つ場合どちらから継承すれば良いのか不明になってしまいます.
この問題があるため, 多くの言語では多重継承を許してません.

多重継承が自然だと思われる場合も多々存在します.
こうした問題に対処するため多重継承を許さない言語においては, 「インタフェース」という機構を導入しています.
クラスはスーパークラスとしては親クラスだけからしか継承できないけれど, 複数のインタフェースを持つことができるのです.

JavaScript は興味深いハイブリッド状態になっています. 
「単一継承」の言語であり, プロトタイプチェインは複数の親をさかのぼることはしません.

多重継承の代わりに「ミックスイン(mixin)」という概念が使われています.

```js
class Car {
  constructor() {
  
  }
}

class InsurancePolicy {
}

function makeInsurable(o) {
  o.addInsurancePolicy = function(p) {
    this.insurancePolicy = p
  }
  o.getInsurancePolicy = function() {
    return this.insurancePolicy
  }
  o.isInsured = function() {
    return !!this.insurancePolicy
  }
}
```

```js
const car1 = new Car()
makeInsurable(car1)
console.log(car1.isInsured()) // false
car1.addInsurancePolicy(new InsurancePolicy()) // Ok
console.log(car1.isInsured()) // true
```
これはうまく行きますが, これを生成する全てのインスタンスに対してコピーすることになります.
うまい解決方法があります.

```js
makeInsurable(Car.prototype)

const car1 = new Car()
console.log(car1.isInsured()) // false
car1.addInsurancePolicy(new InsurancePolicy()) 
console.log(car1.isInsured()) // true

const car2 = new Car()
console.log(car2.isInsured()) // false
car2.addInsurencePolicy(new InsurancePolicy())
console.log(car2.isInsured()) // true
```

ミックスインは「衝突」の問題をなくすというわけではありません.
また, `instanceof` を使うことができません. 「ダックタイピング」しかできないのです.
(メソッド`addInsurancePolicy`を持っていれば保険をかけられるに違いない)

シンボルを使うとこの問題を解決できます.

```js
const ADD_POLICY = Symbol()
const GET_POLICY = Symbol()
const IS_INSURED = Symbol()
const _POLICY = Symbol()
function makeInsurable(o) {
  o[ADD_POLICY] = function(p) { this[_POLICY] = p }
  o[GET_POLICY] = function() { return this[_POLICY] }
  o[IS_INSURED] = function() { return !!this[_POLICY] }
}

makeInsurable(Car.prototype)

const car1 = new Car()
console.log(car1[IS_INSURED]()) // false
car1[ADD_POLICY](new InsurancePolicy())
console.log(car1[IS_INSURED]()) // true

const car2 = new Car()
console.log(car2[IS_INSURED()]) // false
car2[ADD_POLICY](new InsurancePolicy())
console.log(car2[IS_INSURED()]) // true
```

シンボルはユニークなので, ミックスインは既存の `Car` の機能を邪魔することはありません.
