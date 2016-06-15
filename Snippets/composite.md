# Composite

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
