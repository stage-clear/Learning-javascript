# Composite
- 単一の要素と複数の要素を、同じ方法で扱う
  - ファイルとディレクトリ
  - jQuey のメソッド

> Composite パターンでは、容器の中身と入れ物を同一視します。同一視するために、容器と中身が共通のインタフェースを実装するようにします。

> コンポジットパターンでは、オブジェクトの単一インスタンスと同じ方法でオブジェクトのグループを扱えるように記述します。

## 例1) "Adobe developer Connection" の実装
- コンポジットとリーフは同一のインターフェイスを持たなければならない

```js
// Implementation: Composite
var GalleryComposite = function(heading, id) {
  this.children = [];

  this.element = $('<div id="'+ id +'" class="composite-gallery"></div>')
    .append('<h2>'+ heading +'</h2>');
};

GalleryComposite.prototype = {
  add: function(child) {
    this.children.push(child);
    this.element.append(child.getElement());
  },

  remove: function(child) {
    for (var node, i = 0; node = this.getChild(i); i += 1) {
      if (node == child) {
        this.children.splice(i, 1);
        this.element.detach(child.getElement());
        return true;
      }
      if (node.remove(child)) {
        return true;
      }
    }
  },

  getChild: function(i) {
    return this.children[i];
  },

  hide: function() {
    for (var node, i = 0; node = this.getChild(i); i += 1) {
      node.show();
    }
    this.element.show(0);
  },

  getElement: function() {
    return this.element;
  }
};

// Implementation: Leaf
var GalleryImage = function(src, id) {
  this.children = [];

  this.element = $('<img />')
    .attr('id', id)
    .attr('src', src);
};

GalleryImage.prototype = {
  // Due to this being a leaf, it does't use these methods,
  // but must implement them to count as implementing the 
  // Compsite interface
  add: function() {},
  remove: function() {},
  getChild: function() {},
  hide: function() {
    this.element.hide(0);
  },
  show: function() {
    this.element.show(0);
  },
  getElement: function() {
    return this.element;
  }
};

// Usage:
var container = new GalleryComposite('', 'allgalleries');
var gallery1 = new GalleryComposite('Gallery 1', 'gallery1');
var gallery2 = new GalleryComposite('Gallery 2', 'gallery2');
var image1 = new GalleryImage('image1.jpg', 'img1');
var image2 = new GalleryImage('image2.jpg', 'img2');
var image3 = new GalleryImage('image3.jpg', 'img3');
var image4 = new GalleryImage('image4.jpg', 'img4');

gallery1.add(image1);
gallery1.add(image2);

gallery2.add(image3);
gallery2.add(image4);

container.add(gallery1);
container.add(gallery2);

// Make sure to add the top container to the body,
// otherwise it'll never show up
container.getElement().appendTo('body');
container.show();
```

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
