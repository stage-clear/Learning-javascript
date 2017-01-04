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
<div id="app" data-item="{{ id }}" v-bind:style="style">
  Message: {{ message }} {{* message }}<br>
  {{ flags.ok ? 'YES' : 'NO'}}<br>
  {{{ html }}}<br>
  <p v-if="flags.greeting">Greeting</p>
  <p><a v-bind:href="link">[link]</a></p>
  <button v-on:click="clicked">Click me</button>
  <p>computed {{b}}</p>
  <ul>
    <li v-for="(index, item) in items">
      {{ index }} - {{ item.title }}
    </li>
  </ul>
  <div is="my-component"></div>
</div>
```

## コンポーネント

定義 :arrow_right: 登録
```js
// `<my-component first-name="John" last-name="Lennon"/>`
// 定義
var myComponent = Vue.extend({
  props: ['firstName', 'lastName'],
  template: '<div>{{ firstName }} {{ lastName }}</div>'
});
// 登録
Vue.component('my-component', myComponent);
```

定義 :heavy_plus_sign: 登録

```js
// `<my-component first-name="John" last-name="Lennon"/>`
Vue.component('my-component', {
  props: ['firstName', 'lastName'],
  template: `<div>{{ firstName }} {{ lastName }}</div>`
});
```

スコープ内でデータを受け取る

```js
// <my-component :first-name="firstName" :last-name="lastName"/>
// 定義
let myComponent = Vue.extend({
  props: ['firstName', 'lastName'],
  template: `<div>{{ firstName }} {{ lastName }}</div>`
});

new Vue({
  el: '#example',
  data: { firstName: 'John', lastName: 'Lennon' },
  components: {
    'my-component': myComponent
  }
});
```

実装例) リスト
```js
// <my-list :items="item">
// 定義
let myListItem = Vue.extend({
  props: ['item', 'index'],
  template: `<li>{{ index }} - {{ item }}</li>`
});

let myList = Vue.extend({
  props: ['items'],
  template: `<ul>
    <my-list-item v-for="item in items" :item="item" :index="$index"/>
  </ul>`,
  components: {
    'my-list-item': myListItem
  }
});

new Vue({
  el: '#example',
  data: {
    items: ['apple', 'banana', 'melon']
  },
  components: {
    'my-list': myList
  }
});
```

