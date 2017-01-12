# AMDを使う
## 設定
ScrollMagic を使うとき, すべての依存するファイルのパスを確かめます.
通常, requirejs の設定を使って定義しないといけないかもしれません.

```js
require.config({
  baseUrl: 'js',
  paths: {
    TweenMax: 'lib/greensock/TweenMax',
    TimelineMax: 'lib/greensock/TimelineMax',
    jquery: 'lib/jquery.min',
    scrollMagic: 'jquery.scrollmagic',
    'ScrollMagic.debug': 'jquery.scrollmagic.debug'
  }
})
```

## AMD で ScrollMagic を使う
AMDでは, 出力された一つのオブジェクトに ScrollMagic controller と ScrollScene Constructor への参照が含まれます

```js
{
  Controller: ScrollMagic,
  Scene: ScrollScene
}
```

ScrollMagic を使うために, 設定の中でこれらのコンストラクタへの参照を使う必要があります.

```js
require(['ScrollMagic', 'ScrollMagic.debug'], function(ScrollMagic) {
  // コントローラを初期化
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onCenter'
    }
  })

  // シーンを初期化
  var scene = new ScrollMagic.Scene({
    duration: 300,
    offset: 100
  })
  .addTo(controller)
  .addIndicators()
})
```
