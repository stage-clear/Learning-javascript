# Vue.js


## Vue インスタンス

```js
var data = {
  id: 1,
  message: 'Hello vue.js',
  flags: {
    ok: true,
    greeting: false
  },
  clicked: function() {
    alert(data.message);
  }
};

var app = new Vue({
  el: '#app',
  data: data,
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
  }
});

// watch {id}
app.$watch('id', function(newVal, oldVal) {
  console.log('> [changed] message', newVal, oldVal);
});


// プロパティ設定は元のデータに影響を与える
app.id = 2;
console.log('> data.id:', data.id, 'app.id: ', app.id);


setTimeout(function() {
  data.message = 'end';
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
