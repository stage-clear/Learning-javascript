
/**
 * poll
 
 * @see https://davidwalsh.name/essential-javascript-functions
 */

function poll(fn, callback, errback, timeout, interval) {
  var endTime = (+new Date()) + (timeout || 2000);
  interval = interval || 100;
  
  (function p() {
    if (fn()) {
      callback();
    } else if ((+new Date() < endTime)) {
      setTimeout(p, interval);
    } else {
      errback(new Error('timed out for ' + fn + ': ' + arguments));
    }
    
  })();
}

// usage
poll(function() {)
