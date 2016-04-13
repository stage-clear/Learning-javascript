# サウンドを扱う

- [Web Audio API - Can I use](http://caniuse.com/#feat=audio-api)


## 10.1 音声ファイルを再生する


```js
// Play
var song; // 音声データをを管理する変数

function preload() {
  song = loadSound('jupiter.wav');
}
```