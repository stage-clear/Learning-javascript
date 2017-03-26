# 変数とデータ型
## 3.1 変数の宣言
### 変数宣言とデータ型

__値があれば、型宣言は必要ない__

```ts
let mystr = '3の2乗は';
```

__値を与えず宣言するときは、型を宣言__

```ts
let myUnknownStr: string;
myUnknownStr = '大きいです';
```

### 宣言のキーワード
- JavaScript由来の `var`
- キーワード `let`
- 定数 `const`

## 3.2 基本のデータ型（単独型）
### 基本のデータ型

- __単独型__ - `boolean` `number` `string`
- __集合体__ - `Array` `tuple` `enum`
- __不定形__ - `void` `null` `undefined` `any` `never`

__基本でないデータ型__  

基本でないデータ型とは、JavaScript由来のオブジェクトです.

### boolean型
```ts
// ex) boolean値を用いる
let swtichOne = true;
let switchTwo = false;
let resultStr: string;

if (switchOne && switchTwo) {
  resultStr = 'bright';
} else if (!switchOne && !switchTwo) {
  resultStr = 'dark';
} else {
  resultStr = 'a little dark';
}

document.body.innerHTML = resultStr;
```

### number型

- 小数または整数

```ts
// numbers を用いる
let numA = 3;
let numB = 11
let resultStr: string;
const add = '加算:';
const sub = '減算:';
const mul = '乗算:';
const div = '除算:';
const br = '<br>';

resultStr = add + (numA + numB) + br
          + sub + (numA - numB) + br
          + mul + (numA * numB) + br
          + div + (numA / numB);

document.body.innerHTML = resultStr;
```

```ts
// ex) 16進法
let numA = 0xAF;
let numB = 0x2B;

let resultStr: string;

const numAname = 'numA: ';
const numBname = 'numB: ';
const add = '加算: ';
const sub = '減算: ';
const br = '<br>';

resultStr = numAname + numA + br
          + numBname + numB + br
          + add + (numA + numB) + br
          + sub + (numA - numB);

document.body.innerHTML = resultStr;
```

### 文字列

```ts
// ex) 文字列
const br = '<br>';
let qtstr = '"おはよう"は英語で"Good morning"です';
let escpstr = "\"ありがとう\"は英語で\"Thank you\"です";

document.body.innerHTML = qtstr + br + escpstr;
```

__「式」の埋め込み__

```ts
document.body.innerHTML = `64の平方根は${Math.sqrt(64)}`;
```

## 3.3 基本のデータ型（集合型）

### 配列と繰り返し文

```ts
// ex) 配列の定義の仕方
let myArray = [120, 133, 1650, 166, 200];
```

```ts
// ex) 要素が数値である配列を定義
let rates: number[];
```

```ts
let rates:number[];
rates = [120, 133, 150, 166, 200];
document.body.innerHTML = rates.toString();
```

__要素を取り出す `for...of` 繰り返し

```
let rates = [120, 133, 150, 166, 200];
let resultStr = '種類は';
rates.push(233);

for (let rate of rates) {
  resultStr += rate + 'MHz, ';
}

let newStr = resultStr.substr(0, resultStr.length - 2);
document.body.innerHTML = newStr + 'です';
```

__インデックスで繰り返し__

```ts
// ex) インデックスで繰り返し
let monthnames = ['January', 'February', 'March', 'April'];
const br = '<br>';
let resultStr = '付きの名前は' + br;

for (let i = 0; i < monthnames.length; i++) {
  resultStr += `${i + 1}月が${monthnames[i]}` + br;
}

document.body.innerHTML = resultStr + 'です';
```

## タプル

__複数の要素の対応関係を示す目的__

タプルは配列の一種ですが、「xとy」「幅と高さ」「名前と成績」のように、関係する複数の要素の値を示す目的でよく使われます.
そのため、異なるデータ型の要素を置くことができます.

```ts
// ex) タプルの型定義
let mytuple = [string, number];

// ex) これでも「型」が定義されたことになる
let result = ['英文法', 90];

result[0] = '英作文';

document.body.innerHTML = `${result[0]}は${result[1]}点`;
```

### 列挙型

__「フラグ」を手早く変数で表す__

```ts
// ex) 列挙型を用いない場合:
const SS = 1;
const S = 2;
const M = 3;
const L = 4;
const LL = 5;
```

```ts
// ex) 列挙型
enum size { SS, S, M, L, LL };
```
このようにして,「実際に割り当てられている数値はいくつか」を気にせず, 変数名だけで違いを表せるのが, 列挙型のいいところです.

```ts
// ex) enum
enum Size { SS, S, M, L, LL };

let sizeStr: string;
let theSize = Size[Size.L];

switch(theSize) {
  case Size[Size.SS]:
    sizeStr = 'とても可愛いですね';
    break;
  case Size[Size.S]:
    sizeStr = '控えめですね';
    break;
   case Size[Size.M]:
    sizeStr = '汎用型ですね';
    break;
   case Size[Size.L]:
    sizeStr = '思い切りましたね';
    break;
   case Size[Size.LL]:
    sizeStr = '堂々としたものです';
    break;
   default: 
    break;
}

document.body.innerHTML = sizeStr;
```

## 3.4 基本のデータ型（不定型）

__void型__

- 関数やメソッドで戻す値

__null型__

- 「値がない」
- 「その引数に値を渡さない」
- 「値がないという答えを戻す」

ことを積極的に示すために用います

__undefined型__

- 未定義

__any__

- any という型は「どんなデータ型でもいい」という寛容なデータ型です
- JavaScriptオブジェクトを使うとき, HTMLElement の代わりに any としておくのがむしろいい判断でしょう.

```ts
let showhere: any;

showhere = document.body;
showhere.innerHTML = 'JavaScript のオブジェクトもこのように';
```

- どんな型でも仮定できる

__never__

- 「例外処理」のメソッドが返す, 決して受け取られないデータ型

このデータ型の値は, 決して他の変数やメソッドが受け取るkとはありません.  
「例外処理」の目的は, 「アプリの終了」だからです.
