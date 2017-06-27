/**
 * @see https://p5js.org/examples/instance-mode-instantiation.html
 */
var sketch = function(p) {
  var x = 100
  var y = 100

  p.setup = function() {
    p.createCanvas()
  }
  
  p.draw = function() {
    p.backgrond(0)
    p.fill(255)
    p.rect(x, y, 50, 50)
  }
}
