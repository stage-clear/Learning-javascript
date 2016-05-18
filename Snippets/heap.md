# Heap



```js
class Heap {
  constructor() {
    this.heap = new Array();
    this.size = 0;
  }
  push(value) {
    var k = this.size++;
    
    while (0 < k) {
      var p = Math.floor( (k - 1) / 2 );
      if (this.heap[p] <= value) {
        break;
      }
      this.heap[k] = this.heap[p];
      k = p;
    }
    this.heap[k] = value;
  }
  pop() {
    var ret = this.heap[0];
    var x = this.heap[--this.size];
    var k = 0;
    
    while (k * 2 + 1 < this.size) {
      var a = k * 2 + 1;
      var b = k * 2 + 2;
      if (b < this.size && this.heap[b] < this.heap[a]) {
        a = b;
      }
      if (x <= this.heap[a]) {
        break;
      }
      this.heap[k] = this.heap[a];
      k = a;
    }
    this.heap[k] = x;
    return ret;
  }
  top() {
    return this.heap[0];
  }
  size() {
    return this.size;
  }
  dump() {
    return this.heap;
  }
}
```
