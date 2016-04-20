データの整形と保存
=================

1. データの文字コードと変換について
-------------------------------

- `fs.readFileSync` は Shift_JISをサポートしていない


2. データの整形と正規表現について
--------------------------------

### 正規表現メソッド

|Method|Return|Summary|
|:--|:--|:--|
| `RegExp#exec`    | `Array/null`    |文字列中で一致するものを検索し、結果を配列で返す|
| `RegExp#test`    | `Boolearn`      |文字列中に一致するものがあるかどうかをテストして真偽値で返す|
| `String#match`   | `Array/null`    |文字列中で一致するものを検索し、結果を配列で返す|
| `String#search`  | `Number/-1`     |文字列中に一致するものがあるかどうかをテストしてインデックスで返す|
| `String#replace` | `String`        |文字列中の一致するものを、別の文字列で置換|
| `String#split`   | `Array`         |文字列を正規表現で分割|

__String#replace 置換文字列内の特殊なパターン__

|Pattern|Summary|
|:--|:--|
|$$|$を挿入します|
|$&|マッチした部分文字列を挿入します|
|$`|マッチした部分文字列の直前の文字列を挿入します|
|`$|マッチした部分文字列の直後の文字列を挿入します|
|$1 $2 $3 ..|括弧でキャプチャされた文字列を挿入します|


```javascript
let str = 'The western honey bee or European honey bee (Apis mellifera) is a species of honey bee. The genus name Apis is Latin for "bee", and mellifera means "honey-bearing".';
let res = str.replace(/honey/, (v) => {
  return v.toUpperCase();
});
```


3. データ形式の基礎知識
----------------------

### JSON

- [json.org](http://json.org/json-ja.html)

### JSON の改良版 JSON5

- [json5.org](http://json5.org/)

__JSONの欠点__

- データ中にコメントが書けない
- オブジェクトのキーもダブルクオーテーションで囲う必要がある
- データの末尾にカンマを書くとパースエラーになる

__JSON5の利用__

```bash
$ npm install json5
```

```javascript
let JSON5 = require('json5');
let obj = JSON5.parse('[1,2,3]');
let str = JSON5.stringify(obj);
```

### CSON

- CSONは　CoffeeScript のオブジェクト記述形式にしたデータ形式

```bash
$ npm install cson
```

```javascript
let CSON = require('cson');
let obj = CSON.parse(cson_string);
let str = CSON.stringify(obj);
```

### XML/RSS

### YAML

[yaml.org](http://yaml.org/)

- インデントを利用して階層構造を表現する
- Yamlの基本は、配列、ハッシュ、スカラー（文字列/数値/真偽値など）

__Node.js で YAML__

```bash
$ npm install js-yaml
```

```javascript
let yaml = require('js-yaml');
let fs = require('fs');

// YAML データを読み込む
let txt = fs.readFileSync('test.yml', 'utf-8');

// JavaScript のオブジェクトに変換
let obj = yaml.safeLoad(txt);
console.log(obj);
```

### INI

```ini
name1=value1
name2=value2
name3=value3

[section1]
name4=value4
name5=value5

[seciton2]
name6=value6
name7=value7
;this is comment.

__Node.jsでINI__

```bash
$ npm install ini
```

```javascript
let fs = require('fs');
let ini = require('ini');

let txt = fs.readFileSync('test.ini', 'utf-8');

// Jsオブジェクトに変換
let obj = ini.parse(txt);

console.log(obj);
```

### CSV/TSV

- CSV, カンマ区切りのデータ
- TSV, タブ区切りのデータ
- SSV, 半角スペース区切りのデータ

__Node.js で CSV__

```bash
$ npm install comma-separated-values
```

```javascript
let fs = require('fs');
let CSV = require('comma-separated-values');
let Iconv = require('iconv').Iconv;

// Shift_JIS を utf-8 に変換するオブジェクト
let iconv = new Iconv('SHIFT_JIS', 'UTF-8');
let buf = fs.readFileSync('test.csv');
let txt = iconv.convert(buf).toString('utf-8');

// CSV をパース
let csv = new CSV(txt, { header: false });
let records = csv.parse();

// 一行目はヘッダなので捨てる
records.shift();

// 結果を出力
for (let i = 0; i < records.lenth; i++) {
  let fs = records[i];
  let name = fs[0];
  let price = fs[1];
  let memo = fs[2];
  console.log(name, price, memo);
}
```

4. CoffeeScript は必修科目
--------------------------

5. データベースの使い方
----------------------

6. レポートの自動生成
---------------------

### レポートをWebで公開する場合

| ファイル形式 | 特徴 |
|:--|:--|
| HTML | Web ブラウザで見られる |
| PDF | Web ブラウザの中でビューワーが開いて見られる |
| Exel/word | ダウンロードしてローカルで見てもらう |
| 専門分野のファイル | 特定のアプリ向けだが、専門分野の人にダウンロードして見てもらう |


### 自分用にレポートを出力する場合

| フォーマット | 特徴 |
|:--|:--|
| テキスト | 手間がかからない |
| HTML | 簡単なタグ付けで見栄えもよくなる |
| CSV | Excel などの表計算アプリで読みこめば見やすい |
| XML | Web ブラウザの中には綺麗に表示してくれるものがある |
| WIKI/Markdown | 手軽に HTML や PDF に出力できる |


### レポートを印刷する場合

| フォーマット | 特徴 |
|:--|:--|
| PDF | プリンタに依存しない形式で出力できる |
| Word/Excel | 綺麗に印刷できる |


### PDF で出力

- CasperJs を使う
- PDFKit を使う


### Excel で出力

- officegen を使う
