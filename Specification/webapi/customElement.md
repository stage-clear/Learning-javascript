# Custom Element

## document.registElement
coming soon...

## customElement.define

```js
class MyElement extends HTMLElement {
  constructor() {
    // Called when an instance of the element is created or upgraded.
    super();
    this.mst = 'Hello, World'; 
  }
  
  connectedCallback() {
    // Called every time the element is inserted into the DOM.
    this.innerHTML = `<p>${this.msg}</p>`;
  }
  
  disconnectedCallback() {
    // Called every time the element is removed from the DOM.
  }
  
  attributeChangeCallback(attrName, oldVal, newVal) {
    // Called when an attribute was added, removed, or upgraded.
  }
  
  adoptedCallback() {
    // Called if the element has been moved into new document.
  }
}

window.customElement.difine('my-element', MyElement);
```

## Links
- [The Case for Custom Elements: Part 1](https://medium.com/dev-channel/the-case-for-custom-elements-part-1-65d807b4b439#.aguqppy0s)
- [The Case for Custom Elements: Part 2](https://medium.com/dev-channel/the-case-for-custom-elements-part-2-2efe42ce9133#.9vcqp85bd)
- [Custom elementsはES6のclass記法で定義可能になりそうです](http://qiita.com/yoichiro6642/items/fdb8372bd8a68c754dc3)
