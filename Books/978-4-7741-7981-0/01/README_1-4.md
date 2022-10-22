# 1-4 JavaScriptでオブジェクト指向
## オブジェクトとアイデンティティ
オブジェクト指向において、オブジェクトとはアイデンティティを持つ値であり、JavaScriptにはオブジェクトと、オブジェクトではない値があります。

「アイデンティティを持つ」とは、同一性を確認できることや、独自性を持つことなどを意味します。

基本値では代入時に値が複製されるのに対して、オブジェクトでは参照が複製されます。

## 関数とメソッド

## コンストラクタとプロトタイプ

## クラスとインスタンス

```js
var obj = {};
obj instanceof Object; //-> true
obj.prototype instancof Object //-> false
```

<img width="25%" src="https://user-images.githubusercontent.com/4797793/197340949-c6e28894-5d3e-44d1-995d-bd3a7af6257f.png"><br>
<img width="80%" src="https://user-images.githubusercontent.com/4797793/197340796-6fb49ab2-4e90-481d-b3dc-b0c588c078fa.png"><br>


### オブジェクト指向の実践
部品の実装でよくやってしまうのが、外部で内部状態を保持してしまうことです。

**リスト9 サンプルコード：一人ぼっちの内部状態**
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="jquery.min.js"></script>
    <script src="handlebars.js"></script>
    <script>
      $(function () {
        var templates = {
          viewer: Handlebars.compile($('#viewer_template").html()),
          editer: Handlebars.compile($('#editor_template").html())
        };
        var value = "クリックして編集";
        var target = $('#target')
          .html(templates.viewr({value: value}))
          .on('click', 'p', function (ev) {
            $(ev.delegateTarget).html(templates.editor({value: value}));
          })
          .on('click', 'button', function (ev) {
            $(evt.delegateTarget).html(templates.viewer({value: value}))
          });
      });
    </script>
  </head>
  <body>
    <script id="viewer_template" type="text/x-handlebars-template">
      <p>{{value}}</p>
    </script>
    <script id="editor_template" type="text/x-handlebars-template">
      <input type="text" value="{{value}}"></input>
      <button>Save</button>
    </script>
    <div id="target">
    </div>
  </body>
</html>
```

**リスト10 サンプルコード: オブジェクト指向の導入結果**
```js
function InPlaceEditor ($root, templates) {
  this.$root = $root;
  this.templates = templates;
  
  this.update_value('クリックして編集')
    .on('click', 'button', function (ev) {
      this.update_value($(ev.delegatetarget).find('input').val());
    }.bind(this))
    .on('click', 'p', function (ev) {
      this.open_editor();
    }.bind(this));
}

InPlaceEditor.prototype = {
  update_value: function (value) {
    this.value = value;
    return this.$root.html(this.temlates.viewer(this));
  },
  open_editor: function () {
    return this.$root.html(this.templates.editor(this));
  }
};

$(function () {
  var templates = {
    viewer: Handlebars.compile($('#viewer_template').html()),
    editor: Handlebars.compile($('#editor_template').html())
  };
  var target = new InPlaceEditor($('#target'), templates);
});
```

## インスタンスによる状態管理




