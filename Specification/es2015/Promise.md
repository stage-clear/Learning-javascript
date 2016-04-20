Promise
=========

基本
----

- Promise オブジェクトを Promise コンストラクタで生成する
- コンストラクタの引数には `resolve` と `reject` が渡される
- `resolve()` を実行すると `.then(callback)` で登録したコールバック関数が実行される
- `reject()` を実行すると `.catch(callback)` で登録したコールバック関数が実行される


```javascript
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
wait(1000).then(value => {
  console.log(1, value);//=> 1 wait: 1000
}).then(value => {
  // value は引き継がれない
  console.log(2, value);//=> 2 '         '
});
```

__resolve と reject__

`Promise#resolve` は、Promise オブジェクトを生成してすぐに resolve する

```javascript
Prmoise.resolve(10);
// ↑ と ↓ は等価
new Promise(resolve => resolve(10));

// * Promise#reject も同様
```

__Prmose のネスト__

`then()` で登録したコールバック関数が Promise オブジェクトを返した場合、その Promise オブジェクトが完了するまで外側の Promise が処理を持ってくれる

```javascript
Prmise.resolve().then(() => {
  return wait(1000).then(() => {
    return getUrl('/items');
  });
}).then(res => {
  // getUrl()の結果が渡される
  console.log(res);
});
```



Promise.all
------------

- すべてが完了したらコールバック関数を呼ぶ
- 復数の Promise オブジェクトを配列で渡す
- 渡された Prmise は同時平行でリクエストを投げる


```javascript
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


その他の例
----------

__Promise__

```javascript
var promise = new Promise(function(resolve, reject) {
  
  // Making an ajax call
  $.ajax({
    url: 'https://api.github.com/users/super-true'
    method: 'get'
  })
  .success(function(response) {
    resolve(response);
  })
  .error(function(error) {
    reject(error);
  });
});

// Then callback to listen to resolve or rejected state
promise.then(
  function(response) {
    console.log('Success -->', response);
  },
  // reject callback
  function(error) {
    console.log('Error -->', error);
  })
.catch(function(e) {
  console.log(e);
});
```

__Promise.all__

```javascript
var promise = Promise.all([1,2,3,4,5]);

promise.then(function(response) {
  response.forEach(function(value) {
    console.log(value);
  });
}, function(error) {
  console.log('Error -->', error);
})
.catch(function(e) {
  console.log(e);
});

```

リンク
------

- [JavaScript goes to Asynchronous city](http://blogs.msdn.com/b/eternalcoding/archive/2015/09/30/javascript-goes-to-asynchronous-city.aspx)
- [Promise-cookbook](https://github.com/mattdesl/promise-cookbook)
- [Promise Patterns & Anti-Patterns](http://www.datchley.name/promise-patterns-anti-patterns/)
- [A BASIC GUIDE TO THE FETCH API](http://deanhume.com/Home/BlogPost/a-basic-guide-to-the-fetch-api/10129)


ポリフィル
------

- [es6-promise](https://github.com/jakearchibald/es6-promise)
- [Bluebird](https://github.com/petkaantonov/bluebird)
 - [promise-each](https://github.com/yoshuawuyts/promise-each) - `bluebird.each` と同等
