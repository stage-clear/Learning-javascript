# Composite
- 単一の要素と複数の要素を、同じ方法で扱う
  - ファイルとディレクトリ
  - jQuey のメソッド

> Composite パターンでは、容器の中身と入れ物を同一視します。同一視するために、容器と中身が共通のインタフェースを実装するようにします。

> コンポジットパターンでは、オブジェクトの単一インスタンスと同じ方法でオブジェクトのグループを扱えるように記述します。

## 実装例
- [Adobe Developer Connection](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/Adobe-Developer-Connection/composite.md)

## 例2) "JavaScript design patterns" - jQuery のデザインパターン

 ```js
 // 単一の要素
$('#singleItem').addClass('active');
// 複数の要素(要素のコレクション)
$('div').addClass('active');

var test = {
  addClass: function(value) {
    var classNames, i, l, elem
      , setClass, c, cl;

    if ($.isFunction(value)) {
      return this.each(function(j) {
        $(this).addClass(value.call(this, j, this.className));
      });
    }

    if (value && typeof value === 'string') {
      classNames = value.split(' ');

      for (i = 0, l = this.length; i < l; i++) {
        elem = this[i];
        if (elem.nodeType === 1) {
          if (!elem.className && classNames.length === 1) {
            elem.className = value;
          } else {
            setClass == ' ' + elem.className + ' ';
            for (c = 0, cl = classNames.length; c < cl; c++) {
              if (!~setClass.indexOf(' ' + classNames[c] + ' ')) {
                setClass += classNames[c] + ' ';
              }
            }
            elem.className = $.trim(setClass);
          }
        }
      }
    }
    return this;
  }
};
 ```


## Links
- [【まとめ】JavaScriptでデザインパターン](http://qiita.com/KENJU/items/4d32598ffddf86af82f2)
- [11. Composite パターン](http://www.techscore.com/tech/DesignPattern/Composite.html)
- [JavaScript ツリー構造はCompositeパターン](https://lonely-programmer.hatenablog.jp/entry/2017/06/10/224324)
