# Proxy
- Proxyは、引数に対象オブジェクトとハンドラオブジェクトを取る
- ハンドラオブジェクトでは、トラップしたい操作に対応するメソッドを定義する
  ハンドラに定義できるメソッドには `get` のほかに、プロパティ代入に対応する `set` 、 for/in ループに対応する `enumerate` 、関数実行に対応する `apply` など14個のメソッドがある
  - [ハンドラAPI](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## Proxy の基本

```js
// ハンドラオブジェクト
var handler = {
  // プロパティの取得をトラップするメソッド
  get(target, key, receiver) {
    // target: obj
    // receiver: proxy
    console.log('Proxy GET:', key);
    // ここで返した値がプロパティの値になる
    return target[key]
  }
};


// 対象オブジェクト
var obj = {foo: 1};

// Proxyオブジェクトの生成
var proxy = new Proxy(obj, handler);

console.log(proxy.foo);
//=> Proxy GET: foo
//=> 1

console.log(proxy.bar);
//=> Proxy GET: bar
//=> undefined
```

## Reference:
- [ES6 Proxy Traps in Depth](https://ponyfoo.com/articles/es6-proxy-traps-in-depth)
- [10 Use Cases for Proxy](http://dealwithjs.io/es6-features-10-use-cases-for-proxy/)

## Related:
- [Reflection](Reflection.md) - _リフレクション_
