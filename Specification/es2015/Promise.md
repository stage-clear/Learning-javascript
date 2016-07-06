# Promise
## base
- `Promise` オブジェクトを `Promise` コンストラクタで生成する
- コンストラクタの引数には `resolve` と `reject` が渡される
- `resolve()` を実行すると `.then(callback)` で登録したコールバック関数が実行される
- `reject()` を実行すると `.catch(callback)` で登録したコールバック関数が実行される

```js
// Promise による非同期処理の定義
function wait(time) {
  // Promiseオブジェクトの作成
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve すると最初の then が呼ばれる
      resolve('wait: ' + time);
    });
  });
}

// Promise の実行
// then で次に実行する処理の登録
wait(1000)
  .then(value => {
    console.log(1, value);//=> 1 wait: 1000
  })
  .then(value => {
    // value は引き継がれない
    console.log(2, value);//=> 2 '         '
  });
```

### resolve と reject
`Promise#resolve` は、Promise オブジェクトを生成してすぐに resolve する

```js
Prmoise.resolve(10);
// ↑ と ↓ は等価
new Promise(resolve => resolve(10));

// * Promise#reject も同様
```

### Prmose のネスト
`then()` で登録したコールバック関数が Promise オブジェクトを返した場合、その Promise オブジェクトが完了するまで外側の Promise が処理を持ってくれる

```js
Prmise.resolve().then(() => {
  return wait(1000).then(() => {
    return getUrl('/items');
  });
}).then(res => {
  // getUrl()の結果が渡される
  console.log(res);
});
```

## Promise.all
- すべてが完了したらコールバック関数を呼ぶ
- 復数の Promise オブジェクトを配列で渡す
- 渡された Prmise は同時平行でリクエストを投げる

```js
// Promise.al
Promise.all([
  getUrl('/foo'), getUrl('/bar')
]).then(res => {
  // '/foo' のレスポンス
  console.log(res[0]);
  // '/bar' のレスポンス
  console.log(res[1]);
}).catch(e => {
  // どちらかでエラーが発生したら呼ばれる
  console.error(e);
});
```

## その他の例
### Promise

```js
var promise = new Promise((resolve, reject) => {
  
  // Making an ajax call
  $.ajax({
    url: 'https://api.github.com/users/super-true'
    method: 'get'
  })
  .success((response) => {
    resolve(response);
  })
  .error((error) => {
    reject(error);
  });
});

// Then callback to listen to resolve or rejected state
promise.then(
  (response) => {
    console.log('Success -->', response);
  },
  // reject callback
  (error) => {
    console.log('Error -->', error);
  })
.catch((e) => {
  console.log(e);
});
```

### Promise.all

```js
var promise = Promise.all([1,2,3,4,5]);

promise.then((response) => {
  response.forEach((value) => {
    console.log(value);
  });
}, (error) => {
  console.log('Error -->', error);
})
.catch((e) => {
  console.log(e);
});

```

## Links
- [JavaScript goes to Asynchronous city](http://blogs.msdn.com/b/eternalcoding/archive/2015/09/30/javascript-goes-to-asynchronous-city.aspx)
- [Promise-cookbook](https://github.com/mattdesl/promise-cookbook)
- [Promise Patterns & Anti-Patterns](http://www.datchley.name/promise-patterns-anti-patterns/)
- [A BASIC GUIDE TO THE FETCH API](http://deanhume.com/Home/BlogPost/a-basic-guide-to-the-fetch-api/10129)

## Polyfills
- [es6-promise](https://github.com/jakearchibald/es6-promise)
- [Bluebird](https://github.com/petkaantonov/bluebird)
- [promise-each](https://github.com/yoshuawuyts/promise-each) - `bluebird.each` と同等
