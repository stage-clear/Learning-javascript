# dat.gui

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.5/dat.gui.min.js"></script>
```

```js
function init() {
  ...
  var controls = new function() {
    this.counter = 0
    this.increment = function() {
      this.counter = this.counter + 1
    }
    this.message = ''
    this.onChange = function() {
      alert('Hello, ' + this.message)
    }
  }
  var gui = new dat.GUI()
  gui.add(controls, 'counter').listen()
  gui.add(controls, 'increment')
  gui.add(controls, 'onChange').onChange(function() {
    controls.message = 'Yay!!!'
  })
}

window.onload = init
```
