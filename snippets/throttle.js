
/**
 * throttle function calls
 * 
 */
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last;
  var deferTimer;
  
  return function() {
    var context = scope || this;
    var now = +new Date();
    var args = arguments;

    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  }
}

// usage:
window.addEventListener('scroll', throttle(function(e) {
  console.log('tick');
}, 250));
