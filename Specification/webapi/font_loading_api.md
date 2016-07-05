# CSS Font loading API

## Usage
ブラウザがサポートしていれば `document.fonts` が存在する

```js
if (document.fonts) {
  console.log('Supported');
}

document.fonts.addEventListener('loading', (FontFaceSetLoadEvent) => {
  console.log(`[loading]`);
});

document.fonts.addEventListener('loadingdone', (FontFaceSetLoadEvent) => {
  // font loaded.
  console.log(`[loading done]`);
});

document.fonts.addEventListener('loadingerror', (error) => {
  // font load error
  console.log(`[loading error]`);
});

document.ready.then((fontFaceSet) => {
  console.log(`[ready]`);
});

```

動的に `@font-face` を定義する

```js
const fontFace = new FontFace('font-name', 'url(path/to/font.woff2) format("woff2")');

fontFace.load().then((fontFace) => {
  // loaded font add to document.fons.
  document.fonts.add(fontFace);
  document.body.style.fontFamily = 'font-name';
});
```

## links

- [CSS Font loading API](https://www.w3.org/TR/css-font-loading-3/) - W3
- [CSS Font loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API) - MDN
- [ナウでヤングな CSS Font Loading](http://qiita.com/damele0n/items/6afc5160cf7ea8b15787)
