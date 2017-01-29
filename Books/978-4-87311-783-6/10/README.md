# マップとセット

## 10.1 Map
ES2015より前は, キーと値の間の対応関係が必要な場合, オブジェクトを利用していましたが,
いくつか問題がありました.

- オブジェクトにはプロトタイプがあるため, 意図しないマッピングが生じる危険性がある
- オブジェクトではキーと値の組がいくつあるのか簡単にわからない
- キーは文字列あるいはシンボルに限られる. このためオブジェクトをキーとして値と対応づけることができない

Map 上のような問題はありません.

- `set` - キーに値を設定
- `get` - キーから値を取得
- `has` - キーがあるかどうか
- `size` - キーと値の組がいくつあるか

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

`size` で何組の対応があるかがわかります.

```js
console.log(userRules.size) // 3
```

- `keys` - マップ内の全てのキーを取得
- `values` - 全ての値を取得
- `entries` - すべてのエントリーを取得

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

```js
userRoles.clear()
console.log(userRoles.size) // 0
console.log([...userRoles]) // []
```

## 10.2 WeakMap

Map と次の点が異なります.

- キーはオブジェクトでなければならない
- キーがガベージコレクションの対象になる
- イテレーションしたりクリアしたりできない

```js
const SecretHolder = (function() {
  const secrets = new WeakMap()
  return class {
    setSecret(secret) {
      secrets.set(this, secret)
    }
    getSecret() {
      return secrets.get(this)
    }
  }
})()
```

1. WeakMap を IIFE の中に入れています(それを利用するクラスも一緒です).
2. IIFE の外で `SecretHolder` というクラスを利用できます
3. このインスタンスに秘密を保管することができます
4. 秘密をセットするには `setSecret` を使うしか方法がありません
5. 取得するには `getSecret` を使います

```js
cosnt a = new SecretHolder()
const b = new SecretHolder()

a.setSecret('Secret A')
b.setSecret('Secret B')

console.log(a.getSecret()) // 'Secret A'
console.log(b.getSecret()) // 'Secret B'
```

マップを使うこともできますが, そうすると `SecretHolder` のインスタンスに渡す秘密はガベージコレクションの対象にならなくなります.

## 10.3 Set
Set はデータの集まりですが, 重複は許されません(数学的な意味の「集合」と同じです).

```js
const roles = new Set()

roles.add('User')
consoel.log(roles) // Set { 'User' }

roles.add('Admin')
console.log(roles) // Set { 'User', 'Admin' }

console.log(roles.size) // 2
```

追加する前に, 既に追加されてしまっているかを確認する方法はありません.

削除するには `delete` を呼び出します.

```js
console.log(roles.delete('Admin')) // true
console.log(roles) // Set { 'User' }
console.log(roles.delete('Admin')) // false
```

## 10.4 WeakSet
WeakSet はオブジェクトだけを含むことができる Set で, オブジェクトがガベージコレクションの対象となる可能性があります.

```js
const naughty = new WeakSet()

const children = [
  { name: 'kazu' },
  { name: 'tetsu' }
]

naughty.add(children[1])

for (let child of children) {
  if (naughty.has(child)) {
    console.log(`${child.name} 石炭をあげる`)
  } else {
    console.log(`${child.name} プレゼントをあげる`)
  }
}
```
