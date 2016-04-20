型付き配列
==========

バイナリデータを効率よく扱うためのデータ型

```javascript
var u16 = new Uint16Array(2);
console.log(u16.byteLength);//=> 4

u16[0] = 0x00ff;
u16[1] = 0xffff;
console.log(u16);//=> {"0":255,"1":65535}


// 符号なし8ビット整数配列のビューに変換
var u8 = new Uint8Array(u16.buffer);
console.log(u8);//=> {"0":255,"1":0,"2":255,"3":255}

// DataViewに変換
var view = new DataView(u8.buffer);
// 先頭8ビットに値を符号なし整数を設定
view.setUint8(0, 0x0f);
console.log(u8);//=> {"0":15,"1":0,"2":255,"3":255}
```
