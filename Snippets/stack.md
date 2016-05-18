# Stack

```js
class Stack {
	constructor() {
		this.data = [];
	}
	push(value) {
		this.data.push(value);
		return value;
	}
	pop() {
		return this.data.pop();
	}
	top() {
		return this.data[ this.data.length - 1 ];
	}
	size() {
		return this.data.length;
	}
	empty() {
		return this.data.length === 0;
	}
	dump() {
		return this.data;
	}
};

// test
var stack = new Stack();

console.log(stack.push(1));
console.log(stack.push(2));
console.log(stack.push(3));
console.log('[data]', stack.dump());
console.log(stack.empty());
console.log(stack.pop());
console.log(stack.size());
console.log(stack.top());
console.log('[data]', stack.dump());
```
