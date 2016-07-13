# Touch

```js
class Touch {
  constructor() {
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.touching = false;
  }
  
  addEventListeners() {
    
  }
  
  onStart(evt) {
    // if () return ;
    
    this.startX = evt.touches[0].pageX;
    this.startY = evt.touches[0].pageY;
    this.currentX = this.startX;
    this.currentY = this.startY;
    this.touching = true;
    
    // start draw
    requestAnimationFrame(this.update);
  }
  
  onMove(evt) {
    if (!this.touching) return ;
    
    this.currentX = evt.touches[0].pageX;
    this.currentY = evt.touches[0].pageY;
    
    // logic
    
    evt.preventDefault();
  }
  
  onEnd(evt) {
    if (!this.touching) return ;
    
    this.touching = false;
    
    // logic
  }
  
  update() {
    if (!this.touching) return ;
    
    requestAnimationFrame(this.update);
    
    // logic
  }
}

new Touch();
```
