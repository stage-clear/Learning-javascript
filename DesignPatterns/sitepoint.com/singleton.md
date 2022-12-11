# [Singleton](https://www.sitepoint.com/javascript-design-patterns-singleton/)

## 実装例
```js
class UserStore {
  constructor () {
    if (!UserStore.instance) {
      this._data = []
      UserStore.instance = this
    }
    
    return UserStore.instance
  }
  
  add (item) {
    this._data.push(item)
  }
  
  get (id) {
    return this._data.find(d => d.id ===id)
  }
}

const instance = new UserStore()
Object.freeze(instance)

export default instance
```
