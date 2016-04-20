
/**
 * once
 * @param {Function} fn
 * @param {Object} context
 */
function once(fn, context) {
  var result;
  
  return function() {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }
    return result;
  };
}


// usage
var canOnlyFireOnce = once(function() {
  console.log('Fired!');
});

canOnlyFireOnce(); // Fired!
canOnlyFireOnce(); // ..
canOnlyFireOnce(); // ..
