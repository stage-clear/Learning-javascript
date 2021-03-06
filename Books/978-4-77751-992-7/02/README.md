# 「VSCode」で「TypeScript」

## 2.1 プロジェクトフォルダ
## 2.2 最初の「TypeScript」
クラスの宣言
```typescript
class Dog {

}
```

変数の定義
```typescript
class Dog {
  name: string; // <-
}
```

コンストラクタ
```typescript
class Dog {
  constructor(name: string) {
    this.name = name;
  }
}
```

メソッド
```typescript
class Dog {
  sayHello() {
    retrn this.name + ' bow!';
  }
}
```

クラスからオブジェクトを作成
```typescript
let shiro = new Dog('Shiro');
```

オブジェクトがメソッドを呼び出す
```typescript
document.body.innerHTML = shiro.sayHello();
```

- JavaScript と併記できる

## 2.3 「TypeScript」を「JavaScript」に変換

### 「VSCode」のタスクファイル
__`task.json` の作成__

1. `Shift + Command + P`
2. 「task」 と入力
3. 「タスク: タスクランナーの構成」を選択
4. 「TypeScript-tsconfig.json」を選択

タスクの実行 __ショートカットで実行__  

- `Shift + Command + B`

## 2.4 「TypeScript」のプロジェクトを再利用

## 2.5 作られた「JavaScript」
- 少し難しい JavaScript になっている
