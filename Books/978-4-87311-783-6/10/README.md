# マップとセット

## 10.1 Map
ES2015より前は, キーと値の間の対応関係が必要な場合, オブジェクトを利用していましたが,
いくつか問題がありました.

- オブジェクトにはプロトタイプがあるため, 意図しないマッピングが生じる危険性がある
- オブジェクトではキーと値の組がいくつあるのか簡単にわからない
- キーは文字列あるいはシンボルに限られる. このためオブジェクトをキーとして値と対応づけることができない

Map 上のような問題はありません.

- set - キーに値を設定
- get - キーから値を取得
- has - キーがあるかどうか
- size - キーと値の組がいくつあるか

```js
const u1 = { name: 'kazu' }
const u2 = { name: 'hana' }
const u3 = { name: 'ryo' }
const u4 = { name: 'tetsu' }

const userRoles = new Map() // <-

userRoles
  .set(u1, 'User')
  .set(u2, 'User')
  .set(u3, 'Admin')
```

コンストラクタに「配列の配列」を渡してマップを初期化することもできます.

```js
const userRoles = new Map([
  [u1, 'User'],
  [u2, 'User'],
  [u3, 'Admin']
])
```

```js
userRoles.get(u2) // > "User"
```

```js
console.log(userRoles.has(u1)) // true
console.log(userRoles.get(u1)) // 'User'
console.log(userRoles.has(u4)) // false
console.log(userRoles.get(u4)) // undefined
```

Map に既に存在しているキーに対して `set` を行うと, 値が置換されます.

```js
console.log(userRoles.get(u1)) // 'User'
userRoles.set(u1, 'Admin')
console.log(userRoles.get(u1)) // 'Admin'
```

size で何組の対応があるかがわかります.

```js
console.log(userRules.size) // 3
```

- keys - マップ内の全てのキーを取得
- values - 全ての値を取得
- entries - すべてのエントリーを取得

この3つのメソッドは `for...of` で利用可能なオブジェクト(iterable)を返します.

```js
for (let u of userRoles.keys()) {
  console.log(u.name)
}

for (let r of userRoles.values()) {
  console.log(r)
}

for (let ur of userRoles.entries()) {
  console.log(`${ur[0].name}: ${ur[1]}`)
}

for (let [u, r] of userRoles.entries()) {
  console.log(`${u.name}: ${r}`)
}

// entries は Map のデフォルトイテレータなので, 次にように短くできる
for (let [u, r] of userRoles) {
  console.log(`${u.name}: ${r}`)
}
```

(イテレーション可能なオブジェクトではなく)配列が欲しい場合はスプレッド演算子が使えます.

```js
console.log(userRoles.values()) // MapIterator {...}
console.log([...userRoles]) // [...]
```

マップから1つの要素を削除するには `delete` を使います.

```js
userRoles.delete(u2)
console.log(userRoles.size) // 2
console.log([...userRoles]) // [...]
```

すべてのエントリを削除したい場合は `clear` を使います.

:
