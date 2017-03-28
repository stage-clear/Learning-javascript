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
```

### インターフェイスのデータ型を持つオブジェクト

```ts
// 4-4. Member 型の変数 jane
let jane = {
  firstName: 'ジェーン',
  lastName: 'オールマン',
  age: 18
}
```

```ts
// 4-5. Member 型であることを明記
let mike: Member = {
  age: 25,
  lastName: 'シンクレア',
  firstName: 'マイケル'
}
```

### オブジェクトから属性値を取り出す

```ts
// 4-6 Member 型のオブジェクトから属性値を出して比べる
let resultStr = jane.firstName + 'は' + mile.firstName;

if (jane.age > mike.age) {
  resultStr += 'より年上'
} else if (jane.age < mike.aage) {
  resultStr += 'より年下'
} else {
  resultStr += 'と同い年'
}
document.body.innerHTML = resultStr
```

## JavaScriptのオブジェクトを, TypeScriptのデータ型に

```ts
// 4-7. インターフェイス TypeScriptElement
interface TypeScriptElement {
  element: HTMLElement;
}
```

```ts
// 4-8. オブジェクト bodyElement を作成
let bodyElement: TypeScriptElement = { element: document.body };
```

```ts
// 4-9. JavaScript のオブジェクトが隠された
bodyElement.element.innerHTML = resultStr;
```

## TypeScriptの基本のデータ型を改良

```ts
// 4-10. インターフェイス NumberStrng の定義
interface numberString {
  string: string;
  number: number;
}
```

```ts
// 4-11 インターフェイス NumberString からオブジェクトを作成
let five: NumberString = { string: '5', number: 5 };
let six: NumberString = { string: '6', number: 6 };
```

```ts
// 4-12. インターフェイス NumberString の属性値を取り出す
const comma = ', ';
document.body.innerHTML = five.string + six.string + comma + (five.number + six.number);
```

# クラスが実装するためのインターフェイス

## クラス
### クラスの定義の基本
#### クラスとは

1. コンストラクタを記述し, `new` キーワードでオブジェクトを新規作成
2. メソッドを定義
3. 他のクラスを継承し, インターフェイスを実装

### インターフェイスを参照するクラスの例
#### インターフェイスのオブジェクトを作るメソッド

```ts
// 4-13. クラス MemberFactory の定義
class MemberFactory {
  createMember(firstName: string, lastName: string, age: number): Member {
    return {
      firstName: firstName,
      lastName: lastName,
      age: age
    }
  }
}
```

#### メソッドのシグニチャ
- シグニチャ(引数と戻り値の宣言)

#### メソッドの戻り値

#### オブジェクtの作成

```ts
// 4-14. 引数なしでオブジェクトを作成
let factory = new MemberFactory();
```

```ts
// 4-15. オブジェクト factory がメソッドを呼ぶ
let jane = factory.createMember('ジェーン', 'オールマン', 18);
let mike = factory.createMember('マイク', 'シンクレア', 19);
```

#### オブジェクトから属性値を取り出す

```ts
// 4-16. オブジェクト jane と mike から, 属性値を取り出す
const br = '<br>';
document.body.innerHTML = jane.firstName + 'さんは' + jane.age + '歳' + br + 
  mike.firstName + 'さんは' + make.age + '歳';
```

### インターフェイスを参照するクラスの例
#### インターフェイスの属性に関数を指定

```ts
// 4-17. インターフェイス Member にメソッドのシグニチャを加える
getMemberFullname(): string;
```

#### インターフェイスを実装する宣言
実装は `implements` で表します.

```ts
// 4-18. クラス NormalMember, インターフェイス Member
class NormalMember implements Member {
  // これから書いていく
}
```

#### 属性とコンストラクタ

```ts
// 4-19. 属性とコンストラクタ
class NormalMember implements Member {
  firstName: string;
  lastName: string;
  age: number;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}
```

#### メソッドの実装

```ts
// 4-20. メソッド getMemberFullName
class NormalMember implements Member {
  ...
  
  getMemberFullName(): string {
    return this.firstName + '・' + this.lastName + 'さん';
  }
}
```

#### オブジェクトを作って, メソッドを呼び出す

```ts
// 4-21 クラス NormalMember のオブジェクト jane
let jane = new NormalMember('ジェーン', 'オールマン', 18);
```

```ts
// オブジェクトがメソッドを呼び出し, 戻り値は変数に
let resultStr = '';
resultStr = jane.getMemberFullName();
```

```ts
// 4-23. いままで何度も出てきた
document.body.innerHTML = resultStr;
```

### 他のクラスを継承するクラス
#### 継承の宣言

```ts
// 4-24. 他のクラスを継承するクラスの宣言
class PremiumMember extends NormalMember {
  // ここにさらに書いていく
}
```

継承関係にある2つのクラスのうち, 継承元を **スーパークラス**, 継承したほうを **サブクラス** と呼びます

#### メソッドの再定義

```ts
class PremiumMember extends NormalMember {
  ...
  getMemberFullName():string {
    return super.getMemberFullName() + ' 毎度ありがとうございます';
  }
}
```

- `super` - スーパークラスのオブジェクトを仮定したもの

#### オブジェクトの作成と, メソッド呼び出し

```ts
// 4-26. PremimuMember クラスのオブジェクト mike
let mike = new PremiumMember('マイケル', 'シンクレア', 19);
```

```ts
// 4-27. mike が呼び出す getMemberFullName() の戻り値も加える
resultStr = jane.getMemberFullName() + '<br>' + mike.getMemberFullName();
```

### インターフェイスを引数にとるメソッド
#### NormalMember も PremiumMember も
NormalMember でも PremiumMember でもいいというときに, そのオブジェクトのデータ型を Member で表すことができます.

#### Member 型のデータを扱う MemberViewer

```ts
// 4-29 新しいクラス MemberViewer の定義
class MemberViewer {
  // これから定義していく
}
```

```ts
// 4-30. Member 型のオブジェクトを格納する配列
class MemberViewer {
  memberArray: Member[];
}
```

```ts
// 4-21 クラス MemberViewer のコンストラクタ
class MemberViewer {
  ...
  constructor() {
    this.memberArray = new Array();
  }
}
```

#### クラス MemberViewer のメソッド

__1. addMember __ 

```ts
// クラス MemberViewer のメソッド addMember
class MemberViewer {
  ...
  addMember(member: Member):void {
    this.memberArray.push(member);
  }
}
```

__2. showMembers__ 

```ts
class MemberViewer {
  ...
  showMembers():string {
    let showStr = '';
    const br = '<br>';
    for (let member of this.memberArray) {
      showStr += member.getMemberFullName() + br;
    }
    return showStr.substr(0, showStr.length - bt.length);
  }
}
```

#### クラス MemberViewer のオブジェクトを使ってみよう

```ts
let viewer = new MemberViewer();
viewer.addMember(new NormalMember('ジェーン', 'オールマン', 18));
viewer.addMember(new PremiumMember('マイク', 'シンクレア', 19));

let resultStr = '';
resultStr = viewer.showMember();
document.body.innerHTML = resultStr;
```

