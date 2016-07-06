# async/await
## async
非同期な処理を同期的に書くことができる

### basic
- `async` で宣言された関数は `Promise` オブジェクトを返します

```js
// 関数宣言で定義
async function func() {}

// 関数式で定義
func = async () => {};

obj = {
  async func() {}
};

console.log( func() ); // <Promise>
```

```js
async function func(flag) {
  if (flag) {
    return 'Yes';
  } else {
    throw 'No';
  }
}

func(true).then( v => console.log(v) );
func(false).catch( v => console.log(v) );
```

```js
// 返り値に Promise を返すとその解決値を持って
// async 関数が返す Promise は解決される
async function func() {
  return Promise.resolve(123);
}

func().then( v => console.log(v) );
```

## await 
await 式は p (Promise でなくても Promise としてラップされる)
が解決するまで待ってその解決式を結果として返す

### basic

```js
// Sミリ秒後に解決する Promise を返す関数
function delay(s) {
  return new Promise( ok => setTimeout(ok, s, `${s}ms later`) );
}

async function func() {
  console.log('start');
  let message = await delay(3000);
  console.log(message);
}

func();
```

```js
async function three() {
  for (var i = 0; i < 3; i++) {
    await func();
  }
}

three();
```

```js
async function start() {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log(`3000ms later`);
      return resolve();
    }, 3000);
  });
  
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log(`5000ms later`);
      resolve();
    }, 5000);
  });
  
  return `end`;
}

start().then((result) => {
  console.log(`${result}`);
});
```

## link

- [wycats/javascript-decorators](https://github.com/wycats/javascript-decorators)
- [async関数が実装された](http://js-next.hatenablog.com/entry/2016/05/19/131021)

