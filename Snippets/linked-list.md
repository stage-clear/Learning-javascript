# Linked-List

![連結リストの参考図](http://image.itmedia.co.jp/ait/articles/0809/01/r20algorithm0203.jpg)

- [連結リスト 【 linked list 】 線形リスト / linear list / リンクリスト](http://e-words.jp/w/%E9%80%A3%E7%B5%90%E3%83%AA%E3%82%B9%E3%83%88.html)

```js
class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

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


