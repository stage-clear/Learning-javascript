# 基本的なデータ型と制御文
## プログラムの実行順序

## 変数とデータ型の違い

```js
class Product {
  id: number;
  Name: string;
  ISBN10: string;
  ISBN13: string;
}

let item1 : Product = {
  id: 1,
  Name: 'チーム開発の教科書',
  ISBN10: '48xxxxxxxxx',
  ISBN13: '978-xxxxxxxxxxx'
}

let item2 : Product = {
  id: 2, 
  Name: 'はじめてのASP.net',
  ISBN10: 'xxxxxxxxx',
  ISBN13: 'xxx-xxxxxxxxxxx'
}
```

```js
// 4.12 表の値として同じデータ型が複数入れられる
let values : Array<number> = [1, 2, 3]

let products : Array<Product> = [
  {
    id: 1, 
    Name: 'チーム開発の教科書',
    ISBN10: 'xxxxxxxxxx',
    ISBN13: 'xxx-xxxxxxxxxxx'
  },
  {
    id: 2,
    Name: 'はじめてのASP.NET',
    ISBN10: 'xxxxxxxxxx',
    ISBN13: 'xxx-xxxxxxxxxx'
  }
]
```

```js
// 4.13 値を束ねる Tuple
let result : [number, number]

result - [6156, 2]
console.log(result[0])
```

配列はクラスを作るまでもなく, もっとシンプルにいくつかの値を「束ねたい」というだけであれば, Tuple（タプル）を使うのがオススメです.
Tuple を1つの変数に複数の値をいれることができますが, クラスと違って名前を付けて広範囲で使える新しい型を宣言するのではなく,
ごく限られた範囲で一時的に使用できる型の組み合わせを決めることができます.
