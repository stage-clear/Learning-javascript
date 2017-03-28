# 関数とクラス, インターフェイス
## 関数の基本
### 関数とは
#### 簡単な関数の例

```ts
// 5-1. 関数 add
function add(x:number, y:number):number {
  return x + y;
}
```

```ts
// 5-2. 関数 add を使うトップレベルの処理
let numA = 3.5;
let numB = 2;
let result:string;

resultStr = `${numA}と${numB}を足すと${add(numA, numB)}`;
document.body.innerHTML = resultStr;
```

### 関数とメソッドの違い
#### 少数の計算の不具合を解決する関数

1. メソッドはクラスの中に定義する
2. メソッドを使うには, そのクラスのオブジェクト作って呼び出す

```ts
// 5-3. 関数 showMutiplyDecimal
function showMultiplyDecimal(numA:number, numB:number, dp:number):string {
  return `${numA}と${numB}をかけると${(numA * numB).toFixed(dp)}`
}
```

```ts
// 5-4. トップレベルの処理
let numA = 3.5;
let numB = 2;
let dp = 1;
document.body.innerHTML = showMultiplyDecimal(numA, numB, dp);
```

#### クラスのメソッドとして定義するには

```ts
// 5-5
class DecimalMultiplier {
  showMultiplyDecimal(numA:number, numB:number, dp:number):string {
    return `${numA}と${numB}をかけると${(numA * numB).toFixed(dp)}`;
  }
}

let numA = 3.5;
let numB = 2;
let dp = 1;

document.body.innerHTML = 
  new DecimalMultiplier().showMultiplyDecimal(numA, numB, dp);
```

#### クラスのメソッドを関数に近くする static
`static` という修飾子とともに定義すると, それはクラスから新規作成する複数のオブジェクトの1つではなく,
クラス名をもつ唯一のオブジェクトが呼び出すメソッドになります.

```ts
// 5-6. static をつけて定義するメソッド
class staticDecimalMultiplier {
  static showMultiplyDecimal(numA:number, numB:number, dp:number): string {
    return `${numA}と${numB}をかけると${(numA * numB).toFixed(dp)}`;
  }
}
```

```ts
// 5-7 static なメソッドをトップレベルで用いる
let numA = 3.5;
let numB = 2;
let dp = 1;

document.body.innerHTML = 
  staticDecimalMultiplier.showMultiplyDecimal(numA, numB, dp);
```

## 値としての関数
### 変数名が付けられる

```ts
// 5-8. 関数に変数名をつける
let calc = function(a:number, b:number):number {
  return a + b;
}
```

1. 変数名があるので, `function` の後に関数名は書かない
2. 代入式なので, 最後にセミコロンをつける

```ts
// 5-9. 変数名をつけられた関数を用いる
let numA = 3;
let numB = 2;
document.body.innerHTML = calc(numA, numB).toString();
```

#### 変数に渡す利点

```ts
// 5-10. 変数 calc の中身を, 別の関数に
if (numA > numB) {
  calc = function(a:number, b:number):number {
    return a - b;
  }
}
```
