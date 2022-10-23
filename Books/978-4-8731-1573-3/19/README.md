# 19章 jQueryライブラリ

## 19.1 jQueryの基本

```js
var divs = $('div')
```

## 19.1.1 jQuery関数

```js
var img = $('<img />', {
  src: url,
  css: { borderWidth: 5 },
  click: handleClick
})
```

### 19.1.2 問い合わせと問い合わせ結果

```js
$('body').length  // -> 1: ドキュメントにはbody要素は1つしかない
$('body')[0]      // document.bodyと同じ
```

```
var bodyscripts = $('script', document.body)
bodyscripts.selector    //-> 'script'
bodyscripts.context     //-> document.body
bodyscripts.jquery      //-> '1.4.2'
```

```js
// div#lastまで、ドキュメントのdivに番号をつけていく
$('div').each(function(idx) {           // すべての <div> を検索し、巡回する
  $(this).prepend(idx + ': ')           // 各<div>の先頭にインデックスを挿入する
  if (this.id === 'last') return false  // #last要素で巡回を停止する
})
```
```js
// すべての見出しを検索し、idをマップし、本当の配列に変換し、ソートする
$(':header').map(function () { return this.id }).toArray().sort()
```

## 19.2 jQueryのゲッターとセッター

### 19.2.1 HTML属性の取得と設定
```js
$('form').attr('action')                  // 最初の形式でaction属性を問い合わせる
$('#icon').attr('src', 'icon.gif')        // src属性を設定する
$('#banner').attr({                       // 一度に4つの属性を設定する
  src: 'banner.gif',
  alt: 'Advertisement',
  width: 720,
  height: 64
})
$('a').attr('target': '_blank')           // すべてのリンクを新しいウィンドウにロードさせる
$('a').attr('target', function () {       // 同じホストのものは同じウィンドウにロードし、
  if (this.host == location.href) {
    return '_self'
  } else {
    return '_blank'                       // サイト外へのリンクは新しいウィンドウにロードする
  }
})
$('a').attr({target: function () {...})   // このように関数を渡すこともできる
$('a').removeAttr('target')               // すべてのリンクをこのウィンドウにロードさせる
```

### 19.2.2 CSS属性の取得と設定
```js
$('h1').css('font-weight')                // 最初の<h1>のフォントの重さを取得する
$('h1').css('fontWeight')                 // キャメルケース形式でも問題ない
$('h1').css('font')                       // エラー: 複合スタイルは問い合わせできない
$('h1').css('font-variant',               // すべての<h1>要素に対してスタイルを設定する
          'smallcaps')
$('div.note').css('border',               // 複合スタイルも設定できる
          'solid black 2px')
$('h1').css({ backgroundColor: 'black',
              textColor: 'white',
              fontVariant: 'small-caps',
              padding: '10px 2px 4px 20px',
              border: 'dotted black 4px')
// すべての<h1>のフォントサイズを25%だけ増やす
$('h1').css('font-size': function (i, curval) {
  return Math.round(1.25 * parseInt(curval))
})
```

### 19.2.3 CSSクラスの取得と設定
```js
// CSSクラスを追加する
$('h1').addClass('hilite')
$('h1+p').addClass('hilite first')      // <h1>の後の<p>要素にクラスを2つ追加する
$('section').addClass(function (n) {    // マッチした要素それぞれに対して
  return 'section' + n                  // 独自のクラスを追加する関数を渡す
})

// CSSクラスを削除する
$('p').removeClass('hilite')            // すべての<p>要素からクラスを削除する
$('p').removeClass('hilite first')      // 複数のクラスをしていしてもよい
$('section').removeClass(function (n) {
  return 'section' + n
})
$('div').removeClass()                  // すべての<div>からすべてのクラスを削除する

// CSSクラスをトグルする
$('tr:odd').toggleClass('oddrow')       // 存在しなければ、クラスを追加する
                                        // 存在していれば、クラスを削除する
$('h1').toggleClass('big bold')         // 一度に2つのクラスをトグルする
$('h1').toggleClass(function (n) {
  return 'big bold h1-' + n
})
$('h1').toggleClass('hilite', true)     // addClassと同じ
$('h1').toggleClass('hilite', false)    // removeClassと同じ

// CSSクラスの存在をテストする
$('p').hasClass('first')                // 任意のp要素がこのクラスを持つか？
$('#lead').is('.first')                 // 同じ処理を行う
$('#lead').is('.first.hilite')          // is()はhasClass()よりも自由度が高い
```

### 19.2.4 HTMLフォーム値の取得と設定
```js
$('#surname').val()                       // surnameテキストフィールドから値を取得する
$('#usstate').val()                       // <select>から値を1つだけ取得する
$('select#extras').val()                  // <select multiple>から値の配列を取得する
$('input:radio[name=ship]:checked).val()  // チェックされたラジオボタンを取得する
$('#email').val('Invalid email address')  // テキストフィールドの値を設定する
$('input:checkbox').val(['opt1', 'opt2']) // この名前または値を持つチェックボックスをチェックする
$('input:text').val(function () {         // すべてのテキストフィールドをデフォルト値に戻す
  return this.defaultValue
})
```

### 19.2.5 要素のコンテンツの取得と設定
```js
var title = $('head title').text()          // ドキュメントタイトルを取得する
var headline = $('h1').html()               // 最初の<h1>要素のHTML文字列を取得する
$('h1').text(function () {                  // 各見出しに、見出し番号を付与する
  return '$' + (n + 1) ': ' + current
})
```

### 19.2.6 要素の位置／サイズの取得と設定

```js
var elt = $('#sprite')                    // 移動する要素
var position = elt.offset()               // 現在の位置を取得する
position.top += 100                       // Y座標を変更する
elt.offset(position)                      // 新しい位置を設定する
// すべての<h1>要素を、ドキュメント中での順番に応じてインデント幅を
// 変えて、右に移動する
$('h1').offset(function (index, curpos) {
  return { left: curpos.left + 25 * index, top: curpos.top }
})
```

```js
var body = $('body')
var contentWidth = body.width()
var paddingWidth = body.innerWidth()
var borderWidth = body.outerWidth()
var marginWidth = body.outerWidth(true)
var padding = paddingWidth - contentWidth     // 左端と右端とパディングの和
var borders = borderWidth - paddingWidth      // 左端と右端のボーダーの和
var margins = marginWidth - borderWidth       // 左端と右端のマージンの和
```

```js
function page(n) {
  var w = $(window)                             // jQueryオブジェクト中にウィンドウをラップする
  var pagesize = w.height()                     // ページの大きさを取得する
  var current = w.scrollTop()                   // 現在のスクロールバーの位置を取得する
  w.scrollTop(current + n * pagesize)           // スクロールバーの位置を変更する
}
```

### 19.2.7 要素のデータの取得と設定

```js
$('div').data('x', 1)             // データを設定する
$('div.nodata').removeData('x')   // データを削除する
var x = $('#mydiv').data('x')     // データを取得する
```

```js
$(e).data(...)        // メソッド形式
$.data(e, ...)        // 関数形式
```

## 19.3 ドキュメント構造の変更

### 19.3.1 要素と挿入の置換
```js
$('#log').append('<br/>' + message)               // #log要素の末尾にコンテンツを追加する
$('h1').prepend('$')
$('h1').before('<hr/>')
$('h1').after('<hr/>')
$('hr').replaceWith('<br/>')
$('h2').each(function () {
  var h2 = $(this)
  h2.replaceWith('<h1>' + h2.html() + '</h1>')
})
// after()とbefore()はテキストノードい対しても呼び出せる
// 次のような方法も、各<h1>先頭に$記号を追加できる
$('h1').map(function () { return this.firstChild }).before('$')
```

###  19.3.2 要素のコピー

```js
// 「linklist」というidを持つ新しいdivを、ドキュメントの末尾に追加する
$(document.body).append('<div id='linklist'><h1>List of Links</h1></div>')
// ドキュメント中のすべてのリンクをコピーをし、この新しいdiv中に挿入する
$('a').clone().appendTo('#linklist')
// 各リンクの末尾に <br/> 要素を挿入し、1行に1つずつリンクを表示するようにする
$('#linklist > a').after('<br/>')
```

### 19.3.3 要素のラップ
```js
// すべての<h1>要素を<i>要素でラップする
$('h1').wrap(document.createElement('i'))   // <i><h1>...</h1></i>
// すべての<h1>要素のコンテンツをラップする。文字列引数を使う方が簡単
$('h1').wrapInner('<i/>')                   // <h1><i>...</i></h1>
// 最初の段落をアンカーとdivでラップする
$('body > p:first').wrap('<a name="lead"><div class="first"></div></a>')
// そのほかの段落は、別のdivでラップする
$('body > p:not(:first)').wrapAll('<div class="rest"></div>')
```

### 19.3.4 要素の削除

## 19.4 jQueryでのイベント処理
### 19.4 単純形式のイベントハンドラ登録

```js
// <p>をクリックしたときに、灰色の背景色にする
$('p').click(function () {
  $(this).css('background-color': 'gray')
})
```

```js
$('<img />', {
  src: image_url,
  alt: image_description,
  className: 'translucent_image',
  click: function () {
    $(this).css('opacity': '50%')
  }
})
```

### 19.4.2 jQueryのイベントハンドラ

### 19.4.3 jQuery Event オブジェクト

### 19.4.4 高度なイベントハンドラ登録
```js
$('a').bind('mouseenter mouseleave', f)
```

```js
// 全<a/>要素に、名前空間「myMod」中のmouseoverハンドラとして、fをバインドする
$('a').bind('mouseover.myMod', f)

// 名前空間「myMod」と「yourMod」中のmouseoutハンドラとして、fをバインドする
$('a').bind('mouseout.myMod.yourMod', f)

$('a').bind({mouseenter:f, mouseleave:g})
```

### 19.4.5 イベントハンドラの登録解除

```js
// すべての要素からすべての jQuery イベントハンドラを削除する
$('*').unbind();

// すべての<a>要素上のすべてのmouseoverハンドラとmouseoutハンドラ登録解除する
$('a').unbind('mouseover, mouseout')
```

```js
// 「myMod」名前空間中のmouseoverとmouseoutハンドラをすべて登録解除する
$('a').unbind('mouseover.myMod mouseout.myMod')
// myMod名前空間中の全種類のイベント用のハンドラを登録解除する
$('a').unbind('.myMod')
// 「ns1」と「ns2」名前空間中のclickハンドラを登録解除する
$('a').unbind('click.ns1.ns2')
```

```js
$('#mybutton').unbind('click', myClickHandler)
```

```js
$('a').unbind({
  mouseover: mouseoverHandler,
  mouseout: mouseoutHandler
})
```

### 19.4.6 イベントのハンドラー

```js
$('#my_form').submit()
```

```js
$('#my_form').trigger('submit')

$('button').trigger('click.s1')     // 名前空間中のclickハンドラを起動する
$('button').trigger('click!')       // 名前空間を持たないclickハンドラを起動する
```
```js
// button1のonclickハンドラから、同じイベントでbutton2のハンドラも起動する
$('#button1').click(function (e) { $('#button2').trigger(e) })

// イベントを起動するときに、イベントオブジェクトにプロパティを追加する
$('#button1').trigger({type: 'click', synthetic: true})

// このハンドラは追加プロパティを使って、実イベントと合成イベントを区別する
$('#button1').click(function (e) {
  if (e.synthetic) { ... }
})
```

```js
$('#button1').trigger('click', true)
$('#button1').trigger('click', [x, y, z])
```

### 19.4.7 カスタムイベント

```js
$('#logoff').click(function () {
  $.event.trigger('logoff')
  window.location = 'logoff.php'
})
```

### 19.4.8 ライブイベント

## 19.5 アニメーション効果
```js
jQuery.fx.speed['medium-fast'] = 300
jQuery.fx.speed['medium-slow'] = 500
```

#### アニメーションの抑止

```js
$('.stopmoving').click(function () {
  jQuery.fx.off = true
})
```

### 19.5.1 単純なアニメーション効果

- fadeIn(), fadeOut(), fadeTo()
- show(), hide(), toggle()
- slideDown(), slideUp(), slideToggle()

```js
$('img').fadeOut().show(300).slideUp().slideToggle()
```

### 19.5.2 カスタムアニメーション
```js
$('img').animate({ height: 0 })
```

```js
$('#sprite').animate({
  opacity: .25,
  font-size: 10
}, {
  duration: 500,
  complete: function () {
    this.text('Goodbye')
  }
})
```

#### 19.5.2.1 アニメーションプロパティオブジェクト
```js
$('p').animate({
  'margin-left': '+=.5in',
  opacity: '-=.1'
})
```

#### 19.5.2.2 アニメーションオプションオブジェクト

```js
$('img').fadeIn(500)
  .animate({'width': '+=100'}, {queue: false, duration: 1000})
  .fadeOut(500)
```

```js
// hide()メソッドと同じように画像を隠す。ただし、画像サイズは線形で小さくなり、
// 不透明度は、デフォルトの「swing」イージング関数を使ってアニメーションする

// 1番目の方法
// specialEasingオプションを使って、独自のイージング関数を指定する
$('img').animate(
  { width: 'hide', height: 'hide', opacity: 'hide' },
  { specialEasing: { width: 'linear', height: 'linear' }}
)

// もう1つの方法
// 最初のオブジェクト引数中に[目標値, イージング関数]配列を渡す
$('img').animate({
  width: ['hide', 'linear'],
  height: ['hide', 'linear'],
  opacity: 'hide'
})
```

### 19.5.3 アニメーション効果の中止、遅延、キューイング
```js
$('img').bind({
  mouseover: function () { $(this).stop().fadeTo(300, 1.0) },
  mouseout: function () { $(this).stop().fadeTo(300, 0.5) }
})
```

```js
// すばやく半分フェードアウトした後、少し待ち、そしてスライドアップする
$('img').fadeTo(100, 0.5).delay(200).slideUp()
```

```js
$('img').bind({
  mouseover: function () { $(this).stop(true).delay(100).fadeTo(300, 1.0) },
  mouseout: function () { $(this).stop(true).fadeTo(300, 0.5) }
})
```

```js
// 要素をフェードインして、少し待ち、テキスト設定し、ボーダーをアニメーションする
$('#message').fadeIn().delay(200).queue(function (next) {
  $(this).text('Hello world')
  next()
}).animate({borderWidth: '+=10px;'})
```

```js
$(this).dequeue(); // next()の代わり
```

```js
$(e).queue(f)
JQuery.queue(e, f)
```

## 19.6 jQueryによるAjax
### 19.6.1 load()メソッド
```js
// 60秒ごとに最新の状況報告をロード表示する
setInterval(function () { $('#stats').load('status_report.html') }, 60000)
```

```
// 天気予報の気温部分をロードし表示する
$('#temp').load('weather_report.html "temperature')
```

```js
// 指定したZIPコードの天気予報をロードする
$('#temp').load('us_weather_report.html', 'zipcode=02134')

// データとしてオブジェクトを使って、温度の単位を華氏に指定する
$('#temp').load('us_weather_report.html', { zipcode: 02134, units: 'F' })
```

 ### 19.6.2 Ajaxユーティリティ関数
 


### 19.6.4 Ajaxイベント
|コールバック|イベントタイプ|ハンドラ登録メソッド|
|:-|:-|:-|
|`beforeSend`|`ajaxSend`|`ajaxSend()`|
|`success`|`ajaxSuccess`|`ajaxSuccess()`|
|`error`|`ajaxError`|`ajaxError()`|
|`complete`|`ajaxComplete`|`ajaxComplete()`|
| |`ajaxStart`|`ajaxStart()`|
| |`ajaxStop`|`ajaxStop()`|

```js
$('#loading_animation').bind({
  ajaxStart: function () { $(this).show(); },
  ajaxStop: function () { $(this).hide() }
})
```




