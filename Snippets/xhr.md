# XMLHTTPRequest

```js
function makeXMLHttpRequest() {
  if (window.XMLHttpRequest) {
    // IE+
    return new window.XMLHttpRequest();
  } else {
    try {
      // IE6-
      return new ActiveXObject('MSXML2.XMLHTTP.6.0');
    } catch(ex) {
      try {
        // fallback
        return new ActiveXObject('MSXML2.XMLHTTP.3.0');
      } catch(e) {
        // failed to access
        return null;
      }
    }
  }
}


function makeCORSRequest(url, method) {
  if (typeof XMLHttpRequest === 'undefined') {
    return null;
  }
  
  let xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomaiinRequest !== 'undefined') {
    xhr = new XDomainRequest();
    xhr.open(method, url, true);
  } else {
    return null;
  }
  
  return xhr;
}
```
