Proxy
======

- Proxyは、引数に対象オブジェクトとハンドラオブジェクトを取る
- ハンドラオブジェクトでは、トラップしたい操作に対応するメソッドを定義する
  ハンドラに定義できるメソッドには `get` のほかに、プロパティ代入に対応する `set` 、 for/in ループに対応する `enumerate` 、関数実行に対応する `apply` など14個のメソッドがある
  - [ハンドラAPI](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy)




Proxy の基本
-------------

```javascript
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


Reflect
--------

オブジェクトのもとの挙動を再現するためのメソッドを持つ

```javascript
// ↑のリストを `Reflect` を使って書き換える
var handler = {
  get(target, key, receiver) {
    console.log('Proxy, GET: ', key);
    return Reflect.get(target, key, receiver);
  }
}
```

Reflect オブジェクトにはすべてのハンドラメソッドに対応するメソッドが定義されているため、
どのメソッドを使うときでも機会的にオリジナルの挙動を再現できる。


使用例) 実行時の型チェックに活用する
------------------------------------

```javascript
function createTypesSafeObject(obj) {
  return new Proxy(obj, {
    set(target, key, value, receiver) {
      var currentType = typeof target[key];
      var newType = typeof value;
      if (key in target && currentType !== newType) {
        throw new Error(`${key} requires a ${currentType}`);
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  });
}

var person = {
  name: 'Bob',
  age: 20
};

person = createTypeSafeObject(person);
person.name = 'Jhon';// OK
person.age = true;// ReferenceError: createTypeSefeObject is not defined
```


リンク
------

- [ES6 Proxy Traps in Depth](https://ponyfoo.com/articles/es6-proxy-traps-in-depth)
