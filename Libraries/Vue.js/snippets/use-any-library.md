# 他のライブラリと一緒に使う場合:

## Global variable:

```js
// entry.js
window._ = require('lodash')
```

```js
// MyComponent.vue
export default {
  created() {
    console.log(_isEmpty() ? 'Lodash everywhere!' : 'Uh oh...')
  }
}
```

## Importing in every file:
```js
// MyComponent.vue
import _ from 'lodash'
export default {
  created() {
    console.log(_.isEmpty() ? 'Lodash is available here!' : 'Uh oh...')
  }
}
```

### A better way:
```js
// entry.js
import moment from 'moment'
Object.defineProperty(Vue.prototype, '$moment', { value: moment })
// Vue.prototype.$moment = moment
```

```js
// MyNewComponent.vue
export default {
  created() {
    console.log('The time is ' + this.$moment().format('HH:mm'))
  }
}
```
