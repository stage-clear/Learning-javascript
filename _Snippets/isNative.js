
/**
 * isNative
 * is native function?
 * @param {Function} value
 * @return {Boolean} 
 */
;(function(root) {
  var toString = Object.prototype.toString;
  var fnToString = Function.prototype.toString;
  var reHostCtor = /^\[object .+?Constructor\]$/;
  
  var reNative = RegExp('^' + 
    String(toString)
      .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
      .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  function isNative(value) {
    var type = typeof value;
    return type == 'function' 
    ? reNative.test(fnToString.call(value)) 
    : (value && type === 'object' && reHostCtor.test(toString.call(value))) || false;
  }
  
  root.isNative = isNative;
})(this);


// usage
isNative(alert);
isNative(myCustomFunction); // false
