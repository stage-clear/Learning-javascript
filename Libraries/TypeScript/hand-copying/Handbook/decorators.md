# Decorators
## 紹介

```sh
$ tsc --target ES5 --experimentalDecorators
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

## デコレータの生成
<sup>Decorator Factories</sup>

```ts
function sealed(target) {
  // do something with 'target' ...
}
```

### Decorator Factories

```ts
function color(value: string) { // これはデコレータを生成する関数です
  return function(target) { // これがデコレータ
    // target と value に何かします
  }
}
```

### デコレータの構成
<sup>Decorator Composition</sup>

```ts
// 1行で
@f @g x
```

```ts
// 複数行で
@f
@g
x
```

1. 各デコレータの式は上から下へ評価されます.
2. 結果は, 下から上へ関数として呼び出されます.

```ts
function f() {
  console.log('f(): evaluated')
  return function(target, propKey: string) {
    console.log('f(): called');
  }
}

function g() {
  console.log('g(): evaluated')
  return function(target: propKey: string) {
    console.log('g(): called');
  }
}

class C {
  @f()
  @g()
  method() {
    
  }
}

// > f(): evaluated
// > g(): evaluated
// > g(): called
// > f(): called
```

### デコレータの評価

1. パラメータデコレータに続いて, メソッド, アクセサ, またはプロパティデコレータは, 各インスタンスのメンバに適用されます.
2. パラメータデコレータに続いて, メソッド, アクセサ, またはプロパティデコレータは, 各静的メソッドメンバに適用されます.
3. パラメータデコレータは, コンストラクタに適用されます.
4. クラスデコレータはクラスに適用されます.

### クラスデコレータ
クラスデコレータは, クラス宣言の前に宣言されます.
クラスデコレータは, クラスのコンストラクタに適用され, クラス定義の観察, 変更, または置換に使用できます.

クラスデコレータの式は, 実行時に関数として呼び出され, 修飾されたクラスのコンストラクタが唯一の引数として呼び出されます.

クラスデコレータが値を返す場合は, クラス宣言を指定されたコンストラクタ関数に置き換えます.

```ts
@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}
```

```ts
function sealed(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}
```

### メソッドデコレータ
メソッドデコレータは, メソッド宣言の前に宣言されます.

メソッドデコレータの式は, 実行時に次の3つの引数を指定して関数として呼び出されます.

1. 静的メンバのクラスのコンストラクタ関数, またはインスタンスメンバーのクラスのプロトタイプ
2. メンバーの名前
3. プロパティ記述子: 

```ts
class Greete {
  greeting: string;
  constructor(message: string) {
    this.greeting = message
  }
  
  @enumerable(false)
  greet() {
    return 'Hello, ' + this.greeting
  }
}
```

次の関数を使って `@enumerable` を定義することができます.

```ts
function enumerable(value: boolean) {
  return function(target: any, propKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value
  }
}
```

### アクセサリーデコレータ
アクセサリデコレータは, アクセサ宣言の前に宣言されます.

アクセサデコレータの式は, 実行時に次のの3つの引数を指定して関数として呼び出されます.

1. 静的メンバのクラスのコンストラクタ関数, またはインスタンスメンバーのクラスのプロトタイプ
2. メンバーの名前
3. プロパティ記述子

```ts
class Point {
  private _x: number
  private _y: number
  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }
  
  @configurable(false)
  get x() { return this._x }
  
  @configurable(false)
  get y() { return this._y }
}
```

次の関数を使って `@configurable` を定義することができます.

```ts
function configurable(value: boolean) {
  return function(target: any, propKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value
  }
}
```

### プロパティデコレータ
プロパティデコレータは, プロパティ宣言の前に宣言します.

:
