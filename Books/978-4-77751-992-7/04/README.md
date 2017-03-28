# インターフェイスとクラス
## インターフェイスとは
```ts
// 4-1 JavaScriptで呼ぶオブジェクト
var jane = {
  firstName: 'Jane',
  lastName: 'Allman',
  age: 18
};

var mile = {
  firstName: 'Michael',
  lastName: 'Sinclair',
  age: 25
};
```

```ts
// 4-2. JavaScriptでクラスの定義に似たもの
function Buddy(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}
```

## TypeScriptで定義するンターフェイス
### データエースのデータのように、構造さえあればいい場合
インターフェイスの使い方のひとつで, よくある「名前と年齢と住所などを属性に持つメンバデータ」などは, まさにそれです.

```ts
// 4-3. インターフェイス Member の定義
interface Member {
  firstName: string;
  lastName: string;
  age: number;
}
```:

