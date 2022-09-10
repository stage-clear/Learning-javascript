# 4. コンポーネント開発
## 4.1 Atomic Designによるコンポーネント設計
### 4.1.1 Presentational Component と Container Component
#### Presentational Component

**リスト 4.1 Presentational Component**
```ts
import './styles.css'

type ButtonProps = {
  label: string
  text: string
  disabled: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

// ラベルとボタンを表示するコンポーネント
export const Button = (props: ButtonProps) => {
  const { label, text, disabled, onClick } = props
  
  // propsで渡されたデータを元に見た目を実装する
  return (
    <div className="button-container">
      <span>{label}</span>
      <button disabled={disabled} onClick={onClick}>
        {text}
      </button>
    </div>
  )
}
```

#### Container Component

**リスト 4.2 Container Component**
```ts
import { useState, useCallback } from 'react'
import { Button } from './button'

// ポップアップを表示するためのフック
const usePopup = () => {
  // 与えられたテキストを表示するポップアップを出現させる関数
  const cb = useCallback((text: string) => {
    prompt(text)
  }, [])

  return cb
}

type CountButtonProps = {
  label: string
  maximum: number
}

// クリックされた回数を表示するボタンを表示するコンポーネント
export const CountButton = (props: CountButtonProps) => {
  const { labe, maximum } = props
  
  // アラートを表示させるためのフックを使う
  const displayPopup = usePopup()
  // カウントを保持する状態を定義する
  const @count, setCount] = useState(0)
  
  // ボタンが押された時の挙動を定義する
  const onClick = useCallback(() => {
    // カウントを更新する
    const newCount = count + 1
    setCount(newCount)
    
    if (newCount >= maximum) {
      // アラートを出す
      displayPopup(`You've clicked ${newCount} times`)
    }
  }, [count, maximum])
  
  // 状態を元に表示に必要なデータを求める
  const disabled = count >= maximum
  const text = disabled
    ? 'Can\'t click any more'
    : `You've clicked ${count} times`
  
  // Presentational Component を返す
  return (
    <Button disabled={disabled} onClick={onClick} label={label} text={text} />
  )
}
```

Container Componentが親としてビジネスロジックを担い、子のPresentational Componentは親から渡されたpropsをもとに表示のみを担います。

### 4.1.2 Atomic Design
|階層名|説明|例|
|:-|:-|:-|
|Atoms|最小の要素。これ以上分解できない|ボタン、テキスト|
|Molecules|複数のAtomsを組み合わせて構築|ラベル付きのテキストボックス|
|Organisms|Moleculesよりもより具体的な要素|入力フォーム|
|Templates|ページ全体のレイアウト|ページのレイアウト|
|Pages|ページそのもの|ぺーじそのもの|

### 4.1.3 Atoms

### 4.1.4 Molecules

### 4.1.5 Organisms

### 4.1.6 Templates

### 4.1.7 Pages
レイアウトは Templates で実装しているので、ここでは状態の管理、router関係の管理、APIコールなどの副作用の実行、Contextに値を渡すなど振る舞いに関するものを実装します。

## 4.2 Styled-componentsによるスタイル実装
styled-componentsは CSS in JSと呼ばれるライブラリの1つで、名前の通り JavaScript 内に CSS を効率よく書くためのものです。




