# コンポーネント

## コンポーネントとは

## React でのコンポーネントの作り方

```js
// React でコンポーネントを定義したところ
function greeting (props) {
  return <h1>{props.type}</h1>
}
```

```js
// Greeting コンポーネントを利用する
const dom = <div>
  <Greeting type="Godd morning!" />
  <Greeting type="Hello!" />
  <Greeting type="Good afternoon!" />
</div>

// React で表示する
ReactDOM.render(dom, document.getElmentById('root'))
```

```js
<Greeting type="Hello" from="Mika">
// これは次のように, 関数 Greeting を呼び出しているのと同じ意味になります

Greeting({type: 'Hello', from: 'Mika'})
```

### 画像付きテキスト表示コンポーネント

- [cp-imagetext.html](cp-imagetext.html)

## もう少し複雑なコンポーネントの場合

- [cp-class.html](cp-class.html)

### クラスで画像付きコンポーネントを実装してみよう

- [cp-imagetext2.html](cp-imagetext2.html)

## リストコンポーネントを作ってみよう

- [list-items.html](list-item.html)

### コンポーネントのメリット
コンポーネントにしているおかげで、手軽にリストをいくつでも作成できますし、
items属性を書き換えるだけで、異なるリストを作成することができます。

## アロー関数でコンポーネントを定義

```js
const TestCompo = (props) => {
  <div>
    <h1>{props.title}</h1>
  </div>
}
```

- [cp-arrow.html](cp-arrow.html)
