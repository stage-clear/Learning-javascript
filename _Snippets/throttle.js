
/**
 * throttle function calls
 * 
 * @param {Function} func
 * @param {Number} wait(ms)
 * @param {Object} scope
 */
function throttle(func, wait, scope) {
  wait || (wait = 250);
  var last;
  var timeout;
  
  return function() {
    var context = scope || this;
    var now = +new Date();
    var args = arguments;

    if (last && now < last + wait) {
      // function remaind
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        last = now;
        func.apply(context, args);
      }, wait);
    } else {
      // function call
      last = now;
      func.apply(context, args);
    }
  }
}


// usage:
var test = throttle(function(e) {
  console.log('tick');
}, 250)

window.addEventListener('scroll', test);
