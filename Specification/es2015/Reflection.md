# Reflection
オブジェクトのもとの挙動を再現するためのメソッドを持つ

```js
// [↑](./Proxy.md) のリストを `Reflect` を使って書き換える
var handler = {
  get(target, key, receiver) {
    console.log('Proxy, GET: ', key);
    return Reflect.get(target, key, receiver);
  }
}
```

`Reflect` オブジェクトにはすべてのハンドラメソッドに対応するメソッドが定義されているため、
どのメソッドを使うときでも機会的にオリジナルの挙動を再現できる。

## 例) 実行時の型チェックに活用する

```js
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
