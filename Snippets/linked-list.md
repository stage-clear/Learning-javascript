# Linked-List

![連結リストの参考図](http://image.itmedia.co.jp/ait/articles/0809/01/r20algorithm0203.jpg)

- [連結リスト 【 linked list 】 線形リスト / linear list / リンクリスト](http://e-words.jp/w/%E9%80%A3%E7%B5%90%E3%83%AA%E3%82%B9%E3%83%88.html)
- [データ構造の選択次第で天国と地獄の差 (2/3)](http://www.atmarkit.co.jp/ait/articles/0809/01/news163_2.html)


```js
/**
 * Node
 * @class
 */
class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}


/**
 * LinkedList
 * @class
 */

class LinkedList {
  constructor() {
    this.firstNode = null;
  }
  
  getLastNode() {
    if (this.firstNode == null) {
      return null;
    }
    var node = this.firstNode;
    while (node.nextNode != null) {
      node = node.nextNode;
    }
    return node;
  }
  
  add(value) {
    var node = new Node(value);
    if (this.firstNode == null) {
      this.firstNode = node;
      return ;
    }
    var lastNode = this.getLastNode();
    lastNode.nextNode = node;
  }
  
  toString() {
    if (this.firstNode == null) {
      return '';
    }
    var node = this.firstNode;
    var str = node.value.toString();
    while (node.nextNode != null) {
      node = node.nextNode;
      str = str + ', ' + node.value.toString();
    }
    return str;
  }
}
```

```js
// http://goo.gl/nTAcfX

/**
 * Node
 */

class Node {
  constructor(name) {
    this.name = name;
  }
}

/**
 * List
 */
class List {
  constructor() {
    this.data = new Array();
  }
  
  push(name) {
    var node = new Node();
    this.data.push(node);
    return node;
  }

  insertAfter(ref, name) {
    var node = new Node(name);
    var counter = this.data.length;
    while (counter > 0 && this.data[counter] != ref) {
      this.data[counter] = this.data[counter - 1];
      counter--;
    }
    this.data[counter + 1] = node;
    return node;
  }

  toString() {
    var str = '';
    for (var i = 0; i < this.data.length; i++) {
      str += this.data[i].name + ', ';
    }
    str = '['+ str +']';
    str = str.replace(/,\s\]/i, ']');
    return str;
  }
}
```


