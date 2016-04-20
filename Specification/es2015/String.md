String
======

__Unicode 対応の拡充__

```javascript
// "𩸽"はサロゲートペアを使う
var s = '𩸽を食べる';
// 1文字なのに length は2文字分になる
console.log(s.length);//=> 6

// 文字を取得できない
console.log(s.charAt(0));//=> ' '

// コードポイントが取得できない
console.log(s.charCodeAt(0).toString(16));
//=> d867 (上位サロゲートの値のみ)
console.log(s.length);
```

String のイテレータはサロゲートペアに対応している。
スプレッドオペレータを使うと、イテレータがサロゲートペアを考慮して配列に展開してくれる

```javascript
// Iterator
var s = [...'𩸽を食べる'];
console.log(s.length);//=> 5
console.log(s[0]);//=> 𩸽


// 新しいメソッドによりコードポイントの取得や復元がかんたんに
console.log('𩸽'.codePointAt(0).toString(16));// => 29e3d
console.log(String.fromCodePoint(0x29e3d));//=> 𩸽
```

__便利なメソッドの追加__

`String#startsWith` : 先頭の文字列かを調べる  
`String#endsWith` : 末尾の文字列かを調べる  
`String#includes` : 任意の場所に含まれる文字列かを調べる  
`String#repeat` : 文字列を繰り返し連結する  
`String#normalize` : Unicode正規化を行う  
`String#raw` : タグ付きテンプレートと組み合わせて生のエスケープシーケンスを文字列で取得  

```javascript
'abcde'.startsWith('ab');//=> true
'abcde'.endsWith('de');//=> true
'abcde'.includes('cd');//=> true
'abc'.repeat(3);//=> abcabcabc
```
