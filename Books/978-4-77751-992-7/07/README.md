# TypeScript で Webアプリ
## ボタンクリックで反応
### HTML+JavaScriptによる書き方
#### HTML単独の場合

```html
// 7-1 HTML文だけで記述
<body>
  <button onclick="alert('押しました')">
    押してください
  </button>
</body>
```

#### HTMLの構造を JavaScript で記述

```ts
// 画面にボタンを表示する JavaScript
var buttonelm = document.createElement('button')
var buttonText = document.createTextNode('押してください')
// ボタンを押したらどうなるかはまだ書かない
buttonelm.appendChild(buttonText)
document.body.appendChild(buttonelm)
```

#### 要素の属性 JavaScript で記述

```ts
// ボタンの onclick 属性を記述
buttonelm.onclick = function() {
  alert('押してください')
}
```

#### DOM を TypeScript で書いてみよう

### 最初の TypeScript でボタン
#### ButtonDOM というクラス

```ts
// 7-4 クラス ButtonDOM の定義
class ButtonDOM {
  elm:HTMLElement
  constructor(labelText:string) {
    this.elm = document.createElement('button')
    this.elm.appendChild(document.createTextNode(labelText))
    this.elm.onclick = function() {
      alert('押しました')
    }
  }
}
```

#### トップレベルの処理

```ts
// 7-5 トップレベルの処理(メソッド appendChild を用いた)
document.body.appendChild(new ButtonDOM('押してください').elm)
```

### メソッドの連続呼び出し
#### 自分自身をメソッドの戻り値とする

```ts
// 7-6 オブジェクトを作って戻すメソッド
class ButtonDOM {
  ...
  static create():ButtonDOM {
    let button = new ButtonDOM()
    button.elm = document.createElement('button')
    return button
  }
}
```

```ts
// 7-7 addLabel は自分自身を戻す
class ButtonDOM {
  ...
  addLabel(labelText:strng):ButtonDOM {
    this.elm.appendChild(document.createTextNode(labelText))
    return this
  }
}
```

```ts
class ButtonDOM {
  onClick(content:string):ButtonDOM {
    this.elm.onclick = function() {
      alert(content)
    }
    return this
  }
}
```

```ts
// 7-9 作ったオブジェクトにメソッドの連続処理
let myButton = ButtonDOM.create()
  .addLabel('押してください')
  .onClick('押しました')
```

#### VSCode の補完の利用

```ts
// 7-10 最終的に Web ページに表示させる処理
document.body.appendChild(myButton.elm)
```

### 異なる要素をサブクラスで表す
#### 要素 div に文字列を表示させる

```ts
// 7-11 web画面に応答を表示させる JavaScript
buttonelm.onclick = function() {
  var divelm = document.createElement('div')
  divelm.appendChild(document.createTextNode('押しました'))
  document.body.appendChild(divelm)
}
```

#### 異なる要素を表示させる

#### 基本となるクラス ElmDOM

```ts
class ElmDOM {
  elm:HTMLElement
  constructor(tagname:string) {
    this.elm = document.createElement(tagname)
  }
  // 他にさらに基本的なメソッドを加える
}
```

```ts
// 7-13 要素の中にテキストノードを加える
class ElmDOM {
  ...
  addText(textStr:string) {
    this.elm.appendChild(document.createTextNode(textStr))
  }
}
```

```ts
// 7-14 document.body に自分自身を加える
class ElmDOM {
  addToBody() {
    document.body.appendChild(this.elm)
  }
}
```

#### サブクラス DivDOM

```ts
// 7-15 サブクラス DivDOM の定義
class DivDOM extends ElmDOM {
  constructor(textStr?:string) {
    super('div')
    if (textStr) {
      this.addText(textStr)
    }
  }
}
```

#### サブクラス ButtonDOM

```ts
// 7-16 サブクラス ButtonDOM の定義とコンストラクタ
class ButtonDOM extends ElmDOM {
  constructor(labelStr:string) {
    super('button')
    this.addText(labelStr)
  }
}
```

```ts
// 7-17 ボタンをクリックすると div 要素を作成, 付加する
class ButtonDOM extends ElmDOM {
  ...
  onClickShowSomething(showStr:string) {
    this.elm.onclick = function() {
      new DivDOM(showStr).addToBody()
    }
  }
}
```

#### トップレベルの処理

```ts
// 7-18 トップレベルの処理
let bdom = new ButtonDOM('押してください')
bdom.onClickShowSomething('押しました')
bdom.addToBody()
```

## テーブル
### HTMLによる書き方
#### HTML単独の場合

```ts
// 7-19 HTMLで書くテーブル
<table>
  <tr><td>スズメ</td><td>チュンチュン</td><td>穀物</td></tr>
  <tr><td>ツバメ</td><td>チュルチュル</td><td>虫</td></tr>
  <tr><td>ニワトリ</td><td>コケコッコー</td><td>自分が...</td></tr>
  <tr><td>メジロ</td><td>チー</td><td>花蜜</td></tr>
</table>
```

### テーブルの行を描画
#### 要素の中にこ要素を

```ts
// 7-20 他のElmDOMオブジェクトを, 子要素にする
class ElmDOM {
  ...
  addChild(elmDOM:ElmDOM) {
    this.elm.appendChild(elmDOM.elm)
  }
}
```

#### クラス TableRowDOM

```ts
// 7-21 クラス TableRowDOM の定義とコンストラクタ
class TableRowDOM extends ElmDOM {
  constructor() {
    super('tr')
  }
  // セルを加えるメソッドを定義していく
}
```

#### セルを増やす

```ts
// 7-22 メソッド addCol
class TableRowDOM extends ElmDOM {
  ...
  addCol(content:string) {
    let td = new ElmDOM('td')
    td.addText(content)
    this.addChild(td) // 自分の子要素
  }
}
```

#### 配列から1行作る

```ts
// 7-23 static なメソッド, createFromArray
class TableRowDOM extends ElmDOM {
  ...
  static createFromArray(array:Array<string>):TableRowDOM {
    let theRow = new TableRowDOM()
    for (let cellval of array) {
      theRow.addCol(cellval)
    }
    return theRow
  }
}
```

### テーブルという要素のオブジェクト
#### クラス TableDOM

```ts
// 7-24 クラス TableDOM の定義
class TableDOM extends ElmDOM {
  constructor() {
    super('table')
  }
  addTableRow(row:TableRowDOM) {
    this.addChild(row)
  }
}
```

#### トップレベルでテーブルを作る

```ts
// 7-25 トップレベルの処理. データの記述
let birdTableData = [
  ['スズメ', 'チュンチュン', '穀物'],
  ['ツバメ', 'チュピチュピ', '虫'],
  ['ニワトリ', 'コケコッコー', '自分が...'],
  ['メジロ', 'チー', '花蜜']
]
```

```ts
// 7-26 データを読み込んで表を描画する
let birdTable = new TableDOM()
for (let row of birdTableData) {
  birdTable.addTableRow(TableRowDOM.createFromArray(row))
}
birdTable.addBody()
```

## 一覧から選択
### ラジオボタンを機能させる
#### HTML+JavaScriptの場合

```html
// 7-27 サーバに送信せず動作させるラジオボタン
<input type="radio" name="when" value="朝" onclick="onSelectRadio(this.value)">朝
<input type="radio" name="when" value="昼" onclick="onSelectRadio(this.value)">昼
<input type="radio" name="when" value="晩" onclick="onSelectRadio(this.value)">晩
```

```ts
// 7-28 ラジオボタンをクリックした時に呼び出される関数
function onSelectRadio(value) {
  document.getElementById('showhere').innerHTML = value + 'に服用されますか'
}
```

### 準備
#### メソッド setAttribute

```ts
// 7-29 メソッド setAttribute
class ElmDOM {
  ...
  setAttribute(attr:strng, value:string) {
    this.elm.setAttribute(attr, value)
  }
}
```

#### 新しいテキストで置き換える

```ts
// 7-30 要素の中身を新しいテキストで置き換える
class ElmDOM {
  ...
  newText(textStr:string) {
    this.elm.innerHTML = textStr
  }
}
```

#### クラス DivDOM の定義

### ラジオボタンを記述するクラス
#### クラス RadioButtonDOM の属性

```ts
// 7-31 クラス RadioButtonDOM の定義とその属性
class RadioButtonDOM extends ElmDOM {
  value:string
  valueText:string
  
  // メソッドなどを定義していく
}
```

#### コンストラクタ

```ts
// 7-32 クラスRadioButtonDOM のコンストラクタ
class RadioButtonDOM extends ElmDOM {
  ...
  constructor(value:string, valueText:string) {
    super('input')
    this.setAttribute('type', 'radio')
    this.setAttribute('value', value)
    this.value = value // 保持もしておく
    this.valueText = valueText // 保持しておく
  }
}
```

#### クリックしたときのメソッド

```ts
// 7-33 メソッド onClickShowValue
class RadioButtonDOM extends ElmDOM {
  ...
  onClickShowValue(divDOM:DivDOM, str:string) {
    this.elm.onclick = function() {
      divDOM.newText(str) // 中身を str で置き換える
    }
  }
}
```

### ラジオボタンのグループを記述するクラス
#### ラジグループの正体は, 要素 div

```ts
// 7-34 クラス RadioButtonGroup の定義と属性
class RadioGroup extends DivDOM {
  groupname:string
  showValueString:string
  radiodiv:DivDOM
  showdiv:DivDOM
  // メソッドなどを定義する
}
```

#### コンストラクタで div に子 div を配置

```ts
// 7-35 クラス RadioGroup のコンストラクタ
class RadioGroup extends DivDOM {
  ...
  constructor(groupname:string, showValueString:string) {
    super()
    this.groupname = groupname
    this.showValueString = showValueString
    this.radiodiv = new DivDOM()
    this.addChild(this.radiodiv) // 上側に配置
    this.showdiv = new DivDOM()
    this.addChild(this.showdiv) // 下側に配置
  }
}
```

#### ラジオボタンをラジオグループに配置

```ts
// 7-36 ラジオボタンの属性 name に, 一定値を与える
class RadioGroup extends divDOM {
  ...
  addRadio(rDom:RadioButtonDOM):RadioGroup {
    rDom.setAttribute('name', this.groupname)
  }
}
```

#### ラジオボタンを押したとき

```ts
// 7-37 ラジオボタンの onClickShowValue を呼び出す
class RadioGroup extends DivDOM {
  ...
  addRadio(rDom:RadioButtonDOM):RadioGroup {
    ...
    rDom.onClickShowValue(
      this.showdiv, // RadioGroup の中の要素 div に書き出す
      rDom.value + this.showValueString // これが書き出す内容
    )   
  }
}
```

```ts
// 7-38 ラジオボタンを領域におく
class RadioGroup extends DivDOM {
  ...
  addRadio(rDom:RadioButtonDOM):RadioGroup {
    ...
    this.radiodiv.addChild(rDom)
  }
}
```

```ts
// 7-39 同じ領域にラジオボタンの説明テキストを置く
class RadioGroup extends DivDOM {
  ...
  addRadio(rDom:RadioButtonDOM):RadioGroup {
    ...
    this.radiodiv.addText(rDom.valueText)
  }
}
```

#### メソッド addRadio を連続的に

```ts
// 7-40 自分自身を戻すメソッド addRadio にする
addRadio(rDom:RadioButtonDOM):RadioGroup {
  // ...これまでの処理
  return this
}
```

### トップレベルの処理
#### ラジオグループのオブジェクトを作成

```ts
// 7-41 RadioGroup のオブジェクト, drugGroup を作成
let drugGroup = new RadioGroup('when', 'に服用されますか')
```

#### ラジオグループにラジオボタンを追加

```ts
// 7-42 連続処理でラジオボタンを配置
drugGroup.addRadio(new RadioButtonDOM('朝', '朝'))
  .addRadio(new RadioButtonDOM('昼', '昼'))
  .addRadio(new RadioButtonDOM('晩', '晩'))

drugGroup.addToBody() // 画面に置く
```

## スタイルとアニメーション
### HTML+CSS+JavaScriptによる書き方
#### 少しだけスタイルを変えたとき

```ts
// 7-43 属性 style を設定
myDiv.setAttribute('style', 'padding: 10px;')
```

```ts
// 7-44 属性 style の内容を追加
var styleStr = myDiv.style.cssText
myDiv.setAttribute('style', styleStr + 'color:red')
```

### ラジオボタンの応答文に余白をつける

```ts
// 7-45 クラス RadioGroup の属性, showdiv のスタイル
this.showdiv = new DivDOM()

// これを付加
this.showdiv.setAttribute('style', 'padding: 10px;')

this.addChild(this.showdiv)
```

### テーブルのスタイルを整える
#### クラス StyleSetter を作成

```ts
// 7-46 クラス StyleSetter を定義する
class StyleSetter {
  // メソッドを書いていく
}
```

#### スタイル文を作るメソッド

```ts
class StyleSetter {
  static createStyle(name:string, value:strng):string {
    return `${name}: ${value};`
  }
}
```

#### スタイル文を設定するメソッド

```ts
// 7-48 style 属性を追加するメソッド createStyle
class StyleSetter {
  ...
  static setStyle(eDOM:ElmDOM, name:string, value:string) {
    let styleStr = ''
    if (eDOM.elm.style) {
      styleStr = eDOM.elm.style.cssText
    }
    eDOM.elm.setAttribute('style',
      styleStr + this.createStyle(name, value)
    )
  }
}
```

#### 特定のスタイルを設定するメソッド

```ts
// 7-49 サイズ専門のメソッド setSize
class StyleSetter {
  ...
  static setSize(eDOM:ElmDOM, name:string, size:number) {
    this.setStyle(eDOM, name, size.toString() + 'px')
  }
}
```

```ts
// 7-50 背景色専門のメソッド setBackgroundColor
class StyleSetter {
  ...
  static setBackgroundColor(eDOM:ElmDOM, colorexpress:string) {
    this.setStyle(eDOM, 'background-color', colorexpress)
  }
}
```

#### StyleSetter の働きを覆い隠す

```ts
// 7-51 クラス ElmDOM の, メソッドとしての setStyle など
class ElmDOM {
  ...
  setStyle(name:string, size:string) {
    StyleSetter.setStyle(this, name, size)
  }
  setSize(name:string, size:number) {
    StyleSetter.setSize(this, name, size)
  }
  setBackgroundColor(colorexpress:string) {
    StyleSetter.setBackgroundColor(this, colorexpress)
  }
}
```

#### セルの余白を設定

```ts
// 7-52 TableRowDOMのメソッド, addCol内の編集
class TableRowDOM {
  ...
  td.setSize('padding-left', 10)
  td.setSize('padding-right', 20)
  td.setSize('padding-bottom', 10)
}
```

#### 行の色を設定

```ts
// 7-53 TableDOMの属性, rowcounterを作成
class TableDOM extends ElmDOM {
  rowcounter:number
  constructor() {
    super('table')
    this.rowcounter = 0
  }
}
```

```ts
// 7-54 シマシマの行を追加する addTableRowInStripe
class TableDOM extends ElmDOM {
  ...
  addTableRowInStripe(row:TableRowDOM, color1:string, color2:string) {
    let colorExpress = color1
    if (this.rowcounter % 2 === 1) {
      colorExpress = color2
    }
    row.setBackgroundColor(colorExpress)
    this.addTableRow(row)
    this.rowcounter++
  }
}
```

#### トップレベルの処理

```ts
// 7-55 メソッド addTableRowInStrip で行を追加
for (let row of birdTableData) {
  birdTable.addTableRowInStripe(
    TableRowDOM.createFromArray(row), '#f0f8ff', '#b0c4de'
  )
}
```

### アニメーション
