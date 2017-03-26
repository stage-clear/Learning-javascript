# 「VSCode」で「TypeScript」

## 2.1 プロジェクトフォルダ
## 2.2 最初の「TypeScript」
### クラスの宣言

```typescript
class Dog {

}
```

### 変数の定義

```typescript
class Dog {
  name: string; // <-
}
```

### コンストラクタ

```typescript
class Dog {
  constructor(name: string) {
    this.name = name;
  }
}
```

### メソッド

```typescript
class Dog {
  sayHello() {
    retrn this.name + ' bow!';
  }
}
```

### トップレベル
#### クラスからオブジェクトを作成

```typescript
let shiro = new Dog('Shiro');
```

#### オブジェクトがメソッドを呼び出す

```typescript
document.body.innerHTML = shiro.sayHello();
```

### JavaScript と併記できる

## 2.3 「TypeScript」を「JavaScript」に変換

### 「」:
