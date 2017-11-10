# React におけるフォーム部品の扱い方

## テキストボックス (`input type='text'`)
input 要素の `value` プロパティに `state.value` を指定し,
`onChange` イベントで `state.value` を変更するようにします

- [parts/text.js](examples/parts/src/text.js)

## チェックボックス (`input type='checkbox'`)

- [parts/cbox.js](examples/parts/src/cbox.js)

## テキストアリア (textarea)

- [parts/textarea.js](examples/parts/src/textarea.js)

## ラジオボタン (`input type="radio"`)

- [parts/radio.js](examples/parts/src/radio.js)

## セレクトボックス (`select`)

- [parts/select.js](examples/parts/src/select.js)

## まとめ
- React ではフォーム部品の値は, React の状態(state)に保持するようにします
- React では, チェックボックスやラジオボックスなど, HTMLを JavaScript で操作する方法とは異なるアプローチで処理します
- 各パーツをコンポーネント化してしまうことで, それぞれの部品が扱いやすくなりいます

