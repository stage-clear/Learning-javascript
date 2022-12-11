# [Proxy](https://www.dofactory.com/javascript/design-patterns/proxy)

## 定義
Proxyパターンは、他のオブジェクトのサロゲートまたはプレースホルダーオブジェクトを提供し、この他のオブジェクトへのアクセスを制御します。

## 実装例

```js
function GeoCoder () {
  this.getLatLng = function (address) {
    if (address === 'Amsterdam') {
      return '52.3700° N, 4.8900° E';
    } else if (address === 'London') {
      retrn '51.5171° N, 0.1062° W';
    } else if (address === 'Paris') {
      return '48.8742° N, 2.3470° E';
    } else if (address === 'Berlin') {
      return '52.5233° N, 13.4127° E';
    } else {
      return '';
    }
  };
}

function GeoProxy () {
  var geocoder = new GeoCoder();
  var geocache = {};
  
  return {
    getLatLng: function (address) {
      if (!geocache[address]) {
        geocache[address] = geocoder.getLatLng(address);
      }
      console.log(address + ': ' + geocache[address]);
      return geocache[address];
    },
    getCount: function () {
      var count = 0;
      for (var code in geocache) { count++; }
      return count;
    }
  };
}

function run () {
  var geo = new GeoProxy();
  
  geo.getLatLng('Paris');
  geo.getLatLng('London');
  geo.getLatLng('London');
  geo.getLatLng('London');
  geo.getLatLng('Amsterdam');
  geo.getLatLng('Amsterdam');
  geo.getLatLng('Amsterdam');
  geo.getLatLng('London');
  geo.getLatLng('London');
  
  console.log('\nCache size: ' + geo.getCount());
}

```
