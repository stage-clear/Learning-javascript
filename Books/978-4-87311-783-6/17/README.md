# 正規表現
## 17.1 単純なマッチングと置換
正規表現を使わずにできる, 単純なマッチングや置換について

- `String.prototype.starstWith` - 先頭にあるか
- `String.prototype.endsWith` - 終端にあるか
- `String.prototype.inclues` - 含むか
- `String.prototype.indexOf` - 何文字目から始まるか

```js
const input = 'As I was going to Saint Ives'
            /* 01234567891123456789212345678 */
console.log(input.startsWith('As')) // true
console.log(input.endsWith('Ives')) // true
console.log(input.startsWith('going', 9)) // true (9文字目から始るか)
console.log(input.endsWith('going', 14)) // true (14文字に制限したとき going で終わっているか)
console.log(input.includes('going')) // true
console.log(input.includes('going', 10)) // false (10文字目以降にあるか)
console.log(input.indexOf('going')) // 9 (goingは何文字目から始まっているか)
console.log(input.indexOf('going', 10)) // -1 (10文字目以降で何文字目か)
console.log(input.indexOf('nope')) // -1

// 大文字と小文字を区別しない比較
console.log(input.toLowerCase().startsWith('as')) // true
```

## 17.2 正規表現の生成

```js
const re1 = /going/
const re2 = new RegExp('going')
```

## 17.3 正規表現を用いた検索

```js
const input = 'As I was going to Saint Ives'
            // 01234567891123456789212345678
const re = /\w{3,}/ig

// 入力文字列のメソッド
console.log(input.match(re)) // ['was', 'going', 'Saint', 'Ives']
console.log(input.search(re)) // 5

// 正規表現のメソッド
console.log(re.test(input)) // true

let a = re.exec(input) // exec は文字位置を記憶する
console.log(a) // ['going', index: 9 ...]
console.log(a[0]) // going
console.log(a.index) // 9
console.log(a.input) // As I was going to Saing Ives
console.log(a[1]) // undefined

console.log(re.exec(input))
console.log(re.exec(input))
console.log(re.exec(input)) // null (もうマッチするものがない)

// 正規表現のリテラルを直接使うこともできる
console.log(input.match(/\w{3,}/ig))
console.log(input.match(/\w{3,}/i))
console.log(input.search(/\w{3,}/ig))
```
`RegExp.prototype.exec`がもっとも多くの情報を提供しますが, 実際に利用することはあまりなく,
`String.prototype.match` `RegExp.prototype.test` をよく使うことになるでしょう


## 17.4 正規表現を用いた置換

- `String.prototype.replace`

```js
const input = 'As I was going to Saint Ives'
const output = input.replace(/\w{4,}/ig, '****')
console.log(output)
```

## 17.5 入力文字列の「消費」
正規表現を「入力文字列を消費するためのパターン」と考えた方がわかりやすい場合があります.

正規表現が文字列を「消費する」ときに採用するアルゴリズムをまとめると次のようになります.

- 文字列は左から右に消費される
- 一旦, ある文字が消費されてしまったら, その文字に戻ることはない
- マッチするものがなければ, 正規表現は一度に１文字ずつ進んでマッチするものを探す
- マッチしたものがあれば, 正規表現はマッチした文字の全てを一度の消費し, その先の文字に進みマッチングを続ける

## 17.6 ORを表す正規表現

```js
const html = 'HTML with <a href="/one">one link</a>, and some JavaScript.' + '<script src="stuff.js"></script>'
const matches = html.match(/area|a|link|script|source/ig)
console.log(matches)
```]
