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
