
/**
 * injectCSS
 * @param {String} rule
 * @param {Number} index || 0
 */

function injectCSS(rule, index) {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(''));
  rule = rule.replace(/\}/g, '}\n');
  
  if (style.styleSheet) {
    // for IE, cssText propurty in style object
    style.styleSheet.cssText = rule;
  } else {
    // other modurn browsers
    // style.appendChild(document.createTextNode(rule)); 
    style.sheet.insertRule(rule, index || 0);
  }
  
  return style;
}

injectCSS('div { width: 100px; }');
