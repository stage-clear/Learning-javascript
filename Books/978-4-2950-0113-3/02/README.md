# 第２章

### 2.2.4 レンズを使ってオブジェクトグラフを操作

```js
set lastname (lastname) {
  return new Person(this._firstname, lastname, this._ssn)
}
```
⚠️ ドメインモデル内のすべての型のすべてのプロパティにセッター関数を実装することを思い浮かべてみると、ひどい方法であることが理解できると思います。

**関数参照**とも呼ばれる**レンズ**は、状態を持つデータ型の属性を不変的にアクセスし操作できる関数型プログラミングのソリューションです。

レンズを自分で実装する必要はありません。関数型JavaScriptライブラリRamdaの実装を利用できます。

```js
var person = new Person('Alonzo', 'Church', '444-4444-44')
const lastnameLens = R.lensProp('lastname')

// R.viewにより、このプロパティを読み込むことができます
R.view(lastnameLens, person)
//-> 'Church'
```

`get lastname()`ゲッターメソッドと類似しています。
それでは、セッターはどうでしょうか。こちらには魔法がかけられています。
`R.set`を呼び出すと、新たな値を持ったオブジェクトの新たなコピーを返し、元のインスタンス状態を保持します。

```js
var newPerson = R.set(lastnameLens, 'Mourning', person)
newPerson.lastname //-> 'Mourning'
person.lastname //-> 'Church'
```

レンズは、オブジェクト操作の邪魔にならない控えめな機能を与えてくれる点で価値あるものです。

```js
person.address = new Address(
  'US', 'NJ', 'Princeton', zipCode('08544', '1234'),
  'Alexander St.')
```

`address.zip`プロパティにアクセスするレンズを生成します。

```js
var zipPath = ['adress', 'zip']
var zipLens = R.lens(R.path(zipPath), R.assocPath(zipPath))
R.view(zipLens, person)
//-> zipCode('08544', '1234')
```
```js
var newPerson = R.set(zipLens, zipCode('90110', '5678'), person)
var newZip = R.view(zipLens, newPerson)
//-> zipCode('90210', '5678')
var originalZip = R.view(zipLens, person)
//-> zipCode('08544', '1234')
newZip.toStrint() !== originalZip.toString() //-> true
```

