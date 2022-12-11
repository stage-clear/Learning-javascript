# [Singleton](https://www.sitepoint.com/javascript-design-patterns-singleton/)

## 実装例
```js
const _data = []

const UserStore = {
  add: item => _data.push(item),
  get: id => _data.find(d => d.id === id)
}

Object.freeze(UserStore)
export default UserStore
```
