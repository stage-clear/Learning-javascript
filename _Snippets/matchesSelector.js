
/**
 * matches selector
 * @param {HTMLElement} el
 * @param {String} selector
 */
function matchesSelector(el, selector) {
  var p = Element.prototype;
  var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(p) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
}

// usage
matchesSelector(document.getElementById('myDiv'), 'div.someSelector[some-attribute=true]');
