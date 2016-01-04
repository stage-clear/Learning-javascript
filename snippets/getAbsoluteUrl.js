
/**
 * get absolute url
 * @param {String} url
 */

var getAbsoluteUrl = (function() {
  var a;
  
  return function(url) {
    if (!a) a = document.createElement('a');
    a.href = url;
    
    return a.href;
  }
})();

// usage
getAbsoluteUrl('/something'); // http://.../something
