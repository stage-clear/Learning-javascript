# React コンポーネントでAjax通信を使う
React には, Ajax 通有心の処理は実装されていないため, SuperAgent などのライブライrを使用します.

## Ajax 通信の使い方

### インストール

```bash
$ create-react-app sagent
$ cd sagent
# SuperAgent のインストール
$ npm install --save superagent
```

## SuperAgent の基本的な使い方

- [sagent/public/fruits.json](examples/sagent/public/fruits.json)

```bash
$ npm start
```

- [sagent/test-sagent.js](sagent/src/test-sagent.js)

### SuperAgent のいろいろな機能を確認しよう

```js
// GETメソッドを送信する際に URL パラメータを指定したい場合には, `query()` を呼び出します
const params = { q: 'search', uid: 00 }

request.get(URL)
  .query(params)
  .end(callback)

// リクエストを送信する際, ヘッダーに認証情報などをつけることが増えています
// ヘッダーに情報を与える場合には, `set()` を呼び出します
request.get(URL)
  .set('API-KEY', 'xxxxxx')
  .end(callback)

// POSTメソッドを送信する場合には, `get()` ではなく `post()` を呼び出します.
// この場合, `send()` でパラメータを指定します
request.post(URL)
  .set('Content-Type', 'application/json')
  .query({mode: 'save', userid: 100})
  .send({name: 'hoge', age: 21})
  .end(callback)

// URLパラメータを指定する場合には, `query()` を使い, 
// リクエスト本体にパラメータを指定する場合には `send()` を使います
// POST メソッドでも, URLパラメータとリクエスト本体の値を龍鳳指定する場合も多く,
// 両方を同時に指定することができるようになっています.
request.post(URL)
  .set('Content-Type', 'application/json')
  .query({name: 'save', userid: 100})
  .send({name: 'hoge', age: 21})
  .end(callback)
```

## React アプリで JSON を読んで選択ボックスに表示

- [sagent/App.js](examples/sagent/src/App.js)

`map()` メソッドを利用すれば, option 要素を手軽に生成できるのが, JSXの素晴らしい点です

```js
{
  ...
  const options = this.state.items.map(e => {
    return <option value={e.price} key={e.name}>
      {e.name}
    </option>
  })

  return (
    <div className='App'>
      果物: <select>{options}</select>
    </div>
  )
```

## まとめ
- Reace でも Ajax 通信を利用できます. ただし, React 自身には, Ajax 通信の機能はnaku, SuperAgent などの別途ライブラリを使用します
- SuperAgent を使うと, 手軽に非同期通信を利用できます
- コンポーネント内に表示するデータを非同期通信で読み込む場合, `componentWillMount()` に記述します
