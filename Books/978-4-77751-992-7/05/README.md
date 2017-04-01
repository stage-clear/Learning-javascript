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
- 値として別の関数に変更できる良さがあります.
```ts
// 5-10. 変数 calc の中身を, 別の関数に
if (numA > numB) {
  calc = function(a:number, b:number):number {
    return a - b;
  }
}
```

#### 空の値で関数を定義

```ts
// 5-11. シグニチャだけで関数を宣言
let calc:(a:number, b:numer)=>number;
```
- `=>` - 変数の型定義のときに `:` をつけなければならないので, 混同を避ける為別の記号を使う, と考える.

```ts
// 5-12 
let calc:(a:number, b:number)=>number;

let numA = 3;
let numB = 3;

if (numA > numB) {
  calc = function(a:number, b:number):number {
    return a - b;
  }
} else if (numA < numB) {
  calc = function(a:number, b:number):number {
    return a + b;
  }
} else {
  calc = function(a:number, b:number):number {
    return a * b;
  }
}

document.body.innerHTML = calc(numA, numB).toString();
```

#### 関数の配列

```ts
// 5-13. シグニチャは同じで, 中身の異なる関数
let add = function(a:number, b:number):number {
  return a + b;
}
let sub = function(a:number, b:number):number {
  return a - b;
}
let multi = function(a:number, b:number):number {
  return a * b;
}
let div = function(a:number, b:number):number {
  return a / b;
}
```

```ts
// 5-14. 配列 calcs
let clacs = [add, sub, multi, div];
```

```ts
// 5-15. 配列から関数を取り出して, 同じ引数を与える
let numA = 3;
let numB = 2;

const br = '<br>';
let resultStr = '';

for (let calc of calcs) {
  resultStr += calc(numA, numB) + br;
}

document.body.innerHTML = resultStr;
```

### クラスの属性となる
#### 計算する関数を属性に持つクラス

```ts
class Calculator {
  calcStr:string;
  calc:(a:number, b:number)=>number;
  // この後もっと書く
}
```

#### 関数を引数に取るメソッド
**異なる関数を属性地に持つオブジェクト**なので, コンストラクタの引数に**関数**を置かなければなりません.

```ts
// 5-18 関数を引数に取るコンストラクタ
class Calclator {
  ...
  constructor(calcStr:string, func:(a:number, b:number)=>number) { // <-
    this.calcStr = calcStr;
    this.calc = func;
  }
}
```

#### 関数の属性を使うメソッド

```ts
// 5-19. メソッド doCalc
class Calculator {
  ...
  doCalc(a:number, b:number):string {
    return `${a}と${b}の${this.calcStr}: ${this.calc(a, b)}`;
  }
}
```

#### 関数を属性に渡して, オブジェクトを作成

```ts
// 5-20. 他のクラスを継承するクラスの宣言
let calculatorAdd = new Calculator('足し算', function(a:number, b:number):number {
  return a + b;
})
```

```ts
// 5-21. 引数として渡される関数の書き方
function(a:number, b:number):number {
  return a + b;
}
```

```ts
// 5-22 もう一つの Calculator オブジェクト
let calculatorSub = new Calculator('引き算', function(a:number, b:number):number {
  return a - b;
})
```

```ts
// 5-23. 異なるオブジェクトが, メソッド doCalc を呼び出す
const br = '<br>';
document.body.innerHTML = 
  cacluratorAdd.doCalc(2, 3) + 
  br + 
  calculatorSub.doCalc(9, 7);
```
