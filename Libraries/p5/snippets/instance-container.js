/**
 * @see https://p5js.org/examples/instance-mode-instance-container.html
 * 
 * `<div id="container"></div>`
 */
var sketch = function(p) {
  p.setup = function() {
    p.createCanvas(100, 100)
    p.background(0)
  }
  
  p.draw = function() {
    // ...
  }
}

new p5(sketch, 'container')
new p5(sketch, document.getElementById('container'))
