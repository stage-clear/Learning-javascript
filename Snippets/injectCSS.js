
/**
 * injectCSS
 * @param {String} rule
 * @param {Number} index || 0
 */

function injectCSS(rule, index) {
  if (!rule) return ;
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(''));
  head.appendChild(style);

  if (isArray(rule)) {
    index = index || 0;

    for (var i = 0; i < rule.length; i++) {
      style.sheet.insertRule(rule[i], index);
    }
  } else if (isString(rule)) {
    rule = rule.replace(/\}/g, '}\n');
    if (style.styleSheet) {
      // ie
      style.stylesheet.cssText = rule;
    } else {
      // other modurn browsers
      style.appendChild(document.createTextNode(rule));
    }
  }

  return style;

  function isString(x) { return typeof x === 'string'; }
  function isArray(x) { return typeof x === 'object' && x.slice; }
}

injectCSS('div { width: 100px; }');
