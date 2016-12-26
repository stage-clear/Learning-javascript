# Enums
## Enums
Enums は名前付けられた数値の定数の組を定義することを可能にします。
Enum は `enum` キーワードを使って定義されることができます。

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
```

Enum の本体は、0かそれ以上の enum メンバーで構成されています。
Enum の要素は関連した数値を持っていて、それぞれが不変か計算済みと成りえます。
enum の要素は考慮された定数です。もし

- 初期化値を持っておらず先行する enum 要素が定数だった

```typescript
enum FileAccess {
  // constant members
  None,
  Read    = 1 << 1,
  Write   = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length
}
```

```typescript
enum Enum {
  A
}
let a = Enum.A
let nameOfA = Enum[Enum.A] // "A"
```

このコードをコンパイルすると

```typescript
var Enum;
(function (Enum) {
  Enum[Enum["A"] = 0] = "A"
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[Enum.A]; // "A"
```

```typescript
const enum Enum {
  A = 1,
  B = A * 2
}
```

```typescript
const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [
  Directions.Up, 
  Directions.Down, 
  Directions.Left, 
  Directions.Right
]
```

```typescript
var directions = [0 /* UP */, 1 /* Down*/, 2 /* Left */, 3 /* Right */];
```

## Ambient enums

```typescript
declare enum Enum {
  A = 1, 
  B, 
  C = 2
}
```
