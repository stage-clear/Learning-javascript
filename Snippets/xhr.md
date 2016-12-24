# XMLHttpRequest

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

## with Promise

```js
function http(method, url, data) {
  return new Promise(function(resolve, reject) {
     var xhr = new XMLHttpRequest()
     xhr.addEventListener('load', function(event) {
      var result = xhr.responseText ? JSON.parse(xhr.responseText) : undefined
      if (xhr.status === 200) {
        resolve(result)
      } else {
        reject(result || xhr.statusText)
      }
     })
     xhr.addEventListener('error', function(event) {
      reject(xhr.statusText)
     })
     xhr.open(method, url)
     xhr.setRequstHeader('Content-Type', 'application/json;charset=UTF-8')
     xhr.send(JSON.stringify(data))
  })
}

// Usage
http('GET', 'http://example.com/json')
  .then(function(data) {
    console.log('get', data)
  })
  .catch(function(error) {
    console.error(error)
  })
```
