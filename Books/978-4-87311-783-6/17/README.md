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
```

```js
const html = 'HTML with <a href="/one">one link</a>, and some JavaScript.'
const matches = html.match(/<area|<a|<link|<script|<source/ig)
console.log(matches)
```

## 17.7 正規表現のマッチングの限界
用途によって正規表現だけでは処理できずに, より強力な構文解析プログラムなどが必要になる場合があります.
正規表現が万能だとは思わないようにしましょう.

## 17.8 文字集合

```js
const beer99 = '99 bottles of beer on the wall ' + 
  'take 1 down and pass it around -- ' +
  '98 bottles of beer on the wall.'
const ml = beer99.match(/0|1|2|3|4|5|6|7|8|9/g)
```

```js
const m2 = beer99.match(/[0-9]/g)
console.log(m3)
```

```js
const m4 = beer99.match(/[-0-9a-z.]/ig)
const m5 = beer99.match(/[a-z.0-9-]/ig)

const m3String = JSON.stringify(m3)
const m4String = JSON.stringify(m4)
const m5String = JSON.stringify(m5)
console.log(m3String)
console.log(m3String === m4String) // true
console.log(m3String === m5String) // true
```

```js
const beer99 = '99 bottles of beer on the wall ' +
  'take 1 down and pass it aroung --' +
  '98 bottles of beer on the wall.'
const match = beer99.match(/[^ 0-9a-z]/g)
console.log(match)
```

`[ァ-ヴ]`でカタカナ文字(のほとんど), `[ぁ-ん]`でひらがな文字(のほとんど)とマッチさせることができます.

##  17.9 文字集合の略記法

- `\d` `[0-9]`
- `\D` `[^0-9]`:
- `\s` ホワイトスペース
- `\S` 非ホワイトスペース
- `\w` `[a-zA-Z_]`
- `\W` `[^a-zA-Z_]`

```js
const tShirts =
  'Small:     9\n' +
  'Medium:    9\n' +
  'Large:     9\n'
const numbers = tShirts.match(/:\s*[0-9]/g)
console.log(numbers)
```

```js
const phoneNumber1 = '(0269)99-9876'
const phoneNumber2 = '0269-99-9875'
console.log(phoneNumber1.replace(/\D/g, '')) //
console.log(phoneNumber2.replace(/\D/g, '')) //
```

```js
const field1 = '  X   '
const field2 = '　 \t   ' // 先頭に全角スペース
console.log(/\S/.test(field1)) // true
console.log(/\S/.test(field2)) // false
```

## 17.10 繰り返し

- `{n}`
- `{n,}`
- `{n,m}`
- `?`
- `*`
- `+`

## 17.11 メタ文字「.」とエスケープ
### 17.11.1 ワイルドカード
`[\s\S]`を利用する方法です. これは, すべてのホワイトスペースおよびホワイトスペース以外のすべての文字, つまりすべての文字にマッチします.

## 17.12 グループ化
グループ化`(...)`を使って指定しますが, キャプチャなしのブループは`(?:...)`のような指定します.

```js
const text = 'Visit oreilly.com today!'
const match = text.match(/[a-z0-9]+(?:\.com|\.org|\.edu)/ig)
console.log(match)
```

```js
const html = '<link rel="stylesheet" href="http://insecure.com/stuff.css">\n'
  + '<link rel="stylesheet" href="https://secure.com/securestuff.css">\n'
  + '<link rel="stylesheet" href="//anything.com/flexible.css">'
const matches = html.match(/(?:https?:)?\/\/[a-z0-9][a-z0-9.-]+[a^z0-9]+/ig)
console.log(matches)
```

## 17.13 最長マッチ, 最短マッチ

```js
const input = 'Regex pros know the difference between\n' +
  '<i>greedy</i> and <i>lazy</i> matching.'
const output = input.replace(/<i>(.*)<\/i>/, '<strong>$1</strong>')
console.log(output)
// Regex pros know the difference between
// <strong>greedy</i> and <i>lazy</strong> matching
// どん欲(greedy)なマッチング
```

`*?`として「最短マッチ(lazy matching)」にすることです.:
```js
const output2 = input.replace(/<i>(.*?)<\/i>/ig, '')
console.log(output2)
```

すべての繰り返しのメタ文字(`* + ? {n} {n,} {n,m}`)は, 後ろに`?`を付けて最短マッチにすることができます.
(ただし筆者は`*`と`+`にしか使ったことはありません)

## 17.14 後方参照
HTMLコードを処理していて `<img>`とそのalt属性だけをリストしたいとしましょう.

```js
const html = `<img alt='A "Simple" example'>` + `<img alt="Don't abuse it!">`
const imagaTags = html.match(/<img alt=(['"]).*?\1>/g)
for (let i = 0; imageTags && i < imageTags.length; i++) {
  console.log(imageTags[i])
}
```

`\1` が「後方参照」で, `(...)`で囲まれた1番目と同じものにマッチします.

## 17.15 グループの置換

HTMLコードで`<a>`からhref以外のすべての属性を取り除いて見ましょう.

```js
let html = '<a class="abc" hre="/www.xxx.yyy" id="lmn">xxxのサイト</a>'
html = html.replace(/<a .*?(href=".*?").*?>/, '<a $1>')
console.log(html)
```

```js
let html1 = `<a class='abc' href="/www.xxx.yyy">サイトxx</a>`
let html2 = `<a class='abc' href='/www.xxx.yyy'>サイトxx</a>`

r = html1.replace(/<a .*?(href=(["']).*?\2).*?>/, '<a $1>')
console.log(r)
r = html2.replace(/<a .*?(href=(["']).*?\2).*?>/, '<a $1>')
console.log(r)
```

今度はhref属性とclass属性を記憶することにしましょう.

```js
let html1 = `<a class='abc' id="s" href="/www.xx.yyy">サイトxx</a>`
r = html1.replace(/<a .*?(class(["']).*?\2) .*?(href=(["']).*?\4).*?>/, '<a $3 $1>')
console.log(r)
```
- `` $` `` - マッチしたものより前にあるものすべて
- `$&` - マッチしたもの
- `$'` - マッチしたものより後ろにあるものすべて

```js
const input = 'One two three'
let r = input.replace(/two/, '($`)')
console.log(r) // One (One ) three
r = input.replace(/\w+/g, '($&)')
console.log(r) // (One) (two) (three)
r = input.replace(/two/, "($')")
console.log(r) // One ( three) three
r = input.replace(/two/, "($$)")
console.log(r) // One ($) three
```

## 17.16 関数を用いた置換

```js
const html = 
  `<a class="foo" href="/foo" id="foo">Foo</a>\n` +
  `<A href='/foo' Class="foo">Foo</a>\n` + 
  `<a href="/foo">Foo</a>` + 
  `<a onclick="javascript:alert('foo')" href="/foo">Foo</a>`
```

1. `<a>`タグを認識する正規表現 `/<a\s+(.*?)>(.*?)<\/a>/`
2. `<a>`タグの属性を必要なものだけに整理する正規表現

```js
const html = `〇〇<a onclick="alert('!!')" class="cl1" href="/foo" id="id1">XXX</a>△△`
console.log(sanitizeATag(html))

function sanitizeATag(aTag) {
  const parts = aTag.match(/<a\s+(.*?)>(.*?)<\/a>/i)
  console.log(`parts[1]=${parts[1]}`)
  console.log(`parts[2]=${parts[2]}`)
  const attributes = parts[1].split(/\s+/)
  
  return '<a >' + 
    attributes
      .filter(attr => /^(?:class|id|href)[\s=]/i.test(attr))
      .join(' ')
      + '>'
      + parts[2]
      + '</a>'
}
```

```js
const html = `〇〇<a onclick="alert('!!')" class="cl1" href="/foo" id="id1">XXX</a>△△`

html.replace(/<a .*?>(.*?)<\/a>/ig, function(match, group1, offset, origin) {
  console.log(`<a>タグが${offset + 1}文字目から見つかった`)
  console.log(`リンク対象文字列は「${group1}」`)
  console.log(`元々の文字列は「${origin}」`)
  console.log(`マッチしたのは「${match}」`)
})
```

`String.prototype.replace` に渡す関数は次の引数を順に受け取ります.

- マッチした文字列すべて (`$&`に同じ)
- マッチしたグループ(グループ指定してある時)
- マッチした文字列のオフセット(0から始まる)
- 元の文字列(滅多に使われない)

```js
const html = `〇〇<a onclick="alert('!!')" class="cl1" href="/foo" id="id1">XXX</a>△△`

// すでに sanitizeATag はできているので replace の第2引数に渡します
const r = html.replace(/<a .*?<\/a>/ig, function() {
  return sanitizeATag(m)
})

// 無名関数を使わなくてもよい
const r = html.replace(/<a .*<\/a>/ig, sanitizeATag)
```

## 17.17 行頭や行末とのマッチング
メタ文字`^`は行頭にマッチし, `$`は行末にマッチします.

文字列を(改行を区切られた)複数行として扱いたい場合は, フラグ`m(multiline)` を使う必要があります.

## 17.18 英単語の境界マッチング
メタ文字に文字列中の文字が対応するわけではなく, メタ文字は境界を示すだけです.
英語などの言語の単語の境界を表すメタ文字 `\b` と, 反対の意味を表す `\B` も入力文字を消費しません.

```js
const inputs = [
  "john@doe.com",
  "john@doe.com is my email",
  "my email is john@doe.com",
  "use john@doe.com, my email",
  "my email:john@doe.com"
]

// メールアドレスと普通のテキストの間には必ず単語境界 \b があります.

const emailMatcher = /\b[a-z][a-z0-9._-]*@[a-z][a-z0-9]+\.[a-z]+(?:\.[a-z]+)\b/ig
const r = inputs.map(s => s.replace(emailMatcher))
console.log(r)
```

## 171.19 先読み
先読みは行頭・行末や単語の境界のメタ文字のように, 入力文字列を消費しません.

```js
function validPasword(p) {
  return /[A-Z]/.test(p) &&   // 大文字が含まれる
    /[0-9]/.test(p) &&        // 数字が含まれる
    /[a-z]/.test(p) &&        // 小文字が含まれる
    !/[^a-zA-Z0-9]/.test(p)   // それ以外の文字が含まれない
}

// これを一つの正規表現にまとめたいとしましょう.
// まず次の方法で試しますが、これはうまくいきません.
function validPassword(p) {
  return /[A-Z].*[0-9].*[a-z]/.test(p)
}
```

こういった場合に入力文字列を消費しない正規表現である「先読み(lookahead)」を利用できます.
JavaScriptにおいては, `(?=...)`のように指定します.「否定先読み」もあり, `(?!...)`は後ろに指定の表現が続かないものだけにマッチします.

```js
function validPassword(p) {
  return /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])^[a-zA-Z0-9]+$/.test(p)
}
```

## 17.20 正規表現の動的な生成
```js
const users = ["mary", "nick", "arthur", "sam", "yvette"]
const userRegex = new RegExp(`@(?:${users.join('|')\\b})`, 'g')
console.log(userRegex)

const text = 'User @arthur started the backup and 15:15, ' +
  'and @nick and @yvette restored it at 18:35'
console.log(text.match(userRegex))
```

`b`の前に, `\`を2つ使う必要があることに注意してください. ひとつ目の`\`は, 文字列中の2つ目の`\`をエスケープするものです.

## 17.21 まとめ

- [regular expressions 101](https://regex101.com/#javascript)

