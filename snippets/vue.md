# Vue.js


## Vue インスタンス

```js
var data = {
  id: 1,
  message: 'Hello vue.js',
  html: '<div>HTML: This is div.</div>',
  link: 'http://google.com',
  flags: {
    ok: false,
    greeting: false
  },
  items: [
    { title: 'title a' },
    { title: 'title b' },
    { title: 'title c' }
  ],
  style: {
    width: '200px',
    height: '100px',
    border: '1px solid #ccc',
    fontSize: '13px'
  },
  clicked: function() {
    alert(data.message);
  }
};

var child = Vue.component('child-component', {
  template: '<div>Child Component</div>'
});

var app = new Vue({
  el: '#app',
  data: data,
  components: {
    'my-component': {
      template: '<div>my Component</div>'
    }
  },
  created: function() {
    console.log('> [method] created instance', this.id);
  },
  beforeCompile: function() {
    console.log('> [method] before compile');
  },
  compiled: function() {
    console.log('> [method] compiled');
  },
  ready: function() {
    console.log('> [method] ready');
  },
  destroyed: function() {
    console.log('> [method] destroyed');
  },
  computed: {
    b: function() {
      return this.id + 100;
    }
  }
});

// watch {id}
app.$watch('id', function(newVal, oldVal) {
  console.log('> [changed] message', newVal, oldVal);
});


// プロパティ設定は元のデータに影響を与える
app.id = 2;
console.log('> data.id:', data.id, 'app.id: ', app.id);

data.flags.ok = true;

setTimeout(function() {
  data.message = 'end';
  data.flags.greeting = true;
}, 1000);
```

## データバインディング構文

```html
<div id="app">
  {{ message }}<br>
  {{ flags.ok ? 'Yes' : 'No' }}<br>
  {{{ html }}}
  <p v-if="flags.greeting">Greeting</p>
  <button v-bind:click="clicked">Click me</button>
</div>
```
