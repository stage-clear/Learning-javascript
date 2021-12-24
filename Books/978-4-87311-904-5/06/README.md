# 高度な型

## 6.1 型の間の関係

### 6.1.1 サブタイプとスーパータイプ
> <b>サブタイプ(subtype)</b><br>
> A、Bという2つの型があり、BがAのサブタイプ（派生型）である場合、Aが要求されるところではどこでも、Bを安全に使うことができます。

> <b>スーパータイプ(supertype)</b><br>
> A、Bという2つの型があり、BがAのスーパータイプ（上位型）である場合、Bが要求されるところではどこでも、Aを安全に使うことができます。

### 6.1.2 変性
- 「A <: B」は、「Aが型Bのサブタイプであるか、またはBと同じ型である」ことを表します。
- 「A >: B」は、「Aが型Bのスーパータイプであるか、またはBと同じ型である」ことを表します。

#### 6.1.2.1 形状と配列の特性
- <b>不変性（invariance）</b>: Tそのものを必要とする
- <b>共変性（covariance）></b>: <:Tであるものを必要とする
- <b>反変性（contravariance）</b>: >:Tであるものを必要とする
- <b>双変性（bivariance）</b>: <:Tまたは>:TであればOK

#### 6.1.2.2 関数の変性

```ts
class Animal {}
class Bird extends Animal {
  chirp() {}
}

class Crow extends Bird {
  caw() {}
}
```

```ts
function chirp(bird: Bird): Bird {
  bird.cirp()
  return bird
}
```

```ts
chirp(new Animal) // エラー
chirp(new Bird)
chirp(new Crow)
```
```ts
function clone (f: (b: Bird) => Bird): void {
  // ...
}
```

```ts
function birdToBird (b: Bird): Bird {
  // ...
}
clone(birdToBird) // OK
```

```ts
function birdToCrow (d: Bird): Crow {
  // ...
}
clone(birdToCrow) // OK

function birdToAnimal (d: Bird): Animal {
  // ...
}
clone(birdToAnimal) // エラー
```

```ts
function clone (f: (b: Bird) => Bird): void {
  let parent = new Bird
  let babyBird = f(parent)
  babyBird.chirp()
}
```

```ts
function animalToBird (a: Animal): Bird {
  // ...
}
clone(animalToBird) // OK

function crowToBird (c: Crow): Bird {
  // ...
}
clone(crowToBird) // エラー
```

|TSCフラグ|説明|
|:-|:-|
|`strictFunctionTypes`|より安全な<b>反変</b>な振る舞いを選択する|

### 6.1.3 割り当て可能性
